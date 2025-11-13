document.addEventListener("DOMContentLoaded", () => {
  const contenedorPreguntas = document.getElementById("contendor-preguntas");
  const resultado = document.getElementById("resultado");

  let preguntas = [];
  let indicePregunta = 0;
  let aciertos = 0;

  // Bonus: Cargar preguntas desde JSON externo
  fetch("data/preguntas.json")
    .then(res => res.json())
    .then(data => {
      preguntas = data;
      mostrarPregunta();
    })
    .catch(err => {
      console.error("Error cargando preguntas:", err);
      contenedorPreguntas.innerHTML = "<p>No se pudieron cargar las preguntas.</p>";
    });

  function mostrarPregunta() {
    contenedorPreguntas.innerHTML = "";
    resultado.textContent = "";

    if (indicePregunta >= preguntas.length) {
      contenedorPreguntas.innerHTML = "<p>🎉 Quiz terminado</p>";
      resultado.textContent = `Has acertado ${aciertos} de ${preguntas.length} preguntas.`;
      return;
    }

    const pregunta = preguntas[indicePregunta];
    const divPregunta = document.createElement("div");
    divPregunta.classList.add("pregunta");

    const titulo = document.createElement("p");
    titulo.textContent = pregunta.texto;
    divPregunta.appendChild(titulo);

    // Bonus: Forzar reflow y añadir clase visible
    setTimeout(() => divPregunta.classList.add("visible"), 50);    

    pregunta.opciones.forEach((opcion, i) => {
      const btnOpcion = document.createElement("button");
      btnOpcion.type = "button";
      btnOpcion.textContent = opcion;
      btnOpcion.classList.add("opcion");

      btnOpcion.addEventListener("click", () => {
        if (i === pregunta.correcta) {
          resultado.textContent = "✅ Correcto!";
          aciertos++;
        } else {
          resultado.textContent = `❌ Incorrecto. La respuesta correcta era "${pregunta.opciones[pregunta.correcta]}".`;
        }

        setTimeout(() => {
          indicePregunta++;
          mostrarPregunta();
        }, 1200);
      });

      divPregunta.appendChild(btnOpcion);
    });

    contenedorPreguntas.appendChild(divPregunta);
  }
});
