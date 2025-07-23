// =============================
// Lucide Icon Initialization
// =============================
lucide.createIcons();

// =============================
// Portfolio Application Class
// =============================
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupAnimations();
        this.setupContactForm();
        this.setupProjectModals();
        this.setupParticleBackground();
        this.setupTypingAnimation();
        this.setupCounters();
    }

    // Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            });
        });

        window.addEventListener('scroll', () => {
            let current = 'hero';
            const scrollPos = window.scrollY + document.querySelector('header').offsetHeight + 50;

            sections.forEach(section => {
                if (scrollPos >= section.offsetTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Mobile Menu
    setupMobileMenu() {
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navOverlay = document.getElementById('nav-overlay');
        const icon = mobileToggle.querySelector('i');

        function openMenu() {
            navMenu.classList.add('active');
            navOverlay.classList.add('active');
            if (icon) icon.setAttribute('data-lucide', 'x');
            if (window.lucide) lucide.createIcons();
            document.body.style.overflow = 'hidden';
        }
        function closeMenu() {
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            if (icon) icon.setAttribute('data-lucide', 'menu');
            if (window.lucide) lucide.createIcons();
            document.body.style.overflow = '';
        }

        mobileToggle.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        navOverlay.addEventListener('click', closeMenu);
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        document.addEventListener('keydown', (e) => {
            if (navMenu.classList.contains('active') && e.key === 'Escape') closeMenu();
        });
    }

    // Scroll-triggered Animations
    setupAnimations() {
        // Add .section-transition to all main sections
        document.querySelectorAll('main section').forEach(section => {
            section.classList.add('section-transition');
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('main section').forEach(el => {
            observer.observe(el);
        });

        // Existing animation triggers for other elements
        document.querySelectorAll('.skill-category, .project-card, .contact-item, .contact-form, .stats, .about-text').forEach(el => {
            observer.observe(el);
        });
    }

    // Typing Animation
    setupTypingAnimation() {
        const texts = [
            "Machine Learning",
            "Natural Language Processing",
            "Document Intelligence",
            "Full-Stack Development",
            "Semantic Search"
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const rotatingText = document.getElementById('rotating-text');
        const typingSpeed = 120;
        const deletingSpeed = 60;
        const pauseTime = 1800;

        function typeText() {
            const currentText = texts[textIndex];
            let displayText = '';

            if (isDeleting) {
                displayText = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                displayText = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            rotatingText.innerHTML = `${displayText}<span style="color: var(--text-highlight); font-weight: 300;">|</span>`;

            let speed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentText.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                speed = typingSpeed;
            }

            setTimeout(typeText, speed);
        }
        if (rotatingText) typeText();
    }

    // Counter Animation
    setupCounters() {
        const counters = document.querySelectorAll('[data-count]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    let current = 0;
                    const duration = 2000;
                    const stepTime = 20;
                    const increment = target / (duration / stepTime);

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            setTimeout(updateCounter, stepTime);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.8 });

        counters.forEach(counter => observer.observe(counter));
    }

    // Particle Background
    setupParticleBackground() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = 0, height = 0;
        let particles = [];
        const particleCount = 40;
        const colors = ['#A67C52', '#e0b97a', '#F2EFEA', '#fff7e6'];
        const maxRadius = 7;
        const minRadius = 3;
        let mouse = { x: null, y: null, radius: 90 };

        function resizeCanvas() {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
        }

        function randomBetween(a, b) {
            return Math.random() * (b - a) + a;
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: randomBetween(0, width),
                    y: randomBetween(0, height),
                    vx: randomBetween(-0.7, 0.7),
                    vy: randomBetween(-0.7, 0.7),
                    radius: randomBetween(minRadius, maxRadius),
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: randomBetween(0.5, 1)
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, width, height);
            for (let p of particles) {
                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 16;
                ctx.fill();
                ctx.restore();
            }
        }

        function updateParticles() {
            for (let p of particles) {
                // Move
                p.x += p.vx;
                p.y += p.vy;
                // Bounce off edges
                if (p.x < p.radius || p.x > width - p.radius) p.vx *= -1;
                if (p.y < p.radius || p.y > height - p.radius) p.vy *= -1;
                // Mouse interaction
                let dx = p.x - mouse.x;
                let dy = p.y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius + p.radius) {
                    // Push particle away from mouse
                    let angle = Math.atan2(dy, dx);
                    let push = (mouse.radius + p.radius - dist) * 0.15;
                    p.x += Math.cos(angle) * push;
                    p.y += Math.sin(angle) * push;
                }
            }
        }

        function animate() {
            updateParticles();
            drawParticles();
            requestAnimationFrame(animate);
        }

        function onMouseMove(e) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = (e.clientX - rect.left) * (width / rect.width);
            mouse.y = (e.clientY - rect.top) * (height / rect.height);
        }
        function onMouseLeave() {
            mouse.x = null;
            mouse.y = null;
        }

        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseleave', onMouseLeave);

        // Initial setup
        resizeCanvas();
        createParticles();
        animate();
    }

    // Contact Form
    setupContactForm() {
        const form = document.getElementById('contact-form');
        const submitBtn = document.getElementById('submit-btn');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div class="loading"></div> Sending...';
            submitBtn.disabled = true;

            // Initialize EmailJS (only needs to be done once, but safe here)
            if (typeof emailjs !== 'undefined') {
                emailjs.init("FD5_wWf1t23f2xKYy");
            }

            const serviceID = "service_ibrmjbl";
            const templateID = "template_0ucp7lt";
            const params = {
                sendername: document.querySelector("#name").value,
                senderemail: document.querySelector("#email").value,
                message: document.querySelector("#message").value
            };

            emailjs.send(serviceID, templateID, params)
                .then(res => {
                    this.showToast('Thank you, ' + params['sendername'] + '! Your message has been sent.', 'success');
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    lucide.createIcons(); // Re-create icons inside button
                    submitBtn.disabled = false;
                })
                .catch(err => {
                    this.showToast('Failed to send message. Please try again later.', 'error');
                    submitBtn.innerHTML = originalText;
                    lucide.createIcons();
                    submitBtn.disabled = false;
                });
        });
    }

    // Project Modals
    setupProjectModals() {
        const projectCards = document.querySelectorAll('.project-card');
        const modal = document.getElementById('project-modal');
        const modalBody = document.getElementById('modal-body');
        const modalClose = document.getElementById('modal-close');

        const projectData = {
            'oasis-ai-orc': {
                title: 'Oasis-AI-ORC',
                description: 'Oasis AI is a fully offline desktop application that allows users to ask questions about any PDF document — whether typed or handwritten — and receive intelligent, context-aware answers powered by local LLMs (e.g., LLaMA via Ollama) and sentence-transformer embeddings.',
                features: [
                    'AI Q&A from PDFs',
                    'Semantic Search',
                    'Image-aware context',
                    'Offline (no internet required)',
                    'OCR for scanned/handwritten docs',
                    'Streamlit UI in desktop app'
                ],
                tech: [
                    'Streamlit',
                    'PyWebView',
                    'FAISS',
                    'Sentence-Transformers',
                    'Tesseract OCR',
                    'Ollama (local LLaMA models)'
                ],
                challenges: [
                    'Accurate OCR for handwritten/low-quality PDFs',
                    'Efficient offline semantic search',
                    'Integrating LLMs with desktop UI',
                    'Extracting relevant images from PDFs'
                ],
                demo: 'https://github.com/shiva0500/Oasis-AI-ORC'
            },
            'gemini-ats': {
                title: 'Personal-Resume-Scanner-using-Google-Gemini-API',
                description: 'Personal-Resume-Scanner-using-Google-Gemini-API is an AI web application designed to evaluate resumes against job descriptions using advanced AI technology. Built with React.js for the frontend and Flask for the backend, this tool integrates with Google’s Gemini API to provide insightful analysis on how well a resume matches a given job description.',
                features: [
                    'Job Description Input',
                    'Resume Upload',
                    'Resume Analysis',
                    'Evaluation',
                    'Percentage Match'
                ],
                tech: [
                    'Frontend: React.js, Tailwind CSS',
                    'Backend: Flask (Python)',
                    'AI Integration: Google Gemini API',
                    'PDF Processing: pdf2image for PDF to image conversion',
                    'Environment Management: Python-dotenv for managing API keys'
                ],
                challenges: [
                    'Parsing diverse resume formats',
                    'Matching keywords contextually',
                    'Ensuring accurate percentage match',
                    'Seamless integration of AI API with frontend'
                ],
                demo: 'https://atsgapi.netlify.app'
            },
            'mern-blog': {
                title: 'MERN-Blog (LazyBlogs)',
                description: 'A full-stack blogging platform built with the MERN stack, featuring user authentication, real-time comments, and a responsive design.',
                features: ['User registration and authentication', 'Create, read, update, delete posts', 'Real-time commenting system', 'Responsive design', 'Image upload functionality'],
                tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Multer'],
                challenges: 'Implementing secure authentication and managing state across the application.',
                demo: 'https://lazyblogs.netlify.app'
            },
            'ecommerce': {
                title: 'Ecommerce (Plantosho)',
                description: 'An e-commerce platform specializing in plant-based products, featuring a complete shopping experience from Browse to checkout.',
                features: ['Product catalog with search and filtering', 'Shopping cart functionality', 'User account management', 'Order tracking', 'Payment integration'],
                tech: ['React.js', 'Express.js', 'MongoDB', 'Stripe API', 'Redux'],
                challenges: 'Integrating secure payment processing and managing complex state for the shopping cart.',
                demo: 'https://plantosho.netlify.app'
            }
        };

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project');
                const project = projectData[projectId];
                if (project) {
                    modalBody.innerHTML = `
                        <h2 style="font-family: var(--font-headings); color: var(--text-highlight); margin-bottom: 20px; font-size: 2rem;">${project.title}</h2>
                        <p style="margin-bottom: 25px; line-height: 1.8;">${project.description}</p>

                        <h3 style="font-family: var(--font-headings); margin-bottom: 15px; font-size: 1.4rem;">Key Features</h3>
                        <ul style="margin-bottom: 25px; list-style-position: inside; padding-left: 10px;">
                            ${project.features.map(feature => `<li style="margin-bottom: 8px;">${feature}</li>`).join('')}
                        </ul>

                        <h3 style="font-family: var(--font-headings); margin-bottom: 15px; font-size: 1.4rem;">Technologies Used</h3>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 25px;">
                            ${project.tech.map(tech => `<span class="tech-tag" style="background: var(--bg-accent); color: var(--text-deep); border: 1px solid var(--border-color);">${tech}</span>`).join('')}
                        </div>

                        <h3 style="font-family: var(--font-headings); margin-bottom: 15px; font-size: 1.4rem;">Challenges & Solutions</h3>
                        <p style="margin-bottom: 30px; line-height: 1.8;">${project.challenges}</p>

                        <div style="display: flex; gap: 15px;">
                            <a href="${project.demo}" class="btn btn-primary" target="_blank" rel="noopener"><i data-lucide="external-link"></i> View Live Demo</a>
                            <a href="#" class="btn btn-outline"><i data-lucide="github"></i> View Code</a>
                        </div>
                    `;
                    lucide.createIcons();
                    modal.classList.add('active');
                }
            });
        });

        const closeModal = () => modal.classList.remove('active');
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // Toast Notifications
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--text-highlight)' : '#c0392b'};
            color: white;
            padding: 16px 22px;
            border-radius: 8px;
            z-index: 2001;
            font-weight: 700;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }
}

// =============================
// Resume Download Button Handler
// =============================
const resumeBtn = document.querySelector('.btn.btn-outline');
if (resumeBtn) {
    resumeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = 'assets/Shiva_Doddi_Resume.pdf';
        link.download = 'Shiva_Doddi_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// =============================
// Initialize the Portfolio App
// =============================
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// =============================
// Modal Accessibility: Focus Trap
// =============================
(function() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    let lastFocusedElement = null;

    function getFocusableElements() {
        return modal.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
    }

    function trapFocus(e) {
        if (!modal.classList.contains('active')) return;
        const focusable = getFocusableElements();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    }

    function openModalAccessibility() {
        lastFocusedElement = document.activeElement;
        setTimeout(() => {
            const focusable = getFocusableElements();
            if (focusable.length) focusable[0].focus();
        }, 50);
        document.addEventListener('keydown', trapFocus);
    }

    function closeModalAccessibility() {
        document.removeEventListener('keydown', trapFocus);
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    // Hook into modal open/close
    const observer = new MutationObserver(() => {
        if (modal.classList.contains('active')) {
            openModalAccessibility();
        } else {
            closeModalAccessibility();
        }
    });
    observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
})();

// =============================
// Enhanced Contact Form Validation
// =============================
(function() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');

    function validateEmail(email) {
        // Simple email regex
        return /^\S+@\S+\.\S+$/.test(email);
    }

    function showError(input, message) {
        let error = input.parentElement.querySelector('.form-error');
        if (!error) {
            error = document.createElement('div');
            error.className = 'form-error';
            error.style.color = '#c0392b';
            error.style.fontSize = '0.95em';
            error.style.marginTop = '6px';
            input.parentElement.appendChild(error);
        }
        error.textContent = message;
    }
    function clearError(input) {
        const error = input.parentElement.querySelector('.form-error');
        if (error) error.remove();
    }

    form.addEventListener('submit', function(e) {
        let valid = true;
        clearError(nameInput);
        clearError(emailInput);
        clearError(messageInput);

        if (!nameInput.value.trim()) {
            showError(nameInput, 'Name is required.');
            valid = false;
        }
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required.');
            valid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            valid = false;
        }
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Message is required.');
            valid = false;
        }

        if (!valid) {
            e.preventDefault();
            if (typeof PortfolioApp !== 'undefined') {
                PortfolioApp.prototype.showToast('Please fix the errors in the form.', 'error');
            } else if (window.app && typeof window.app.showToast === 'function') {
                window.app.showToast('Please fix the errors in the form.', 'error');
            }
            return false;
        }
        // If valid, let the existing handler show the success toast
    });

    // Remove error on input
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => clearError(input));
    });
})();

// =============================
// Enhanced Toast Notifications
// =============================
(function() {
    // Override or extend PortfolioApp.prototype.showToast
    const iconMap = {
        success: '<svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#A67C52"/><path d="M8 12.5l2.5 2.5 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        error: '<svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#c0392b"/><path d="M15 9l-6 6M9 9l6 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
        info: '<svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#4F4A45"/><path d="M12 8v4m0 4h.01" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>'
    };
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.style.cssText = `
            display: flex; align-items: center; gap: 12px;
            position: fixed;
            bottom: 20px;
            right: 20px;
            min-width: 220px;
            background: ${type === 'success' ? 'var(--text-highlight)' : type === 'error' ? '#c0392b' : 'var(--text-deep)'};
            color: white;
            padding: 16px 22px;
            border-radius: 8px;
            z-index: 2001;
            font-weight: 700;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            font-size: 1rem;
            margin-top: 10px;
        `;
        toast.innerHTML = `${iconMap[type] || ''}<span>${message}</span>`;
        // Stack toasts
        const containerId = 'toast-container';
        let container = document.getElementById(containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = containerId;
            container.style.position = 'fixed';
            container.style.bottom = '20px';
            container.style.right = '20px';
            container.style.zIndex = '2001';
            container.style.display = 'flex';
            container.style.flexDirection = 'column-reverse';
            container.style.gap = '10px';
            document.body.appendChild(container);
        }
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        }, 10);
        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }
    if (typeof PortfolioApp !== 'undefined') {
        PortfolioApp.prototype.showToast = showToast;
    } else {
        window.showToast = showToast;
    }
})();

// =============================
// Dark/Light Mode Toggle
// =============================
(function() {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = toggleBtn ? toggleBtn.querySelector('i') : null;
    const THEME_KEY = 'theme-mode';

    function setTheme(mode) {
        if (mode === 'dark') {
            body.classList.add('dark-mode');
            toggleBtn.classList.remove('theme-toggle-light');
            toggleBtn.classList.add('theme-toggle-dark');
            if (icon) icon.setAttribute('data-lucide', 'sun');
        } else {
            body.classList.remove('dark-mode');
            toggleBtn.classList.remove('theme-toggle-dark');
            toggleBtn.classList.add('theme-toggle-light');
            if (icon) icon.setAttribute('data-lucide', 'moon');
        }
        if (window.lucide) lucide.createIcons();
    }

    function getPreferredTheme() {
        return localStorage.getItem(THEME_KEY) || 'light';
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const isDark = body.classList.contains('dark-mode');
            const newMode = isDark ? 'light' : 'dark';
            setTheme(newMode);
            localStorage.setItem(THEME_KEY, newMode);
        });
    }

    // On load
    setTheme(getPreferredTheme());
})();

// =============================
// Project Gallery Filtering
// =============================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hide');
                } else {
                    // Check if any .tech-tag in this card matches the filter
                    const tags = Array.from(card.querySelectorAll('.tech-tag')).map(t => t.textContent.trim());
                    if (tags.includes(filter)) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                }
            });
        });
    });

    // Lottie Download Icon
    function loadLottieDownload() {
        if (window.lottie && document.getElementById('lottie-download')) {
            window.lottie.loadAnimation({
                container: document.getElementById('lottie-download'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'https://assets10.lottiefiles.com/packages/lf20_4kx2q32n.json' // Sample download animation
            });
        }
    }
    if (window.lottie) {
        loadLottieDownload();
    } else {
        window.addEventListener('lottieLoaded', loadLottieDownload);
    }
});

// =============================
// Custom Cursor
// =============================
(function() {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const trail = document.createElement('div');
    trail.className = 'custom-cursor-trail';
    document.body.appendChild(trail);
    document.body.appendChild(cursor);

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let trailX = mouseX, trailY = mouseY;

    function animate() {
        // Smoothly move the trail
        trailX += (mouseX - trailX) * 0.18;
        trailY += (mouseY - trailY) * 0.18;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Interactive elements
    const interactiveSelectors = 'a, button, .btn, .project-card, input, textarea, [role="button"]';
    document.body.addEventListener('mouseover', e => {
        if (e.target.closest(interactiveSelectors)) {
            cursor.classList.add('active');
            trail.classList.add('active');
        }
    });
    document.body.addEventListener('mouseout', e => {
        if (e.target.closest(interactiveSelectors)) {
            cursor.classList.remove('active');
            trail.classList.remove('active');
        }
    });
})();

// =============================
// Preloader Hide on Load
// =============================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hide');
        setTimeout(() => preloader.remove(), 900);
    }
});

// =============================
// Footer Animation
// =============================
document.addEventListener('DOMContentLoaded', function() {
  const footer = document.querySelector('footer');
  if (footer) {
    footer.style.opacity = 0;
    footer.style.transform = 'translateY(40px)';
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footer.style.transition = 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)';
          footer.style.opacity = 1;
          footer.style.transform = 'translateY(0)';
          observer.unobserve(footer);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(footer);
  }
  // Animate social icons on hover (for non-FontAwesome fallback)
  document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'scale(1.13) translateY(-3px)';
      link.style.boxShadow = '0 6px 18px rgba(166,124,82,0.13)';
    });
    link.addEventListener('mouseleave', () => {
      link.style.transform = '';
      link.style.boxShadow = '';
    });
  });
});