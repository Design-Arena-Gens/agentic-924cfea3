// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Form submission handler
function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
        font-weight: 600;
    `;
    successMessage.textContent = 'Thank you! We will contact you shortly.';

    form.appendChild(successMessage);
    form.reset();

    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active state to navigation links
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

// Add counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Trigger counter animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach((stat, index) => {
                const text = stat.textContent;
                const number = parseFloat(text.replace(/[^0-9.]/g, ''));
                if (!isNaN(number)) {
                    stat.textContent = '0';
                    setTimeout(() => {
                        animateCounter(stat, number, 2000);
                        // Add back the suffix if it exists
                        if (text.includes('+')) {
                            setTimeout(() => {
                                stat.textContent = stat.textContent + '+';
                            }, 2000);
                        } else if (text.includes('%')) {
                            setTimeout(() => {
                                stat.textContent = stat.textContent + '%';
                            }, 2000);
                        } else if (text.includes('Year')) {
                            setTimeout(() => {
                                stat.textContent = number + ' Year';
                            }, 2000);
                        }
                    }, index * 200);
                }
            });
            heroObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const hero = document.querySelector('.hero');
if (hero) {
    heroObserver.observe(hero);
}
