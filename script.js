const postsContainer = document.getElementById("postsContainer");
const modal = document.getElementById("postModal");
const searchInput = document.getElementById("searchInput");

let posts = [
  {
    business: "Laguna Mall",
    initials: "LM",
    category: "Evento",
    title: "Activación especial por temporada mundialista",
    text: "Este fin de semana tendremos pantalla gigante, promociones de comida, música en vivo y dinámicas para toda la familia.",
    icon: "🏆",
    likes: 128,
    comments: 34
  },
  {
    business: "PhotoLab Studio",
    initials: "PL",
    category: "Promoción",
    title: "Sesión mundialista con tu camiseta favorita",
    text: "Ven con la camiseta de tu equipo y vive una experiencia fotográfica profesional. Fotos individuales, pareja o grupo.",
    icon: "📸",
    likes: 92,
    comments: 18
  },
  {
    business: "Céline Bar Karaoke",
    initials: "CF",
    category: "Evento",
    title: "Viernes de despecho y karaoke",
    text: "Una noche para cantar, disfrutar y compartir con amigos. Promociones especiales en cócteles y reservas VIP.",
    icon: "🎤",
    likes: 210,
    comments: 56
  },
  {
    business: "Radio Business FM",
    initials: "RB",
    category: "Servicio",
    title: "Radio interna para centros comerciales",
    text: "Creamos circuitos cerrados de radio para negocios, locales y centros comerciales con programación personalizada.",
    icon: "🎧",
    likes: 75,
    comments: 12
  }
];

function renderPosts(list = posts) {
  postsContainer.innerHTML = "";

  if (list.length === 0) {
    postsContainer.innerHTML = `
      <div class="post">
        <h2>No encontramos resultados</h2>
        <p>Intenta buscar otro negocio, promoción o evento.</p>
      </div>
    `;
    return;
  }

  list.forEach((post, index) => {
    const postElement = document.createElement("article");
    postElement.className = "post";

    postElement.innerHTML = `
      <div class="post-header">
        <div class="post-business">
          <div class="post-avatar">${post.initials}</div>
          <div>
            <h3>${post.business}</h3>
            <p>Publicado hace ${index + 1} h · Negocio verificado</p>
          </div>
        </div>
        <span class="badge">${post.category}</span>
      </div>

      <div class="post-body">
        <h2>${post.title}</h2>
        <p>${post.text}</p>
        <div class="post-image">${post.icon}</div>
      </div>

      <div class="post-actions">
        <button onclick="likePost(${index})">❤️ Me gusta <span id="likes-${index}">${post.likes}</span></button>
        <button>💬 Comentar ${post.comments}</button>
        <button>📲 Compartir</button>
        <button>📌 Guardar</button>
      </div>
    `;

    postsContainer.appendChild(postElement);
  });
}

function openModal() {
  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
}

function createPost() {
  const businessName = document.getElementById("businessName").value.trim();
  const postTitle = document.getElementById("postTitle").value.trim();
  const postText = document.getElementById("postText").value.trim();
  const postCategory = document.getElementById("postCategory").value;

  if (!businessName || !postTitle || !postText) {
    alert("Completa todos los campos antes de publicar.");
    return;
  }

  const initials = businessName
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const icons = {
    "Promoción": "🔥",
    "Evento": "🎉",
    "Producto": "🛍️",
    "Servicio": "💼",
    "Comunicado": "📢"
  };

  const newPost = {
    business: businessName,
    initials: initials,
    category: postCategory,
    title: postTitle,
    text: postText,
    icon: icons[postCategory] || "📢",
    likes: 0,
    comments: 0
  };

  posts.unshift(newPost);
  renderPosts();
  closeModal();
  clearForm();
}

function clearForm() {
  document.getElementById("businessName").value = "";
  document.getElementById("postTitle").value = "";
  document.getElementById("postText").value = "";
  document.getElementById("postCategory").value = "Promoción";
}

function likePost(index) {
  posts[index].likes++;
  document.getElementById(`likes-${index}`).textContent = posts[index].likes;
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredPosts = posts.filter(post => {
    return (
      post.business.toLowerCase().includes(searchTerm) ||
      post.title.toLowerCase().includes(searchTerm) ||
      post.text.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm)
    );
  });

  renderPosts(filteredPosts);
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

renderPosts();
