(function() {
    'use strict';

    // ========================================
    // LOADER
    // ========================================
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hide');
            setTimeout(() => { if (loader) loader.style.display = 'none'; }, 400);
        }, 600);
    });
    setTimeout(() => {
        if (loader && !loader.classList.contains('hide')) {
            loader.classList.add('hide');
            setTimeout(() => { if (loader) loader.style.display = 'none'; }, 400);
        }
    }, 3000);

    // ========================================
    // DARK MODE TOGGLE
    // ========================================
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlEl = document.documentElement;

    function setTheme(theme) {
        if (theme === 'dark') {
            htmlEl.setAttribute('data-theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            htmlEl.removeAttribute('data-theme');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem('theme', theme);
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    darkModeToggle.addEventListener('click', () => {
        const current = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(current);
    });

    // ========================================
    // NAVIGATION
    // ========================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle('scrolled', scrolled);
        backToTop.classList.toggle('visible', window.scrollY > 500);
        updateActiveNavLink();
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        let currentId = '';
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top) {
                currentId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentId) {
                link.classList.add('active');
            }
        });
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = target.offsetTop - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });

    // ========================================
    // TYPING EFFECT
    // ========================================
    const typedEl = document.getElementById('typedText');
    if (typedEl) {
        const roles = ['Web Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'];
        let roleIdx = 0, charIdx = 0, deleting = false;

        function type() {
            const current = roles[roleIdx];
            typedEl.textContent = current.substring(0, charIdx);
            let speed = 80;
            if (deleting) {
                charIdx--;
                speed = 40;
            } else {
                charIdx++;
            }
            if (!deleting && charIdx === current.length + 1) {
                deleting = true;
                speed = 1800;
            } else if (deleting && charIdx === 0) {
                deleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                speed = 400;
            }
            setTimeout(type, speed);
        }
        type();
    }

    // ========================================
    // SCROLL REVEAL
    // ========================================
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));

    // ========================================
    // SKILL PROGRESS ANIMATION
    // ========================================
    const progressBars = document.querySelectorAll('.skill-progress');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.getAttribute('data-width');
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));

    // ========================================
    // COUNTER ANIMATION
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        const trigger = window.innerHeight * 0.85;
        const firstStat = statNumbers[0];
        if (!firstStat) return;
        if (firstStat.getBoundingClientRect().top < trigger) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 1500;
                const startTime = performance.now();

                function update(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    stat.textContent = Math.floor(eased * target);
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        stat.textContent = target;
                    }
                }
                requestAnimationFrame(update);
            });
            countersAnimated = true;
        }
    }
    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ========================================
    // CONTACT FORM
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showFormMsg('Please fill in all fields.', 'error');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showFormMsg('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showFormMsg('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
            }, 1500);
        });
    }

    function showFormMsg(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
    }

    // ========================================
    // DYNAMIC FOOTER YEAR
    // ========================================
    const footerYear = document.getElementById('footerYear');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // Initial call
    updateActiveNavLink();
    console.log('%c🚀 Portfolio Ready — Farman Hadi', 'color:#6366f1;font-size:14px;font-weight:bold;');
})();