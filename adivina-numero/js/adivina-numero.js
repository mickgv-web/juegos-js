document.addEventListener("DOMContentLoaded", () => {
  const numIntento = document.getElementById("numIntento");
  const btnProbar = document.getElementById("btnProbar");
  const btnVolverJugar = document.getElementById("btnVolverJugar");
  const respuesta = document.getElementById("respuesta");

  // Nuevo elemento para mostrar intentos
  const intentosPrevios = document.createElement("p");
  intentosPrevios.id = "intentosPrevios";
  respuesta.insertAdjacentElement("afterend", intentosPrevios);

  let numeroSecreto;
  let intentosRestantes;
  let listaIntentos = [];

  // Inicializar juego
  function iniciarJuego() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    intentosRestantes = 10;
    listaIntentos = [];
    respuesta.textContent = "¡Empieza el juego! Tienes 10 intentos.";
    intentosPrevios.textContent = "Intentos anteriores: ninguno";
    numIntento.value = "";
    numIntento.disabled = false;
    btnProbar.disabled = false;
  }

  // Actualizar lista de intentos en pantalla
  function mostrarIntentos() {
    if (listaIntentos.length === 0) {
      intentosPrevios.textContent = "Intentos anteriores: ninguno";
    } else {
      intentosPrevios.textContent = "Intentos anteriores: " + listaIntentos.join(", ");
    }
  }

  // Comprobar intento
  function comprobar() {
    const guess = parseInt(numIntento.value);
    if (isNaN(guess)) {
      respuesta.textContent = "Por favor, ingresa un número válido.";
      return;
    }

    if (guess < 1 || guess > 100) {
      respuesta.textContent = "El número debe estar entre 1 y 100.";
      return;
    }

    intentosRestantes--;
    listaIntentos.push(guess);
    mostrarIntentos();

    if (guess === numeroSecreto) {
      respuesta.textContent = `🎉 ¡Correcto! El número era ${numeroSecreto}. Lo adivinaste con ${10 - intentosRestantes} intentos.`;
      numIntento.disabled = true;
      btnProbar.disabled = true;
    } else if (intentosRestantes === 0) {
      respuesta.textContent = `😢 Se acabaron los intentos. El número era ${numeroSecreto}.`;
      numIntento.disabled = true;
      btnProbar.disabled = true;
    } else if (guess < numeroSecreto) {
      respuesta.textContent = `El número secreto es mayor 📈. Te quedan ${intentosRestantes} intentos.`;
    } else {
      respuesta.textContent = `El número secreto es menor 📉. Te quedan ${intentosRestantes} intentos.`;
    }

    numIntento.value = "";
    numIntento.focus();
  }

  // Eventos
  btnProbar.addEventListener("click", comprobar);

  numIntento.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      comprobar();
    }
  });

  btnVolverJugar.addEventListener("click", iniciarJuego);

  // Iniciar al cargar
  iniciarJuego();
});
