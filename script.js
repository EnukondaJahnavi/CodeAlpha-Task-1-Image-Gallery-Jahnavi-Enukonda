const cards = [...document.querySelectorAll(".card")];
const filters = [...document.querySelectorAll(".filter")];
const lightbox = document.getElementById("lightbox");
const lightImage = document.getElementById("lightImage");
const lightTitle = document.getElementById("lightTitle");
const lightCategory = document.getElementById("lightCategory");
let visibleCards = cards;
let current = 0;

function updateCount(){
  document.getElementById("count").textContent = visibleCards.length;
}
filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    visibleCards = cards.filter(card => filter === "all" || card.dataset.category === filter);
    cards.forEach(card => card.classList.toggle("hidden", !visibleCards.includes(card)));
    updateCount();
  });
});

function openLightbox(card){
  visibleCards = cards.filter(c => !c.classList.contains("hidden"));
  current = visibleCards.indexOf(card);
  renderLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function renderLightbox(){
  const card = visibleCards[current];
  const img = card.querySelector("img");
  lightImage.src = img.src;
  lightImage.alt = img.alt;
  lightTitle.textContent = card.dataset.title;
  lightCategory.textContent = card.dataset.category;
}
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
function move(step){
  if(!visibleCards.length) return;
  current = (current + step + visibleCards.length) % visibleCards.length;
  renderLightbox();
}
cards.forEach(card => card.addEventListener("click", () => openLightbox(card)));
document.getElementById("closeBtn").addEventListener("click", closeLightbox);
document.getElementById("prevBtn").addEventListener("click", () => move(-1));
document.getElementById("nextBtn").addEventListener("click", () => move(1));
lightbox.addEventListener("click", e => { if(e.target === lightbox) closeLightbox(); });

document.addEventListener("keydown", e => {
  if(!lightbox.classList.contains("open")) return;
  if(e.key === "Escape") closeLightbox();
  if(e.key === "ArrowLeft") move(-1);
  if(e.key === "ArrowRight") move(1);
});

document.getElementById("shuffleBtn").addEventListener("click", () => {
  const gallery = document.getElementById("gallery");
  const shuffled = [...cards].sort(() => Math.random() - .5);
  shuffled.forEach(card => gallery.appendChild(card));
});
updateCount();
