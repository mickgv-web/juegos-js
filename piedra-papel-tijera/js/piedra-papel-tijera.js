document.addEventListener("DOMContentLoaded", () => {
  const opcionesUsuario = document.querySelectorAll(".opcion");
  const btnReiniciar = document.getElementById("btnReiniciar");
  const resultado = document.getElementById("resultado");

  const marcador = document.querySelector(".marcador");
  const marcadorVictorias = document.getElementById("victorias");
  const marcadorDerrotas = document.getElementById("derrotas");
  const marcadorEmpates = document.getElementById("empates");

  const opciones = ["piedra", "papel", "tijera"];

  let victorias = 0;
  let derrotas = 0;
  let empates = 0;

  opcionesUsuario.forEach(opcion => {
    opcion.addEventListener("click", (e) => {
      e.preventDefault();
      const eleccionUsuario = opcion.id;
      const computadora = opciones[Math.floor(Math.random() * opciones.length)];

      // Mostrar marcador al primer juego
      marcador.classList.remove("oculto");

      if (eleccionUsuario === computadora) {
        resultado.textContent = `🤝 Empate. Ambos eligieron ${eleccionUsuario}.`;
        empates++;
      } else if (
        (eleccionUsuario === "piedra" && computadora === "tijera") ||
        (eleccionUsuario === "papel" && computadora === "piedra") ||
        (eleccionUsuario === "tijera" && computadora === "papel")
      ) {
        resultado.textContent = `🎉 Ganaste. Tú: ${eleccionUsuario} | PC: ${computadora}`;
        victorias++;
      } else {
        resultado.textContent = `😢 Perdiste. Tú: ${eleccionUsuario} | PC: ${computadora}`;
        derrotas++;
      }

      marcadorVictorias.textContent = victorias;
      marcadorDerrotas.textContent = derrotas;
      marcadorEmpates.textContent = empates;

      opcionesUsuario.forEach(o => o.classList.remove("seleccionada"));
      opcion.classList.add("seleccionada");
    });
  });

  btnReiniciar.addEventListener("click", () => {
    resultado.textContent = "";
    opcionesUsuario.forEach(o => o.classList.remove("seleccionada"));
    victorias = 0;
    derrotas = 0;
    empates = 0;
    marcadorVictorias.textContent = victorias;
    marcadorDerrotas.textContent = derrotas;
    marcadorEmpates.textContent = empates;
    marcador.classList.add("oculto"); // ocultar marcador al reiniciar
  });
});
