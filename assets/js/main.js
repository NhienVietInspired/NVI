// Mobile Menu functionality is handled by the Enhanced MobileMenu class below

// Smooth scrolling for anchor links
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

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (navMenu && mobileMenuBtn) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// Scroll to top button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        // Custom smooth scroll với tốc độ có thể điều chỉnh
        const scrollToTop = () => {
            const currentPosition = window.pageYOffset;
            if (currentPosition > 0) {
                // Tốc độ cuộn: thay đổi số này để điều chỉnh tốc độ
                // Số càng nhỏ = cuộn càng nhanh
                // Số càng lớn = cuộn càng chậm
                const scrollStep = Math.max(currentPosition / 22, 1); // Điều chỉnh 20 thành số khác
                window.scrollTo(0, currentPosition - scrollStep);
                requestAnimationFrame(scrollToTop);
            }
        };
        scrollToTop();
    });
}

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-card, .service-card, .value-card, .contact-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Form validation and submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const message = this.querySelector('textarea[name="message"]').value.trim();
        
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

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Header background change on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        header.style.background = 'rgba(45, 90, 39, 0.95)';
    } else {
        header.style.background = 'linear-gradient(135deg, var(--primary-green), var(--secondary-green))';
    }
});

// Service cards hover effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Image slider functionality for service cards
document.addEventListener('DOMContentLoaded', function() {
    // Create fullscreen overlay if it doesn't exist
    if (!document.querySelector('.fullscreen-overlay')) {
        const fullscreenOverlay = document.createElement('div');
        fullscreenOverlay.className = 'fullscreen-overlay';
        fullscreenOverlay.innerHTML = `
            <button class="close-fullscreen" id="closeFullscreenBtn">
                <span class="close-icon">×</span>
            </button>
            <div class="fullscreen-container">
                <div class="fullscreen-navigation">
                    <button class="fullscreen-prev"><i class="fas fa-chevron-left"></i></button>
                    <div class="fullscreen-indicators"></div>
                    <button class="fullscreen-next"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        `;
        document.body.appendChild(fullscreenOverlay);

        // Close fullscreen when clicking on overlay background
        fullscreenOverlay.addEventListener('click', function(e) {
            if (e.target === fullscreenOverlay) {
                fullscreenOverlay.classList.remove('active');
            }
        });
        
        // Thiết lập sự kiện click trực tiếp cho nút đóng
        function setupCloseButtonEvents() {
            // Nút đóng
            const closeButton = document.getElementById('closeFullscreenBtn');
            if (closeButton) {
                // Xóa tất cả sự kiện click cũ (nếu có)
                const newCloseButton = closeButton.cloneNode(true);
                closeButton.parentNode.replaceChild(newCloseButton, closeButton);
                
                // Thêm sự kiện click mới
                newCloseButton.onclick = function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    document.querySelector('.fullscreen-overlay').classList.remove('active');
                    return false;
                };
            }
            
            // Biểu tượng X
            const closeIcon = document.querySelector('.close-icon');
            if (closeIcon) {
                // Xóa tất cả sự kiện click cũ (nếu có)
                const newCloseIcon = closeIcon.cloneNode(true);
                closeIcon.parentNode.replaceChild(newCloseIcon, closeIcon);
                
                // Thêm sự kiện click mới
                newCloseIcon.onclick = function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    document.querySelector('.fullscreen-overlay').classList.remove('active');
                    return false;
                };
            }
        }
        
        // Thiết lập sự kiện ngay sau khi tạo overlay
        setupCloseButtonEvents();
        
        // Thêm sự kiện click trực tiếp cho nút đóng
        document.addEventListener('click', function(e) {
            const closeButton = e.target.closest('#closeFullscreenBtn');
            const closeIcon = e.target.closest('.close-icon');
            
            if (closeButton || closeIcon) {
                e.stopPropagation();
                e.preventDefault();
                const overlay = document.querySelector('.fullscreen-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                }
                return false;
            }
        }, true); // Sử dụng capturing phase để đảm bảo sự kiện được xử lý trước

        // Xử lý sự kiện click cho nút đóng và biểu tượng X
        function setupCloseButtonEvents() {
            // Nút đóng
            const closeButton = document.getElementById('closeFullscreenBtn');
            if (closeButton) {
                // Xóa tất cả sự kiện click cũ (nếu có)
                const newCloseButton = closeButton.cloneNode(true);
                closeButton.parentNode.replaceChild(newCloseButton, closeButton);
                
                // Thêm sự kiện click mới
                newCloseButton.onclick = function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    document.querySelector('.fullscreen-overlay').classList.remove('active');
                    return false;
                };
            }
            
            // Biểu tượng X
            const closeIcon = document.querySelector('.close-icon');
            if (closeIcon) {
                // Xóa tất cả sự kiện click cũ (nếu có)
                const newCloseIcon = closeIcon.cloneNode(true);
                closeIcon.parentNode.replaceChild(newCloseIcon, closeIcon);
                
                // Thêm sự kiện click mới
                newCloseIcon.onclick = function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    document.querySelector('.fullscreen-overlay').classList.remove('active');
                    return false;
                };
            }
        }
        
        // Thiết lập sự kiện ngay sau khi tạo overlay
        setupCloseButtonEvents();
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
        
        // Thêm xử lý sự kiện vuốt (swipe) cho thiết bị di động
        let touchStartX = 0;
        let touchEndX = 0;
        
        // Xử lý sự kiện chạm bắt đầu
        container.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            // Ngăn chặn hành vi cuộn trang khi đang tương tác với slider
            e.preventDefault();
        }, { passive: false });
        
        // Xử lý sự kiện chạm kết thúc
        container.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            
            // Thêm hiệu ứng phản hồi khi vuốt
            const difference = touchStartX - touchEndX;
            if (Math.abs(difference) > 50) {
                container.style.transition = 'transform 0.3s ease';
                container.style.transform = difference > 0 ? 'translateX(-10px)' : 'translateX(10px)';
                
                setTimeout(() => {
                    container.style.transform = 'translateX(0)';
                    handleSwipe();
                    
                    // Xóa hiệu ứng sau khi hoàn thành
                    setTimeout(() => {
                        container.style.transition = '';
                        container.style.transform = '';
                    }, 300);
                }, 150);
            } else {
                handleSwipe();
            }
        }, false);
        
        // Xử lý hành động vuốt
        function handleSwipe() {
            // Vuốt sang phải (previous)
            if (touchEndX > touchStartX + 50) {
                let index = currentIndex - 1;
                if (index < 0) index = images.length - 1;
                showImage(index);
            }
            
            // Vuốt sang trái (next)
            if (touchStartX > touchEndX + 50) {
                let index = currentIndex + 1;
                if (index >= images.length) index = 0;
                showImage(index);
            }
        }

        // Function to show image at specific index
        function showImage(index) {
            // Hide all images
            images.forEach(img => img.classList.remove('active'));
            // Show selected image
            images[index].classList.add('active');
            // Update indicators
            indicators.forEach(ind => ind.classList.remove('active'));
            indicators[index].classList.add('active');
            currentIndex = index;
        }

        // Previous button click
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            let index = currentIndex - 1;
            if (index < 0) index = images.length - 1;
            showImage(index);
        });

        // Next button click
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            let index = currentIndex + 1;
            if (index >= images.length) index = 0;
            showImage(index);
        });

        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function(e) {
                e.stopPropagation();
                showImage(index);
            });
        });

        // Fullscreen toggle
        fullscreenBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const fullscreenOverlay = document.querySelector('.fullscreen-overlay');
            const fullscreenContainer = fullscreenOverlay.querySelector('.fullscreen-container');
            const fullscreenIndicators = fullscreenOverlay.querySelector('.fullscreen-indicators');
            
            // Clear previous fullscreen images
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
                
                // Indicator click
                indicator.addEventListener('click', function() {
                    showFullscreenImage(index);
                });
            });
            
            // Show fullscreen overlay
            fullscreenOverlay.classList.add('active');
            
            // Đảm bảo sự kiện nút đóng được thiết lập sau khi hiển thị overlay
            setupCloseButtonEvents();
            
            // Đảm bảo sự kiện nút đóng được thiết lập sau khi hiển thị overlay
            setupCloseButtonEvents();
            
            // Setup fullscreen navigation
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
            
            // Fullscreen previous button
            fullscreenOverlay.querySelector('.fullscreen-prev').addEventListener('click', function() {
                let index = fullscreenCurrentIndex - 1;
                if (index < 0) index = fullscreenImages.length - 1;
                showFullscreenImage(index);
            });
            
            // Fullscreen next button
            fullscreenOverlay.querySelector('.fullscreen-next').addEventListener('click', function() {
                let index = fullscreenCurrentIndex + 1;
                if (index >= fullscreenImages.length) index = 0;
                showFullscreenImage(index);
            });
            
            // Thêm xử lý sự kiện vuốt (swipe) cho chế độ xem toàn màn hình trên thiết bị di động
            let touchStartX = 0;
            let touchEndX = 0;
            
            // Xử lý sự kiện chạm bắt đầu
            fullscreenContainer.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
                // Ngăn chặn hành vi cuộn trang khi đang tương tác với slider toàn màn hình
                e.preventDefault();
            }, { passive: false });
            
            // Xử lý sự kiện chạm kết thúc
            fullscreenContainer.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                
                // Thêm hiệu ứng phản hồi khi vuốt
                const difference = touchStartX - touchEndX;
                if (Math.abs(difference) > 50) {
                    fullscreenContainer.style.transition = 'transform 0.3s ease';
                    fullscreenContainer.style.transform = difference > 0 ? 'translateX(-20px)' : 'translateX(20px)';
                    
                    setTimeout(() => {
                        fullscreenContainer.style.transform = 'translateX(0)';
                        handleFullscreenSwipe();
                        
                        // Xóa hiệu ứng sau khi hoàn thành
                        setTimeout(() => {
                            fullscreenContainer.style.transition = '';
                            fullscreenContainer.style.transform = '';
                        }, 300);
                    }, 150);
                } else {
                    handleFullscreenSwipe();
                }
            }, false);
            
            // Xử lý hành động vuốt trong chế độ toàn màn hình
            function handleFullscreenSwipe() {
                // Vuốt sang phải (previous)
                if (touchEndX > touchStartX + 50) {
                    let index = fullscreenCurrentIndex - 1;
                    if (index < 0) index = fullscreenImages.length - 1;
                    showFullscreenImage(index);
                }
                
                // Vuốt sang trái (next)
                if (touchStartX > touchEndX + 50) {
                    let index = fullscreenCurrentIndex + 1;
                    if (index >= fullscreenImages.length) index = 0;
                    showFullscreenImage(index);
                }
            }
        });
    });
});

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

// Lazy loading for images
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

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Initialize tooltips (if any)
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

// Toast Notification System
class Toast {
    constructor() {
        this.createToastContainer();
    }

    createToastContainer() {
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
        
        document.getElementById('toast-container').appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

const toast = new Toast();



// Enhanced Form Handling with EmailJS Integration
class EmailFormHandler {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.initEmailJS();
        this.init();
    }

    initEmailJS() {
        // Initialize EmailJS with your public key
        // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
        emailjs.init('is48xsDmZIpobLamF');
    }

    init() {
        this.forms.forEach(form => {
            this.enhanceForm(form);
        });
    }

    enhanceForm(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add floating labels
            if (input.type !== 'submit' && input.type !== 'button') {
                this.addFloatingLabel(input);
            }
            
            // Add real-time validation
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Enhanced form submission with EmailJS
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

        // Remove existing error
        this.clearFieldError(field);

        // Validation rules
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
        
        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            toast.show('Vui lòng kiểm tra lại thông tin', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent || submitBtn.innerText;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
        submitBtn.disabled = true;

        try {
            // Collect form data
            const formData = {
                from_name: form.querySelector('input[name="name"]').value,
                from_email: form.querySelector('input[name="email"]').value,
                phone: form.querySelector('input[name="phone"]').value || 'Không cung cấp',
                service: form.querySelector('select[name="service"]').value || 'Không chọn',
                message: form.querySelector('textarea[name="message"]').value,
                date: new Date().toLocaleString('vi-VN')
            };

            // Get service name in Vietnamese
            const serviceNames = {
                'food': 'Dịch vụ ăn uống',
                'tour': 'Tour du lịch',
                'flight': 'Vé máy bay',
                'visa': 'Visa & Passport'
            };
            formData.service_name = serviceNames[formData.service] || 'Không chọn';

            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS configuration
            const response = await emailjs.send(
                'service_6rqy91s',
                'template_v8zhd9c',
                formData
            );

            console.log('Email sent successfully:', response);
            toast.show('Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm nhất.', 'success', 5000);
            form.reset();
            
            // Reset floating labels
            form.querySelectorAll('.floating-label').forEach(label => {
                label.classList.remove('active');
            });
            
        } catch (error) {
            console.error('Email sending failed:', error);
            toast.show('Có lỗi xảy ra khi gửi email. Vui lòng thử lại hoặc liên hệ trực tiếp qua điện thoại.', 'error', 6000);
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
}

// Initialize Email Form Handler (replace the old FormHandler)
const emailFormHandler = new EmailFormHandler();

// Performance Optimizations
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
        // Use requestAnimationFrame for smooth animations
        const animatedElements = document.querySelectorAll('.service-card, .value-card, .about-card');
        
        animatedElements.forEach(el => {
            el.style.willChange = 'transform';
        });
    }
}

// Initialize Performance Optimizer
const performanceOptimizer = new PerformanceOptimizer();

// Hiển thị thông báo hướng dẫn vuốt cho người dùng thiết bị di động
function showSwipeInstructions() {
    // Kiểm tra xem có phải là thiết bị di động không
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        // Kiểm tra xem đã hiển thị hướng dẫn trước đó chưa
        if (!localStorage.getItem('swipeInstructionsShown')) {
            // Tạo thông báo hướng dẫn
            setTimeout(() => {
                toast.show('Vuốt sang trái/phải để chuyển ảnh', 'info', 5000);
                // Lưu trạng thái đã hiển thị hướng dẫn
                localStorage.setItem('swipeInstructionsShown', 'true');
            }, 2000);
        }
    }
}

// Gọi hàm hiển thị hướng dẫn khi trang được tải
document.addEventListener('DOMContentLoaded', showSwipeInstructions);

// Enhanced Mobile Menu
class MobileMenu {
    constructor() {
        this.menuBtn = document.querySelector('.mobile-menu-btn');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (this.menuBtn && this.navMenu) {
            this.menuBtn.addEventListener('click', () => this.toggle());
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.menuBtn.contains(e.target) && !this.navMenu.contains(e.target)) {
                    this.close();
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.close();
                }
            });
        }
    }

    toggle() {
        this.navMenu.classList.toggle('active');
        this.menuBtn.classList.toggle('active');
        
        // Animate menu items
        const menuItems = this.navMenu.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            if (this.navMenu.classList.contains('active')) {
                item.style.animation = `slideInRight 0.3s ease ${index * 0.1}s both`;
            } else {
                item.style.animation = '';
            }
        });
    }

    close() {
        this.navMenu.classList.remove('active');
        this.menuBtn.classList.remove('active');
    }
}

// Initialize Mobile Menu after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = new MobileMenu();
});

// Add CSS animations
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
`;
document.head.appendChild(style);