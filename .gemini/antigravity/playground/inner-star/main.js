// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for sticky header
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation (Intersection Observer)
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

// Add reveal classes to elements
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = [
        ...document.querySelectorAll('.mission-card'),
        ...document.querySelectorAll('.product-card'),
        ...document.querySelectorAll('.tech-list li'),
        ...document.querySelectorAll('.section-header')
    ];

    revealElements.forEach((el, index) => {
        // Add a delay based on index for grid items
        el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

        // Define the behavior via inline style change or CSS class
        // Here we'll just use a class and let CSS handle the transition
        el.classList.add('reveal-item');
        revealObserver.observe(el);
    });
});

// Implementation of reveal-item logic in CSS via JS (injecting style)
const style = document.createElement('style');
style.textContent = `
    .reveal-item.active {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
