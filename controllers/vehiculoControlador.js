const conexion = require('../db/conexion');

exports.registrarEntrada = (req, res) => {
  const { placas, tipo } = req.body;

//validacion
  if (!placas || !tipo) {
    return res.status(400).json({ error: 'Ingresa las placas y el tipo' });
  }

  console.log('Datos recibidos:', { placas, tipo });

//busca si el vehiculo esta registrado
  conexion.query('SELECT * FROM vehiculos WHERE placas = ?', [placas], (fallo, resultado) => {
    if (fallo) {
      console.error('Error al buscar vehículo:', fallo);
      return res.status(500).json({ error: 'Error al buscar vehículo' });
    }


//funcion registrar entrada
    const registrarEntrada = () => {
      const fecha_entrada = new Date();
      conexion.query(
        'INSERT INTO tiempo_estacionado (placas, fecha_entrada) VALUES (?, ?)',
        [placas, fecha_entrada],
        (fallo) => {
          if (fallo) {
            console.error(' Error al registrar entrada:', fallo);
            return res.status(500).json({ error: 'Error al registrar entrada' });
          }
          console.log(`Entrada registrada para ${placas} a las ${fecha_entrada}`);
          return res.status(200).json({ mensaje: 'Registro exitoso' });
        }
      );
    };

    //inserta vehiculo si esta registrado
    if (resultado.length === 0) {
      conexion.query(
        'INSERT INTO vehiculos (placas, tipo) VALUES (?, ?)',
        [placas, tipo],
        (fallo) => {
          if (fallo) {
            console.error(' Error al registrar vehículo:', fallo);
            return res.status(500).json({ error: 'Error al registrar vehículo' });
          }
          console.log(`Vehículo nuevo registrado: ${placas} (${tipo})`);
          registrarEntrada();
        }
      );
    } else {
      console.log(`Vehículo ya registrado: ${placas}`);
      registrarEntrada();
    }
  });
};
