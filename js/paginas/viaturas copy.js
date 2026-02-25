// ===== PÁGINA DE VIATURAS =====
document.addEventListener('DOMContentLoaded', function () {

    // ===== VARIÁVEIS GLOBAIS =====
    let dadosFiltrados = [...carrosData];
    let paginaAtual = 1;
    const itensPorPagina = 6;

    // Filtros
    let filtroCondicao = 'todos';
    let filtroMarca = 'todas';
    let filtroPreco = [];
    let filtroCombustivel = [];
    let termoPesquisa = '';

    // Variáveis do modal
    let currentMediaIndex = 0;
    let currentCarro = null;
    let videoAtual = null;

    // ===== ELEMENTOS DO DOM =====
    const itemsGrid = document.getElementById('itemsGrid');
    const marcasGrid = document.getElementById('marcasGrid');
    const pesquisaInput = document.getElementById('pesquisaInput');
    const pesquisaBtn = document.getElementById('pesquisaBtn');
    const resetBtn = document.getElementById('resetFiltros');

    // Contadores e navegação
    const mostrandoInicio = document.getElementById('mostrandoInicio');
    const mostrandoFim = document.getElementById('mostrandoFim');
    const totalResultados = document.getElementById('totalResultados');

    const navTopPrev = document.getElementById('navTopPrev');
    const navTopNext = document.getElementById('navTopNext');
    const navBottomPrev = document.getElementById('navBottomPrev');
    const navBottomNext = document.getElementById('navBottomNext');
    const navTopInfo = document.getElementById('navTopInfo');
    const navBottomInfo = document.getElementById('navBottomInfo');

    // Checkboxes
    const precoCheckboxes = document.querySelectorAll('#precoCheckboxes input[type="checkbox"]');
    const combustivelCheckboxes = document.querySelectorAll('#combustivelCheckboxes input[type="checkbox"]');

    // Modal
    const modalOverlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    const modalContent = document.getElementById('modalContent');

    // ===== FUNÇÕES AUXILIARES =====
    function formatCurrency(valor) {
        return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    function getMarcaIcon(marca) {
        const icons = {
            'Mercedes-Benz': '<i class="fas fa-star"></i>',
            'BMW': '<i class="fas fa-cog"></i>',
            'Audi': '<i class="fas fa-ring"></i>',
            'Toyota': '<i class="fas fa-leaf"></i>',
            'Range Rover': '<i class="fas fa-mountain"></i>',
            'Porsche': '<i class="fas fa-tachometer-alt"></i>'
        };
        return icons[marca] || '<i class="fas fa-car"></i>';
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

    // ===== FUNÇÕES PARA VÍDEO =====
    function pararTodosVideos() {
        if (videoAtual) {
            videoAtual.pause();
            videoAtual.currentTime = 0;
            videoAtual = null;
        }
    }

    function isVideo(media) {
        return media.toLowerCase().includes('.mp4') ||
            media.toLowerCase().includes('.webm') ||
            media.toLowerCase().includes('.ogg');
    }

    // ===== INICIALIZAR MARCAS =====
    function inicializarMarcas() {
        const marcas = [...new Set(carrosData.map(carro => carro.marca))].sort();

        let html = '<button class="marca-btn active" data-marca="todas"><i class="fas fa-th-large"></i> Todas</button>';

        marcas.forEach(marca => {
            html += `
                <button class="marca-btn" data-marca="${marca}">
                    ${getMarcaIcon(marca)} ${marca}
                </button>
            `;
        });

        if (marcasGrid) {
            marcasGrid.innerHTML = html;
        }
    }

    // ===== FUNÇÃO DE PESQUISA =====
    function matchesPesquisa(carro, termo) {
        if (!termo) return true;

        termo = termo.toLowerCase().trim();

        // Pesquisa por preço com operador
        const priceMatch = termo.match(/^([<>]=?|=)?(\d+)$/);
        if (priceMatch) {
            const operator = priceMatch[1] || '=';
            const value = parseInt(priceMatch[2]);

            switch (operator) {
                case '>': return carro.preco > value;
                case '<': return carro.preco < value;
                case '>=': return carro.preco >= value;
                case '<=': return carro.preco <= value;
                case '=': return carro.preco === value;
                default: return carro.preco === value;
            }
        }

        // Pesquisa textual
        const campos = [
            carro.marca,
            carro.modelo,
            carro.ano.toString(),
            carro.combustivel,
            carro.cor
        ].map(c => c.toLowerCase());

        return campos.some(campo => campo.includes(termo));
    }

    // ===== FILTRAR CARROS =====
    function filtrarCarros() {
        let resultados = [...carrosData];

        // Filtrar por condição
        if (filtroCondicao !== 'todos') {
            resultados = resultados.filter(carro => carro.condicao === filtroCondicao);
        }

        // Filtrar por marca
        if (filtroMarca !== 'todas') {
            resultados = resultados.filter(carro => carro.marca === filtroMarca);
        }

        // Filtrar por combustível
        if (filtroCombustivel.length > 0) {
            resultados = resultados.filter(carro => filtroCombustivel.includes(carro.combustivel));
        }

        // Filtrar por preço
        if (filtroPreco.length > 0) {
            resultados = resultados.filter(carro => {
                return filtroPreco.some(faixa => {
                    switch (faixa) {
                        case 'ate-20': return carro.preco <= 20000000;
                        case '20-30': return carro.preco > 20000000 && carro.preco <= 30000000;
                        case '30-40': return carro.preco > 30000000 && carro.preco <= 40000000;
                        case 'acima-40': return carro.preco > 40000000;
                        default: return true;
                    }
                });
            });
        }

        // Filtrar por pesquisa
        if (termoPesquisa) {
            resultados = resultados.filter(carro => matchesPesquisa(carro, termoPesquisa));
        }

        dadosFiltrados = resultados;
        paginaAtual = 1;
        renderizarCarros();
    }

    // ===== RENDERIZAR CARROS =====
    function renderizarCarros() {
        const total = dadosFiltrados.length;
        const inicio = (paginaAtual - 1) * itensPorPagina;
        const fim = Math.min(inicio + itensPorPagina, total);
        const carrosPagina = dadosFiltrados.slice(inicio, fim);

        // Atualizar contadores
        if (totalResultados) totalResultados.textContent = total;
        if (mostrandoInicio) mostrandoInicio.textContent = total > 0 ? inicio + 1 : 0;
        if (mostrandoFim) mostrandoFim.textContent = fim;

        // Atualizar info de paginação
        const totalPaginas = Math.ceil(total / itensPorPagina) || 1;
        const paginaInfo = `Página ${paginaAtual} de ${totalPaginas}`;
        if (navTopInfo) navTopInfo.textContent = paginaInfo;
        if (navBottomInfo) navBottomInfo.textContent = paginaInfo;

        // Atualizar botões de navegação
        const isFirstPage = paginaAtual === 1;
        const isLastPage = fim >= total;

        if (navTopPrev) navTopPrev.disabled = isFirstPage;
        if (navBottomPrev) navBottomPrev.disabled = isFirstPage;
        if (navTopNext) navTopNext.disabled = isLastPage;
        if (navBottomNext) navBottomNext.disabled = isLastPage;

        if (carrosPagina.length === 0) {
            if (itemsGrid) {
                itemsGrid.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <h3>Nenhum carro encontrado</h3>
                        <p>Tente ajustar os filtros ou a pesquisa.</p>
                        <button onclick="window.resetarFiltros()">Ver todos</button>
                    </div>
                `;
            }
            return;
        }

        const html = carrosPagina.map(carro => {
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

        if (itemsGrid) {
            itemsGrid.innerHTML = html;
        }

        // Adicionar eventos aos cards
        document.querySelectorAll('.car-card').forEach(card => {
            card.addEventListener('click', function () {
                const id = parseInt(this.getAttribute('data-id'));
                abrirModal(id);
            });
        });

        // NOVA LINHA: Inicializar hover dos vídeos
        inicializarHoverCards();
    }

    // ===== FUNÇÃO PARA ATUALIZAR MÍDIA NO MODAL =====
    function updateMedia(index) {
        const container = document.getElementById('mainMediaContainer');
        if (!container || !currentCarro) return;

        const media = currentCarro.imagens[index];
        const isVideoFile = isVideo(media);

        // Parar vídeo anterior
        pararTodosVideos();

        currentMediaIndex = index;

        let mediaHTML = '';
        if (isVideoFile) {
            mediaHTML = `
                <div class="video-wrapper">
                    <video class="main-media" id="modalVideo" preload="metadata" loop playsinline>
                        <source src="${media}" type="video/mp4">
                        Seu navegador não suporta vídeos.
                    </video>
                    <button class="video-play-btn" id="videoPlayBtn">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            `;
        } else {
            mediaHTML = `<img src="${media}" alt="Imagem ${index + 1}" class="main-media">`;
        }

        // Se tiver múltiplas mídias, adicionar botões de navegação
        if (currentCarro.imagens.length > 1) {
            container.innerHTML = `
                ${mediaHTML}
                <button class="gallery-nav-btn gallery-nav-prev" id="galleryPrevBtn">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="gallery-nav-btn gallery-nav-next" id="galleryNextBtn">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="gallery-counter">${index + 1}/${currentCarro.imagens.length}</div>
            `;

            // Adicionar eventos aos botões de navegação
            document.getElementById('galleryPrevBtn').addEventListener('click', (e) => {
                e.stopPropagation();
                const newIndex = (currentMediaIndex - 1 + currentCarro.imagens.length) % currentCarro.imagens.length;
                updateMedia(newIndex);
                updateActiveThumbnail(newIndex);
            });

            document.getElementById('galleryNextBtn').addEventListener('click', (e) => {
                e.stopPropagation();
                const newIndex = (currentMediaIndex + 1) % currentCarro.imagens.length;
                updateMedia(newIndex);
                updateActiveThumbnail(newIndex);
            });
        } else {
            container.innerHTML = mediaHTML;
        }

        // Adicionar evento ao botão de play do vídeo
        const playBtn = document.getElementById('videoPlayBtn');
        if (playBtn) {
            playBtn.addEventListener('click', function () {
                const video = document.getElementById('modalVideo');
                if (video) {
                    video.play();
                    video.muted = false;
                    this.style.display = 'none';
                    videoAtual = video;
                }
            });
        }
    }

    function updateActiveThumbnail(index) {
        document.querySelectorAll('.thumbnail, .thumbnail-wrapper').forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    // ===== ABRIR MODAL COM GALERIA =====
    function abrirModal(id) {
        const carro = carrosData.find(c => c.id === id);
        if (!carro) return;

        currentCarro = carro;
        currentMediaIndex = 0;

        const badgeClass = getBadgeClass(carro.status || 'negotiable');
        const badgeText = getBadgeText(carro.status || 'negotiable');

        // Gerar thumbnails
        const thumbnailsHTML = carro.imagens.map((media, index) => {
            const isVideoFile = isVideo(media);
            if (isVideoFile) {
                return `
                    <div class="thumbnail-wrapper" data-index="${index}">
                        <video class="thumbnail" muted preload="metadata">
                            <source src="${media}" type="video/mp4">
                        </video>
                        <div class="thumbnail-play-icon"><i class="fas fa-play"></i></div>
                    </div>
                `;
            } else {
                return `<img src="${media}" class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">`;
            }
        }).join('');

        modalContent.innerHTML = `
            <div class="modal-gallery">
                <div class="main-image-container" id="mainMediaContainer">
                    <!-- Será preenchido pelo updateMedia -->
                </div>
                <div class="thumbnails">
                    ${thumbnailsHTML}
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

        // Atualizar a mídia inicial
        setTimeout(() => {
            updateMedia(0);
        }, 100);

        modalOverlay.classList.add('active');
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';

        // Configurar thumbnails
        setTimeout(() => {
            document.querySelectorAll('.thumbnail, .thumbnail-wrapper').forEach((thumb, index) => {
                thumb.addEventListener('click', function () {
                    currentMediaIndex = index;
                    updateMedia(index);
                    updateActiveThumbnail(index);
                });
            });
        }, 200);

        // Configurar botões CTA
        setTimeout(() => {
            const whatsappBtn = document.getElementById('modalWhatsappBtn');
            const callBtn = document.getElementById('modalCallBtn');

            if (whatsappBtn) {
                whatsappBtn.addEventListener('click', function () {
                    const mensagem = encodeURIComponent(
                        `Olá! Estou interessado no ${carro.marca} ${carro.modelo} ${carro.ano} que vi no site.`
                    );
                    window.open(`https://wa.me/244947135687?text=${mensagem}`, '_blank');
                });
            }

            if (callBtn) {
                callBtn.addEventListener('click', function () {
                    window.location.href = 'tel:+244947135687';
                });
            }
        }, 200);
    }

    function fecharModal() {
        pararTodosVideos();
        modal.classList.remove('active');
        setTimeout(() => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    }

    // ===== HOVER COM VÍDEO SOB DEMANDA (SEM PRÉ-CRIAÇÃO) =====
    function inicializarHoverCards() {
        document.querySelectorAll('.car-card').forEach(card => {
            const imageContainer = card.querySelector('.car-image-container');
            const carId = parseInt(card.getAttribute('data-id'));
            const carro = carrosData.find(c => c.id === carId);

            if (!carro) return;

            // Verificar se o carro tem vídeo
            const videoUrl = carro.imagens.find(img =>
                img.toLowerCase().includes('.mp4') ||
                img.toLowerCase().includes('.webm') ||
                img.toLowerCase().includes('.ogg')
            );

            if (!videoUrl) return; // Sem vídeo, não adiciona eventos

            let videoElement = null;
            let hoverTimeout;

            card.addEventListener('mouseenter', function () {
                // Delay pequeno para evitar ativação acidental ao passar rapidamente
                hoverTimeout = setTimeout(() => {
                    // Criar o vídeo apenas agora
                    videoElement = document.createElement('video');
                    videoElement.className = 'car-image car-hover-video';
                    videoElement.muted = true;
                    videoElement.loop = true;
                    videoElement.playsInline = true;
                    videoElement.preload = 'auto'; // carrega rapidamente

                    const source = document.createElement('source');
                    source.src = videoUrl;
                    source.type = 'video/mp4';
                    videoElement.appendChild(source);

                    // Fallback para outros formatos
                    if (videoUrl.includes('.webm')) {
                        source.type = 'video/webm';
                    } else if (videoUrl.includes('.ogg')) {
                        source.type = 'video/ogg';
                    }

                    // Esconder a imagem e mostrar o vídeo
                    const imgElement = imageContainer.querySelector('img');
                    if (imgElement) imgElement.style.display = 'none';

                    // Adicionar o vídeo ao container e tocar
                    imageContainer.appendChild(videoElement);

                    videoElement.play().catch(e => {
                        console.log('Autoplay bloqueado:', e);
                        // Se falhar, remove o vídeo e mostra a imagem novamente
                        videoElement.remove();
                        videoElement = null;
                        if (imgElement) imgElement.style.display = 'block';
                    });
                }, 1500); // delay de 1500ms
            });

            card.addEventListener('mouseleave', function () {
                clearTimeout(hoverTimeout);

                if (videoElement) {
                    videoElement.pause();
                    videoElement.remove(); // Remove o elemento completamente
                    videoElement = null;
                }

                // Voltar a mostrar a imagem
                const imgElement = imageContainer.querySelector('img');
                if (imgElement) imgElement.style.display = 'block';
            });
        });
    }

    // ===== RESETAR FILTROS =====
    window.resetarFiltros = function () {
        filtroCondicao = 'todos';
        filtroMarca = 'todas';
        filtroPreco = [];
        filtroCombustivel = [];
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

        precoCheckboxes.forEach(cb => cb.checked = false);
        combustivelCheckboxes.forEach(cb => cb.checked = false);

        if (pesquisaInput) pesquisaInput.value = '';

        filtrarCarros();
    };

    // ===== EVENT LISTENERS =====

    // Filtro por condição
    const filtroCondicaoContainer = document.getElementById('filtroCondicao');
    if (filtroCondicaoContainer) {
        filtroCondicaoContainer.addEventListener('click', function (e) {
            const btn = e.target.closest('.filtro-btn');
            if (!btn) return;

            filtroCondicaoContainer.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            filtroCondicao = btn.dataset.filtro;
            filtrarCarros();
        });
    }

    // Filtro por marcas
    if (marcasGrid) {
        marcasGrid.addEventListener('click', function (e) {
            const btn = e.target.closest('.marca-btn');
            if (!btn) return;

            marcasGrid.querySelectorAll('.marca-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            filtroMarca = btn.dataset.marca;
            filtrarCarros();
        });
    }

    // Checkboxes de preço
    precoCheckboxes.forEach(cb => {
        cb.addEventListener('change', function () {
            filtroPreco = Array.from(precoCheckboxes)
                .filter(c => c.checked)
                .map(c => c.value);
            filtrarCarros();
        });
    });

    // Checkboxes de combustível
    combustivelCheckboxes.forEach(cb => {
        cb.addEventListener('change', function () {
            filtroCombustivel = Array.from(combustivelCheckboxes)
                .filter(c => c.checked)
                .map(c => c.value);
            filtrarCarros();
        });
    });

    // Pesquisa
    if (pesquisaInput) {
        pesquisaInput.addEventListener('input', function (e) {
            termoPesquisa = e.target.value;
            filtrarCarros();
        });

        pesquisaInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                termoPesquisa = this.value;
                filtrarCarros();
            }
        });
    }

    if (pesquisaBtn) {
        pesquisaBtn.addEventListener('click', function () {
            termoPesquisa = pesquisaInput ? pesquisaInput.value : '';
            filtrarCarros();
        });
    }

    // Botão reset
    if (resetBtn) {
        resetBtn.addEventListener('click', window.resetarFiltros);
    }

    // Navegação - CORRIGIDO: com preventDefault para evitar scroll
    function mudarPagina(direcao) {
        const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);
        const novaPagina = paginaAtual + direcao;

        if (novaPagina >= 1 && novaPagina <= totalPaginas) {
            paginaAtual = novaPagina;
            renderizarCarros();
            // Não faz scroll
        }
    }

    if (navTopPrev) {
        navTopPrev.addEventListener('click', (e) => {
            e.preventDefault();
            mudarPagina(-1);
        });
    }

    if (navTopNext) {
        navTopNext.addEventListener('click', (e) => {
            e.preventDefault();
            mudarPagina(1);
        });
    }

    if (navBottomPrev) {
        navBottomPrev.addEventListener('click', (e) => {
            e.preventDefault();
            mudarPagina(-1);
        });
    }

    if (navBottomNext) {
        navBottomNext.addEventListener('click', (e) => {
            e.preventDefault();
            mudarPagina(1);
        });
    }

    // Modal
    if (modalClose) {
        modalClose.addEventListener('click', fecharModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) {
                fecharModal();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            fecharModal();
        }
    });

    // ===== INICIALIZAR =====
    inicializarMarcas();
    filtrarCarros();
});

