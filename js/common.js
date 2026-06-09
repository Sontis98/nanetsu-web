document.addEventListener("DOMContentLoaded", function () {
  // Load Header and Footer components
  Promise.all([loadHeader(), loadFooter()]).then(() => {
    highlightActivePage();
    initContactModal();
    initScrollNavbar();
  });

  // Init scroll reveal animations
  initScrollReveal();

  // Init hamburger menu
  initHamburgerMenu();
});

function loadHeader() {
  const placeholder = document.getElementById("header-placeholder");
  if (!placeholder) return Promise.resolve();

  return fetch("header.html")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load header.html");
      return response.text();
    })
    .then((html) => {
      placeholder.outerHTML = html;
    })
    .catch((err) => console.error("Error loading header:", err));
}

function loadFooter() {
  const placeholder = document.getElementById("footer-placeholder");
  if (!placeholder) return Promise.resolve();

  return fetch("footer.html")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load footer.html");
      return response.text();
    })
    .then((html) => {
      placeholder.outerHTML = html;
      initContactFormAJAX();
    })
    .catch((err) => console.error("Error loading footer:", err));
}

function highlightActivePage() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";
  const links = document.querySelectorAll("nav .nav-links a");
  
  links.forEach((link) => {
    const href = link.getAttribute("href");
    const isTechSubpage = (page === "mc.html" || page === "nc.html" || page === "do.html") && href === "tech.html";
    if (href === page || isTechSubpage || (page === "index.html" && href === "#")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}


function initScrollNavbar() {
  const nav = document.querySelector("nav");
  if (!nav) return;

  function updateNavPadding() {
    const isMobile = window.innerWidth <= 1024;
    if (window.scrollY > 50) {
      nav.style.padding = isMobile ? "10px 20px" : "12px 48px";
      nav.style.boxShadow = "0 4px 20px rgba(13,27,42,.06)";
    } else {
      nav.style.padding = isMobile ? "16px 24px" : "18px 48px";
      nav.style.boxShadow = "none";
    }
  }

  window.addEventListener("scroll", updateNavPadding, { passive: true });
  window.addEventListener("resize", updateNavPadding, { passive: true });
}

function initContactModal() {
  const modal = document.getElementById("contactModal");
  if (!modal) return;

  const openBtns = document.querySelectorAll(".open-contact-modal");
  const closeBtn = document.getElementById("modalCloseBtn");
  const successCloseBtn = document.getElementById("modalSuccessCloseBtn");
  const contactForm = document.getElementById("contactForm");
  const formContainer = document.getElementById("contactFormContainer");
  const successContainer = document.getElementById("contactSuccessContainer");

  function openModal(e) {
    if (e) e.preventDefault();
    if (contactForm) contactForm.reset();
    if (formContainer) formContainer.style.display = "block";
    if (successContainer) successContainer.style.display = "none";
    
    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "送信する →";
    }

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  openBtns.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (successCloseBtn) successCloseBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });
}

function initContactFormAJAX() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  const formContainer = document.getElementById("contactFormContainer");
  const successContainer = document.getElementById("contactSuccessContainer");
  const submitBtn = document.getElementById("submitBtn");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = "送信中...";

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch(contactForm.action, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let res = await response.json();
        if (response.status === 200) {
          formContainer.style.display = "none";
          successContainer.style.display = "flex";
        } else {
          throw new Error(res.message || "送信中にエラーが発生しました。");
        }
      })
      .catch((error) => {
        alert(error.message || "送信中にエラーが発生しました。時間をおいて再度お試しください。");
        submitBtn.disabled = false;
        submitBtn.innerHTML = "送信する →";
      });
  });
}

function initHamburgerMenu() {
  const btn = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("mobileNav");
  if (!btn || !nav) return;

  btn.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");
    btn.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
    btn.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  });

  // Close on link click (navigation)
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      btn.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  // Close on ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      btn.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.1 }
  );

  const vh = window.innerHeight;
  document.querySelectorAll("section, .stats, .stat, .service, .tech-item, .gallery-item, .feat, .flow-step").forEach((el) => {
    if (el.getBoundingClientRect().top >= vh) {
      el.classList.add("reveal");
      observer.observe(el);
    }
  });
}
