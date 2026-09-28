// ========================================
// Sweet House — Main JavaScript
// ========================================

let cartCount = 0;

// ----------------------------------------
// Language
// ----------------------------------------

const langBtn = document.getElementById("langBtn");

function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-en][data-fa]");

  elements.forEach((element) => {
    element.textContent =
      lang === "fa"
        ? element.getAttribute("data-fa")
        : element.getAttribute("data-en");
  });

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";

  document.body.classList.toggle("fa", lang === "fa");
  document.body.classList.toggle("rtl", lang === "fa");

  if (langBtn) {
    langBtn.textContent = lang === "fa" ? "EN" : "FA";
  }

  localStorage.setItem("sweet-house-language", lang);
}


// ----------------------------------------
// Language Toggle
// ----------------------------------------

if (langBtn) {
  langBtn.addEventListener("click", () => {
    const currentLanguage =
      localStorage.getItem("sweet-house-language") || "en";

    const newLanguage = currentLanguage === "en" ? "fa" : "en";

    setLanguage(newLanguage);
  });
}


// ----------------------------------------
// Cart
// ----------------------------------------

function addToCart() {
  cartCount++;

  const cartCounter = document.getElementById("cartCount");

  if (cartCounter) {
    cartCounter.textContent = cartCount;
  }

  const isPersian =
    document.documentElement.lang === "fa";

  showNotification(
    isPersian
      ? "محصول به سبد خرید اضافه شد 🍰"
      : "Product added to cart 🍰"
  );
}


function showCart() {
  const isPersian =
    document.documentElement.lang === "fa";

  if (cartCount === 0) {
    showNotification(
      isPersian
        ? "سبد خرید شما خالی است."
        : "Your cart is empty."
    );

    return;
  }

  showNotification(
    isPersian
      ? `تعداد محصولات سبد خرید: ${cartCount}`
      : `Items in your cart: ${cartCount}`
  );
}


// ----------------------------------------
// Notification
// ----------------------------------------

function showNotification(message) {
  const oldNotification =
    document.querySelector(".site-notification");

  if (oldNotification) {
    oldNotification.remove();
  }

  const notification =
    document.createElement("div");

  notification.className = "site-notification";

  notification.textContent = message;

  document.body.appendChild(notification);

  requestAnimationFrame(() => {
    notification.classList.add("show");
  });

  setTimeout(() => {
    notification.classList.remove("show");

    setTimeout(() => {
      notification.remove();
    }, 300);

  }, 2500);
}


// ----------------------------------------
// Header Scroll Effect
// ----------------------------------------

const header =
  document.getElementById("header");

function updateHeader() {
  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener(
  "scroll",
  updateHeader
);

updateHeader();


// ----------------------------------------
// Smooth Anchor Navigation
// ----------------------------------------

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener("click", function (event) {

      const targetId =
        this.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


// ----------------------------------------
// Mobile Menu Preparation
// ----------------------------------------

const navLinks =
  document.querySelector(".nav-links");

if (navLinks) {

  navLinks
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          navLinks.classList.remove(
            "mobile-open"
          );

        }
      );

    });

}


// ----------------------------------------
// Initial Language
// ----------------------------------------

const savedLanguage =
  localStorage.getItem(
    "sweet-house-language"
  ) || "en";

setLanguage(savedLanguage);
