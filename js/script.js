// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open'); // Prevent scrolling when menu is open
        });

        // Close mobile menu when clicking on a menu item
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(event.target) && 
            !hamburger.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission Handling with improved validation
    const callbackForm = document.getElementById('callback-form');
    if (callbackForm) {
        const formInputs = callbackForm.querySelectorAll('input');
        
        // Add validation styles on input focus/blur
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                validateInput(this);
            });
            
            // Validate as user types (for non-empty fields)
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    validateInput(this);
                }
            });
        });

        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                showFormMessage(callbackForm, 'Please fill in all required fields correctly.', 'error');
                return;
            }
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            
            // Simulate form submission
            const submitButton = callbackForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            
            setTimeout(() => {
                showFormMessage(callbackForm, `Thank you, ${name}! We will call you back at ${phone} shortly.`, 'success');
                callbackForm.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = 'Request a Callback <i class="fas fa-phone"></i>';
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    const messageEl = callbackForm.querySelector('.form-message');
                    if (messageEl) {
                        messageEl.classList.add('fade-out');
                        setTimeout(() => messageEl.remove(), 500);
                    }
                }, 5000);
            }, 1500);
        });
    }

    // Form validation helper function
    function validateInput(input) {
        const value = input.value.trim();
        const parent = input.parentElement;
        
        // Remove existing error message
        const existingError = parent.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Check if empty
        if (!value) {
            parent.classList.add('error');
            addErrorMessage(parent, 'This field is required');
            return false;
        }
        
       
        
        // Email validation
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                parent.classList.add('error');
                addErrorMessage(parent, 'Please enter a valid email address');
                return false;
            }
        }
        
        parent.classList.remove('error');
        return true;
    }

    // Helper to add error message
    function addErrorMessage(parent, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        parent.appendChild(errorDiv);
        
        // Add shake animation only if it's not a phone input field
        const input = parent.querySelector('input');
        if (input && input.id !== 'phone') {
            parent.classList.add('shake');
            setTimeout(() => parent.classList.remove('shake'), 500);
        }
    }

    // Helper to show form messages
    function showFormMessage(form, message, type) {
        // Remove any existing messages
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        
        // Enhanced formatting for success messages
        if (type === 'success') {
            messageDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        } else {
            messageDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        }
        
        // Add to the beginning of the form
        form.prepend(messageDiv);
        
        // Add entrance animation
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 10);
        
        // Scroll to show the message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Service card hover effects with enhanced animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hovered');
        });
    });

    // Add current year to footer copyright
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Enhance scroll experience
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
        
        // Reveal elements on scroll
        revealOnScroll();
    });
    
    // Reveal elements as they come into view
    function revealOnScroll() {
        const elements = document.querySelectorAll('.service-card, .testimonial, .feature-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial call to reveal elements
    setTimeout(revealOnScroll, 300);

    // Testimonial hover effect
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('mouseenter', () => {
            testimonials.forEach(t => t.classList.remove('active-testimonial'));
            testimonial.classList.add('active-testimonial');
        });
    });
    
    // Add floating animation to service icons
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.classList.add('float-animation');
    });

    // FAQ Accordion Functionality with smooth animations
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.parentElement;
                const accordionBody = accordionItem.querySelector('.accordion-body');
                const isActive = accordionItem.classList.contains('active');
                
                // Close all accordion items with smooth animation
                document.querySelectorAll('.accordion-item').forEach(item => {
                    const itemBody = item.querySelector('.accordion-body');
                    item.classList.remove('active');
                    item.querySelector('.accordion-header').classList.remove('active');
                    
                    // Set actual height before collapsing
                    if (item !== accordionItem) {
                        itemBody.style.height = itemBody.scrollHeight + 'px';
                        setTimeout(() => {
                            itemBody.style.height = '0';
                        }, 10);
                    }
                });
                
                // Open the clicked accordion item if it wasn't already active
                if (!isActive) {
                    accordionItem.classList.add('active');
                    this.classList.add('active');
                    
                    // Expand with animation
                    accordionBody.style.height = '0';
                    setTimeout(() => {
                        accordionBody.style.height = accordionBody.scrollHeight + 'px';
                    }, 10);
                }
            });
        });
    }
    
    // FAQ Category Tabs with smooth transitions
    const categoryTabs = document.querySelectorAll('.category-tabs a');
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                
                // Hide all categories and remove active class from tabs
                document.querySelectorAll('.faq-category').forEach(category => {
                    category.classList.remove('active', 'fade-in');
                });
                
                document.querySelectorAll('.category-tabs a').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Show the selected category and make tab active
                const targetCategory = document.querySelector(targetId);
                this.classList.add('active');
                
                // Add fade-in after a short delay for smooth transition
                setTimeout(() => {
                    targetCategory.classList.add('active', 'fade-in');
                }, 50);
            });
        });
    }

    // Setup multi-step form navigation
    const prevButtons = document.querySelectorAll('.prev-step');
    const nextButtons = document.querySelectorAll('.next-step');
    
    if (prevButtons.length > 0) {
        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                const prevStep = parseInt(this.getAttribute('data-prev'));
                const currentStep = prevStep + 1;
                
                // Update steps
                const steps = document.querySelectorAll('.step');
                steps.forEach(step => step.classList.remove('active'));
                const targetStep = document.querySelector(`.step[data-step="${prevStep}"]`);
                if (targetStep) {
                    targetStep.classList.add('active');
                }
                
                // Slide animation for form steps
                const formSteps = document.querySelectorAll('.form-step');
                formSteps.forEach(formStep => {
                    formStep.classList.remove('active', 'slide-in-right', 'slide-in-left');
                    formStep.classList.add('slide-out-right');
                });
                
                setTimeout(() => {
                    formSteps.forEach(formStep => formStep.classList.remove('slide-out-right'));
                    const targetFormStep = document.querySelector(`.form-step[data-step="${prevStep}"]`);
                    if (targetFormStep) {
                        targetFormStep.classList.add('active', 'slide-in-left');
                    }
                }, 300);
                
                // Scroll to top of form
                const formContainer = document.querySelector('.booking-container');
                if (formContainer) {
                    formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
    
    if (nextButtons.length > 0) {
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                const nextStep = parseInt(this.getAttribute('data-next'));
                const currentStep = nextStep - 1;
                
                // Skip validation for the debug purposes
                const isValid = true;
                
                if (isValid) {
                    // Update steps
                    const steps = document.querySelectorAll('.step');
                    steps.forEach(step => step.classList.remove('active'));
                    const targetStep = document.querySelector(`.step[data-step="${nextStep}"]`);
                    if (targetStep) {
                        targetStep.classList.add('active');
                    }
                    
                    // Slide animation for form steps
                    const formSteps = document.querySelectorAll('.form-step');
                    formSteps.forEach(formStep => {
                        formStep.classList.remove('active', 'slide-in-right', 'slide-in-left');
                        formStep.classList.add('slide-out-left');
                    });
                    
                    setTimeout(() => {
                        formSteps.forEach(formStep => formStep.classList.remove('slide-out-left'));
                        const targetFormStep = document.querySelector(`.form-step[data-step="${nextStep}"]`);
                        if (targetFormStep) {
                            targetFormStep.classList.add('active', 'slide-in-right');
                        }
                    }, 300);
                    
                    // Update summary if going to confirmation step
                    if (nextStep === 4) {
                        updateSummary();
                    }
                    
                    // Scroll to top of form
                    const formContainer = document.querySelector('.booking-container');
                    if (formContainer) {
                        formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }

    // Form Submission with loading animation
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        console.log('Booking form found, attaching submit handler');
        bookingForm.addEventListener('submit', function(e) {
            console.log('Form submitted!');
            e.preventDefault();
            
            // Check final validation
            const requiredFields = bookingForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    console.log('Invalid field found:', field);
                    isValid = false;
                }
            });
            
            if (!isValid) {
                console.log('Form validation failed');
                alert('Please fill in all required fields before submitting.');
                return;
            }
            
            console.log('Form validation passed, showing loading animation');
            // Show loading animation
            const submitButton = bookingForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Simulate form submission delay
            setTimeout(() => {
                console.log('Submission delay complete, hiding form');
                // Hide form and show success message with animation
                bookingForm.style.opacity = '0';
                const bookingSteps = document.querySelector('.booking-steps');
                if (bookingSteps) bookingSteps.style.opacity = '0';
                
                setTimeout(() => {
                    console.log('Showing success message');
                    bookingForm.style.display = 'none';
                    if (bookingSteps) bookingSteps.style.display = 'none';
                    
                    const successMessage = document.querySelector('.booking-success');
                    console.log('Success message element:', successMessage);
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        
                        // Scroll to top of container
                        const bookingContainer = document.querySelector('.booking-container');
                        if (bookingContainer) {
                            bookingContainer.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }, 300);
            }, 1500);
        });
    } else {
        console.log('Booking form not found!');
    }

    // New animation implementations
    initNewAnimations();
    
    // Scroll trigger animations
    initScrollTriggerAnimations();

    // Add event listeners to service option labels
    const serviceLabels = document.querySelectorAll('.service-label');
    if (serviceLabels.length > 0) {
        console.log('Found service labels:', serviceLabels.length);
        serviceLabels.forEach(label => {
            label.addEventListener('click', function(e) {
                console.log('Service label clicked!', this);
                
                // Set the corresponding radio button as checked
                const radioId = this.getAttribute('for');
                const radioButton = document.getElementById(radioId);
                console.log('Radio button:', radioId, radioButton);
                if (radioButton) {
                    radioButton.checked = true;
                }
                
                // Navigate to the next step
                const nextStep = parseInt(this.getAttribute('data-next'));
                const currentStep = nextStep - 1;
                console.log('Moving from step', currentStep, 'to step', nextStep);
                
                // For service selection (Step 1), skip validation and proceed directly
                // Update steps with animation
                const steps = document.querySelectorAll('.step');
                steps.forEach(step => step.classList.remove('active'));
                const targetStep = document.querySelector(`.step[data-step="${nextStep}"]`);
                if (targetStep) {
                    targetStep.classList.add('active');
                }
                
                // Slide animation for form steps
                const formSteps = document.querySelectorAll('.form-step');
                console.log('Form steps:', formSteps.length);
                formSteps.forEach(formStep => {
                    formStep.classList.remove('active', 'slide-in-right', 'slide-in-left');
                    formStep.classList.add('slide-out-left');
                });
                
                setTimeout(() => {
                    formSteps.forEach(formStep => formStep.classList.remove('slide-out-left'));
                    const targetFormStep = document.querySelector(`.form-step[data-step="${nextStep}"]`);
                    console.log('Target form step:', targetFormStep);
                    if (targetFormStep) {
                        targetFormStep.classList.add('active', 'slide-in-right');
                    }
                }, 300);
                
                // Scroll to top of form
                const formContainer = document.querySelector('.booking-container');
                if (formContainer) {
                    formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields before submitting.');
                return;
            }
            
            // Show loading animation
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission delay
            setTimeout(() => {
                // Hide form and show success message with animation
                contactForm.style.opacity = '0';
                
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    
                    const successMessage = document.getElementById('contact-success');
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        
                        setTimeout(() => {
                            successMessage.style.opacity = '1';
                        }, 100);
                    }
                }, 300);
            }, 1500);
        });
    }
});

// Function to initialize new animations
function initNewAnimations() {
    // Add pulse glow effect to CTA buttons
    document.querySelectorAll('.nav-cta, .btn-primary').forEach(button => {
        button.classList.add('btn-animated');
    });
    
    // Add bounce-in animation to service icons
    document.querySelectorAll('.service-icon').forEach((icon, index) => {
        icon.classList.add('bounce-in');
        icon.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add hover effects to cards
    document.querySelectorAll('.service-card, .team-member, .contact-card').forEach(card => {
        card.classList.add('hover-float');
    });
    
    // Add wave animation to hero taglines
    document.querySelectorAll('.hero-tagline').forEach(tag => {
        tag.classList.add('wave');
    });
    
    // Add staggered animation to lists
    document.querySelectorAll('.footer-links ul, .footer-services ul, .service-features').forEach(list => {
        list.classList.add('staggered-animation');
    });
    
    // Add rotate-in animation to section subtitles
    document.querySelectorAll('.section-subtitle').forEach(subtitle => {
        subtitle.classList.add('rotate-in');
    });
    
    // Add shimmer effect to page banner
    document.querySelectorAll('.page-banner').forEach(banner => {
        const shimmerOverlay = document.createElement('div');
        shimmerOverlay.classList.add('shimmer');
        shimmerOverlay.style.position = 'absolute';
        shimmerOverlay.style.top = '0';
        shimmerOverlay.style.left = '0';
        shimmerOverlay.style.width = '100%';
        shimmerOverlay.style.height = '100%';
        shimmerOverlay.style.pointerEvents = 'none';
        shimmerOverlay.style.zIndex = '1';
        banner.style.position = 'relative';
        banner.appendChild(shimmerOverlay);
    });
    
    // Add pulse glow to testimonial quotes
    document.querySelectorAll('.testimonial .quote').forEach(quote => {
        quote.classList.add('pulse-glow');
    });
    
    // Add hover-rotate to social icons
    document.querySelectorAll('.social-links a').forEach(icon => {
        icon.classList.add('hover-rotate');
    });
    
    // Add bounce animation to accordion headers when clicked
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            this.classList.add('bounce-in');
            setTimeout(() => {
                this.classList.remove('bounce-in');
            }, 800);
        });
    });
    
    // Add slide-in-bottom to booking steps when they become active
    const nextButtons = document.querySelectorAll('.next-step');
    if (nextButtons.length > 0) {
        nextButtons.forEach(button => {
            const originalClickHandler = button.onclick;
            button.onclick = function(e) {
                if (originalClickHandler) {
                    originalClickHandler.call(this, e);
                }
                const nextStep = parseInt(this.getAttribute('data-next'));
                const targetFormStep = document.querySelector(`.form-step[data-step="${nextStep}"]`);
                if (targetFormStep) {
                    targetFormStep.classList.add('slide-in-bottom');
                }
            };
        });
    }
}

// Function to handle scroll triggered animations
function initScrollTriggerAnimations() {
    // Add scroll trigger classes to elements
    document.querySelectorAll('.service-content .service-text').forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('scroll-trigger', 'from-left');
        } else {
            el.classList.add('scroll-trigger', 'from-right');
        }
    });
    
    document.querySelectorAll('.service-content .service-image').forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('scroll-trigger', 'from-right');
        } else {
            el.classList.add('scroll-trigger', 'from-left');
        }
    });
    
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('scroll-trigger', 'from-bottom');
    });
    
    document.querySelectorAll('.callback-content, .faq-contact-content, .help-content').forEach(el => {
        el.classList.add('scroll-trigger', 'scale-up');
    });
    
    // Check for elements on page load
    checkScrollTriggers();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkScrollTriggers);
}

// Function to check and activate scroll triggered animations
function checkScrollTriggers() {
    const triggerElements = document.querySelectorAll('.scroll-trigger');
    const windowHeight = window.innerHeight;
    
    triggerElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        if (elementPosition < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

// Update Booking Summary with animation
function updateSummary() {
    // SERVICE DETAILS
    // Get selected service
    const serviceRadio = document.querySelector('input[name="service"]:checked');
    const summaryService = document.getElementById('summary-service');
    
    if (serviceRadio && summaryService) {
        const serviceName = document.querySelector(`label[for="${serviceRadio.id}"] .service-name`).textContent;
        animateText(summaryService, serviceName);
    }
    
    // PERSONAL DETAILS
    // Get name
    const fullName = document.getElementById('fullname').value || '-';
    const summaryName = document.getElementById('summary-name');
    if (summaryName) {
        animateText(summaryName, fullName);
    }
    
    // Get contact info
    const phone = document.getElementById('phone').value || '-';
    const email = document.getElementById('email').value || '-';
    const summaryContact = document.getElementById('summary-contact');
    if (summaryContact) {
        animateText(summaryContact, `${phone} | ${email}`);
    }
    
    // Get user address
    const userAddress = document.getElementById('address').value || '-';
    
    // Get relation with patient
    const relationSelect = document.getElementById('relation-with-patient');
    let relationWithPatient = '-';
    if (relationSelect && relationSelect.selectedIndex > 0) {
        relationWithPatient = relationSelect.options[relationSelect.selectedIndex].text;
    }
    
    // PATIENT DETAILS
    // Get patient name
    const patientName = document.getElementById('patient-name')?.value || '-';
    
    // Get patient age and phone
    const patientAge = document.getElementById('patient-age')?.value || '-';
    const patientPhone = document.getElementById('patient-phone')?.value || '-';
    
    // Get patient location
    const patientAddress = document.getElementById('address')?.value || '-';
    const city = document.getElementById('city')?.value || '-';
    const summaryLocation = document.getElementById('summary-location');
    if (summaryLocation) {
        animateText(summaryLocation, `${patientAddress}, ${city}`);
    }
    
    // Get date and duration
    const startDateInput = document.getElementById('start-date');
    const summaryDate = document.getElementById('summary-date');
    if (startDateInput && summaryDate && startDateInput.value) {
        const startDate = new Date(startDateInput.value);
        const formattedDate = startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        animateText(summaryDate, formattedDate);
    } else if (summaryDate) {
        animateText(summaryDate, '-');
    }
    
    const duration = document.getElementById('duration');
    const summaryDuration = document.getElementById('summary-duration');
    if (duration && summaryDuration && duration.selectedIndex > 0) {
        const durationText = duration.options[duration.selectedIndex].text;
        animateText(summaryDuration, durationText);
    } else if (summaryDuration) {
        animateText(summaryDuration, '-');
    }
    
    // Get patient requirements/condition
    const requirements = document.getElementById('requirements')?.value || '-';
    
    // Enhance the booking summary display with additional information
    updateOrCreateSummaryItem('Patient Name', patientName);
    updateOrCreateSummaryItem('Patient Age', patientAge);
    updateOrCreateSummaryItem('Patient Phone', patientPhone);
    updateOrCreateSummaryItem('Relation', relationWithPatient);
    // updateOrCreateSummaryItem('Special Requirements', requirements);
}

// Helper function to update or create summary items
function updateOrCreateSummaryItem(label, value) {
    const summaryContainer = document.querySelector('.booking-summary');
    if (!summaryContainer) return;
    
    // Check if item exists
    let item = Array.from(summaryContainer.querySelectorAll('.summary-item'))
        .find(el => el.querySelector('.summary-label').textContent === label + ':');
    
    // If it doesn't exist, create it
    if (!item) {
        item = document.createElement('div');
        item.className = 'summary-item';
        
        const labelSpan = document.createElement('span');
        labelSpan.className = 'summary-label';
        labelSpan.textContent = label + ':';
        
        const valueSpan = document.createElement('span');
        valueSpan.className = 'summary-value';
        valueSpan.id = 'summary-' + label.toLowerCase().replace(/\s+/g, '-');
        
        item.appendChild(labelSpan);
        item.appendChild(valueSpan);
        
        // Add to the summary container before the last item (which is usually actions)
        summaryContainer.appendChild(item);
    }
    
    // Update the value with animation
    const valueSpan = item.querySelector('.summary-value');
    animateText(valueSpan, value);
}

// Helper function to animate text updates
function animateText(element, newText) {
    element.classList.add('text-updating');
    setTimeout(() => {
        element.textContent = newText;
        element.classList.remove('text-updating');
        element.classList.add('text-updated');
        setTimeout(() => {
            element.classList.remove('text-updated');
        }, 500);
    }, 300);
} 