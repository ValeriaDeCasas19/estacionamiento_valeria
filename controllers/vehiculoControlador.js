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


exports.registrarSalida = (req,res) => {
    const {placas} = req.body;

    if(!placas){
        return res.status(400).json({error: 'Ingresa las placas'});

    }
    const fecha_salida = new Date();

    const consulta = ` SELECT te.id, te.fecha_entrada, v.tipo
                       FROM tiempo_estacionado te
                       JOIN vehiculos v ON te.placas = v.placas
                       WHERE te.placas = ? AND te.fecha_salida IS NULL
                       ORDER BY te.fecha_entrada DESC LIMIT 1`;

    conexion.query(consulta, [placas], (fallo, resultados) =>{
        if (fallo) return res.status(500).json({error:'Error al buscar'});

        if (resultados.length === 0){
            return res.status(404).json({error: 'No hay registros de salida'});
        }
        const {id, fecha_entrada, tipo} = resultados[0];
        const entrada = new Date(fecha_entrada);
        const minutos = Math.ceil((fecha_salida-entrada) / 60000);

        let pago = 0;
        if (tipo === 'Residente') pago = minutos * 1;
        else if (tipo === 'No Residente') pago = minutos *3;


        conexion.query(
         `UPDATE tiempo_estacionado SET fecha_salida = ?, minutos = ?, pago = ? WHERE id = ?`,
         [fecha_salida, minutos, pago, id],
         (fallo) => {
            if (fallo) return res.status(500).json({error: 'Error al registrar salida'})

            return res.status(200).json({
                mensaje: 'Salida registrada',
                placas,
                tipo,
                minutos,
                pago,
                fecha_salida
            });
         }
        );
    });
}