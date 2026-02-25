import { formatCurrency, getBadgeClass, getBadgeText } from './utils.js';

// ===== RENDERIZAÇÃO DE CARDS DE CARRO =====

export function renderCarCards(carros, containerId, isDestaque = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Se for destaque, pegar apenas os 6 primeiros
    const carrosParaRender = isDestaque ? carros.slice(0, 6) : carros;
    
    const html = carrosParaRender.map(carro => {
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
    
    container.innerHTML = html;
    
    // Adicionar eventos de clique aos cards
    document.querySelectorAll('.car-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            // Disparar evento personalizado para o modal
            document.dispatchEvent(new CustomEvent('openCarModal', { detail: { id } }));
        });
    });
    
    return document.querySelectorAll('.car-card');
}