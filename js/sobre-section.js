 document.addEventListener('DOMContentLoaded', function() {
        // CTA Buttons
        const scheduleVisitBtn = document.getElementById('scheduleVisitBtn');
        const contactTeamBtn = document.getElementById('contactTeamBtn');
        
        // Schedule Visit Button
        scheduleVisitBtn.addEventListener('click', function() {
            // Button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show schedule modal or redirect to WhatsApp
            setTimeout(() => {
                const message = encodeURIComponent(
                    'Olá! Gostaria de agendar uma visita à Eduardo Automóveis para conhecer o showroom e as viaturas disponíveis.'
                );
                window.open(`https://wa.me/244937582133?text=${message}`, '_blank');
            }, 300);
        });
        
        // Contact Team Button
        contactTeamBtn.addEventListener('click', function() {
            // Button animation
            this.style.transform = 'translateY(-3px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            // Show contact options
            // setTimeout(() => {
                // alert("📞 Contacte a Nossa Equipa:\n\n" +
                //       "• WhatsApp: +244 123 456 789\n" +
                //       "• Telefone: +244 222 333 444\n" +
                //       "• Email: info@eduardoautomoveis.com\n\n" +
                //       "Estamos disponíveis para esclarecer todas as suas dúvidas!");
            // }, 300);
            window.location.href = 'tel:+244937582133';
        });
        
        // Animated Counter
        function animateCounter(elementId, targetValue, duration = 2000) {
            const element = document.getElementById(elementId);
            const startValue = 0;
            const increment = targetValue / (duration / 16); // 60fps
            let currentValue = startValue;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    element.textContent = targetValue.toLocaleString('pt-PT');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(currentValue).toLocaleString('pt-PT');
                }
            }, 16);
        }
        
        // Start counters when section is in view
        const aboutSection = document.getElementById('sobre');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start counters
                    animateCounter('yearsCounter', 12);
                    animateCounter('carsSoldCounter', 850);
                    animateCounter('clientsCounter', 1200);
                    
                    // Stop observing after animation starts
                    observer.unobserve(aboutSection);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(aboutSection);
        
        // Company image hover effect
        const companyImage = document.querySelector('.company-image');
        if (companyImage) {
            companyImage.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            companyImage.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
        
        // Map interaction
        const mapIframe = document.querySelector('.map-iframe');
        const mapContainer = document.querySelector('.map-container');
        
        if (mapContainer) {
            mapContainer.addEventListener('mouseenter', function() {
                const overlay = this.querySelector('.map-overlay');
                if (overlay) {
                    overlay.style.opacity = '0.95';
                }
            });
            
            mapContainer.addEventListener('mouseleave', function() {
                const overlay = this.querySelector('.map-overlay');
                if (overlay) {
                    overlay.style.opacity = '1';
                }
            });
        }
        
        // Value items animation on scroll
        const valueItems = document.querySelectorAll('.value-item');
        const valueObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.2 });
        
        valueItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            valueObserver.observe(item);
        });
    });