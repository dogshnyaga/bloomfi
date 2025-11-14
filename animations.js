document.addEventListener("DOMContentLoaded", () => {
  function setupScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");

    const animationObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    elementsToAnimate.forEach((el) => {
      animationObserver.observe(el);
    });
  }

  function setupHorizontalScroll() {
    const pinSection = document.querySelector(".what-is-bloom");
    const horizontalScrollEl = document.querySelector(".feature-cards");

    if (!pinSection || !horizontalScrollEl) {
      console.warn("Не найдены элементы для горизонтальной прокрутки.");
      return;
    }
    const scrollableWidth =
      horizontalScrollEl.scrollWidth - window.innerWidth + 1200;

    if (scrollableWidth <= 0) return;

    pinSection.style.height = `calc(100vh + ${scrollableWidth}px)`;

    window.addEventListener("scroll", () => {
      const rect = pinSection.getBoundingClientRect();

      if (rect.top <= 0) {
        const translateX = Math.max(0, Math.min(scrollableWidth, -rect.top));

        horizontalScrollEl.style.transform = `translateX(-${translateX}px)`;
      } else {
        horizontalScrollEl.style.transform = "translateX(0px)";
      }
    });
  }

  setupScrollAnimations();
  setupHorizontalScroll();
});

class BloomFiAnimations {
  constructor() {
    this.init();
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.setupAnimations();
      });
    } else {
      this.setupAnimations();
    }
  }

  setupAnimations() {
    this.setupButtonAnimations();
    this.setupScrollAnimations();
    this.setupEntryAnimations();
    this.setupHoverEffects();
    this.setupParallaxEffects();
    this.setupBackersAnimations();
    this.setupFeatureCardsAnimations();
    this.setupBusinessCardAnimations();
  }

  setupButtonAnimations() {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.createRipple(e, button);
      });

      if (
        button.classList.contains("btn-primary") ||
        button.classList.contains("btn-secondary")
      ) {
        this.addMagneticEffect(button);
      }

      this.addShineEffect(button);
    });
  }

  createRipple(event, button) {
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;

    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  addMagneticEffect(button) {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0)";
    });
  }

  addShineEffect(button) {
    button.addEventListener("mouseenter", () => {
      const shine = button.querySelector(".shine") || this.createShineElement();
      shine.style.animation = "shine 0.5s ease-in-out";
    });
  }

  createShineElement() {
    const shine = document.createElement("div");
    shine.className = "shine";
    shine.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            pointer-events: none;
        `;
    return shine;
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(`
            .hero,
            .what-is-bloom,
            .backers,
            .use-cases,
            .feature-cards .card,
            .use-case-card,
            .logo-link,
            h1, h2, h3, p,
            .btn,
            .card-image-placeholder,
            .business-visual,
            .logo
        `);

    elementsToAnimate.forEach((el) => {
      el.classList.add("animate-on-scroll");

      if (el.tagName === "H1") el.classList.add("slide-in-left");
      else if (el.tagName === "H2") el.classList.add("slide-in-right");
      else if (el.tagName === "H3") el.classList.add("scale-in");
      else if (el.tagName === "P") el.classList.add("fade-in-up");
      else if (el.classList.contains("btn")) el.classList.add("bounce-in");
      else if (el.classList.contains("logo-link"))
        el.classList.add("slide-in-left");
      else if (el.classList.contains("card")) el.classList.add("scale-in");
      else el.classList.add("fade-in-up");

      observer.observe(el);
    });

    this.setupParallaxScrolling();

    this.setupCounterAnimations();

    this.setupTextRevealAnimations();
  }

  animateElement(element) {
    const delay =
      Array.from(element.parentNode.children).indexOf(element) * 100;

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.6s ease-out";

    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, delay);
  }

  setupParallaxScrolling() {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;

      const heroVisual = document.querySelector(".hero-visual");
      if (heroVisual) {
        heroVisual.style.transform = `translateY(${rate}px)`;
      }

      const imagePlaceholders = document.querySelectorAll(
        ".card-image-placeholder"
      );
      imagePlaceholders.forEach((placeholder, index) => {
        const rate = scrolled * (0.1 + index * 0.05);
        placeholder.style.transform = `translateY(${rate}px)`;
      });

      const logoLinks = document.querySelectorAll(".logo-link");
      logoLinks.forEach((link, index) => {
        const rate = scrolled * (0.05 + index * 0.02);
        link.style.transform = `translateY(${
          Math.sin(scrolled * 0.01 + index) * 5
        }px)`;
      });
    });
  }

  setupCounterAnimations() {
    const counters = document.querySelectorAll("[data-count]");

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute("data-count"));
            this.animateCounter(counter, target);
            counterObserver.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  animateCounter(element, target) {
    let count = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      count += increment;
      element.textContent = Math.floor(count);

      if (count >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 20);
  }

  setupTextRevealAnimations() {
    const textElements = document.querySelectorAll("h1, h2, h3, p, .subtitle");

    const textObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const originalText = element.dataset.typewriterText;

            if (originalText) {
              this.typewriterEffect(element, originalText);
            } else {
              element.style.opacity = "1";
              element.style.transform = "translateY(0)";
            }

            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    textElements.forEach((element) => {
      const text = element.textContent.trim();
      if (text.length === 0) return;

      if (text.length <= 30) {
        element.dataset.typewriterText = text;
        element.textContent = "";
      } else {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "all 0.6s ease-out";
      }

      textObserver.observe(element);
    });
  }

  typewriterEffect(element, text) {
    element.style.opacity = "1";
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
  }

  setupEntryAnimations() {
    const header = document.querySelector(".header");
    header.style.transform = "translateY(-100%)";
    header.style.transition = "transform 0.8s ease-out";

    setTimeout(() => {
      header.style.transform = "translateY(0)";
    }, 100);

    const hero = document.querySelector(".hero");
    hero.style.opacity = "0";
    hero.style.transform = "translateY(50px)";
    hero.style.transition = "all 1s ease-out";

    setTimeout(() => {
      hero.style.opacity = "1";
      hero.style.transform = "translateY(0)";
    }, 300);

    const logo = document.querySelector(".logo");
    logo.style.transform = "scale(0)";
    logo.style.transition = "transform 0.5s ease-out";

    setTimeout(() => {
      logo.style.transform = "scale(1)";
    }, 500);
  }

  setupHoverEffects() {
    const logo = document.querySelector(".logo");
    if (logo) {
      logo.addEventListener("mouseenter", () => {
        const icon = logo.querySelector(".logo-icon");
        icon.style.transform = "rotate(180deg) scale(1.2)";
        icon.style.transition = "all 0.3s ease";
      });

      logo.addEventListener("mouseleave", () => {
        const icon = logo.querySelector(".logo-icon");
        icon.style.transform = "rotate(0deg) scale(1)";
      });
    }

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.02)";
        card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
        card.style.transition = "all 0.3s ease";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
        card.style.boxShadow = "none";
      });
    });

    const logoLinks = document.querySelectorAll(".logo-link");
    logoLinks.forEach((link, index) => {
      link.style.opacity = "0";
      link.style.transform = "translateY(20px)";
      link.style.transition = "all 0.3s ease";

      setTimeout(() => {
        link.style.opacity = "0.7";
        link.style.transform = "translateY(0)";
      }, 1000 + index * 100);
    });
  }

  setupParallaxEffects() {
    const heroIcon = document.querySelector(".hero-icon");
    if (heroIcon) {
      heroIcon.style.animation = "float 3s ease-in-out infinite";
    }

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;

      const heroVisual = document.querySelector(".hero-visual");
      if (heroVisual) {
        heroVisual.style.transform = `translateY(${parallax}px)`;
      }
    });

    this.createAnimatedGradient();
  }

  setupBackersAnimations() {
    const backersSection = document.querySelector(".backers");
    const logoLinks = document.querySelectorAll(".logo-link");

    if (backersSection) {
      logoLinks.forEach((link, index) => {
        link.style.opacity = "0";
        link.style.transform = "translateY(20px) scale(0.8)";
        link.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

        setTimeout(() => {
          link.style.opacity = "0.7";
          link.style.transform = "translateY(0) scale(1)";
        }, 800 + index * 150);
      });

      logoLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          link.style.opacity = "1";
          link.style.transform = "translateY(-3px) scale(1.05)";
          link.style.filter = "brightness(1.1)";
        });

        link.addEventListener("mouseleave", () => {
          link.style.opacity = "0.7";
          link.style.transform = "translateY(0) scale(1)";
          link.style.filter = "brightness(1)";
        });
      });
    }
  }

  setupFeatureCardsAnimations() {
    const featureCards = document.querySelectorAll(".feature-cards .card");

    featureCards.forEach((card, index) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-12px) scale(1.03) rotateX(5deg)";
        card.style.boxShadow = "0 25px 50px rgba(0,0,0,0.2)";

        if (card.classList.contains("card-visual")) {
          card.style.background =
            "radial-gradient(circle at 90% 50%, #e8eaf6 30%, #d1c4e9 100%)";
          const imagePlaceholder = card.querySelector(
            ".card-image-placeholder"
          );
          if (imagePlaceholder) {
            imagePlaceholder.style.transform = "scale(1.1) rotate(5deg)";
          }
        }
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1) rotateX(0deg)";
        card.style.boxShadow = "none";

        if (card.classList.contains("card-visual")) {
          card.style.background =
            "radial-gradient(circle at 90% 50%, #dde0f3 30%, #c8cdea 100%)";
          const imagePlaceholder = card.querySelector(
            ".card-image-placeholder"
          );
          if (imagePlaceholder) {
            imagePlaceholder.style.transform = "scale(1) rotate(0deg)";
          }
        }
      });

      card.addEventListener("click", () => {
        card.style.animation = "cardClick 0.3s ease-out";
        setTimeout(() => {
          card.style.animation = "";
        }, 300);
      });
    });
  }

  setupBusinessCardAnimations() {
    const businessCard = document.querySelector(".card-business");
    const businessVisual = document.querySelector(".business-visual");

    if (businessCard) {
      businessCard.addEventListener("mouseenter", () => {
        businessCard.style.transform = "translateY(-8px) scale(1.02)";
        businessCard.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";

        if (businessVisual) {
          businessVisual.style.transform = "scale(1.05) translateY(-10px)";
          businessVisual.style.filter =
            "brightness(1.1) drop-shadow(0 10px 20px rgba(138, 43, 226, 0.3))";
        }
      });

      businessCard.addEventListener("mouseleave", () => {
        businessCard.style.transform = "translateY(0) scale(1)";
        businessCard.style.boxShadow = "none";

        if (businessVisual) {
          businessVisual.style.transform = "scale(1) translateY(0)";
          businessVisual.style.filter =
            "brightness(1) drop-shadow(0 0 0 rgba(0,0,0,0))";
        }
      });

      const learnMore = businessCard.querySelector(".learn-more");
      if (learnMore) {
        learnMore.addEventListener("mouseenter", () => {
          learnMore.style.transform = "translateX(10px)";
          learnMore.style.color = "var(--color-accent-purple)";
        });

        learnMore.addEventListener("mouseleave", () => {
          learnMore.style.transform = "translateX(0)";
          learnMore.style.color = "var(--color-dark-text)";
        });
      }
    }
  }

  setupAnimations() {
    this.setupButtonAnimations();
    this.setupScrollAnimations();
    this.setupEntryAnimations();
    this.setupHoverEffects();
    this.setupParallaxEffects();
    this.setupBackersAnimations();
    this.setupFeatureCardsAnimations();
    this.setupBusinessCardAnimations();
  }

  createAnimatedGradient() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    let hue = 200;
    let direction = 1;
    const speed = 0.2;

    function animate() {
      hue += direction * speed;

      if (hue >= 320) direction = -1;
      if (hue <= 200) direction = 1;

      hero.style.background = `radial-gradient(circle at 50% 0%,
      hsla(0, 0%, 100%, 1.00),
      hsl(${hue}, 75%, 88%))`;

      requestAnimationFrame(animate);
    }

    animate();
  }
}

new BloomFiAnimations();

const animationStyles = document.createElement("style");
animationStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    @keyframes shine {
        0% { left: -100%; }
        100% { left: 100%; }
    }

    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.5);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .animate-on-scroll {
        animation-duration: 0.6s;
        animation-fill-mode: both;
    }

    .hero-icon {
        display: inline-block;
    }

    .btn {
        position: relative;
        overflow: hidden;
    }

    .logo {
        cursor: pointer;
    }

    .card {
        transition: all 0.3s ease;
    }

   
    .feature-cards .card:nth-child(1) { animation-delay: 0.1s; }
    .feature-cards .card:nth-child(2) { animation-delay: 0.2s; }
    .feature-cards .card:nth-child(3) { animation-delay: 0.3s; }

   
    .logo-link:hover {
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }

   
    .btn-primary::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
    }

    .btn-primary:active::after {
        width: 300px;
        height: 300px;
    }
`;
document.head.appendChild(animationStyles);
