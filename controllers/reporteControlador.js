//inicia conexion con la bd
const conexion = require('../db/conexion');

//funcion para reporte
exports.obtenerReporte = (req, res) => {
  const { fecha, horaInicio, horaFin } = req.body;

  if (!fecha || !horaInicio || !horaFin) {
    return res.status(400).json({ error: 'Faltan datos ' });
  }

  const fechaInicio = `${fecha} ${horaInicio}:00`;
  const fechaFin = `${fecha} ${horaFin}:00`;

  //consulta a la bd
  const consulta = `
    SELECT te.placas, TIMESTAMPDIFF(MINUTE, te.fecha_entrada, te.fecha_salida) AS minutos,
           v.tipo, te.pago
    FROM tiempo_estacionado te
    JOIN vehiculos v ON te.placas = v.placas
    WHERE te.fecha_salida IS NOT NULL
      AND te.fecha_salida BETWEEN ? AND ?
    ORDER BY te.fecha_salida;
  `;

  conexion.query(consulta, [fechaInicio, fechaFin], (error, resultados) => {
    if (error) {
      console.error('Error al consultar :', error);
      return res.status(500).json({ error: 'Error al consultar ' });
    }

    res.json(resultados);
  });
};