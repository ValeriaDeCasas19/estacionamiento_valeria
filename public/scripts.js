const formEntrada = document.getElementById("formEntrada");
if (formEntrada) {
  formEntrada.addEventListener('submit', async (e) => {
    e.preventDefault();

    const placas = document.getElementById('placas').value;
    const tipo = document.getElementById('tipo').value;

    const res = await fetch("/api/vehiculos/entrada", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placas, tipo }),
    });

    const data = await res.json();
    if (data.mensaje) {
      alert("Bien" + data.mensaje);
    } else {
      alert("X" + (data.error || "Error al registrar"));
    }
  });
}


const formSalida = document.getElementById('formSalida');

if (formSalida) {
  formSalida.addEventListener('submit', async (e) => {
    e.preventDefault();

    const placas = document.getElementById('placas').value.trim();

    const res = await fetch("/api/vehiculos/salida", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placas }),
    });

    const data = await res.json();

    if (data.mensaje) {
      //convierte minutos a horas
      const tiempo = data.minutos >= 60
        ? `${Math.floor(data.minutos / 60)} h ${data.minutos % 60} min`
        : `${data.minutos} min`;

      //da formato al pago
      const pago = `$${parseFloat(data.pago).toFixed(2)}`;

      document.getElementById('resultado').innerHTML = `
        <h3 style="margin-top:20px;">Resumen de salida</h3>
        <table style="margin:auto; border-collapse:collapse;">
          <tr>
            <th style="padding:6px;">Núm. Placa</th>
            <th style="padding:6px;">Tiempo Estacionado</th>
            <th style="padding:6px;">Tipo</th>
            <th style="padding:6px;">Cantidad a Pagar</th>
          </tr>
          <tr style="text-align:center;">
            <td style="padding:6px;">${data.placas}</td>
            <td style="padding:6px;">${tiempo}</td>
            <td style="padding:6px;">${data.tipo}</td>
            <td style="padding:6px;">${pago}</td>
          </tr>
        </table>
      `;
    } else {
      document.getElementById('resultado').innerHTML = `<p style="color:red;">❌ ${data.error || 'Error al registrar'}</p>`;
    }
  });
}
