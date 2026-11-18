// Mama Njeri Restaurant website interactions
// IMPORTANT: Change this sample number to the restaurant's WhatsApp number.
// Use the international format with country code and no + sign or spaces.
const WHATSAPP_NUMBER = "254700000000";

const cart = new Map();
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");
const toast = document.getElementById("toast");
let toastTimer;

function money(amount) {
  return `KSh ${amount.toLocaleString("en-KE")}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function addToCart(name, price) {
  const current = cart.get(name) || { price, quantity: 0 };
  current.quantity += 1;
  cart.set(name, current);
  renderCart();
  showToast(`${name} added to your order`);
}

function changeQuantity(name, amount) {
  const item = cart.get(name);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) cart.delete(name);
  renderCart();
}

function renderCart() {
  let itemCount = 0;
  let total = 0;
  cartItems.innerHTML = "";

  if (cart.size === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your basket is empty.<br>Choose a meal to get started.</p>';
  }

  cart.forEach((item, name) => {
    itemCount += item.quantity;
    total += item.price * item.quantity;
    const row = document.createElement("div");
    row.className = "cart-row";

    const details = document.createElement("div");
    const title = document.createElement("div");
    title.className = "cart-row-name";
    title.textContent = name;
    const controls = document.createElement("div");
    controls.className = "quantity-control";

    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.setAttribute("aria-label", `Remove one ${name}`);
    minus.addEventListener("click", () => changeQuantity(name, -1));
    const quantity = document.createElement("span");
    quantity.textContent = `Qty: ${item.quantity}`;
    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.setAttribute("aria-label", `Add one ${name}`);
    plus.addEventListener("click", () => changeQuantity(name, 1));

    controls.append(minus, quantity, plus);
    details.append(title, controls);
    const lineTotal = document.createElement("div");
    lineTotal.className = "cart-row-price";
    lineTotal.textContent = money(item.price * item.quantity);
    row.append(details, lineTotal);
    cartItems.appendChild(row);
  });

  cartCount.textContent = itemCount;
  cartTotal.textContent = money(total);
  checkoutButton.disabled = cart.size === 0;
}

// Add-to-order buttons
for (const button of document.querySelectorAll(".add-button")) {
  button.addEventListener("click", () => {
    addToCart(button.dataset.name, Number(button.dataset.price));
  });
}

// Menu category filters and text search
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");
const menuSearch = document.getElementById("menuSearch");
let activeFilter = "all";

function filterMenu() {
  const searchTerm = menuSearch.value.trim().toLowerCase();
  menuCards.forEach((card) => {
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = card.dataset.name.includes(searchTerm);
    card.hidden = !(matchesCategory && matchesSearch);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    filterMenu();
  });
});
menuSearch.addEventListener("input", filterMenu);

// Build an order summary and open WhatsApp with the message ready to send.
checkoutButton.addEventListener("click", () => {
  if (cart.size === 0) return;
  const lines = ["Hello Mama Njeri Restaurant, I would like to place this order:"];
  let total = 0;
  cart.forEach((item, name) => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;
    lines.push(`- ${name} x ${item.quantity}: ${money(lineTotal)}`);
  });
  lines.push(`Estimated total: ${money(total)}`);
  lines.push("Please confirm availability and collection/delivery details. Thank you.");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

// Mobile navigation
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navToggle.textContent = isOpen ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    navToggle.textContent = "☰";
  });
});

// Automatically display the current year in the footer.
document.getElementById("year").textContent = new Date().getFullYear();

// Contact links use the same sample number. Update it together with WHATSAPP_NUMBER.
document.getElementById("contactWhatsApp").href = `https://wa.me/${WHATSAPP_NUMBER}`;
