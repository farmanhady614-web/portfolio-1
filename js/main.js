// ========================================
// Wait for DOM to be fully loaded
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ========================================
    // Loading Animation
    // ========================================
    var loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hide');
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
    
    // ========================================
    // Custom Cursor
    // ========================================
    var cursor = document.querySelector('.cursor');
    var cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(function() {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });
        
        // Hover effect for clickable elements
        var hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .social-link');
        for (var i = 0; i < hoverElements.length; i++) {
            hoverElements[i].addEventListener('mouseenter', function() {
                cursorFollower.style.width = '50px';
                cursorFollower.style.height = '50px';
                cursorFollower.style.opacity = '0.5';
            });
            
            hoverElements[i].addEventListener('mouseleave', function() {
                cursorFollower.style.width = '30px';
                cursorFollower.style.height = '30px';
                cursorFollower.style.opacity = '1';
            });
        }
    }
    
    // ========================================
    // Navigation & Mobile Menu
    // ========================================
    var navToggle = document.querySelector('.nav-toggle');
    var navMenu = document.querySelector('.nav-menu');
    var navLinks = document.querySelectorAll('.nav-link');
    var navbar = document.querySelector('.navbar');
    
    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on nav link
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Update active nav link
    function updateActiveNavLink() {
        var sections = document.querySelectorAll('section');
        var current = '';
        
        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var sectionTop = section.offsetTop;
            var sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        }
        
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].classList.remove('active');
            if (navLinks[i].getAttribute('href') === '#' + current) {
                navLinks[i].classList.add('active');
            }
        }
    }
    
    // ========================================
    // Typing Animation
    // ========================================
    var typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        var roles = ['Web Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'];
        var roleIndex = 0;
        var charIndex = 0;
        var isDeleting = false;
        var typingSpeed = 100;
        
        function typeEffect() {
            var currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        typeEffect();
    }
    
    // ========================================
    // Scroll Reveal Animation
    // ========================================
    var revealElements = document.querySelectorAll('.section, .project-card, .stat-card, .skill-item');
    
    function checkReveal() {
        for (var i = 0; i < revealElements.length; i++) {
            var element = revealElements[i];
            var elementTop = element.getBoundingClientRect().top;
            var elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('reveal', 'active');
            }
        }
    }
    
    // Add reveal class initially
    for (var i = 0; i < revealElements.length; i++) {
        revealElements[i].classList.add('reveal');
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal();
    
    // ========================================
    // Statistics Counter Animation
    // ========================================
    var statNumbers = document.querySelectorAll('.stat-number');
    var animated = false;
    
    function animateNumbers() {
        if (animated) return;
        
        var triggerBottom = window.innerHeight * 0.8;
        var statsSection = document.querySelector('.about-stats');
        
        if (statsSection && statsSection.getBoundingClientRect().top < triggerBottom) {
            for (var i = 0; i < statNumbers.length; i++) {
                var stat = statNumbers[i];
                var target = parseInt(stat.getAttribute('data-count'));
                var current = 0;
                var increment = target / 50;
                
                (function(statElement, targetValue) {
                    var updateCounter = function() {
                        if (current < targetValue) {
                            current += increment;
                            statElement.textContent = Math.ceil(current);
                            setTimeout(updateCounter, 20);
                        } else {
                            statElement.textContent = targetValue;
                        }
                    };
                    updateCounter();
                })(stat, target);
            }
            animated = true;
        }
    }
    
    window.addEventListener('scroll', animateNumbers);
    animateNumbers();
    
    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    var allLinks = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < allLinks.length; i++) {
        allLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var target = document.querySelector(targetId);
            if (target) {
                var offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // ========================================
    // Contact Form Handling
    // ========================================
    var contactForm = document.getElementById('contactForm');
    var formMessage = document.querySelector('.form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            var submitBtn = contactForm.querySelector('.btn-submit');
            var originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(function() {
                showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                setTimeout(function() {
                    if (formMessage) {
                        formMessage.style.display = 'none';
                    }
                }, 5000);
            }, 1500);
        });
    }
    
    function showFormMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = 'form-message ' + type;
            formMessage.style.display = 'block';
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ========================================
    // Dynamic Year for Footer
    // ========================================
    var footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        var currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }
    
    // ========================================
    // Back to Top Button
    // ========================================
    function createBackToTopButton() {
        var button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'back-to-top';
        button.style.cssText = 'position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; border: none; border-radius: 50%; cursor: pointer; opacity: 0; visibility: hidden; transition: all 0.3s ease; z-index: 999; font-size: 1.2rem;';
        
        document.body.appendChild(button);
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });
        
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    createBackToTopButton();
    
    // ========================================
    // Dark Mode Toggle
    // ========================================
    function createDarkModeToggle() {
        var toggle = document.createElement('button');
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        toggle.className = 'dark-mode-toggle';
        toggle.style.cssText = 'position: fixed; bottom: 30px; left: 30px; width: 50px; height: 50px; background: var(--bg-secondary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 50%; cursor: pointer; transition: all 0.3s ease; z-index: 999; font-size: 1.2rem;';
        
        document.body.appendChild(toggle);
        
        // Check for saved theme preference
        var savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        toggle.addEventListener('click', function() {
            var currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                toggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                toggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }
    
    createDarkModeToggle();
    
    // ========================================
    // Add CSS for animations
    // ========================================
    var style = document.createElement('style');
    style.textContent = `
        .resize-animation-stopper * {
            animation: none !important;
            transition: none !important;
        }
        
        .back-to-top:hover,
        .dark-mode-toggle:hover {
            transform: scale(1.1);
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        body.loaded {
            animation: fadeIn 0.5s ease;
        }
        
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Add loaded class to body
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);
    
    // Console log
    console.log('%c🚀 Portfolio Website Loaded Successfully!', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
});

// ========================================
// Handle window resize events
// ========================================
var resizeTimer;
window.addEventListener('resize', function() {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});