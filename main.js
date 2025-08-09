// Main JavaScript file for Nhiên Việt Inspired website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // File upload display and validation for resume in careers page
    const resumeInput = document.getElementById('resume');
    const fileNameDisplay = document.querySelector('.file-name');
    const resumeErrorElement = document.getElementById('resume-error');
    
    if (resumeInput && fileNameDisplay) {
        resumeInput.addEventListener('change', function() {
            // Reset error state
            resumeInput.classList.remove('error');
            resumeInput.setAttribute('aria-invalid', 'false');
            if (resumeErrorElement) {
                resumeErrorElement.textContent = '';
                resumeErrorElement.style.display = 'none';
            }
            
            if (this.files && this.files[0]) {
                const file = this.files[0];
                const fileSize = file.size / 1024 / 1024; // Convert to MB
                const fileName = file.name;
                const fileExtension = fileName.split('.').pop().toLowerCase();
                const allowedExtensions = ['pdf', 'doc', 'docx'];
                
                if (!allowedExtensions.includes(fileExtension)) {
                    // Invalid file type
                    resumeInput.classList.add('error');
                    resumeInput.setAttribute('aria-invalid', 'true');
                    fileNameDisplay.textContent = 'Định dạng file không hợp lệ';
                    
                    if (resumeErrorElement) {
                        resumeErrorElement.textContent = 'Chỉ chấp nhận file PDF, DOC, DOCX';
                        resumeErrorElement.style.display = 'block';
                    }
                    
                    // Clear the file input
                    this.value = '';
                } else if (fileSize > 5) {
                    // File too large
                    resumeInput.classList.add('error');
                    resumeInput.setAttribute('aria-invalid', 'true');
                    fileNameDisplay.textContent = 'File quá lớn';
                    
                    if (resumeErrorElement) {
                        resumeErrorElement.textContent = 'Kích thước file không được vượt quá 5MB';
                        resumeErrorElement.style.display = 'block';
                    }
                    
                    // Clear the file input
                    this.value = '';
                } else {
                    // Valid file
                    fileNameDisplay.textContent = fileName;
                }
            } else {
                fileNameDisplay.textContent = 'Chưa có file nào được chọn';
            }
        });
    }

    // Career application form handling
    const careerForm = document.getElementById('career-form');
    
    if (careerForm) {
        // Form validation function
        function validateForm() {
            let isValid = true;
            const requiredFields = careerForm.querySelectorAll('[required]');
            
            // Remove any existing error messages
            const errorMessages = careerForm.querySelectorAll('.error-message');
            errorMessages.forEach(msg => {
                if (msg.textContent) {
                    msg.textContent = '';
                    msg.style.display = 'none';
                }
            });
            
            // Remove error class from all inputs
            const formInputs = careerForm.querySelectorAll('input, select, textarea');
            formInputs.forEach(input => input.classList.remove('error'));
            
            // Check each required field
            requiredFields.forEach(field => {
                const errorMsgElement = document.getElementById(`${field.id}-error`) || field.parentNode.querySelector('.error-message');
                
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    field.setAttribute('aria-invalid', 'true');
                    
                    // Update error message
                    if (errorMsgElement) {
                        errorMsgElement.textContent = 'Trường này là bắt buộc';
                        errorMsgElement.style.display = 'block';
                    } else {
                        // Create error message if it doesn't exist
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.id = `${field.id}-error`;
                        errorMsg.setAttribute('aria-live', 'polite');
                        errorMsg.textContent = 'Trường này là bắt buộc';
                        field.parentNode.appendChild(errorMsg);
                    }
                } else {
                    field.setAttribute('aria-invalid', 'false');
                }
            });
            
            // Validate email format if email field has a value
            const emailField = document.getElementById('email');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const emailErrorElement = document.getElementById('email-error');
                
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                    emailField.setAttribute('aria-invalid', 'true');
                    
                    // Update error message
                    if (emailErrorElement) {
                        emailErrorElement.textContent = 'Email không hợp lệ';
                        emailErrorElement.style.display = 'block';
                    } else {
                        // Create error message if it doesn't exist
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.id = 'email-error';
                        errorMsg.setAttribute('aria-live', 'polite');
                        errorMsg.textContent = 'Email không hợp lệ';
                        emailField.parentNode.appendChild(errorMsg);
                    }
                }
            }
            
            // Validate phone number format if phone field has a value
            const phoneField = document.getElementById('phone');
            if (phoneField && phoneField.value.trim()) {
                const phonePattern = /^[0-9]{10,11}$/;
                const phoneErrorElement = document.getElementById('phone-error');
                const cleanPhoneValue = phoneField.value.replace(/\s/g, '');
                
                if (!phonePattern.test(cleanPhoneValue)) {
                    isValid = false;
                    phoneField.classList.add('error');
                    phoneField.setAttribute('aria-invalid', 'true');
                    
                    // Update error message
                    if (phoneErrorElement) {
                        phoneErrorElement.textContent = 'Số điện thoại không hợp lệ (cần 10-11 số)';
                        phoneErrorElement.style.display = 'block';
                    } else {
                        // Create error message if it doesn't exist
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.id = 'phone-error';
                        errorMsg.setAttribute('aria-live', 'polite');
                        errorMsg.textContent = 'Số điện thoại không hợp lệ (cần 10-11 số)';
                        phoneField.parentNode.appendChild(errorMsg);
                    }
                }
            }
            
            return isValid;
        }
        
        // Create success message element
        function showSuccessMessage() {
            // Check if success message already exists and remove it
            const existingMessage = document.querySelector('.success-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Create new success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.setAttribute('role', 'alert');
            successMessage.setAttribute('aria-live', 'assertive');
            successMessage.innerHTML = `
                <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                <h3>Đã gửi đơn ứng tuyển thành công!</h3>
                <p>Cảm ơn bạn đã ứng tuyển vào Nhiên Việt Go. Chúng tôi sẽ xem xét hồ sơ của bạn và liên hệ trong thời gian sớm nhất.</p>
                <p>Mã tham chiếu: <strong>${generateReferenceCode()}</strong></p>
                <button class="btn btn-primary close-message" aria-label="Đóng thông báo">Đóng</button>
            `;
            
            // Add success message to the page
            const applicationForm = document.querySelector('.application-form');
            applicationForm.appendChild(successMessage);
            
            // Add event listener to close button
            successMessage.querySelector('.close-message').addEventListener('click', function() {
                // Add fade-out animation
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(-20px)';
                
                // Remove after animation completes
                setTimeout(() => {
                    if (document.body.contains(successMessage)) {
                        successMessage.remove();
                    }
                }, 500);
            });
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Auto remove after 15 seconds
            setTimeout(() => {
                if (document.body.contains(successMessage)) {
                    // Add fade-out animation
                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'translateY(-20px)';
                    
                    // Remove after animation completes
                    setTimeout(() => {
                        if (document.body.contains(successMessage)) {
                            successMessage.remove();
                        }
                    }, 500);
                }
            }, 15000);
        }
        
        // Generate a random reference code for applications
        function generateReferenceCode() {
            const timestamp = new Date().getTime().toString().slice(-6);
            const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            return `NV-${timestamp}-${random}`;
        }
        
        // Form submission handler
        careerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm()) {
                // Here you would typically send the form data to a server
                // For now, we'll just show a success message
                showSuccessMessage();
                careerForm.reset();
                
                // Reset file name display
                if (fileNameDisplay) {
                    fileNameDisplay.textContent = 'Chưa có file nào được chọn';
                }
            } else {
                // Scroll to the first error
                const firstError = careerForm.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
});