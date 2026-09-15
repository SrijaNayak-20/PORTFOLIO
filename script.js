 // Apple iPhone Startup Multilingual Sequence
  const greetingsList = [
    { text: "Hello", subtext: "English" },
    { text: "Hola", subtext: "Español" },
    { text: "नमस्ते", subtext: "Hindi" },
    { text: "নমস্কার", subtext: "Bengali" }
  ];

  let splashIndex = 0;
  let isSplashDismissed = false;

  function dismissSplashScreen() {
    if (isSplashDismissed) return;
    isSplashDismissed = true;
    const splash = document.getElementById('splash-screen');
    if (!splash) return;
    
    // Add smooth exit transition
    splash.style.opacity = '0';
    splash.style.transform = 'scale(1.05)';
    splash.classList.add('pointer-events-none');
    document.body.style.overflow = '';

    setTimeout(() => {
      splash.style.display = 'none';
    }, 700);
  }

  function startMultilingualSplash() {
    const splash = document.getElementById('splash-screen');
    const greetingEl = document.getElementById('splash-greeting');
    const subtextEl = document.getElementById('splash-subtext');
    if (!splash || !greetingEl) return;

    // Ensure body scroll is locked
    document.body.style.overflow = 'hidden';

    // 4 words, each 800ms -> Total 3200ms
    const wordDuration = 800;

    function showWord(index) {
      if (isSplashDismissed) return;
      const item = greetingsList[index];
      
      // Animate in
      greetingEl.style.opacity = '0';
      greetingEl.style.transform = 'translateY(8px) scale(0.98)';
      greetingEl.style.filter = 'blur(6px)';
      if (subtextEl) subtextEl.style.opacity = '0';

      setTimeout(() => {
        if (isSplashDismissed) return;
        greetingEl.textContent = item.text;
        if (subtextEl) subtextEl.textContent = item.subtext;
        greetingEl.style.opacity = '1';
        greetingEl.style.transform = 'translateY(0px) scale(1)';
        greetingEl.style.filter = 'blur(0px)';
        if (subtextEl) subtextEl.style.opacity = '1';
      }, 120);

      // Pre-fade out slightly near end of slot
      setTimeout(() => {
        if (isSplashDismissed) return;
        if (index < greetingsList.length - 1) {
          greetingEl.style.opacity = '0.3';
          greetingEl.style.transform = 'translateY(-6px) scale(1.01)';
          greetingEl.style.filter = 'blur(4px)';
          if (subtextEl) subtextEl.style.opacity = '0';
        }
      }, wordDuration - 140);
    }

    // Step 0 immediately: Hello
    showWord(0);

    // Step 1 at 800ms: Hola
    setTimeout(() => showWord(1), 800);

    // Step 2 at 1600ms: नमस्ते
    setTimeout(() => showWord(2), 1600);

    // Step 3 at 2400ms: নমস্কার
    setTimeout(() => showWord(3), 2400);

    // Dissolve splash at 3.2s
    setTimeout(() => {
      dismissSplashScreen();
    }, 3200);
  }

  // Auto initialize on script evaluation and DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startMultilingualSplash);
  } else {
    startMultilingualSplash();
  }

  // Absolute fallback safety: never block after 4 seconds
  setTimeout(() => {
    dismissSplashScreen();
  }, 4000);

  // Dynamic Rotating Typewriter Engine
  (function initTypewriter() {
    const words = ["web developer", "web designer", "student"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 110;
    const deletingSpeed = 50;
    const pauseDelay = 1800;

    const targetEl = document.getElementById("typewriter-text");
    if (!targetEl) return;

    function typeLoop() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        targetEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        targetEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentWord.length) {
        speed = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
      }

      setTimeout(typeLoop, speed);
    }

    typeLoop();
  })();

  // Modal Controls for "Explore My Work"
  function openProjectModal() {
    const modal = document.getElementById('project-modal');
    const container = document.getElementById('modal-container');
    if (!modal) return;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
    if (container) {
      container.classList.remove('scale-95');
      container.classList.add('scale-100');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    const container = document.getElementById('modal-container');
    if (!modal) return;
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    if (container) {
      container.classList.add('scale-95');
      container.classList.remove('scale-100');
    }
    document.body.style.overflow = '';
  }

  function handleBackdropClick(event) {
    if (event.target.id === 'project-modal') {
      closeProjectModal();
    }
  }

  function handleNotifyMe(button) {
    const textSpan = document.getElementById('notify-btn-text');
    if (textSpan) {
      textSpan.textContent = 'Subscribed!';
      button.classList.add('bg-[#00f0ff]', 'text-[#050914]');
      setTimeout(() => {
        closeProjectModal();
        setTimeout(() => {
          textSpan.textContent = 'Notify Me On Launch';
        }, 500);
      }, 1000);
    }
  }

  // Escape key listener for modal and splash screen
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dismissSplashScreen();
      closeProjectModal();
    }
  });

  // Dynamic Navigation Active State & Scroll Spy
  const activeNavClasses = ['bg-primary-container/20', 'text-primary-container', 'border', 'border-primary-container/40', 'font-semibold', 'shadow-[0_0_14px_rgba(0,240,255,0.3)]'];
  const inactiveNavClasses = ['text-body-sm', 'text-on-surface-variant', 'hover:text-primary-container', 'hover:bg-surface-container-high'];

  function setActiveNavItem(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.removeAttribute('aria-current');
      activeNavClasses.forEach(cls => link.classList.remove(cls));
      inactiveNavClasses.forEach(cls => link.classList.add(cls));
    });

    if (activeLink) {
      activeLink.setAttribute('aria-current', 'page');
      inactiveNavClasses.forEach(cls => activeLink.classList.remove(cls));
      activeNavClasses.forEach(cls => activeLink.classList.add(cls));
    }
  }

  // Setup click listeners and smooth scrolling
  document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      setActiveNavItem(this);

      if (targetId && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Scroll Spy with IntersectionObserver
  const sections = ['home', 'about', 'education', 'contact'].map(id => document.getElementById(id)).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const activeNav = document.querySelector(`.nav-link[data-path="${id}"]`);
          if (activeNav) {
            setActiveNavItem(activeNav);
          }
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }