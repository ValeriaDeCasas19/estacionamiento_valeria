document.getElementById('formReporte').addEventListener('submit', async (e) => {
  e.preventDefault();

  //obtiene los valores de fecha y hora
  const fecha = document.getElementById('fecha').value;
  const horaInicio = document.getElementById('horaInicio').value;
  const horaFin = document.getElementById('horaFin').value;

  //realiza peticion post
  const res = await fetch('/api/vehiculos/reporte', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fecha, horaInicio, horaFin })
  });

  //convierte respuesta en objeto json
  const data = await res.json();

  //obtiene tabla
  const tabla = document.getElementById('tablaResultados');
  const cuerpo = tabla.querySelector('tbody');
  cuerpo.innerHTML = '';

  //si no hay resultados muestra un mensaje
  if (data.length === 0) {
    cuerpo.innerHTML = `<tr><td colspan="4">No se encontraron resultados </td></tr>`;
    return;
  }

  data.forEach(reg => {
    const tiempo = reg.minutos >= 60
      ? `${Math.floor(reg.minutos / 60)} h ${reg.minutos % 60} min`
      : `${reg.minutos} min`;
    
    const fila = `
      <tr>
        <td>${reg.placas}</td>
        <td>${tiempo}</td>
        <td>${reg.tipo}</td>
        <td>$${parseFloat(reg.pago).toFixed(2)}</td>
      </tr>`;
    cuerpo.innerHTML += fila;
  });
});
