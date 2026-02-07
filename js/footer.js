document.addEventListener('DOMContentLoaded', function () {
    // Footer CTA Button
    const footerCtaBtn = document.getElementById('footerCtaBtn');
    const backToTopBtn = document.getElementById('backToTop');

    // Footer CTA Button Click
    footerCtaBtn.addEventListener('click', function () {
        // Button animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);

        // WhatsApp action
        setTimeout(() => {
            const phone = '244941940996';
            const message = encodeURIComponent(
                'Olá! Vi o site da Eduardo Automóveis e gostaria de solicitar uma visita para conhecer as viaturas disponíveis.'
            );
            window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
        }, 300);
    });

    // Back to Top Button
    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scroll for footer links
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Close mobile menu if open
                    const menuToggle = document.querySelector('.menu-toggle');
                    const navMobile = document.querySelector('.nav-mobile');
                    const overlay = document.querySelector('.overlay');

                    if (menuToggle && menuToggle.classList.contains('active')) {
                        menuToggle.classList.remove('active');
                        navMobile.classList.remove('active');
                        overlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }

                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Social media links animation
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) rotate(5deg)';
        });

        icon.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });

    // Map link interaction
    const mapLink = document.querySelector('.map-link');
    if (mapLink) {
        mapLink.addEventListener('mouseenter', function () {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(45deg)';
            }
        });

        mapLink.addEventListener('mouseleave', function () {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0)';
            }
        });
    }

    // Footer wave animation
    const footerWave = document.querySelector('.footer-wave');
    if (footerWave) {
        let wavePosition = 0;
        function animateWave() {
            wavePosition += 0.5;
            footerWave.style.backgroundPositionX = `${wavePosition}px`;
            requestAnimationFrame(animateWave);
        }
        animateWave();
    }

    // Contact items hover effect
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.contact-icon');
            icon.style.transform = 'translateY(-3px)';
        });

        item.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.contact-icon');
            icon.style.transform = 'translateY(0)';
        });
    });
});