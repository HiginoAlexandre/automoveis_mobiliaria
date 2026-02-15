// filtros.js - Sistema de filtros e pesquisa

// Variáveis globais
let filtroAtivo = 'todos';
let marcaAtiva = 'todas';
let termoPesquisa = '';
let servicoAtual = 'automoveis';

// Elementos DOM
let viaturasGrid, imoveisGrid, noResults, contadorItens, totalItens;
let searchInput, resetFiltrosBtn;

// Inicialização
function inicializarFiltros() {
    // Configurar elementos DOM
    viaturasGrid = document.getElementById('viaturasGrid');
    imoveisGrid = document.getElementById('imoveisGrid');
    noResults = document.getElementById('noResults');
    contadorItens = document.getElementById('contadorItens');
    totalItens = document.getElementById('totalItens');
    searchInput = document.getElementById('searchInput');
    resetFiltrosBtn = document.getElementById('resetFiltros');
    
    // Determinar serviço atual
    servicoAtual = localStorage.getItem("servicoSelecionado") || "automoveis";
    
    // Carregar dados iniciais
    carregarDadosIniciais();
    
    // Configurar eventos
    configurarEventos();
    
    // Inicializar filtros por marcas (apenas para carros)
    if (servicoAtual === 'automoveis') {
        inicializarMarcas();
    }
}

// Carregar dados iniciais
function carregarDadosIniciais() {
    if (servicoAtual === 'automoveis') {
        totalItens.textContent = carrosData.length;
        renderizarCarros(carrosData);
    } else {
        totalItens.textContent = imoveisData.length;
        renderizarImoveis(imoveisData);
    }
    atualizarContador();
}

// Configurar eventos
function configurarEventos() {
    // Barra de pesquisa
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            termoPesquisa = e.target.value.toLowerCase().trim();
            aplicarFiltros();
        });
    }
    
    // Botão de reset
    if (resetFiltrosBtn) {
        resetFiltrosBtn.addEventListener('click', resetarFiltros);
    }
    
    // Botões de filtro principal
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover classe active de todos
            document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
            // Adicionar classe active ao clicado
            this.classList.add('active');
            // Atualizar filtro ativo
            filtroAtivo = this.dataset.filtro;
            aplicarFiltros();
        });
    });
    
    // Botões de marca
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('marca-btn') || 
            e.target.closest('.marca-btn')) {
            const btn = e.target.classList.contains('marca-btn') ? 
                       e.target : e.target.closest('.marca-btn');
            
            // Remover classe active de todos
            document.querySelectorAll('.marca-btn').forEach(b => b.classList.remove('active'));
            // Adicionar classe active ao clicado
            btn.classList.add('active');
            // Atualizar marca ativa
            marcaAtiva = btn.dataset.marca;
            aplicarFiltros();
        }
    });
}

// Inicializar filtros por marcas
function inicializarMarcas() {
    const marcasGrid = document.getElementById('marcasGrid');
    if (!marcasGrid) return;
    
    // Extrair marcas únicas dos carros
    const marcas = [...new Set(carrosData.map(carro => carro.make))];
    
    // Adicionar botão "Todas as Marcas" primeiro
    let html = '<button class="marca-btn active" data-marca="todas">Todas as Marcas</button>';
    
    // Adicionar cada marca
    marcas.forEach(marca => {
        const icon = getMarcaIcon(marca);
        html += `<button class="marca-btn" data-marca="${marca}">
                    ${icon}<span>${marca}</span>
                 </button>`;
    });
    
    marcasGrid.innerHTML = html;
}

// Obter ícone para cada marca
function getMarcaIcon(marca) {
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
    return icons[marca] || '<i class="fas fa-car"></i>';
}

// Aplicar todos os filtros
function aplicarFiltros() {
    if (servicoAtual === 'automoveis') {
        filtrarCarros();
    } else {
        filtrarImoveis();
    }
}

// Filtrar carros
function filtrarCarros() {
    let resultados = [...carrosData];
    
    // Filtrar por tipo (novo/usado/todos)
    if (filtroAtivo !== 'todos') {
        resultados = resultados.filter(carro => carro.tipo === filtroAtivo);
    }
    
    // Filtrar por marca
    if (marcaAtiva !== 'todas') {
        resultados = resultados.filter(carro => carro.make === marcaAtiva);
    }
    
    // Filtrar por pesquisa
    if (termoPesquisa) {
        resultados = resultados.filter(carro => 
            carro.make.toLowerCase().includes(termoPesquisa) ||
            carro.model.toLowerCase().includes(termoPesquisa) ||
            carro.year.toString().includes(termoPesquisa) ||
            carro.fuel.toLowerCase().includes(termoPesquisa) ||
            carro.color.toLowerCase().includes(termoPesquisa)
        );
    }
    
    renderizarCarros(resultados);
    atualizarContador(resultados.length);
}

// Filtrar imóveis
function filtrarImoveis() {
    let resultados = [...imoveisData];
    
    // Filtrar por tipo (venda/arrendamento/terrenos/todos)
    if (filtroAtivo !== 'todos') {
        resultados = resultados.filter(imovel => imovel.tipo === filtroAtivo);
    }
    
    // Filtrar por pesquisa
    if (termoPesquisa) {
        resultados = resultados.filter(imovel => 
            imovel.titulo.toLowerCase().includes(termoPesquisa) ||
            imovel.localizacao.toLowerCase().includes(termoPesquisa) ||
            imovel.descricao.toLowerCase().includes(termoPesquisa) ||
            imovel.area.toLowerCase().includes(termoPesquisa)
        );
    }
    
    renderizarImoveis(resultados);
    atualizarContador(resultados.length);
}

// Renderizar carros
function renderizarCarros(carros) {
    if (!viaturasGrid) return;
    
    if (carros.length === 0) {
        viaturasGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    const html = carros.map(carro => criarCardCarro(carro)).join('');
    viaturasGrid.innerHTML = html;
    
    // Adicionar eventos aos cards
    document.querySelectorAll('.car-card').forEach(card => {
        card.addEventListener('click', function() {
            const carId = parseInt(this.getAttribute('data-car-id'));
            abrirModalCarro(carId);
        });
    });
}

// Renderizar imóveis
function renderizarImoveis(imoveis) {
    if (!imoveisGrid) return;
    
    if (imoveis.length === 0) {
        imoveisGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    const html = imoveis.map(imovel => criarCardImovel(imovel)).join('');
    imoveisGrid.innerHTML = html;
    
    // Adicionar eventos aos cards
    document.querySelectorAll('.car-card.imoveis').forEach(card => {
        card.addEventListener('click', function() {
            const houseId = parseInt(this.getAttribute('data-house-id'));
            abrirModalCasa(houseId);
        });
    });
}

// Criar card de carro
function criarCardCarro(carro) {
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
                
                <div class="car-tipo-badge" style="margin-top: 15px; padding: 5px 12px; background: ${carro.tipo === 'novo' ? '#0F6B3A' : '#3FA66A'}; color: white; border-radius: 20px; display: inline-block; font-size: 0.8rem; font-weight: 600;">
                    ${carro.tipo === 'novo' ? 'CARRO NOVO' : 'CARRO USADO'}
                </div>
            </div>
        </div>
    `;
}

// Criar card de imóvel
function criarCardImovel(imovel) {
    const badge = getStatusBadge(imovel.status);
    const tipoText = {
        'venda': 'VENDA',
        'arrendamento': 'ARRENDAMENTO',
        'terrenos': 'TERRENO'
    }[imovel.tipo] || 'IMÓVEL';
    
    const tipoColor = {
        'venda': '#0F6B3A',
        'arrendamento': '#3FA66A',
        'terrenos': '#FFA726'
    }[imovel.tipo] || '#0F6B3A';
    
    return `
        <div class="car-card imoveis" data-house-id="${imovel.id}">
            <div class="car-badge ${badge.class}">${badge.text}</div>
            
            <div class="car-image-container">
                <img src="${imovel.imagens[0]}" alt="${imovel.titulo}" class="car-image" loading="lazy">
            </div>
            
            <div class="car-content">
                <div class="car-make-model">
                    <span>${imovel.titulo}</span>
                </div>
                
                <div class="car-price">
                    ${imovel.preco}
                </div>
                
                <div class="car-details-list">
                    <div class="car-detail">
                        <div class="detail-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="detail-value">${imovel.localizacao.split(',')[0]}</div>
                        <div class="detail-label">Localização</div>
                    </div>
                    
                    <div class="car-detail">
                        <div class="detail-icon">
                            <i class="fas fa-expand"></i>
                        </div>
                        <div class="detail-value">${imovel.area}</div>
                        <div class="detail-label">Área</div>
                    </div>
                    
                    <div class="car-detail">
                        <div class="detail-icon">
                            <i class="fas fa-bed"></i>
                        </div>
                        <div class="detail-value">${imovel.quartos}</div>
                        <div class="detail-label">Quartos</div>
                    </div>
                </div>
                
                <div class="car-tipo-badge" style="margin-top: 15px; padding: 5px 12px; background: ${tipoColor}; color: white; border-radius: 20px; display: inline-block; font-size: 0.8rem; font-weight: 600;">
                    ${tipoText}
                </div>
            </div>
        </div>
    `;
}

// Abrir modal de carro (reutilizar função do viaturas.js)
function abrirModalCarro(carId) {
    const carro = carrosData.find(c => c.id === carId);
    if (!carro) return;
    
    // Usar a função openCarModal do viaturas.js se disponível
    if (typeof openCarModal === 'function') {
        openCarModal(carId);
    } else {
        // Fallback simples
        const message = encodeURIComponent(
            `Olá! Estou interessado no ${carro.make} ${carro.model} ${carro.year} que vi no site. Podemos agendar uma visita?`
        );
        window.open(`https://wa.me/244937582133?text=${message}`, '_blank');
    }
}

// Abrir modal de casa (reutilizar função do viaturas.js)
function abrirModalCasa(houseId) {
    const imovel = imoveisData.find(h => h.id === houseId);
    if (!imovel) return;
    
    // Usar a função abrirModalCasa do viaturas.js se disponível
    if (typeof abrirModalCasa === 'function') {
        abrirModalCasa(houseId);
    } else {
        // Fallback simples
        const message = encodeURIComponent(
            `Olá! Estou interessado no imóvel "${imovel.titulo}" que vi no site. Podemos agendar uma visita?`
        );
        window.open(`https://wa.me/244937582133?text=${message}`, '_blank');
    }
}

// Atualizar contador
function atualizarContador(count = null) {
    if (!contadorItens || !totalItens) return;
    
    if (count !== null) {
        contadorItens.textContent = count;
    } else {
        const total = servicoAtual === 'automoveis' ? carrosData.length : imoveisData.length;
        contadorItens.textContent = total;
    }
    
    // Mostrar/ocultar botão de reset
    if (resetFiltrosBtn) {
        const temFiltrosAtivos = filtroAtivo !== 'todos' || marcaAtiva !== 'todas' || termoPesquisa !== '';
        resetFiltrosBtn.style.display = temFiltrosAtivos ? 'flex' : 'none';
    }
}

// Resetar filtros
function resetarFiltros() {
    // Resetar variáveis
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
    
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Aplicar filtros resetados
    aplicarFiltros();
}

// Exportar para uso global
window.inicializarFiltros = inicializarFiltros;
window.aplicarFiltros = aplicarFiltros;
window.resetarFiltros = resetarFiltros;