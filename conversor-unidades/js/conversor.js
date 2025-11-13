document.addEventListener("DOMContentLoaded", () => {
  // --- Conversor de temperatura ---
  const valorInput = document.getElementById("valorInput");
  const unidadDesde = document.getElementById("unidadDesde");
  const unidadHacia = document.getElementById("unidadHacia");
  const btnConvertir = document.getElementById("btnConvertir");
  const resultado = document.getElementById("resultado");

  function convertirTemperatura(valor, desde, hacia) {
    let celsius;
    switch (desde) {
      case "celsius": celsius = valor; break;
      case "fahrenheit": celsius = (valor - 32) * 5 / 9; break;
      case "kelvin": celsius = valor - 273.15; break;
    }
    switch (hacia) {
      case "celsius": return celsius;
      case "fahrenheit": return (celsius * 9 / 5) + 32;
      case "kelvin": return celsius + 273.15;
    }
  }

  function ejecutarConversion() {
    const valor = parseFloat(valorInput.value);
    if (isNaN(valor)) {
      resultado.textContent = "⚠️ Ingresa un número válido.";
      return;
    }
    const valorConvertido = convertirTemperatura(valor, unidadDesde.value, unidadHacia.value);
    resultado.textContent = `${valor} ${unidadDesde.value} = ${valorConvertido.toFixed(2)} ${unidadHacia.value}`;
  }

  btnConvertir.addEventListener("click", ejecutarConversion);
  valorInput.addEventListener("keydown", e => { if (e.key === "Enter") ejecutarConversion(); });

  // --- Conversor de moneda ---
  const valorMoneda = document.getElementById("valorMoneda");
  const monedaDesde = document.getElementById("monedaDesde");
  const monedaHacia = document.getElementById("monedaHacia");
  const btnConvertirMoneda = document.getElementById("btnConvertirMoneda");
  const resultadoMoneda = document.getElementById("resultadoMoneda");

  // Tasas de ejemplo (puedes sustituirlas por una API real)
  const tasas = {
    EUR: { USD: 1.08, GBP: 0.86 },
    USD: { EUR: 0.93, GBP: 0.80 },
    GBP: { EUR: 1.16, USD: 1.25 }
  };

  function convertirMoneda(valor, desde, hacia) {
    if (desde === hacia) return valor;
    return valor * tasas[desde][hacia];
  }

  function ejecutarConversionMoneda() {
    const valor = parseFloat(valorMoneda.value);
    if (isNaN(valor)) {
      resultadoMoneda.textContent = "⚠️ Ingresa una cantidad válida.";
      return;
    }
    const convertido = convertirMoneda(valor, monedaDesde.value, monedaHacia.value);
    resultadoMoneda.textContent = `${valor} ${monedaDesde.value} = ${convertido.toFixed(2)} ${monedaHacia.value}`;
  }

  btnConvertirMoneda.addEventListener("click", ejecutarConversionMoneda);
  valorMoneda.addEventListener("keydown", e => { if (e.key === "Enter") ejecutarConversionMoneda(); });
});
