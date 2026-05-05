function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function handleSubmit() {
  const message = document.getElementById("success-msg");

  if (message) {
    message.textContent = "Message sent successfully. Thank you!";
  }

  setTimeout(() => {
    const form = document.querySelector(".contact-form-box form");

    if (form) {
      form.reset();
    }
  }, 700);

  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  const sections = document.querySelectorAll("section[id]");
  const navButtons = document.querySelectorAll("header nav button");
  const revealItems = document.querySelectorAll(
    "section, .project-card, .skill-card, .cert-item, .dash-card, .timeline-item"
  );
  const counters = document.querySelectorAll(".count[data-target]");
  const progressBars = document.querySelectorAll(".progress div");
  const images = document.querySelectorAll("img");

  revealItems.forEach((item) => item.classList.add("reveal"));

  images.forEach((image) => {
    const markMissing = () => {
      const holder = image.closest(".main-screen, .mobile-screen, .logo, .project-media");

      if (holder) {
        holder.classList.add("image-missing");
        image.style.display = "none";
      }
    };

    image.addEventListener("error", markMissing);

    if (image.complete && image.naturalWidth === 0) {
      markMissing();
    }
  });

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  };

  const closeMenu = () => {
    if (!header || !menuToggle) return;

    header.classList.remove("nav-open");
    document.body.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  };

  if (menuToggle && header && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");

      document.body.classList.toggle("nav-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navButtons.forEach((button) => {
      button.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  const setActiveNav = () => {
    let currentId = "home";

    sections.forEach((section) => {
      const top = section.offsetTop - 140;

      if (window.scrollY >= top) {
        currentId = section.id;
      }
    });

    navButtons.forEach((button) => {
      const target = button.getAttribute("onclick") || "";
      button.classList.toggle("active", target.includes("'" + currentId + "'"));
    });
  };

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target) || 0;
    const duration = 1200;
    const startTime = performance.now();

    const update = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      counter.textContent = Math.round(target * eased);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const dashboardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        counters.forEach(animateCounter);
        progressBars.forEach((bar) => {
          bar.style.width = bar.dataset.width || "80%";
        });

        dashboardObserver.disconnect();
      });
    },
    {
      threshold: 0.25
    }
  );

  const dashboard = document.getElementById("dashboard");

  if (dashboard) {
    progressBars.forEach((bar) => {
      const inlineWidth = bar.getAttribute("style")?.match(/width:\s*([^;]+)/)?.[1] || "80%";
      bar.dataset.width = inlineWidth;
      bar.removeAttribute("style");
    });

    dashboardObserver.observe(dashboard);
  }

  const heroVisual = document.querySelector(".hero-right");

  if (heroVisual && window.matchMedia("(pointer: fine)").matches) {
    heroVisual.addEventListener("mousemove", (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      heroVisual.style.transform = "translate3d(" + x * 10 + "px, " + y * 10 + "px, 0)";
    });

    heroVisual.addEventListener("mouseleave", () => {
      heroVisual.style.transform = "translate3d(0, 0, 0)";
    });
  }

  window.addEventListener("scroll", () => {
    setHeaderState();
    setActiveNav();
  });

  setHeaderState();
  setActiveNav();
});
