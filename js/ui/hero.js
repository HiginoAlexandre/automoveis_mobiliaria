    // Hero Section Interactions - Background Image Version
    document.addEventListener('DOMContentLoaded', function() {
        const heroPrimaryCTA = document.getElementById('heroPrimaryCTA');
        const heroSecondaryCTA = document.getElementById('heroSecondaryCTA');
        const heroBgImage = document.getElementById('heroBgImage');
        const heroSection = document.getElementById('hero');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        // Primary CTA - WhatsApp
        heroPrimaryCTA.addEventListener('click', function() {
            // Button press animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // WhatsApp action
            setTimeout(() => {
                const phone = '244'; // Angola country code
                const message = encodeURIComponent('Olá! Gostaria de falar com um consultor da Eduardo Automóveis sobre carros e propriedades disponíveis.');
                window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
            }, 300);
        });
        
        // Secondary CTA - Explore Opportunities
        heroSecondaryCTA.addEventListener('click', function() {
            // Button animation
            this.style.transform = 'translateY(-3px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            // Smooth scroll to opportunities section
            const opportunitiesSection = document.querySelector('#oportunidades');
            if (opportunitiesSection) {
                opportunitiesSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                window.scrollBy({ 
                    top: window.innerHeight * 0.8, 
                    behavior: 'smooth' 
                });
            }
        });
        
        // Parallax effect on mouse move
        heroSection.addEventListener('mousemove', function(e) {
            const x = (e.clientX / window.innerWidth - 0.5) * 15;
            const y = (e.clientY / window.innerHeight - 0.5) * 15;
            
            heroBgImage.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
        });
        
        heroSection.addEventListener('mouseleave', function() {
            heroBgImage.style.transform = 'scale(1.1)';
        });
        
        // Scroll indicator click
        scrollIndicator.addEventListener('click', function() {
            window.scrollBy({ 
                top: window.innerHeight * 0.8, 
                behavior: 'smooth' 
            });
        });
        
        // Auto-change background images between cars and houses
        const backgroundImages = [
            'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80', // Car
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80', // Luxury house
            'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80'  // Car interior
        ];
        
        let currentBgIndex = 0;
        
        // Uncomment to enable auto-changing background images
        /*
        function changeBackgroundImage() {
            currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
            heroBgImage.style.opacity = '0.7';
            
            setTimeout(() => {
                heroBgImage.src = backgroundImages[currentBgIndex];
                heroBgImage.style.opacity = '1';
            }, 800);
        }
        
        // Change background every 10 seconds
        setInterval(changeBackgroundImage, 10000);
        */
        
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '50px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate service cards sequentially
                    if (entry.target.classList.contains('hero-content')) {
                        const serviceCards = document.querySelectorAll('.service-card');
                        serviceCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 300 + (index * 150));
                        });
                    }
                }
            });
        }, observerOptions);
        
        // Observe hero content for scroll animations
        const heroContent = document.querySelector('.hero-content');
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(40px)';
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(heroContent);
        }
        
        // Initial state for service cards
        serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease';
        });
        
        // Hover effects for service cards
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.service-icon');
                icon.style.transform = 'rotate(5deg) scale(1.05)';
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.service-icon');
                icon.style.transform = 'rotate(0) scale(1)';
            });
        });
        
        // Handle scroll events
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            
            // Hide scroll indicator when scrolled past hero
            if (scrollPosition > heroHeight * 0.3) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
            
            // Parallax effect on scroll
            const scrolled = scrollPosition / heroHeight;
            heroBgImage.style.transform = `scale(${1.1 + scrolled * 0.04})`;
        });
    });