// ============================================
// PREMIUM PORTFOLIO - INTERACTIVE FEATURES
// ============================================

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        navMenu.classList.remove('active');
    });
});

// ===== THEME TOGGLE (LIGHT/DARK MODE) =====
if (themeToggle) {
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light-mode';
    if (currentTheme === 'dark-mode') {
        document.body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        localStorage.setItem('theme', theme);
    });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== TYPING EFFECT =====
const typingContent = document.querySelector('.typing-content');
if (typingContent) {
    const words = [
        'Full Stack Developer',
        'Creative Coder',
        'Data sciencetist',
        'Computer Engineering Student'
    ];
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
        const currentWord = words[currentWordIndex];
        
        if (!isDeleting && currentCharIndex < currentWord.length) {
            currentCharIndex++;
            typingContent.textContent = currentWord.substring(0, currentCharIndex);
            setTimeout(typeEffect, 80);
        } else if (isDeleting && currentCharIndex > 0) {
            currentCharIndex--;
            typingContent.textContent = currentWord.substring(0, currentCharIndex);
            setTimeout(typeEffect, 40);
        } else if (!isDeleting && currentCharIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;
            setTimeout(typeEffect, 500);
        }
    };

    typeEffect();
}

// ===== 3D TILT EFFECT ON NEON CARDS =====
const neonCards = document.querySelectorAll('.neon-glass-card');

neonCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (e.clientY - rect.top - centerY) / 10;
        const rotateY = -(e.clientX - rect.left - centerX) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
    });
});

// ===== RIPPLE EFFECT ON CARD CLICK =====
document.querySelectorAll('.neon-glass-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = this.querySelector('.ripple');
        if (ripple) {
            ripple.style.animation = 'none';
            setTimeout(() => {
                ripple.style.animation = 'ripple-animation 0.6s ease-out';
            }, 10);
        }
    });
});

// ===== PARALLAX EFFECT ON HERO BACKGROUND =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.skill-category, .project-card, .achievement-card, .education-card, .experience-card').forEach(element => {
    observer.observe(element);
});

// ===== SCROLL REVEAL ANIMATIONS =====
const reveals = document.querySelectorAll('.about-text, .section-header');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    reveals.forEach(element => {
        const revealTop = element.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            element.classList.add('reveal', 'active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ===== SCROLL-TO-TOP BUTTON =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 999;
    font-size: 20px;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 0 30px rgba(102, 126, 234, 0.4);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.alignItems = 'center';
        scrollTopBtn.style.justifyContent = 'center';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseover', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseout', () => {
    scrollTopBtn.style.transform = 'scale(1)';
});

// ===== HOVER EFFECTS ON SKILL ITEMS =====
document.querySelectorAll('.skill-list li').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transform = 'translateX(10px)';
    });

    item.addEventListener('mouseout', () => {
        item.style.transform = 'translateX(0)';
    });
});

// ===== ANIMATED COUNTER FOR STATS (if needed) =====
const countElements = document.querySelectorAll('[data-count]');

const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    let current = 0;
    const increment = target / 30;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 50);
};

// ===== FORM SUBMISSION HANDLING =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        // Show success message
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';
        
        // Reset after 2 seconds
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 2000);
    });
}

// ===== STAGGER ANIMATION FOR CARDS =====
function staggerCards(selector) {
    const cards = document.querySelectorAll(selector);
    cards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.8s ease ${0.1 * index}s backwards`;
    });
}

// Apply stagger animations
staggerCards('.neon-glass-card');
staggerCards('.skill-category');
staggerCards('.project-card');
staggerCards('.achievement-card');

// ===== RANDOM PARTICLE GENERATION =====
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: linear-gradient(135deg, #667eea, #f093fb);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Only create particles if container exists
if (document.querySelector('.particles')) {
    createParticles();
}

// ===== PAGE LOAD EVENT =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('🎨 Premium Portfolio Loaded Successfully! 🚀');
});

// ===== UTILITY: Add smooth transition class to all elements =====
document.querySelectorAll('a, button, input, select, textarea').forEach(element => {
    element.style.transition = 'all 0.3s ease';
});
