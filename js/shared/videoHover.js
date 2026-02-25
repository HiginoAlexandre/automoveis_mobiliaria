import { isVideo } from './utils.js';

// ===== HOVER COM VÍDEO SOB DEMANDA =====

export function initVideoHover(carrosData) {
    document.querySelectorAll('.car-card').forEach(card => {
        const imageContainer = card.querySelector('.car-image-container');
        const carId = parseInt(card.getAttribute('data-id'));
        const carro = carrosData.find(c => c.id === carId);

        if (!carro) return;

        // Verificar se o carro tem vídeo
        const videoUrl = carro.imagens.find(img => isVideo(img));

        if (!videoUrl) return; // Sem vídeo, não adiciona eventos

        let videoElement = null;
        let hoverTimeout;

        card.addEventListener('mouseenter', function () {
            hoverTimeout = setTimeout(() => {
                // Criar o vídeo apenas agora
                videoElement = document.createElement('video');
                videoElement.className = 'car-image car-hover-video';
                videoElement.muted = true;
                videoElement.loop = true;
                videoElement.playsInline = true;
                videoElement.preload = 'auto';

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
                videoElement.remove();
                videoElement = null;
            }

            const imgElement = imageContainer.querySelector('img');
            if (imgElement) imgElement.style.display = 'block';
        });
    });
}