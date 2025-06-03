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
      alert("✅ " + data.mensaje);
    } else {
      alert("❌ " + (data.error || "Error al registrar"));
    }
  });
}


const formSalida = document.getElementById('formSalida');
if (formSalida) {
  formSalida.addEventListener('submit', async (e) => {
    e.preventDefault();

    const placas = document.getElementById('placas').value;

    const res = await fetch("/api/vehiculos/salida", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placas }),
    });

    const data = await res.json();

    if (data.mensaje) {
      alert("✅ " + data.mensaje);
    } else {
      alert("❌ " + (data.error || "Error al registrar"));
    }
  });
}