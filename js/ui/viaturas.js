// Featured Cars Data (Can be loaded from JSON file)
const carsData = [
    {
        id: 1,
        make: "Mercedes-Benz",
        model: "Classe C 220d AMG Line",
        year: 2021,
        price: 32500000,
        mileage: "15.000 KM",
        fuel: "Diesel",
        transmission: "Automático 9G-Tronic",
        engine: "2.0L 4 cilindros",
        color: "Cinza Iridium Metallic",
        origin: "Importação Alemanha",
        status: "new",
        images: [
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1563720223485-8d6d5c5c8c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Mercedes-Benz Classe C 220d AMG Line, importado da Alemanha em excelente estado. Equipamento completo: bancos em pele, sistema de som Burmester, teto panorâmico, assistentes de condução, faróis full LED. Veículo único no mercado."
    },
    {
        id: 2,
        make: "BMW",
        model: "Série 5 530e M Sport",
        year: 2022,
        price: 28500000,
        mileage: "8.500 KM",
        fuel: "Híbrido (Gasolina/Elétrico)",
        transmission: "Automático Steptronic",
        engine: "2.0L Hybrid 292cv",
        color: "Azul Tanzanite Metallic",
        origin: "Portugal",
        status: "negotiable",
        images: [
            "https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "BMW Série 5 530e M Sport, veículo híbrido plug-in com baixíssimo consumo. Pack M Sport completo, interior em pele Vernasca, heads-up display, park assist, comandos por gestos. Manutenção sempre na marca."
    },
    {
        id: 3,
        make: "Audi",
        model: "Q7 50 TDI Quattro",
        year: 2020,
        price: 29500000,
        mileage: "35.000 KM",
        fuel: "Diesel",
        transmission: "Automático Tiptronic",
        engine: "3.0L V6 286cv",
        color: "Preto Mythos Metallic",
        origin: "Bélgica",
        status: "new",
        images: [
            "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Audi Q7 50 TDI Quattro, SUV premium de 7 lugares. Pack S line, teto panorâmico, bancos elétricos com memória, sistema de som Bang & Olufsen, air suspension. Veículo familiar espaçoso e luxuoso."
    },
    {
        id: 4,
        make: "Range Rover",
        model: "Evoque R-Dynamic",
        year: 2021,
        price: 27500000,
        mileage: "22.000 KM",
        fuel: "Gasolina",
        transmission: "Automático 9 velocidades",
        engine: "2.0L 4 cilindros 249cv",
        color: "Branco Fuji",
        origin: "Reino Unido",
        status: "sold",
        images: [
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Range Rover Evoque R-Dynamic, SUV compacto premium. Pack R-Dynamic, interior em pele Windsor, sistema de infoentretenimento Touch Pro Duo, Meridian Sound System, assistente de estacionamento 360°."
    },
    {
        id: 5,
        make: "Porsche",
        model: "Cayenne S",
        year: 2019,
        price: 38500000,
        mileage: "45.000 KM",
        fuel: "Gasolina",
        transmission: "PDK Automático",
        engine: "2.9L V6 Biturbo 440cv",
        color: "Carmim Red Metallic",
        origin: "Alemanha",
        status: "negotiable",
        images: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Porsche Cayenne S, performance SUV com motor V6 biturbo. Pack Sport Chrono, interior em pele full, sunroof panorâmico, Porsche Sport Exhaust, rodas 21\", sistema de som Bose. Veículo esportivo e familiar."
    },
    {
        id: 6,
        make: "Toyota",
        model: "Land Cruiser V8",
        year: 2022,
        price: 42500000,
        mileage: "12.000 KM",
        fuel: "Diesel",
        transmission: "Automático 8 velocidades",
        engine: "4.5L V8 Turbo Diesel",
        color: "Prata Metallic",
        origin: "Japão",
        status: "new",
        images: [
            "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Toyota Land Cruiser V8, o SUV definitivo para todo o terreno. Motor V8 diesel, tração integral permanente, KDSS, sistema de som JBL, bancos em pele ventilados, 7 lugares. Robustez e conforto premium."
    }
];

// DOM Elements
const carsGrid = document.getElementById('carsGrid');
const carModalOverlay = document.getElementById('carModalOverlay');
const carModal = document.getElementById('carModal');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');

// Format currency (KZ)
function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Get status badge
function getStatusBadge(status) {
    const badges = {
        'new': { text: 'NOVO', class: 'badge-new' },
        'sold': { text: 'VENDIDO', class: 'badge-sold' },
        'negotiable': { text: 'NEGOCIÁVEL', class: 'badge-negotiable' }
    };
    return badges[status] || { text: 'DISPONÍVEL', class: 'badge-negotiable' };
}

// Create car card HTML
function createCarCard(car) {
    const badge = getStatusBadge(car.status);

    return `
            <div class="car-card" data-car-id="${car.id}" style="animation-delay: ${car.id * 0.1}s">
                ${car.status !== 'sold' ? `<div class="car-badge ${badge.class}">${badge.text}</div>` : ''}
                
                <div class="car-image-container">
                    <img src="${car.images[0]}" alt="${car.make} ${car.model}" class="car-image" loading="lazy">
                </div>
                
                <div class="car-content">
                    <div class="car-make-model">
                        <span>${car.make} ${car.model}</span>
                        <span class="car-year">${car.year}</span>
                    </div>
                    
                    <div class="car-price">
                        <span class="price-currency">KZ</span>
                        ${formatCurrency(car.price)}
                    </div>
                    
                    <div class="car-details-list">
                        <div class="car-detail">
                            <div class="detail-icon">
                                <i class="fas fa-tachometer-alt"></i>
                            </div>
                            <div class="detail-value">${car.mileage}</div>
                            <div class="detail-label">Quilometragem</div>
                        </div>
                        
                        <div class="car-detail">
                            <div class="detail-icon">
                                <i class="fas fa-gas-pump"></i>
                            </div>
                            <div class="detail-value">${car.fuel}</div>
                            <div class="detail-label">Combustível</div>
                        </div>
                        
                        <div class="car-detail">
                            <div class="detail-icon">
                                <i class="fas fa-cogs"></i>
                            </div>
                            <div class="detail-value">${car.transmission.split(' ')[0]}</div>
                            <div class="detail-label">Câmbio</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
}

// Create modal HTML
function createModalContent(car) {
    const badge = getStatusBadge(car.status);

    return `
            <div class="modal-gallery">
                <div class="main-image-container">
                    <img src="${car.images[0]}" alt="${car.make} ${car.model}" class="main-car-image" id="mainCarImage">
                </div>
                <div class="thumbnails-container" id="thumbnailsContainer">
                    ${car.images.map((img, index) => `
                        <img src="${img}" 
                             alt="${car.make} ${car.model} - Foto ${index + 1}" 
                             class="thumbnail ${index === 0 ? 'active' : ''}"
                             data-index="${index}">
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-details">
                <div class="modal-header">
                    <h2 class="modal-title">${car.make} ${car.model}</h2>
                    <div class="modal-subtitle">
                        <span>${car.year} • ${car.origin}</span>
                        <span class="modal-status ${badge.class}">${badge.text}</span>
                    </div>
                    
                    <div class="modal-price">
                        <span class="modal-price-currency">KZ</span>
                        ${formatCurrency(car.price)}
                    </div>
                </div>
                
                <div class="specs-grid">
                    <div class="spec-item">
                        <div class="spec-icon">
                            <i class="fas fa-tachometer-alt"></i>
                        </div>
                        <div class="spec-content">
                            <h4>Quilometragem</h4>
                            <p>${car.mileage}</p>
                        </div>
                    </div>
                    
                    <div class="spec-item">
                        <div class="spec-icon">
                            <i class="fas fa-gas-pump"></i>
                        </div>
                        <div class="spec-content">
                            <h4>Combustível</h4>
                            <p>${car.fuel}</p>
                        </div>
                    </div>
                    
                    <div class="spec-item">
                        <div class="spec-icon">
                            <i class="fas fa-cogs"></i>
                        </div>
                        <div class="spec-content">
                            <h4>Câmbio</h4>
                            <p>${car.transmission}</p>
                        </div>
                    </div>
                    
                    <div class="spec-item">
                        <div class="spec-icon">
                            <i class="fas fa-car-battery"></i>
                        </div>
                        <div class="spec-content">
                            <h4>Motor</h4>
                            <p>${car.engine}</p>
                        </div>
                    </div>
                    
                    <div class="spec-item">
                        <div class="spec-icon">
                            <i class="fas fa-palette"></i>
                        </div>
                        <div class="spec-content">
                            <h4>Cor</h4>
                            <p>${car.color}</p>
                        </div>
                    </div>
                    
                    <div class="spec-item">
                        <div class="spec-icon">
                            <i class="fas fa-flag"></i>
                        </div>
                        <div class="spec-content">
                            <h4>Origem</h4>
                            <p>${car.origin}</p>
                        </div>
                    </div>
                </div>
                
                <div class="car-description">
                    <h3 class="description-title">Descrição da Viatura</h3>
                    <p class="description-text">${car.description}</p>
                </div>
                
                <div class="modal-cta">
                    <button class="modal-btn-primary" id="whatsappBtn">
                        <i class="fab fa-whatsapp"></i>
                        Solicitar visita via WhatsApp
                    </button>
                    <button class="modal-btn-secondary" id="callBtn">
                        <i class="fas fa-phone-alt"></i>
                        Ligar agora
                    </button>
                </div>
            </div>
        `;
}

// Open modal with car details
function openCarModal(carId) {
    const car = carsData.find(c => c.id === carId);
    if (!car) return;

    modalContent.innerHTML = createModalContent(car);
    carModalOverlay.classList.add('active');
    setTimeout(() => carModal.classList.add('active'), 10);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Setup thumbnail click events
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainCarImage');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function () {
            const imgIndex = this.getAttribute('data-index');
            mainImage.src = car.images[imgIndex];

            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Setup CTA buttons
    const whatsappBtn = document.getElementById('whatsappBtn');
    const callBtn = document.getElementById('callBtn');

    whatsappBtn.addEventListener('click', function () {
        const message = encodeURIComponent(
            `Olá! Estou interessado no ${car.make} ${car.model} ${car.year} que vi no site. Podemos agendar uma visita?`
        );
        window.open(`https://wa.me/244?text=${message}`, '_blank');
    });

    callBtn.addEventListener('click', function () {
        // In a real application, this would trigger a phone call
        alert(`📞 Ligando para Eduardo Automóveis...\n\nPara: ${car.make} ${car.model}`);
    });
}

// Close modal
function closeCarModal() {
    carModal.classList.remove('active');
    setTimeout(() => {
        carModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }, 300);
}

// Função para carregar imóveis dinamicamente
function carregarImoveis() {
    const houseGrid = document.getElementById("houseGrid");

    // Dados de exemplo para os imóveis
    const housesData = [
        {
            id: 1,
            titulo: "Casa de Luxo em Luanda",
            descricao: "Uma casa moderna com 4 quartos, piscina e vista para o mar.",
            preco: "120.000.000 KZ",
            localizacao: "Luanda, Angola",
            area: "500 m²",
            quartos: 4,
            banheiros: 3,
            imagens: [
                "img/houses/casa1.jpg"
            ]
        },
        {
            id: 2,
            titulo: "Apartamento no Centro",
            descricao: "Apartamento de 3 quartos no coração da cidade.",
            preco: "80.000.000 KZ",
            localizacao: "Centro de Luanda, Angola",
            area: "200 m²",
            quartos: 3,
            banheiros: 2,
            imagens: [
                "img/houses/casa2.jpg"
            ]
        },
        {
            id: 3,
            titulo: "Mansão Exclusiva",
            descricao: "Mansão de alto padrão com 6 quartos e amplo jardim.",
            preco: "250.000.000 KZ",
            localizacao: "Talatona, Luanda, Angola",
            area: "1000 m²",
            quartos: 6,
            banheiros: 5,
            imagens: [
                "img/houses/casa3-1.jpg",
                "img/houses/casa3-2.jpg",
                "img/houses/casa3-3.jpg"
            ]
        }
    ];

    // Limpa a grid antes de adicionar novos elementos
    houseGrid.innerHTML = "";

    // Adiciona os imóveis na grid
    housesData.forEach((house) => {
        const houseCard = document.createElement("div");
        houseCard.classList.add("car-card", "imoveis");
        houseCard.setAttribute("data-house-id", house.id);

        houseCard.innerHTML = `
            <div class="car-image-container">
                <img src="${house.imagens[0]}" alt="${house.titulo}" class="car-image" loading="lazy">
            </div>
            <div class="car-content">
                <div class="car-make-model">
                    <span>${house.titulo}</span>
                </div>
                <div class="car-price">
                    <span class="price-currency">KZ</span>
                    ${house.preco}
                </div>
                <div class="car-details-list">
                    <div class="car-detail">
                        <div class="detail-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="detail-value">${house.localizacao}</div>
                        <div class="detail-label">Localização</div>
                    </div>
                    <div class="car-detail">
                        <div class="detail-icon">
                            <i class="fas fa-expand"></i>
                        </div>
                        <div class="detail-value">${house.area}</div>
                        <div class="detail-label">Área</div>
                    </div>
                    <div class="car-detail">
                        <div class="detail-icon">
                            <i class="fas fa-bed"></i>
                        </div>
                        <div class="detail-value">${house.quartos}</div>
                        <div class="detail-label">Quartos</div>
                    </div>
                    <div class="car-detail">
                        <div class="detail-icon">
                            <i class="fas fa-bath"></i>
                        </div>
                        <div class="detail-value">${house.banheiros}</div>
                        <div class="detail-label">Banheiros</div>
                    </div>
                </div>
            </div>
        `;

        houseGrid.appendChild(houseCard);
    });

    // Adiciona evento para abrir o modal com detalhes completos
    const houseCards = document.querySelectorAll(".car-card.imoveis");
    houseCards.forEach((card) => {
        card.addEventListener("click", function () {
            const houseId = parseInt(this.getAttribute("data-house-id"));
            abrirModalCasa(houseId);
        });
    });
}

// Função para abrir o modal com detalhes completos da casa
function abrirModalCasa(houseId) {
    const house = housesData.find(h => h.id === houseId);
    if (!house) return;

    const modalContent = document.getElementById("modalContent");
    const carModalOverlay = document.getElementById("carModalOverlay");
    const carModal = document.getElementById("carModal");

    modalContent.innerHTML = `
        <div class="modal-gallery">
            <div class="main-image-container">
                <img src="${house.imagens[0]}" alt="${house.titulo}" class="main-car-image" id="mainCarImage">
            </div>
            <div class="thumbnails-container" id="thumbnailsContainer">
                ${house.imagens.map((img, index) => `
                    <img src="${img}" 
                         alt="${house.titulo} - Foto ${index + 1}" 
                         class="thumbnail ${index === 0 ? 'active' : ''}"
                         data-index="${index}">
                `).join('')}
            </div>
        </div>
        <div class="modal-details">
            <div class="modal-header">
                <h2 class="modal-title">${house.titulo}</h2>
                <div class="modal-subtitle">
                    <span>${house.localizacao}</span>
                </div>
                <div class="modal-price">
                    <span class="modal-price-currency">KZ</span>
                    ${house.preco}
                </div>
            </div>
            <div class="specs-grid">
                <div class="spec-item">
                    <div class="spec-icon">
                        <i class="fas fa-expand"></i>
                    </div>
                    <div class="spec-content">
                        <h4>Área</h4>
                        <p>${house.area}</p>
                    </div>
                </div>
                <div class="spec-item">
                    <div class="spec-icon">
                        <i class="fas fa-bed"></i>
                    </div>
                    <div class="spec-content">
                        <h4>Quartos</h4>
                        <p>${house.quartos}</p>
                    </div>
                </div>
                <div class="spec-item">
                    <div class="spec-icon">
                        <i class="fas fa-bath"></i>
                    </div>
                    <div class="spec-content">
                        <h4>Banheiros</h4>
                        <p>${house.banheiros}</p>
                    </div>
                </div>
            </div>
            <div class="car-description">
                <h3 class="description-title">Descrição do Imóvel</h3>
                <p class="description-text">${house.descricao}</p>
            </div>
        </div>
    `;

    carModalOverlay.classList.add('active');
    setTimeout(() => carModal.classList.add('active'), 10);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Setup thumbnail click events
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainCarImage');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function () {
            const imgIndex = this.getAttribute('data-index');
            mainImage.src = house.imagens[imgIndex];

            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    carregarImoveis();

    // Render all car cards
    carsGrid.innerHTML = carsData.map(car => createCarCard(car)).join('');

    // Add click events to car cards
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach(card => {
        card.addEventListener('click', function () {
            const carId = parseInt(this.getAttribute('data-car-id'));
            openCarModal(carId);
        });
    });

    // Modal close events
    modalClose.addEventListener('click', closeCarModal);
    carModalOverlay.addEventListener('click', function (e) {
        if (e.target === carModalOverlay) {
            closeCarModal();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && carModalOverlay.classList.contains('active')) {
            closeCarModal();
        }
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    // Observe car cards for scroll animations
    carCards.forEach(card => observer.observe(card));
});

// Optional: Load cars from JSON file
/*
async function loadCarsFromJSON() {
    try {
        const response = await fetch('carros.json');
        const cars = await response.json();
        // Render cars...
    } catch (error) {
        console.error('Error loading cars:', error);
    }
}
*/