// Catálogo de demostración. Sustituye estos ejemplos por productos reales y enlaces aprobados.
const products = [
  {
    id: 1,
    name: "Organizador modular para cajones",
    category: "Organización",
    description: "Una idea para mantener ordenados los pequeños objetos del día a día.",
    priceLabel: "Consultar precio",
    icon: "▤",
    affiliateUrl: ""
  },
  {
    id: 2,
    name: "Lámpara ambiental de sobremesa",
    category: "Iluminación",
    description: "Iluminación auxiliar para crear un ambiente acogedor en una habitación.",
    priceLabel: "Consultar precio",
    icon: "💡",
    affiliateUrl: ""
  },
  {
    id: 3,
    name: "Báscula digital de cocina",
    category: "Cocina",
    description: "Un accesorio práctico para medir ingredientes al cocinar.",
    priceLabel: "Consultar precio",
    icon: "⚖️",
    affiliateUrl: ""
  },
  {
    id: 4,
    name: "Cesta plegable de almacenaje",
    category: "Organización",
    description: "Una solución sencilla para guardar mantas, juguetes u otros objetos.",
    priceLabel: "Consultar precio",
    icon: "🧺",
    affiliateUrl: ""
  },
  {
    id: 5,
    name: "Luz LED para armarios",
    category: "Iluminación",
    description: "Una opción de iluminación para zonas con poca luz.",
    priceLabel: "Consultar precio",
    icon: "✨",
    affiliateUrl: ""
  },
  {
    id: 6,
    name: "Recipientes reutilizables para alimentos",
    category: "Cocina",
    description: "Para organizar alimentos y aprovechar mejor el espacio de la cocina.",
    priceLabel: "Consultar precio",
    icon: "▣",
    affiliateUrl: ""
  }
];

let selectedCategory = "Todos";
const grid = document.querySelector("#product-grid");
const search = document.querySelector("#search");
const emptyState = document.querySelector("#empty-state");

function safeAffiliateLink(url) {
  // Evita que los enlaces de ejemplo vacíos parezcan enlaces de compra reales.
  if (!url || !/^https?:\/\//i.test(url)) return null;
  return url;
}

function renderProducts() {
  const query = search.value.trim().toLocaleLowerCase("es");
  const filtered = products.filter(product => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const text = `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase("es");
    return matchesCategory && text.includes(query);
  });

  grid.innerHTML = filtered.map(product => {
    const link = safeAffiliateLink(product.affiliateUrl);
    const action = link
      ? `<a class="product-link" href="${link}" target="_blank" rel="sponsored nofollow noopener">Ver producto ↗</a>`
      : `<span class="product-link" aria-label="Añade un enlace de afiliado en app.js">Enlace pendiente</span>`;

    return `
      <article class="product-card">
        <div class="product-visual" aria-hidden="true"><span>${product.icon}</span></div>
        <div class="product-info">
          <p class="category">${product.category}</p>
          <h3>${product.name}</h3>
          <p class="description">${product.description}</p>
          <div class="product-bottom">
            <span class="price">${product.priceLabel}</span>
            ${action}
          </div>
        </div>
      </article>`;
  }).join("");

  emptyState.hidden = filtered.length !== 0;
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
    renderProducts();
  });
});

search.addEventListener("input", renderProducts);
document.querySelector("#year").textContent = new Date().getFullYear();
renderProducts();
