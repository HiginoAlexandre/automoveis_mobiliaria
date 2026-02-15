// Página Viaturas - Lógica Completa
document.addEventListener('DOMContentLoaded', function() {
    // ===== VARIÁVEIS GLOBAIS =====
    let carrosFiltrados = [...carrosData];
    let paginaAtual = 1;
    const itensPorPagina = 6;
    
    let filtroAtivo = 'todos'; // todos, novo, usado
    let marcaAtiva = 'todas';
    let termoPesquisa = '';

    // Elementos DOM
    const carsGrid = document.getElementById('carsGrid');
    const marcasGrid = document.getElementById('marcasGrid');
    const filtroCondicao = document.getElementById('filtroCondicao');
    const pesquisaInput = document.getElementById('pesquisaInput');
    const pesquisaBtn = document.getElementById('pesquisaBtn');
    const resetBtn = document.getElementById('resetFiltrosBtn');
    const noResults = document.getElementById('noResults');
    
    const mostrandoInicio = document.getElementById('mostrandoInicio');
    const mostrandoFim = document.getElementById('mostrandoFim');
    const totalResultados = document.getElementById('totalResultados');
    const paginaInfo = document.getElementById('paginaInfo');
    const paginaAnterior = document.getElementById('paginaAnterior');
    const paginaProxima = document.getElementById('paginaProxima');

    // ===== ÍCONES DAS MARCAS =====
    const icons = {
        'Mercedes-Benz': '<i class="fas fa-star"></i>',
        'BMW': '<i class="fas fa-cog"></i>',
        'Audi': '<i class="fas fa-ring"></i>',
        'Toyota': '<i class="fas fa-leaf"></i>',
        'Range Rover': '<i class="fas fa-mountain"></i>',
        'Porsche': '<i class="fas fa-tachometer-alt"></i>',
        'Volvo': '<i class="fas fa-shield-alt"></i>',
        'Lexus': '<i class="fas fa-gem"></i>',
        'Tesla': '<i class="fas fa-bolt"></i>',
        'Jeep': '<i class="fas fa-car"></i>'
    };

    // ===== FUNÇÕES AUXILIARES =====
    function getMarcaIcon(marca) {
        return icons[marca] || '<i class="fas fa-car"></i>';
    }

    function formatCurrency(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    function getStatusBadge(status) {
        const badges = {
            'new': { text: 'NOVO', class: 'badge-new' },
            'sold': { text: 'VENDIDO', class: 'badge-sold' },
            'negotiable': { text: 'NEGOCIÁVEL', class: 'badge-negotiable' }
        };
        return badges[status] || { text: 'DISPONÍVEL', class: 'badge-negotiable' };
    }

    // ===== INICIALIZAR MARCAS =====
    function inicializarMarcas() {
        if (!marcasGrid) return;
        
        const marcas = [...new Set(carrosData.map(carro => carro.make))].sort();
        
        let html = '<button class="marca-btn active" data-marca="todas"><i class="fas fa-th-large"></i> Todas as Marcas</button>';
        
        marcas.forEach(marca => {
            html += `<button class="marca-btn" data-marca="${marca}">
                        ${getMarcaIcon(marca)} <span>${marca}</span>
                     </button>`;
        });
        
        marcasGrid.innerHTML = html;
    }

    // ===== FILTRAR CARROS =====
    function filtrarCarros() {
        let resultados = [...carrosData];
        
        // Filtrar por condição (novo/usado)
        if (filtroAtivo !== 'todos') {
            resultados = resultados.filter(carro => carro.condition === filtroAtivo);
        }
        
        // Filtrar por marca
        if (marcaAtiva !== 'todas') {
            resultados = resultados.filter(carro => carro.make === marcaAtiva);
        }
        
        // Filtrar por pesquisa
        if (termoPesquisa) {
            const termo = termoPesquisa.toLowerCase().trim();
            resultados = resultados.filter(carro => 
                carro.make.toLowerCase().includes(termo) ||
                carro.model.toLowerCase().includes(termo) ||
                carro.year.toString().includes(termo) ||
                carro.fuel.toLowerCase().includes(termo) ||
                carro.color.toLowerCase().includes(termo) ||
                carro.transmission.toLowerCase().includes(termo)
            );
        }
        
        carrosFiltrados = resultados;
        paginaAtual = 1;
        renderizarCarros();
    }

    // ===== RENDERIZAR CARROS =====
    function renderizarCarros() {
        if (!carsGrid) return;
        
        const total = carrosFiltrados.length;
        const inicio = (paginaAtual - 1) * itensPorPagina;
        const fim = Math.min(inicio + itensPorPagina, total);
        const carrosPagina = carrosFiltrados.slice(inicio, fim);
        
        // Atualizar contadores
        totalResultados.textContent = total;
        mostrandoInicio.textContent = total > 0 ? inicio + 1 : 0;
        mostrandoFim.textContent = fim;
        paginaInfo.textContent = `Página ${paginaAtual}`;
        
        // Mostrar/ocultar botões de paginação
        paginaAnterior.disabled = paginaAtual === 1;
        paginaProxima.disabled = fim >= total;
        
        if (carrosPagina.length === 0) {
            carsGrid.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        
        const html = carrosPagina.map(carro => {
            const badge = getStatusBadge(carro.status);
            
            return `
                <div class="car-card" data-car-id="${carro.id}">
                    <div class="car-badge ${badge.class}">${badge.text}</div>
                    
                    <div class="car-image-container">
                        <img src="${carro.images[0]}" alt="${carro.make} ${carro.model}" class="car-image" loading="lazy">
                    </div>
                    
                    <div class="car-content">
                        <div class="car-make-model">
                            <span>${carro.make} ${carro.model}</span>
                            <span class="car-year">${carro.year}</span>
                        </div>
                        
                        <div class="car-price">
                            <span class="price-currency">KZ</span>
                            ${formatCurrency(carro.price)}
                        </div>
                        
                        <div class="car-details-list">
                            <div class="car-detail">
                                <div class="detail-icon">
                                    <i class="fas fa-tachometer-alt"></i>
                                </div>
                                <div class="detail-value">${carro.mileage}</div>
                                <div class="detail-label">Quilometragem</div>
                            </div>
                            
                            <div class="car-detail">
                                <div class="detail-icon">
                                    <i class="fas fa-gas-pump"></i>
                                </div>
                                <div class="detail-value">${carro.fuel}</div>
                                <div class="detail-label">Combustível</div>
                            </div>
                            
                            <div class="car-detail">
                                <div class="detail-icon">
                                    <i class="fas fa-cogs"></i>
                                </div>
                                <div class="detail-value">${carro.transmission.split(' ')[0]}</div>
                                <div class="detail-label">Câmbio</div>
                            </div>
                        </div>
                        
                        <div class="car-tipo-badge" style="margin-top: 15px; padding: 5px 12px; background: ${carro.condition === 'novo' ? '#0F6B3A' : '#3FA66A'}; color: white; border-radius: 20px; display: inline-block; font-size: 0.8rem; font-weight: 600;">
                            ${carro.condition === 'novo' ? 'CARRO NOVO' : 'CARRO USADO'}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        carsGrid.innerHTML = html;
        
        // Adicionar eventos aos cards
        document.querySelectorAll('.car-card').forEach(card => {
            card.addEventListener('click', function() {
                const carId = parseInt(this.getAttribute('data-car-id'));
                abrirModalCarro(carId);
            });
        });
    }

    // ===== ABRIR MODAL DO CARRO =====
    function abrirModalCarro(carId) {
        const carro = carrosData.find(c => c.id === carId);
        if (!carro) return;
        
        // Usar a função do viaturas.js se disponível
        if (typeof openCarModal === 'function') {
            openCarModal(carId);
        } else {
            // Fallback para WhatsApp
            const message = encodeURIComponent(
                `Olá! Estou interessado no ${carro.make} ${carro.model} ${carro.year} que vi no site. Podemos agendar uma visita?`
            );
            window.open(`https://wa.me/244937582133?text=${message}`, '_blank');
        }
    }

    // ===== RESETAR FILTROS =====
    function resetarFiltros() {
        filtroAtivo = 'todos';
        marcaAtiva = 'todas';
        termoPesquisa = '';
        
        // Resetar UI
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filtro === 'todos') {
                btn.classList.add('active');
            }
        });
        
        document.querySelectorAll('.marca-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.marca === 'todas') {
                btn.classList.add('active');
            }
        });
        
        if (pesquisaInput) {
            pesquisaInput.value = '';
        }
        
        filtrarCarros();
    }

    // ===== EVENT LISTENERS =====
    
    // Filtro por condição
    if (filtroCondicao) {
        filtroCondicao.addEventListener('click', function(e) {
            const btn = e.target.closest('.filtro-btn');
            if (!btn) return;
            
            filtroCondicao.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            filtroAtivo = btn.dataset.filtro;
            filtrarCarros();
        });
    }
    
    // Filtro por marcas (delegação de eventos)
    if (marcasGrid) {
        marcasGrid.addEventListener('click', function(e) {
            const btn = e.target.closest('.marca-btn');
            if (!btn) return;
            
            marcasGrid.querySelectorAll('.marca-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            marcaAtiva = btn.dataset.marca;
            filtrarCarros();
        });
    }
    
    // Pesquisa (tempo real)
    if (pesquisaInput) {
        pesquisaInput.addEventListener('input', function(e) {
            termoPesquisa = e.target.value;
            filtrarCarros();
        });
    }
    
    // Botão de pesquisa (opcional)
    if (pesquisaBtn) {
        pesquisaBtn.addEventListener('click', function() {
            termoPesquisa = pesquisaInput.value;
            filtrarCarros();
        });
        
        pesquisaBtn.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                termoPesquisa = pesquisaInput.value;
                filtrarCarros();
            }
        });
    }
    
    // Reset filtros
    if (resetBtn) {
        resetBtn.addEventListener('click', resetarFiltros);
    }
    
    // Paginação
    if (paginaAnterior) {
        paginaAnterior.addEventListener('click', function() {
            if (paginaAtual > 1) {
                paginaAtual--;
                renderizarCarros();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    
    if (paginaProxima) {
        paginaProxima.addEventListener('click', function() {
            const totalPaginas = Math.ceil(carrosFiltrados.length / itensPorPagina);
            if (paginaAtual < totalPaginas) {
                paginaAtual++;
                renderizarCarros();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // ===== INICIALIZAÇÃO =====
    inicializarMarcas();
    filtrarCarros();
    
    // Expor função global para o botão "Ver todos"
    window.resetarFiltros = resetarFiltros;
});