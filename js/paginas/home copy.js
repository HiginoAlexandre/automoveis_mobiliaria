// ===== PÁGINA INICIAL - HOME =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ELEMENTOS DO DOM =====
    const carsGrid = document.getElementById('carsGrid');
    const modalOverlay = document.getElementById('carModalOverlay');
    const modal = document.getElementById('carModal');
    const modalClose = document.getElementById('modalClose');
    const modalContent = document.getElementById('modalContent');
    
    // Botões CTA
    const heroPrimaryCTA = document.getElementById('heroPrimaryCTA');
    const heroSecondaryCTA = document.getElementById('heroSecondaryCTA');
    const scheduleVisitBtn = document.getElementById('scheduleVisitBtn');
    const contactTeamBtn = document.getElementById('contactTeamBtn');
    
    // ===== FUNÇÕES AUXILIARES =====
    function formatCurrency(valor) {
        return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    
    function getBadgeClass(status) {
        const badges = {
            'new': 'badge-new',
            'sold': 'badge-sold',
            'negotiable': 'badge-negotiable'
        };
        return badges[status] || 'badge-negotiable';
    }
    
    function getBadgeText(status) {
        const textos = {
            'new': 'NOVO',
            'sold': 'VENDIDO',
            'negotiable': 'NEGOCIÁVEL'
        };
        return textos[status] || 'DISPONÍVEL';
    }
    
    // ===== RENDERIZAR CARROS EM DESTAQUE =====
    function renderizarCarrosDestaque() {
        if (!carsGrid) return;
        
        // Pegar apenas os 6 primeiros carros para destaque
        const carrosDestaque = carrosData.slice(0, 6);
        
        const html = carrosDestaque.map(carro => {
            const badgeClass = getBadgeClass(carro.status || 'negotiable');
            const badgeText = getBadgeText(carro.status || 'negotiable');
            
            return `
                <div class="car-card" data-id="${carro.id}">
                    <div class="car-image-container">
                        <img src="${carro.imagens[0]}" alt="${carro.marca} ${carro.modelo}" class="car-image" loading="lazy">
                        <div class="car-badge ${badgeClass}">${badgeText}</div>
                    </div>
                    
                    <div class="car-content">
                        <div class="car-make-model">
                            <span>${carro.marca} ${carro.modelo}</span>
                            <span class="car-year">${carro.ano}</span>
                        </div>
                        
                        <div class="car-price">
                            <span class="price-currency">KZ</span>
                            ${formatCurrency(carro.preco)}
                        </div>
                        
                        <div class="car-details-list">
                            <div class="car-detail">
                                <div class="detail-icon"><i class="fas fa-tachometer-alt"></i></div>
                                <div class="detail-value">${carro.quilometros}</div>
                                <div class="detail-label">KM</div>
                            </div>
                            
                            <div class="car-detail">
                                <div class="detail-icon"><i class="fas fa-gas-pump"></i></div>
                                <div class="detail-value">${carro.combustivel}</div>
                                <div class="detail-label">Comb.</div>
                            </div>
                            
                            <div class="car-detail">
                                <div class="detail-icon"><i class="fas fa-cogs"></i></div>
                                <div class="detail-value">${carro.cambio}</div>
                                <div class="detail-label">Câmbio</div>
                            </div>
                        </div>
                        
                        <div class="car-tipo-badge" style="background: ${carro.condicao === 'novo' ? '#0F6B3A' : '#3FA66A'}; color: white;">
                            ${carro.condicao === 'novo' ? 'CARRO NOVO' : 'CARRO USADO'}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        carsGrid.innerHTML = html;
        
        // Adicionar eventos de clique aos cards
        document.querySelectorAll('.car-card').forEach(card => {
            card.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                abrirModal(id);
            });
        });
    }
    
    // ===== MODAL DE DETALHES =====
    function abrirModal(id) {
        const carro = carrosData.find(c => c.id === id);
        if (!carro) return;
        
        const badgeClass = getBadgeClass(carro.status || 'negotiable');
        const badgeText = getBadgeText(carro.status || 'negotiable');
        
        modalContent.innerHTML = `
            <div class="modal-gallery">
                <div class="main-image-container">
                    <img src="${carro.imagens[0]}" alt="${carro.marca} ${carro.modelo}" class="main-media">
                </div>
                <div class="thumbnails">
                    ${carro.imagens.map((img, index) => `
                        <img src="${img}" class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                    `).join('')}
                </div>
            </div>
            <div class="modal-details">
                <h2 class="modal-title">${carro.marca} ${carro.modelo}</h2>
                <div class="modal-subtitle">
                    <span>${carro.ano}</span>
                    <span class="car-badge ${badgeClass}" style="position: static;">${badgeText}</span>
                </div>
                
                <div class="modal-price">
                    <span class="modal-price-currency">KZ</span>
                    ${formatCurrency(carro.preco)}
                </div>
                
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-icon"><i class="fas fa-tachometer-alt"></i></div>
                        <div class="spec-content">
                            <h4>Quilometragem</h4>
                            <p>${carro.quilometros}</p>
                        </div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-icon"><i class="fas fa-gas-pump"></i></div>
                        <div class="spec-content">
                            <h4>Combustível</h4>
                            <p>${carro.combustivel}</p>
                        </div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-icon"><i class="fas fa-cogs"></i></div>
                        <div class="spec-content">
                            <h4>Câmbio</h4>
                            <p>${carro.cambio}</p>
                        </div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-icon"><i class="fas fa-palette"></i></div>
                        <div class="spec-content">
                            <h4>Cor</h4>
                            <p>${carro.cor}</p>
                        </div>
                    </div>
                </div>
                
                <div class="car-description">
                    <h3 class="description-title">Descrição</h3>
                    <p class="description-text">${carro.descricao}</p>
                </div>
                
                <div class="modal-cta">
                    <button class="modal-btn modal-btn-primary" id="modalWhatsappBtn">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                    <button class="modal-btn modal-btn-secondary" id="modalCallBtn">
                        <i class="fas fa-phone-alt"></i> Ligar
                    </button>
                </div>
            </div>
        `;
        
        modalOverlay.classList.add('active');
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
        
        // Configurar thumbnails
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.querySelector('.main-media');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                mainImage.src = this.src;
            });
        });
        
        // Configurar botões CTA
        document.getElementById('modalWhatsappBtn').addEventListener('click', function() {
            const mensagem = encodeURIComponent(
                `Olá! Estou interessado no ${carro.marca} ${carro.modelo} ${carro.ano} que vi no site.`
            );
            window.open(`https://wa.me/244947135687?text=${mensagem}`, '_blank');
        });
        
        document.getElementById('modalCallBtn').addEventListener('click', function() {
            window.location.href = 'tel:+244947135687';
        });
    }
    
    function fecharModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    }
    
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
        heroPrimaryCTA.addEventListener('click', function() {
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
        heroSecondaryCTA.addEventListener('click', function() {
            const viaturasSection = document.getElementById('viaturas');
            if (viaturasSection) {
                viaturasSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Botão Agendar Visita
    if (scheduleVisitBtn) {
        scheduleVisitBtn.addEventListener('click', function() {
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
        contactTeamBtn.addEventListener('click', function() {
            window.location.href = 'tel:+244947135687';
        });
    }
    
    // Modal
    if (modalClose) {
        modalClose.addEventListener('click', fecharModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                fecharModal();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            fecharModal();
        }
    });
    
    // ===== INICIALIZAR =====
    renderizarCarrosDestaque();
    
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