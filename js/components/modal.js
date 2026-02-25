import { formatCurrency, getBadgeClass, getBadgeText, isVideo } from '../shared/utils.js';

// ===== MODAL DE DETALHES DO CARRO =====

export function initModal(carrosData) {
    const modalOverlay = document.getElementById('carModalOverlay') || document.getElementById('modalOverlay');
    const modal = document.getElementById('carModal') || document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    const modalContent = document.getElementById('modalContent');
    
    if (!modalOverlay || !modal || !modalClose || !modalContent) return;

    let currentMediaIndex = 0;
    let currentCarro = null;
    let videoAtual = null;

    // Funções internas do modal
    function pararTodosVideos() {
        if (videoAtual) {
            videoAtual.pause();
            videoAtual.currentTime = 0;
            videoAtual = null;
        }
    }

    function updateMedia(index) {
        const container = document.getElementById('mainMediaContainer');
        if (!container || !currentCarro) return;

        const media = currentCarro.imagens[index];
        const isVideoFile = isVideo(media);

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

    function abrirModal(id) {
        const carro = carrosData.find(c => c.id === id);
        if (!carro) return;

        currentCarro = carro;
        currentMediaIndex = 0;

        const badgeClass = getBadgeClass(carro.status || 'negotiable');
        const badgeText = getBadgeText(carro.status || 'negotiable');

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

        setTimeout(() => {
            updateMedia(0);
        }, 100);

        modalOverlay.classList.add('active');
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            document.querySelectorAll('.thumbnail, .thumbnail-wrapper').forEach((thumb, index) => {
                thumb.addEventListener('click', function () {
                    currentMediaIndex = index;
                    updateMedia(index);
                    updateActiveThumbnail(index);
                });
            });
        }, 200);

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

    // Event listeners do modal
    modalClose.addEventListener('click', fecharModal);
    
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            fecharModal();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            fecharModal();
        }
    });

    // Ouvir evento personalizado para abrir modal
    document.addEventListener('openCarModal', function (e) {
        abrirModal(e.detail.id);
    });

    return { abrirModal, fecharModal };
}