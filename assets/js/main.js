// Enhanced and Unified Mobile Menu functionality for all pages
// This replaces all previous mobile menu implementations

// Ensure DOM is fully loaded before initializing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    initializeWebsite();
}

function initializeWebsite() {
    console.log('🚀 Initializing Nhiên Việt Go website...');
    
    // Initialize all components
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeScrollToTop();
    initializeAnimations();
    initializeContactForms();
    initializeImageGallery();
    initializePerformanceOptimizations();
    initializeToastSystem();
    initializeEmailForms();
    showSwipeInstructions();
    
    console.log('✅ Website initialization complete!');
}

// Enhanced Mobile Menu Class - Works on ALL pages
function initializeMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuBtn || !navMenu) {
        console.warn('Mobile menu elements not found on this page');
        return;
    }
    
    console.log('📱 Initializing mobile menu...');
    
    const mobileMenu = new UnifiedMobileMenu(menuBtn, navMenu);
    
    // Make it globally accessible for debugging
    window.mobileMenuInstance = mobileMenu;
    
    console.log('✅ Mobile menu initialized successfully');
}

class UnifiedMobileMenu {
    constructor(menuBtn, navMenu) {
        this.menuBtn = menuBtn;
        this.navMenu = navMenu;
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        // Remove any existing event listeners by cloning elements
        this.setupEventListeners();
        this.setupAccessibility();
        
        console.log('🔧 Mobile menu event listeners attached');
    }
    
    setupEventListeners() {
        // Mobile menu button click
        this.menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('📱 Menu button clicked');
            this.toggle();
        });

        // Close menu when clicking nav links
        const navLinks = this.navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('🔗 Nav link clicked, closing menu');
                this.close();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && 
                !this.menuBtn.contains(e.target) && 
                !this.navMenu.contains(e.target)) {
                console.log('🔍 Clicked outside, closing menu');
                this.close();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                console.log('⌨️ Escape pressed, closing menu');
                this.close();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                console.log('📏 Window resized, closing menu');
                this.close();
            }
        });
    }
    
    setupAccessibility() {
        // Add ARIA attributes
        this.menuBtn.setAttribute('aria-label', 'Mở menu điều hướng');
        this.menuBtn.setAttribute('aria-expanded', 'false');
        this.menuBtn.setAttribute('aria-controls', 'nav-menu');
        
        this.navMenu.setAttribute('id', 'nav-menu');
        this.navMenu.setAttribute('aria-hidden', 'true');
    }

    toggle() {
        console.log(`🔄 Toggling menu. Current state: ${this.isMenuOpen ? 'open' : 'closed'}`);
        if (this.isMenuOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        console.log('📂 Opening mobile menu');
        this.navMenu.classList.add('active');
        this.menuBtn.classList.add('active');
        this.isMenuOpen = true;
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
        
        // Animate menu items
        const menuItems = this.navMenu.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            item.style.animation = `slideInRight 0.3s ease ${index * 0.1}s both`;
        });

        // Update ARIA attributes for accessibility
        this.menuBtn.setAttribute('aria-expanded', 'true');
        this.navMenu.setAttribute('aria-hidden', 'false');
        
        console.log('✅ Mobile menu opened');
    }

    close() {
        console.log('📁 Closing mobile menu');
        this.navMenu.classList.remove('active');
        this.menuBtn.classList.remove('active');
        this.isMenuOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Clear animations
        const menuItems = this.navMenu.querySelectorAll('li');
        menuItems.forEach(item => {
            item.style.animation = '';
        });

        // Update ARIA attributes for accessibility
        this.menuBtn.setAttribute('aria-expanded', 'false');
        this.navMenu.setAttribute('aria-hidden', 'true');
        
        console.log('✅ Mobile menu closed');
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
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
}

// Scroll to top button
function initializeScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        const scrollToTop = () => {
            const currentPosition = window.pageYOffset;
            if (currentPosition > 0) {
                const scrollStep = Math.max(currentPosition / 22, 1);
                window.scrollTo(0, currentPosition - scrollStep);
                requestAnimationFrame(scrollToTop);
            }
        };
        scrollToTop();
    });
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.about-card, .service-card, .value-card, .contact-item, .benefit-card, .job-card, .testimonial-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Form validation and submission
function initializeContactForms() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = this.querySelector('input[name="name"]')?.value.trim();
            const email = this.querySelector('input[name="email"]')?.value.trim();
            const message = this.querySelector('textarea[name="message"]')?.value.trim();
            
            if (!name || !email || !message) {
                alert('Vui lòng điền đầy đủ thông tin!');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Vui lòng nhập email hợp lệ!');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Đang gửi...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Header background change on scroll
function initializeHeaderEffects() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.style.background = 'rgba(45, 90, 39, 0.95)';
        } else {
            header.style.background = 'linear-gradient(135deg, var(--primary-green), var(--secondary-green))';
        }
    });
}

// Service cards hover effect
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Enhanced Image Gallery with Mobile-Optimized Fullscreen
function initializeImageGallery() {
    // Create fullscreen overlay if it doesn't exist
    if (!document.querySelector('.fullscreen-overlay')) {
        const fullscreenOverlay = document.createElement('div');
        fullscreenOverlay.className = 'fullscreen-overlay';
        fullscreenOverlay.innerHTML = `
            <button class="close-fullscreen" type="button" aria-label="Đóng xem toàn màn hình">
                <span class="close-icon">×</span>
            </button>
            <div class="fullscreen-container">
                <div class="fullscreen-navigation">
                    <button class="fullscreen-prev" type="button" aria-label="Ảnh trước"><i class="fas fa-chevron-left"></i></button>
                    <div class="fullscreen-indicators"></div>
                    <button class="fullscreen-next" type="button" aria-label="Ảnh tiếp theo"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        `;
        document.body.appendChild(fullscreenOverlay);

        // Enhanced close functionality for mobile
        const closeBtn = fullscreenOverlay.querySelector('.close-fullscreen');
        const closeIcon = fullscreenOverlay.querySelector('.close-icon');
        
        // Multiple event types for better mobile support
        const closeEvents = ['click', 'touchend'];
        
        closeEvents.forEach(eventType => {
            closeBtn.addEventListener(eventType, function(e) {
                e.preventDefault();
                e.stopPropagation();
                fullscreenOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }, { passive: false });
            
            closeIcon.addEventListener(eventType, function(e) {
                e.preventDefault();
                e.stopPropagation();
                fullscreenOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }, { passive: false });
        });

        // Close when clicking on overlay background
        fullscreenOverlay.addEventListener('click', function(e) {
            if (e.target === fullscreenOverlay) {
                fullscreenOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && fullscreenOverlay.classList.contains('active')) {
                fullscreenOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Setup image sliders for each service card
    const imageContainers = document.querySelectorAll('.service-image-container');
    
    imageContainers.forEach(container => {
        const images = container.querySelectorAll('.service-image');
        const prevBtn = container.querySelector('.prev-image');
        const nextBtn = container.querySelector('.next-image');
        const indicators = container.querySelectorAll('.indicator');
        const fullscreenBtn = container.querySelector('.toggle-fullscreen');
        let currentIndex = 0;
        
        // Enhanced mobile touch support
        let touchStartX = 0;
        let touchEndX = 0;
        let isScrolling = false;
        
        // Touch start event
        container.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            isScrolling = false;
        }, { passive: true });
        
        // Touch move to detect if user is scrolling
        container.addEventListener('touchmove', function(e) {
            if (Math.abs(e.changedTouches[0].screenY - e.changedTouches[0].screenY) > 
                Math.abs(e.changedTouches[0].screenX - touchStartX)) {
                isScrolling = true;
            }
        }, { passive: true });
        
        // Touch end event
        container.addEventListener('touchend', function(e) {
            if (isScrolling) return; // Don't handle swipe if user was scrolling
            
            touchEndX = e.changedTouches[0].screenX;
            const difference = touchStartX - touchEndX;
            
            if (Math.abs(difference) > 50) {
                // Add visual feedback
                container.style.transition = 'transform 0.2s ease';
                container.style.transform = difference > 0 ? 'translateX(-5px)' : 'translateX(5px)';
                
                setTimeout(() => {
                    container.style.transform = 'translateX(0)';
                    handleSwipe();
                    setTimeout(() => {
                        container.style.transition = '';
                    }, 200);
                }, 100);
            }
        }, { passive: true });
        
        function handleSwipe() {
            if (touchEndX > touchStartX + 50) {
                // Swipe right (previous)
                let index = currentIndex - 1;
                if (index < 0) index = images.length - 1;
                showImage(index);
            } else if (touchStartX > touchEndX + 50) {
                // Swipe left (next)
                let index = currentIndex + 1;
                if (index >= images.length) index = 0;
                showImage(index);
            }
        }

        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
            indicators.forEach(ind => ind.classList.remove('active'));
            indicators[index].classList.add('active');
            currentIndex = index;
        }

        // Button event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                let index = currentIndex - 1;
                if (index < 0) index = images.length - 1;
                showImage(index);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                let index = currentIndex + 1;
                if (index >= images.length) index = 0;
                showImage(index);
            });
        }

        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function(e) {
                e.stopPropagation();
                showImage(index);
            });
        });

        // Enhanced fullscreen functionality
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                openFullscreen();
            });
            
            // Also support touch events for mobile
            fullscreenBtn.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openFullscreen();
            });
        }
        
        function openFullscreen() {
            const fullscreenOverlay = document.querySelector('.fullscreen-overlay');
            const fullscreenContainer = fullscreenOverlay.querySelector('.fullscreen-container');
            const fullscreenIndicators = fullscreenOverlay.querySelector('.fullscreen-indicators');
            
            // Prevent body scrolling when fullscreen is open
            document.body.style.overflow = 'hidden';
            
            // Clear previous content
            fullscreenContainer.querySelectorAll('.fullscreen-image').forEach(img => img.remove());
            fullscreenIndicators.innerHTML = '';
            
            // Create fullscreen images
            images.forEach((img, index) => {
                const fullscreenImage = document.createElement('div');
                fullscreenImage.className = 'fullscreen-image';
                fullscreenImage.style.backgroundImage = img.style.backgroundImage;
                if (index === currentIndex) fullscreenImage.classList.add('active');
                fullscreenContainer.appendChild(fullscreenImage);
                
                // Create indicator
                const indicator = document.createElement('span');
                indicator.className = 'fullscreen-indicator';
                if (index === currentIndex) indicator.classList.add('active');
                fullscreenIndicators.appendChild(indicator);
                
                // Indicator events
                const indicatorEvents = ['click', 'touchend'];
                indicatorEvents.forEach(eventType => {
                    indicator.addEventListener(eventType, function(e) {
                        e.preventDefault();
                        showFullscreenImage(index);
                    });
                });
            });
            
            // Show fullscreen overlay
            fullscreenOverlay.classList.add('active');
            
            // Setup navigation
            const fullscreenImages = fullscreenContainer.querySelectorAll('.fullscreen-image');
            const fullscreenIndicatorsArray = fullscreenIndicators.querySelectorAll('.fullscreen-indicator');
            let fullscreenCurrentIndex = currentIndex;
            
            function showFullscreenImage(index) {
                fullscreenImages.forEach(img => img.classList.remove('active'));
                fullscreenImages[index].classList.add('active');
                fullscreenIndicatorsArray.forEach(ind => ind.classList.remove('active'));
                fullscreenIndicatorsArray[index].classList.add('active');
                fullscreenCurrentIndex = index;
            }
            
            // Navigation buttons
            const prevButton = fullscreenOverlay.querySelector('.fullscreen-prev');
            const nextButton = fullscreenOverlay.querySelector('.fullscreen-next');
            
            const navEvents = ['click', 'touchend'];
            
            navEvents.forEach(eventType => {
                prevButton.addEventListener(eventType, function(e) {
                    e.preventDefault();
                    let index = fullscreenCurrentIndex - 1;
                    if (index < 0) index = fullscreenImages.length - 1;
                    showFullscreenImage(index);
                });
                
                nextButton.addEventListener(eventType, function(e) {
                    e.preventDefault();
                    let index = fullscreenCurrentIndex + 1;
                    if (index >= fullscreenImages.length) index = 0;
                    showFullscreenImage(index);
                });
            });
            
            // Enhanced touch support for fullscreen container
            let fullscreenTouchStartX = 0;
            let fullscreenTouchEndX = 0;
            let fullscreenIsScrolling = false;
            
            fullscreenContainer.addEventListener('touchstart', function(e) {
                fullscreenTouchStartX = e.changedTouches[0].screenX;
                fullscreenIsScrolling = false;
            }, { passive: true });
            
            fullscreenContainer.addEventListener('touchmove', function(e) {
                if (Math.abs(e.changedTouches[0].screenY - e.changedTouches[0].screenY) > 
                    Math.abs(e.changedTouches[0].screenX - fullscreenTouchStartX)) {
                    fullscreenIsScrolling = true;
                }
            }, { passive: true });
            
            fullscreenContainer.addEventListener('touchend', function(e) {
                if (fullscreenIsScrolling) return;
                
                fullscreenTouchEndX = e.changedTouches[0].screenX;
                const difference = fullscreenTouchStartX - fullscreenTouchEndX;
                
                if (Math.abs(difference) > 50) {
                    if (fullscreenTouchEndX > fullscreenTouchStartX + 50) {
                        // Swipe right (previous)
                        let index = fullscreenCurrentIndex - 1;
                        if (index < 0) index = fullscreenImages.length - 1;
                        showFullscreenImage(index);
                    } else if (fullscreenTouchStartX > fullscreenTouchEndX + 50) {
                        // Swipe left (next)
                        let index = fullscreenCurrentIndex + 1;
                        if (index >= fullscreenImages.length) index = 0;
                        showFullscreenImage(index);
                    }
                }
            }, { passive: true });
        }
    });
}

// Counter animation for statistics
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

// Initialize counters when they come into view
function initializeCounters() {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe counter elements
    document.querySelectorAll('[data-target]').forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Parallax effect for hero section
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Add loading animation
function initializeLoadingAnimation() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}

// Initialize tooltips (if any)
function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltipText;
            document.body.appendChild(tooltipElement);
            
            const rect = this.getBoundingClientRect();
            tooltipElement.style.left = rect.left + (rect.width / 2) - (tooltipElement.offsetWidth / 2) + 'px';
            tooltipElement.style.top = rect.top - tooltipElement.offsetHeight - 10 + 'px';
        });
        
        tooltip.addEventListener('mouseleave', function() {
            const tooltipElement = document.querySelector('.tooltip');
            if (tooltipElement) {
                tooltipElement.remove();
            }
        });
    }); 
}

// Toast Notification System
function initializeToastSystem() {
    if (!window.toast) {
        window.toast = new Toast();
    }
}

class Toast {
    constructor() {
        this.createToastContainer();
    }

    createToastContainer() {
        if (document.getElementById('toast-container')) return;
        
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;">×</button>
            </div>
        `;
        
        const container = document.getElementById('toast-container');
        if (container) {
            container.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('show');
            }, 100);

            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, duration);
        }
    }
}

// Enhanced Form Handling with EmailJS Integration
function initializeEmailForms() {
    if (typeof emailjs === 'undefined') return;
    
    const emailFormHandler = new EmailFormHandler();
}

class EmailFormHandler {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.initEmailJS();
        this.init();
    }

    initEmailJS() {
        // Initialize EmailJS with your public key
        if (typeof emailjs !== 'undefined') {
            emailjs.init('is48xsDmZIpobLamF');
        }
    }

    init() {
        this.forms.forEach(form => {
            this.enhanceForm(form);
        });
    }

    enhanceForm(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            if (input.type !== 'submit' && input.type !== 'button') {
                this.addFloatingLabel(input);
            }
            
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        form.addEventListener('submit', (e) => this.handleEmailSubmit(e, form));
    }

    addFloatingLabel(input) {
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            label.classList.add('floating-label');
            
            if (input.value) {
                label.classList.add('active');
            }
            
            input.addEventListener('focus', () => label.classList.add('active'));
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                }
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        this.clearFieldError(field);

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'Trường này là bắt buộc';
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = 'Email không hợp lệ';
        } else if (field.type === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
            message = 'Số điện thoại không hợp lệ';
        }

        if (!isValid) {
            this.showFieldError(field, message);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            animation: fadeIn 0.3s ease;
        `;
        
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidPhone(phone) {
        return /^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone);
    }

    async handleEmailSubmit(e, form) {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            if (window.toast) {
                window.toast.show('Vui lòng kiểm tra lại thông tin', 'error');
            }
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent || submitBtn.innerText;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
        submitBtn.disabled = true;

        try {
            const formData = {
                from_name: form.querySelector('input[name="name"]')?.value || '',
                from_email: form.querySelector('input[name="email"]')?.value || '',
                phone: form.querySelector('input[name="phone"]')?.value || 'Không cung cấp',
                service: form.querySelector('select[name="service"]')?.value || 'Không chọn',
                message: form.querySelector('textarea[name="message"]')?.value || '',
                date: new Date().toLocaleString('vi-VN')
            };

            const serviceNames = {
                'food': 'Dịch vụ ăn uống',
                'tour': 'Tour du lịch',
                'flight': 'Vé máy bay',
                'visa': 'Visa & Passport'
            };
            formData.service_name = serviceNames[formData.service] || 'Không chọn';

            if (typeof emailjs !== 'undefined') {
                const response = await emailjs.send(
                    'service_6rqy91s',
                    'template_v8zhd9c',
                    formData
                );

                console.log('Email sent successfully:', response);
                if (window.toast) {
                    window.toast.show('Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm nhất.', 'success', 5000);
                }
            } else {
                if (window.toast) {
                    window.toast.show('Email service not available. Please contact directly.', 'warning', 5000);
                }
            }
            
            form.reset();
            
            form.querySelectorAll('.floating-label').forEach(label => {
                label.classList.remove('active');
            });
            
        } catch (error) {
            console.error('Email sending failed:', error);
            if (window.toast) {
                window.toast.show('Có lỗi xảy ra khi gửi email. Vui lòng thử lại hoặc liên hệ trực tiếp qua điện thoại.', 'error', 6000);
            }
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
}

// Performance Optimizations
function initializePerformanceOptimizations() {
    const performanceOptimizer = new PerformanceOptimizer();
}

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalResources();
        this.optimizeAnimations();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        const criticalImages = [
            'assets/images/LOGO.png',
            'assets/images/3.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    optimizeAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .value-card, .about-card');
        
        animatedElements.forEach(el => {
            el.style.willChange = 'transform';
        });
    }
}

// Mobile swipe instructions
function showSwipeInstructions() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        if (!localStorage.getItem('swipeInstructionsShown')) {
            setTimeout(() => {
                if (window.toast) {
                    window.toast.show('Vuốt sang trái/phải để chuyển ảnh, chạm để phóng to', 'info', 5000);
                }
                localStorage.setItem('swipeInstructionsShown', 'true');
            }, 2000);
        }
    }
}

// Add enhanced CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .floating-label {
        position: absolute;
        top: 1rem;
        left: 1rem;
        color: var(--text-light);
        transition: var(--transition);
        pointer-events: none;
        background: var(--white);
        padding: 0 0.5rem;
    }
    
    .floating-label.active {
        top: -0.5rem;
        font-size: 0.875rem;
        color: var(--accent-gold);
    }
    
    .form-group {
        position: relative;
    }
    
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease;
    }
    
    /* Enhanced mobile menu styles */
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--primary-green);
            flex-direction: column;
            padding: 1rem 0;
            z-index: 1000;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        }

        .nav-menu.active {
            display: flex;
        }

        .nav-menu li {
            margin: 0.5rem 0;
        }

        .nav-menu a {
            padding: 1rem 2rem;
            display: block;
            border-radius: 0;
            transition: all 0.3s ease;
        }

        .nav-menu a:hover {
            background-color: rgba(255, 255, 255, 0.1);
            padding-left: 2.5rem;
        }
        
        /* Enhanced fullscreen styles for mobile */
        .fullscreen-overlay {
            padding: 10px;
        }
        
        .close-fullscreen {
            top: 15px;
            right: 15px;
            width: 50px;
            height: 50px;
            font-size: 24px;
            border: 2px solid #333;
            /* Larger touch target for mobile */
            min-width: 44px;
            min-height: 44px;
        }
        
        .close-icon {
            font-size: 30px;
            font-weight: bold;
            line-height: 1;
        }
        
        .fullscreen-container {
            width: 95%;
            height: 85%;
        }
        
        .fullscreen-navigation {
            bottom: 10px;
        }
        
        .fullscreen-prev,
        .fullscreen-next {
            width: 50px;
            height: 50px;
            font-size: 20px;
            /* Larger touch targets */
            min-width: 44px;
            min-height: 44px;
        }
        
        .toggle-fullscreen {
            width: 40px;
            height: 40px;
            font-size: 16px;
            /* Larger touch target */
            min-width: 44px;
            min-height: 44px;
        }
    }
    
    /* Toast styles */
    .toast {
        background: var(--primary-green);
        color: white;
        padding: 1rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
    }
    
    .toast.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .toast.success {
        background: #28a745;
    }
    
    .toast.error {
        background: #dc3545;
    }
    
    .toast.info {
        background: #17a2b8;
    }
`;
document.head.appendChild(style);

// Debug function for mobile menu
window.debugMobileMenu = function() {
    console.log('🔍 Mobile Menu Debug Info:');
    console.log('Menu Button:', document.querySelector('.mobile-menu-btn'));
    console.log('Nav Menu:', document.querySelector('.nav-menu'));
    console.log('Mobile Menu Instance:', window.mobileMenuInstance);
    console.log('Window width:', window.innerWidth);
    console.log('Is mobile view:', window.innerWidth <= 768);
};