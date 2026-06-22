const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll("[data-go]");
const bottomNavButtons = document.querySelectorAll(".bottom-nav .nav-btn");

const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendMessageBtn = document.getElementById("sendMessageBtn");

const taskChecks = document.querySelectorAll(".task-check");
const dayCards = document.querySelectorAll(".day-card");

function showView(viewId) {
  views.forEach((view) => {
    view.classList.remove("active");
  });

  const selectedView = document.getElementById(viewId);

  if (selectedView) {
    selectedView.classList.add("active");
  }

  bottomNavButtons.forEach((btn) => {
    btn.classList.remove("active");

    if (btn.dataset.go === viewId) {
      btn.classList.add("active");
    }
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (viewId === "chatView") {
    setTimeout(scrollChatToBottom, 100);
  }
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetView = button.dataset.go;

    if (targetView) {
      showView(targetView);
    }
  });
});

function createMessageElement(text, type = "user") {
  const row = document.createElement("div");
  row.className = `message-row ${type}`;

  const bubble = document.createElement("div");
  bubble.className = type === "user"
    ? "message bubble-user"
    : "message bubble-bot";

  bubble.textContent = text;

  row.appendChild(bubble);
  return row;
}

function sendMessage() {
  const text = messageInput.value.trim();

  if (!text) return;

  const userMessage = createMessageElement(text, "user");
  chatMessages.appendChild(userMessage);

  messageInput.value = "";
  scrollChatToBottom();

  setTimeout(() => {
    const botReply = createMessageElement(getBotReply(text), "bot");
    chatMessages.appendChild(botReply);
    scrollChatToBottom();
  }, 700);
}

function getBotReply(text) {
  const message = text.toLowerCase();

  if (message.includes("codigo") || message.includes("código") || message.includes("html")) {
    return "Claro. Puedo ayudarte a crear código completo en HTML, CSS y JavaScript con estructura limpia y diseño responsive.";
  }

  if (message.includes("diseño") || message.includes("app") || message.includes("interfaz")) {
    return "Perfecto. Podemos trabajar una interfaz premium en modo oscuro, con tarjetas redondeadas, navegación inferior y estilo móvil moderno.";
  }

  if (message.includes("tarea") || message.includes("organizar")) {
    return "Puedo ayudarte a organizar tus tareas por prioridad, fecha y tipo de proyecto.";
  }

  if (message.includes("negocio") || message.includes("marketing")) {
    return "Podemos crear ideas de contenido, promociones, campañas y estrategias para negocios locales.";
  }

  return "Entendido. Puedo ayudarte a desarrollarlo paso a paso con una propuesta clara, moderna y funcional.";
}

function scrollChatToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendMessageBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

taskChecks.forEach((check) => {
  check.addEventListener("click", () => {
    check.classList.toggle("completed");

    const taskCard = check.closest(".task-card");

    if (taskCard) {
      taskCard.classList.toggle("task-done");
    }
  });
});

dayCards.forEach((day) => {
  day.addEventListener("click", () => {
    dayCards.forEach((item) => item.classList.remove("active"));
    day.classList.add("active");
  });
});

showView("homeView");
