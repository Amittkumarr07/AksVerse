document.addEventListener("DOMContentLoaded", () => {
    
    // --- Typing Effect Logic ---
    const words = ["developer.", "designer.", "video editor."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseDelay = 2000;
    
    // Cache the DOM element once for better performance
    const targetElement = document.getElementById('changing-txt');

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            targetElement.innerHTML = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            targetElement.innerHTML = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = pauseDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 500; 
        }

        setTimeout(typeEffect, speed);
    }

    // Start typing effect
    if (targetElement) {
        typeEffect();
    }


    // --- Show More Courses Logic ---
    const toggleCoursesBtn = document.getElementById('toggle-courses');
    const extraCourses = document.getElementById('extra-courses');

    if (toggleCoursesBtn && extraCourses) {
        toggleCoursesBtn.addEventListener('click', () => {
            const isOpen = extraCourses.classList.toggle('open');
            toggleCoursesBtn.setAttribute('aria-expanded', isOpen);
            toggleCoursesBtn.innerHTML = isOpen
                ? 'Show less <i class="fa-solid fa-chevron-up" aria-hidden="true"></i>'
                : 'Show all certificates <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>';
        });
    }

    // --- Theme Switcher Logic ---
    const toggleButton = document.getElementById('theme-toggle');

    // Apply saved theme immediately
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Handle button click
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
            
            if (isLightMode) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});

//View contact card annimation
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");

    const observerOptions = {
    root: null,         
    rootMargin: "0px", 
    threshold: 0.15     
  };

    const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active"); 
        observer.unobserve(entry.target);     
      }
    });
  };
  
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  revealElements.forEach(element => {
    observer.observe(element);
  });
});
