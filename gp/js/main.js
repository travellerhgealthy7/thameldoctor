document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial Slider
    let slideIndex = 0;
    const slides = document.querySelectorAll('.testimonial');
    
    function showTestimonial(index) {
        if (index >= slides.length) {
            slideIndex = 0;
        } else if (index < 0) {
            slideIndex = slides.length - 1;
        } else {
            slideIndex = index;
        }
        
        const offset = -slideIndex * 100;
        document.querySelector('.testimonial-slider').style.transform = `translateX(${offset}%)`;
    }
    
    // Auto-rotate testimonials if there are any
    if (slides.length > 1) {
        setInterval(() => {
            showTestimonial(slideIndex + 1);
        }, 5000);
    }

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = contactForm.querySelector('input[name="name"]');
            const email = contactForm.querySelector('input[name="email"]');
            const phone = contactForm.querySelector('input[name="phone"]');
            const message = contactForm.querySelector('textarea[name="message"]');
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));
            
            // Validate Name
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            // Validate Email
            if (email.value && !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate Phone (required)
            if (!phone.value.trim()) {
                showError(phone, 'Please enter your phone number');
                isValid = false;
            } else if (!isValidPhone(phone.value)) {
                showError(phone, 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate Message
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                // For now, we'll just show a success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message. We will contact you soon!';
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Helper function to show error messages
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Phone validation helper (simple validation)
    function isValidPhone(phone) {
        const re = /^[0-9\+\-\s\(\)]{7,}$/;
        return re.test(phone);
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fadeInUp');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add animation class to elements
    document.querySelectorAll('.service-card, .feature, .testimonial').forEach((el, index) => {
        el.classList.add('fadeInUp');
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Check for elements in viewport on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add loading animation for page transitions
    document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([href^="https://wa."])').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('http')) return;
            
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Add loading class to body
            document.body.classList.add('page-transition');
            
            // Navigate after a short delay to show the animation
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
});
