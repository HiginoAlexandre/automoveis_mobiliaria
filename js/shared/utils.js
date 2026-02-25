// ===== FUNÇÕES UTILITÁRIAS COMPARTILHADAS =====

// Formatar moeda (KZ)
export function formatCurrency(valor) {
    return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Obter classe do badge baseado no status
export function getBadgeClass(status) {
    const badges = {
        'new': 'badge-new',
        'sold': 'badge-sold',
        'negotiable': 'badge-negotiable'
    };
    return badges[status] || 'badge-negotiable';
}

// Obter texto do badge baseado no status
export function getBadgeText(status) {
    const textos = {
        'new': 'NOVO',
        'sold': 'VENDIDO',
        'negotiable': 'NEGOCIÁVEL'
    };
    return textos[status] || 'DISPONÍVEL';
}

// Ícones das marcas
export function getMarcaIcon(marca) {
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

// Verificar se é vídeo
export function isVideo(media) {
    return media.toLowerCase().includes('.mp4') ||
        media.toLowerCase().includes('.webm') ||
        media.toLowerCase().includes('.ogg');
}