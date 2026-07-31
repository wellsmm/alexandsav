const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const navigation = document.querySelector("[data-navigation]");
const navigationLinks = document.querySelectorAll("[data-navigation] a");

function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 30);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";

  menuButton.setAttribute("aria-expanded", String(open));
  navigation?.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    navigation?.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

document.querySelectorAll("[data-image]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightboxImage.src = button.dataset.image || "";
    lightboxImage.alt = button.dataset.alt || "Engagement photograph";
    lightbox.showModal();
  });
});

lightboxClose?.addEventListener("click", () => lightbox?.close());

lightbox?.addEventListener("click", (event) => {
  const bounds = lightbox.getBoundingClientRect();
  const outside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;

  if (outside) {
    lightbox.close();
  }
});

const form = document.querySelector("#wishes-form");
const formStatus = document.querySelector("#form-status");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    formStatus.textContent = "Please complete all required fields.";
    form.reportValidity();
    return;
  }

  const name = document.querySelector("#guest-name").value.trim();

  formStatus.textContent =
    `Thank you, ${name}. Your message is ready to be connected to a live form service.`;

  form.reset();
});
