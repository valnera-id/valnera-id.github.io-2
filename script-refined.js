document.getElementById("year").textContent = new Date().getFullYear();

const nav = document.getElementById("topNav");
const toggle = document.getElementById("menuToggle");
const mobilePanel = document.getElementById("mobilePanel");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (toggle && nav) {
  const closeMenu = () => {
    nav.classList.remove("open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    document.body.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  if (mobilePanel) {
    mobilePanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMenu();
    }
  });
}

const heroSlider = document.getElementById("heroSlider");

if (heroSlider) {
  const heroSlides = Array.from(heroSlider.querySelectorAll(".hero-slide"));
  const heroDots = Array.from(heroSlider.querySelectorAll(".hero-dot"));
  const heroButtons = Array.from(heroSlider.querySelectorAll("[data-hero-step]"));
  let heroCurrentSlide = 0;
  let heroSlideInterval = null;

  const showHeroSlide = (index) => {
    heroSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === index);
    });

    heroDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
    });

    heroCurrentSlide = index;
  };

  const moveHeroSlide = (step) => {
    const nextIndex = (heroCurrentSlide + step + heroSlides.length) % heroSlides.length;
    showHeroSlide(nextIndex);
  };

  const stopHeroAutoSlide = () => {
    if (heroSlideInterval) {
      window.clearInterval(heroSlideInterval);
      heroSlideInterval = null;
    }
  };

  const startHeroAutoSlide = () => {
    if (reduceMotion || heroSlides.length <= 1) {
      return;
    }

    stopHeroAutoSlide();
    heroSlideInterval = window.setInterval(() => {
      moveHeroSlide(1);
    }, 4000);
  };

  heroButtons.forEach((button) => {
    button.addEventListener("click", () => {
      moveHeroSlide(Number(button.dataset.heroStep));
      startHeroAutoSlide();
    });
  });

  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showHeroSlide(index);
      startHeroAutoSlide();
    });
  });

  heroSlider.addEventListener("mouseenter", stopHeroAutoSlide);
  heroSlider.addEventListener("mouseleave", startHeroAutoSlide);
  showHeroSlide(0);
  startHeroAutoSlide();
}

const heroMetrics = document.querySelector(".hero-metrics");

if (heroMetrics) {
  const metricNumbers = Array.from(heroMetrics.querySelectorAll(".metric strong[data-count]"));

  const setMetricValue = (metric, value) => {
    const numberNode = metric.querySelector(".metric-number");
    const suffixNode = metric.querySelector(".metric-suffix");

    if (numberNode) {
      numberNode.textContent = String(value);
    }

    if (suffixNode) {
      suffixNode.textContent = metric.dataset.suffix || "";
    }
  };

  const animateMetric = (metric) => {
    const target = Number(metric.dataset.count || 0);
    const duration = target >= 1000 ? 1350 : 1100;
    const startTime = performance.now();

    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);

      setMetricValue(metric, value);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setMetricValue(metric, target);
      }
    };

    window.requestAnimationFrame(step);
  };

  const runMetricAnimation = () => {
    metricNumbers.forEach((metric) => animateMetric(metric));
  };

  metricNumbers.forEach((metric) => setMetricValue(metric, reduceMotion ? Number(metric.dataset.count || 0) : 0));

  if (!reduceMotion && "IntersectionObserver" in window) {
    const metricObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        runMetricAnimation();
        observer.disconnect();
      });
    }, {
      threshold: 0.35
    });

    metricObserver.observe(heroMetrics);
  } else if (!reduceMotion) {
    runMetricAnimation();
  }
}

if (window.lucide) {
  window.lucide.createIcons();
}

const testimonialTrack = document.getElementById("testimonialTrack");
const testimonialPrev = document.getElementById("testimonialPrev");
const testimonialNext = document.getElementById("testimonialNext");

if (testimonialTrack) {
  const testimonialCards = Array.from(testimonialTrack.children);
  let testimonialIndex = 0;
  let testimonialAutoSlide = null;

  const getVisibleTestimonialCount = () => {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1080) return 2;
    return 3;
  };

  const updateTestimonialSlider = () => {
    const visibleCount = getVisibleTestimonialCount();
    const maxIndex = Math.max(0, testimonialCards.length - visibleCount);
    testimonialIndex = Math.min(testimonialIndex, maxIndex);

    const cardWidth = testimonialCards[0].getBoundingClientRect().width;
    const gap = 20;
    const offset = testimonialIndex * (cardWidth + gap);
    testimonialTrack.style.transform = `translateX(-${offset}px)`;
  };

  const nextTestimonial = () => {
    const visibleCount = getVisibleTestimonialCount();
    const maxIndex = Math.max(0, testimonialCards.length - visibleCount);
    testimonialIndex = testimonialIndex >= maxIndex ? 0 : testimonialIndex + 1;
    updateTestimonialSlider();
  };

  const prevTestimonialSlide = () => {
    const visibleCount = getVisibleTestimonialCount();
    const maxIndex = Math.max(0, testimonialCards.length - visibleCount);
    testimonialIndex = testimonialIndex <= 0 ? maxIndex : testimonialIndex - 1;
    updateTestimonialSlider();
  };

  const startTestimonialAutoSlide = () => {
    if (reduceMotion || testimonialCards.length <= getVisibleTestimonialCount()) {
      return;
    }

    window.clearInterval(testimonialAutoSlide);
    testimonialAutoSlide = window.setInterval(nextTestimonial, 3500);
  };

  if (testimonialNext) {
    testimonialNext.addEventListener("click", () => {
      nextTestimonial();
      startTestimonialAutoSlide();
    });
  }

  if (testimonialPrev) {
    testimonialPrev.addEventListener("click", () => {
      prevTestimonialSlide();
      startTestimonialAutoSlide();
    });
  }

  window.addEventListener("resize", updateTestimonialSlider);
  updateTestimonialSlider();
  startTestimonialAutoSlide();
}

const showcase = document.getElementById("aboutShowcase");

if (showcase) {
  const shots = Array.from(showcase.querySelectorAll(".about-shot"));
  const states = ["about-shot-left", "about-shot-center", "about-shot-right", "about-shot-hidden"];
  let activeIndex = 1;

  const applyShowcaseState = () => {
    shots.forEach((shot, index) => {
      shot.classList.remove(...states);

      const offset = (index - activeIndex + shots.length) % shots.length;
      const nextState = ["about-shot-center", "about-shot-right", "about-shot-hidden", "about-shot-left"][offset] || "about-shot-hidden";
      shot.classList.add(nextState);
    });
  };

  applyShowcaseState();

  if (!reduceMotion) {
    window.setInterval(() => {
      activeIndex = (activeIndex + 1) % shots.length;
      applyShowcaseState();
    }, 3600);
  }
}
