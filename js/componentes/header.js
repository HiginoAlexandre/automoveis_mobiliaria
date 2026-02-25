// ===== HEADER COMPONENT =====
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');
    const headerCta = document.getElementById('headerCta');
    
    // Verificar se os elementos existem na página atual
    if (menuToggle && menuOverlay && menuClose) {
        // Abrir menu
        menuToggle.addEventListener('click', function() {
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Impede scroll da página
        });
        
        // Fechar menu com botão X
        menuClose.addEventListener('click', function() {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restaura scroll
        });
        
        // Fechar menu clicando no overlay
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Fechar menu com tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Adicionar links do menu para fechar ao clicar
        const menuLinks = document.querySelectorAll('.menu-links a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Botão WhatsApp do header
    if (headerCta) {
        headerCta.addEventListener('click', function() {
            // Animação do botão
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Abrir WhatsApp
            setTimeout(() => {
                const telefone = '244947135687'; // Substitua pelo número correto
                const mensagem = encodeURIComponent('Olá! Gostaria de saber mais sobre os carros disponíveis.');
                window.open(`https://wa.me/${telefone}?text=${mensagem}`, '_blank');
            }, 300);
        });
    }
    
    // Marcar link ativo no menu baseado na URL atual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .menu-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            // Adicionar classe ao item pai (para o menu desktop)
            const parentLi = link.closest('.nav-item');
            if (parentLi) {
                parentLi.classList.add('selected');
            }
            
            // Adicionar classe ao link do menu mobile
            const menuParent = link.closest('.menu-links li');
            if (menuParent) {
                menuParent.classList.add('selected');
            }
        }
    });
});