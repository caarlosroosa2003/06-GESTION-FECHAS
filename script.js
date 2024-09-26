// Crear la estructura de la página desde JavaScript
const app = document.getElementById("app");

// Crear elemento para mostrar la fecha límite
const limitDateText = document.createElement("div");
limitDateText.id = "limitDateText";
limitDateText.textContent = "Fecha límite: No seleccionada";

// Crear contenedor de input para seleccionar la fecha
const inputContainer = document.createElement("div");
inputContainer.classList.add("input-container");

const dateInput = document.createElement("input");
dateInput.type = "datetime-local";
dateInput.id = "targetDate";
dateInput.classList.add("form-control");
inputContainer.appendChild(dateInput);

// Crear el contenedor de la cuenta atrás
const countdownContainer = document.createElement("div");
countdownContainer.classList.add("countdown-container", "green");
countdownContainer.id = "countdown";

// Crear los elementos para mostrar meses, días, horas, minutos, segundos
const createCountdownElement = (id, label) => {
  const container = document.createElement("div");
  const p = document.createElement("p");
  p.classList.add("display-4");
  p.id = id;
  p.textContent = "0";
  const small = document.createElement("small");
  small.textContent = label;
  container.appendChild(p);
  container.appendChild(small);
  return container;
};

countdownContainer.appendChild(createCountdownElement("months", "Meses"));
countdownContainer.appendChild(createCountdownElement("days", "Días"));
countdownContainer.appendChild(createCountdownElement("hours", "Horas"));
countdownContainer.appendChild(createCountdownElement("minutes", "Minutos"));
countdownContainer.appendChild(createCountdownElement("seconds", "Segundos"));

// Añadir el input y el contenedor de cuenta atrás al DOM
app.appendChild(limitDateText);
app.appendChild(countdownContainer);
app.appendChild(inputContainer);

// Función para actualizar la cuenta atrás
function updateCountdown() {
  const targetDate = new Date(dateInput.value);
  const now = new Date();

  if (targetDate > now) {
    const totalSeconds = Math.floor((targetDate - now) / 1000);

    const months = Math.floor(totalSeconds / (60 * 60 * 24 * 30));
    const days = Math.floor((totalSeconds / (60 * 60 * 24)) % 30);
    const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = totalSeconds % 60;

    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

    // Se cambia el color según el tiempo restante
    if (totalSeconds > 60 * 60 * 24 * 7 * 2) {
      countdownContainer.classList.remove("orange", "red");
      countdownContainer.classList.add("green");
    } else if (totalSeconds > 60 * 60 * 24 * 7) {
      countdownContainer.classList.remove("green", "red");
      countdownContainer.classList.add("orange");
    } else if (totalSeconds > 0) {
      countdownContainer.classList.remove("green", "orange");
      countdownContainer.classList.add("red");
    }

    // Se actualiza el texto de fecha limite dependiendo de la fecha que se ha introducido,
    // con el método toLocaleString le doy formato a la fecha, en este caso poniendo fecha española,
    // despues, le añado el contenido al div añadiendole la fecha introducida
    const formattedDate = targetDate.toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    limitDateText.textContent = `Fecha límite: ${formattedDate}`;
  }
}

// Evento para que cuando la cuenta atras llegue a 0 se quede parado el contador
dateInput.addEventListener("change", () => {
  // Si la fecha introducida en el input es mayor a la fecha actual, se actualiza la cuenta atras
  if (new Date(dateInput.value) > new Date()) {
    setInterval(updateCountdown, 1000);
  }
});
