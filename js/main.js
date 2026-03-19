(function() {
    'use strict';

    // ===== Mobile Nav Toggle =====
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close nav when a link is clicked
    if (navLinks) {
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }

    // ===== Navbar Scroll Effect =====
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 14, 19, 0.98)';
        } else {
            navbar.style.backgroundColor = '';
        }
    });

    // ===== Active Nav Link =====
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navItems = document.querySelectorAll('.nav-links a');

        navItems.forEach(item => {
            const href = item.getAttribute('href');
            const itemPage = href.split('/').pop();

            if (itemPage === currentPage || (currentPage === '' && href === 'index.html')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    setActiveNavLink();

    // ===== Scroll-Triggered Animations =====
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');

        // Set initial state
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.animation = 'none';
        });

        // IntersectionObserver for scroll-triggered animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    // Check if element is in view on load (for hash anchors)
    function checkElementsInViewOnLoad() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        const viewportHeight = window.innerHeight;

        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < viewportHeight && rect.bottom > 0) {
                el.style.opacity = '1';
                el.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }

    // Add CSS animation if not already present
    function injectAnimationStyles() {
        const styleId = 'tpl-animations';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
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
            `;
            document.head.appendChild(style);
        }
    }

    injectAnimationStyles();
    initScrollAnimations();
    checkElementsInViewOnLoad();

    // ===== Contact Form Handling =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            // Show "Sending..." state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate form submission (placeholder for real backend)
            setTimeout(function() {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                // In production, you would handle the actual form submission here
                // For now, just reset the form
                contactForm.reset();
                alert('Thank you for your message! We will get back to you soon.');
            }, 1500);
        });
    }

})();
