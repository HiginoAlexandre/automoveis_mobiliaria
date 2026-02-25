// ===== FOOTER COMPONENT =====
document.addEventListener('DOMContentLoaded', function() {
    
    // Botão Voltar ao Topo
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        // Mostrar/esconder botão baseado no scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // Scroll suave para o topo ao clicar
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Botão CTA do Footer
    const footerCta = document.getElementById('footerCtaBtn');
    
    if (footerCta) {
        footerCta.addEventListener('click', function() {
            // Animação do botão
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Abrir WhatsApp
            setTimeout(() => {
                const telefone = '244947135687'; // Substitua pelo número correto
                const mensagem = encodeURIComponent(
                    'Olá! Vi o site da Eduardo Automóveis e gostaria de solicitar uma visita para conhecer as viaturas disponíveis.'
                );
                window.open(`https://wa.me/${telefone}?text=${mensagem}`, '_blank');
            }, 300);
        });
    }
    
    // Links do Footer - scroll suave para âncoras
    const footerLinks = document.querySelectorAll('.footer-link');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Verificar se é um link âncora (começa com #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Animação dos ícones sociais
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animação dos itens de contato
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'translateY(-3px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Atualizar ano automaticamente no copyright
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2026', currentYear);
    }
});