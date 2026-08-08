 
"use strict";        
const ul = document.querySelector('.nav-links');         
        // ===== THEME TOGGLE =====
        const themeToggle = document.querySelector('.theme-toggle');
        const html = document.documentElement;

        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 'dark-mode';
        html.classList.add(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
            const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';

            html.classList.remove(currentTheme);
            html.classList.add(newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // ===== SCROLL PROGRESS BAR =====
        const scrollProgress = document.querySelector('.scroll-progress');
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });

        // ===== NAVBAR SCROLL EFFECT =====
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // ===== SMOOTH SCROLL & ACTIVE NAV LINK =====
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                ul.classList.remove("show-nav");
                const targetId = link.getAttribute('href');

                setTimeout(() => {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: "smooth" })
                    }
                }, 100);
            // ===== STYLE ACTIVE LINK =====

                navLinks.forEach(l => { l.style.color = ""; });
                link.style.color = "var(--accent)";
               
            });
        });
             
        // ===== CTA BUTTON SCROLLS TO CONTACT =====
        document.querySelector('.cta-button').addEventListener('click', () => {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });

        // ===== PRIMARY BUTTON SCROLLS TO PROJECTS =====
        document.querySelector('.btn-primary').addEventListener('click', () => {
            document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
        });

        // ===== MOBILE MENU =====
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                ul.classList.toggle('show-nav');
            });
};
//==== CLOSE NAV ON CLICK OF OUTSIDE UL
document.addEventListener("click", (e) => {
    const navOpen = ul.classList.contains("show-nav");
    const clickedToggle = mobileMenuToggle.contains(e.target);
    const clickedUl = ul.contains(e.target);
 
    if (navOpen && !clickedToggle && !clickedUl) {
        ul.classList.remove("show-nav");
    }
});
// ===== Show SCROLL TO TOP BUTTON =====
const scrollBtn = document.getElementById("scrollBtn");

document.addEventListener("scroll", () => {
    const scrollHeight = window.scrollY;
    if (scrollHeight > 1000) {
        scrollBtn.classList.add("showScroll");
    } else {
        scrollBtn.classList.remove("showScroll");
    };
});

//===== SCROLL TO TOP =====
scrollBtn.addEventListener("click", () => {
    const body = document.documentElement;
    body.scrollIntoView({top: 0, behavior: "smooth"})
})

        // ===== INTERSECTION OBSERVER FOR SECTIONS =====
        const sectionObserverOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, sectionObserverOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            sectionObserver.observe(section);
        });

        // ===== INTERSECTION OBSERVER FOR FADE-IN ELEMENTS =====
        const elementObserverOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, elementObserverOptions);

        // Observe only fade-in elements and fades elements that are NOT sections
        document.querySelectorAll('.fade-in').forEach(el => {
            elementObserver.observe(el);
        });

        document.querySelectorAll('.fades:not(section)').forEach(el => {
            elementObserver.observe(el);
        });

        // ===== PREFER REDUCED MOTION =====
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            document.documentElement.style.scrollBehavior = 'auto';
}
        
    // ===== ACCESSIBILITY - KEYBOARD NAVIGATION =====
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                ul.classList.remove('show-nav');
            }
        });
