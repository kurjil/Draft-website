/* ============================================
   ANATKYA INVESTMENT - Main JavaScript
   ============================================ */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Update active nav link based on current page
    updateActiveNavLink();
    initPartnerCarousel();
});

// Partner carousel controls and autoplay
function initPartnerCarousel() {
    const carousel = document.querySelector('.partner-carousel');
    const prev = document.querySelector('.carousel-prev');
    const next = document.querySelector('.carousel-next');

    if (!carousel || !prev || !next) return;

    const scrollAmount = carousel.clientWidth * 0.8;
    let autoScroll;

    const clearAuto = () => {
        if (autoScroll) {
            window.clearInterval(autoScroll);
            autoScroll = null;
        }
    };

    const startAuto = () => {
        clearAuto();
        autoScroll = window.setInterval(() => {
            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 4200);
    };

    prev.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        startAuto();
    });

    next.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        startAuto();
    });

    carousel.addEventListener('mouseenter', clearAuto);
    carousel.addEventListener('mouseleave', startAuto);

    startAuto();
}

// Update active navigation link
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navigation bar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// Lazy load images (basic implementation)
function lazyLoadImages() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    setTimeout(() => {
                        img.style.opacity = '1';
                        img.style.transition = 'opacity 0.3s ease';
                    }, 50);
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => {
            img.style.opacity = '1';
        });
    }
}

lazyLoadImages();

// Animation on scroll (for elements entering viewport)
function animateOnScroll() {
    const elements = document.querySelectorAll('.point-card, .product-card, .value-card, .material-item, .service-card, .journey-card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

animateOnScroll();

// Utility function to track page views (optional analytics)
function trackPageView() {
    const pageName = window.location.pathname.split('/').pop() || 'index.html';
    console.log('Page view: ' + pageName);
    // You can send this data to your analytics service
}

trackPageView();

// Form validation (if you add forms later)
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form validation logic here
            console.log('Form submitted');
        });
    }
}

// Add active class to hamburger menu animation
const style = document.createElement('style');
style.textContent = `
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(10px, 10px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }

    .nav-menu.active {
        display: flex;
    }
`;
document.head.appendChild(style);

// Prevent layout shift when scrollbar appears/disappears
function preventLayoutShift() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflowY = 'scroll';
}

preventLayoutShift();

// Export functions for potential external use
window.AnimationUtils = {
    trackPageView,
    validateForm
};