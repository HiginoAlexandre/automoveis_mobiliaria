import { renderCarCards } from '../shared/carCard.js';
import { initVideoHover } from '../shared/videoHover.js';
import { initModal } from '../components/modal.js';

document.addEventListener('DOMContentLoaded', function () {

    // ===== ELEMENTOS DO DOM =====
    const heroPrimaryCTA = document.getElementById('heroPrimaryCTA');
    const heroSecondaryCTA = document.getElementById('heroSecondaryCTA');
    const scheduleVisitBtn = document.getElementById('scheduleVisitBtn');
    const contactTeamBtn = document.getElementById('contactTeamBtn');

    // ===== INICIALIZAR MODAL =====
    initModal(carrosData);

    // ===== RENDERIZAR CARROS EM DESTAQUE =====
    renderCarCards(carrosData, 'carsGrid', true);

    // ===== INICIALIZAR HOVER DOS VÍDEOS =====
    initVideoHover(carrosData);

    // ===== CONTADORES ANIMADOS =====
    function animarContador(elementId, valorFinal, duracao = 2000) {
        const elemento = document.getElementById(elementId);
        if (!elemento) return;

        let valorAtual = 0;
        const incremento = valorFinal / (duracao / 16);

        const timer = setInterval(() => {
            valorAtual += incremento;
            if (valorAtual >= valorFinal) {
                elemento.textContent = valorFinal.toLocaleString('pt-PT');
                clearInterval(timer);
            } else {
                elemento.textContent = Math.floor(valorAtual).toLocaleString('pt-PT');
            }
        }, 16);
    }

    // ===== EVENT LISTENERS =====

    // Hero CTA - WhatsApp
    if (heroPrimaryCTA) {
        heroPrimaryCTA.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = '', 150);

            setTimeout(() => {
                const mensagem = encodeURIComponent('Olá! Gostaria de falar com um consultor da Eduardo Automóveis.');
                window.open(`https://wa.me/244947135687?text=${mensagem}`, '_blank');
            }, 300);
        });
    }

    // Hero CTA - Explorar
    if (heroSecondaryCTA) {
        heroSecondaryCTA.addEventListener('click', function () {
            // Navega para a página de viaturas com um parâmetro na URL
            window.location.href = 'viaturas.html#pesquisaInput';
            // viaturasSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Botão Agendar Visita
    if (scheduleVisitBtn) {
        scheduleVisitBtn.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = '', 150);

            setTimeout(() => {
                const mensagem = encodeURIComponent(
                    'Olá! Gostaria de agendar uma visita para conhecer o showroom e as viaturas disponíveis.'
                );
                window.open(`https://wa.me/244947135687?text=${mensagem}`, '_blank');
            }, 300);
        });
    }

    // Botão Falar com Equipa
    if (contactTeamBtn) {
        contactTeamBtn.addEventListener('click', function () {
            window.location.href = 'tel:+244947135687';
        });
    }

    // Observar seção "sobre" para iniciar contadores
    const aboutSection = document.getElementById('sobre');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animarContador('yearsCounter', 12);
                    animarContador('carsSoldCounter', 850);
                    animarContador('clientsCounter', 1200);
                    observer.unobserve(aboutSection);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(aboutSection);
    }
});