// Elementos DOM
const mainHeader = document.getElementById('mainHeader');
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
const overlay = document.getElementById('overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');
const ctaButtons = document.querySelectorAll('.cta-button');

// Header sticky com sombra ao scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainHeader.classList.add('scrolled');
    } else {
        mainHeader.classList.remove('scrolled');
    }
});

// Abrir/fechar menu mobile
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMobile.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
});

// Fechar menu ao clicar no overlay
overlay.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMobile.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Fechar menu ao clicar em um link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Ação do botão CTA
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Mensagem personalizada para WhatsApp
        const message = encodeURIComponent(
            'Olá! Gostaria de saber mais sobre os serviços da Eduardo Automóveis / Beduardo Investimento. Podem ajudar-me?'
        );
        // Redireciona para WhatsApp com número 937582133 (Angola - código +244)
        window.open(`https://wa.me/244937582133?text=${message}`, '_blank');
    });
});

// Fechar menu ao redimensionar a janela (se voltar para desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const trocaServicoBtns = document.querySelectorAll("#troca-servico-btn a");

    // Verifica o estado salvo no localStorage e ajusta a exibição
    const estadoSalvo = localStorage.getItem("servicoSelecionado");
    if (estadoSalvo) {
        mostrarTudo(estadoSalvo);
        ocultarTudo(estadoSalvo === "automoveis" ? "imoveis" : "automoveis");
        trocaServicoBtns.forEach((btn) => {
            if (btn.id === `${estadoSalvo}-btn`) {
                btn.classList.add("selected");
            } else {
                btn.classList.remove("selected");
            }
        });
    }

    trocaServicoBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault(); // Previne o comportamento padrão do link

            // Remove a classe 'selected' de todos os botões
            trocaServicoBtns.forEach((b) => b.classList.remove("selected"));

            // Adiciona a classe 'selected' ao botão clicado
            btn.classList.add("selected");

            // Salva o estado no localStorage
            const servico = btn.id === "automoveis-btn" ? "automoveis" : "imoveis";
            localStorage.setItem("servicoSelecionado", servico);

            if (btn.id === "automoveis-btn") {
                mostrarTudo("automoveis");
                ocultarTudo("imoveis");
            } else if (btn.id === "imoveis-btn") {
                mostrarTudo("imoveis");
                ocultarTudo("automoveis");
            }
        });
    });
});

function ocultarTudo(classe = "imoveis") {
    const imoveisElements = document.querySelectorAll(`.${classe}`);
    imoveisElements.forEach(el => el.classList.add('none'));
}

function mostrarTudo(classe = "imoveis") {
    const imoveisElements = document.querySelectorAll(`.${classe}`);
    imoveisElements.forEach(el => {
        el.classList.remove('none');
        el.classList.add('fade-in'); // Adiciona a classe de animação

        // Remove a classe de animação após a conclusão para reutilização
        el.addEventListener('animationend', () => {
            el.classList.remove('fade-in');
        }, { once: true });
    });
}