// Animation system for BloomFi website
class BloomFiAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.setupAnimations();
      });
    } else {
      this.setupAnimations();
    }
  }

  // Call all specific setup methods
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

  // Button animations with fill effects
  setupButtonAnimations() {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
      // Add ripple effect
      button.addEventListener("click", (e) => {
        this.createRipple(e, button);
      });

      // Add magnetic effect for main buttons
      if (
        button.classList.contains("btn-primary") ||
        button.classList.contains("btn-secondary")
      ) {
        this.addMagneticEffect(button);
      }

      // Add shine effect
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

  // Enhanced scroll-based animations
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

    // Observe all major sections and cards
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
      // Add different animation types based on element type
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

    // Add parallax scrolling for background elements
    this.setupParallaxScrolling();

    // Add scroll-triggered counter animations
    this.setupCounterAnimations();

    // Add scroll-based text reveals
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

  // Enhanced parallax scrolling
  setupParallaxScrolling() {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;

      // Hero visual parallax
      const heroVisual = document.querySelector(".hero-visual");
      if (heroVisual) {
        heroVisual.style.transform = `translateY(${rate}px)`;
      }

      // Card image placeholders parallax
      const imagePlaceholders = document.querySelectorAll(
        ".card-image-placeholder"
      );
      imagePlaceholders.forEach((placeholder, index) => {
        const rate = scrolled * (0.1 + index * 0.05);
        placeholder.style.transform = `translateY(${rate}px)`;
      });

      // Business visual parallax
      const businessVisual = document.querySelector(".business-visual");
      if (businessVisual) {
        const rate = scrolled * -0.15;
        businessVisual.style.transform = `translateY(${rate}px) scale(1.1)`;
      }

      // Logo links floating effect on scroll
      const logoLinks = document.querySelectorAll(".logo-link");
      logoLinks.forEach((link, index) => {
        const rate = scrolled * (0.05 + index * 0.02);
        link.style.transform = `translateY(${
          Math.sin(scrolled * 0.01 + index) * 5
        }px)`;
      });
    });
  }

  // Counter animations triggered by scroll
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

  // Text reveal animations
  setupTextRevealAnimations() {
    const textElements = document.querySelectorAll("h1, h2, h3, p, .subtitle");
    
    textElements.forEach((element, index) => {
      const text = element.textContent;
      const textLength = text.length;
      
      // Apply different animations based on text length
      if (textLength <= 30) {
        // Short texts (headings) - use typewriter effect
        element.textContent = "";
        element.setAttribute("data-text", text);
        
        setTimeout(() => {
          this.typewriterEffect(element, text, index * 100);
        }, 10);
      } else {
        // Long texts (paragraphs) - use quick fade-in
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "all 0.4s ease-out";
        
        setTimeout(() => {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }, 200 + index * 50);
      }
    });
  }

  typewriterEffect(element, text, delay) {
    element.style.opacity = "1";
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 20 + delay * 0.1); // Faster typing speed with minimal delay impact
  }

  // Page entry animations
  setupEntryAnimations() {
    // Animate header first
    const header = document.querySelector(".header");
    header.style.transform = "translateY(-100%)";
    header.style.transition = "transform 0.8s ease-out";

    setTimeout(() => {
      header.style.transform = "translateY(0)";
    }, 100);

    // Animate hero section
    const hero = document.querySelector(".hero");
    hero.style.opacity = "0";
    hero.style.transform = "translateY(50px)";
    hero.style.transition = "all 1s ease-out";

    setTimeout(() => {
      hero.style.opacity = "1";
      hero.style.transform = "translateY(0)";
    }, 300);

    // Animate logo with bounce effect
    const logo = document.querySelector(".logo");
    logo.style.transform = "scale(0)";
    logo.style.transition = "transform 0.5s ease-out";

    setTimeout(() => {
      logo.style.transform = "scale(1)";
    }, 500);
  }

  // Enhanced hover effects
  setupHoverEffects() {
    // Logo hover effect
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

    // Card hover effects
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

    // Logo links animation
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

  // Parallax and floating effects
  setupParallaxEffects() {
    // Floating animation for hero icon
    const heroIcon = document.querySelector(".hero-icon");
    if (heroIcon) {
      heroIcon.style.animation = "float 3s ease-in-out infinite";
    }

    // Parallax scrolling for background elements
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;

      const heroVisual = document.querySelector(".hero-visual");
      if (heroVisual) {
        heroVisual.style.transform = `translateY(${parallax}px)`;
      }
    });

    // Animated gradient background
    this.createAnimatedGradient();
  }

  // Specific animations for backers section
  setupBackersAnimations() {
    const backersSection = document.querySelector(".backers");
    const logoLinks = document.querySelectorAll(".logo-link");

    if (backersSection) {
      // Staggered animation for logo links
      logoLinks.forEach((link, index) => {
        link.style.opacity = "0";
        link.style.transform = "translateY(20px) scale(0.8)";
        link.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

        setTimeout(() => {
          link.style.opacity = "0.7";
          link.style.transform = "translateY(0) scale(1)";
        }, 800 + index * 150);
      });

      // Hover effects for logo links
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

  // Specific animations for feature cards
  setupFeatureCardsAnimations() {
    const featureCards = document.querySelectorAll(".feature-cards .card");

    featureCards.forEach((card, index) => {
      // Enhanced card animations
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-12px) scale(1.03) rotateX(5deg)";
        card.style.boxShadow = "0 25px 50px rgba(0,0,0,0.2)";

        // Special effect for visual card
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

      // Click animation
      card.addEventListener("click", () => {
        card.style.animation = "cardClick 0.3s ease-out";
        setTimeout(() => {
          card.style.animation = "";
        }, 300);
      });
    });
  }

  // Specific animations for business card
  setupBusinessCardAnimations() {
    const businessCard = document.querySelector(".card-business");
    const businessVisual = document.querySelector(".business-visual");

    if (businessCard) {
      // Enhanced business card interactions
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

      // Learn more link animation
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

  // Call all specific setup methods
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
    const speed = 0.2; // <-- Чем меньше это число, тем медленнее анимация

    function animate() {
      // Умножаем направление на скорость
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

// Initialize animations
new BloomFiAnimations();

// Add CSS for animations
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

    /* Stagger animations for feature cards */
    .feature-cards .card:nth-child(1) { animation-delay: 0.1s; }
    .feature-cards .card:nth-child(2) { animation-delay: 0.2s; }
    .feature-cards .card:nth-child(3) { animation-delay: 0.3s; }

    /* Logo links hover effect */
    .logo-link:hover {
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }

    /* Pulse effect for primary buttons */
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
