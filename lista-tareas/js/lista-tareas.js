document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-todo");
  const input = document.getElementById("nueva-tarea");
  const lista = document.getElementById("lista-tareas");

  // Agregar tarea
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = input.value.trim();
    if (texto === "") return;

    const li = document.createElement("li");
    li.classList.add("tarea");

    const span = document.createElement("span");
    span.textContent = texto;

    // Botón completar
    const btnCompletar = document.createElement("button");
    btnCompletar.textContent = "✔";
    btnCompletar.classList.add("btn-completar");
    btnCompletar.addEventListener("click", () => {
      li.classList.toggle("completada");
    });

    // Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "✖";
    btnEliminar.classList.add("btn-eliminar");
    btnEliminar.addEventListener("click", () => {
      lista.removeChild(li);
    });

    li.appendChild(span);
    li.appendChild(btnCompletar);
    li.appendChild(btnEliminar);
    lista.appendChild(li);

    input.value = "";
    input.focus();
  });
});
