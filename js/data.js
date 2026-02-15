// data.js - Dados para viaturas e imóveis

// Array de Carros (Expandido)
const carrosData = [
    {
        id: 1,
        make: "Mercedes-Benz",
        model: "Classe C 220d AMG Line",
        year: 2023,
        price: 32500000,
        mileage: "0 KM",
        fuel: "Diesel",
        transmission: "Automático 9G-Tronic",
        engine: "2.0L 4 cilindros",
        color: "Cinza Iridium Metallic",
        origin: "Importação Alemanha",
        status: "new",
        tipo: "novo",
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
        tipo: "usado",
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
        tipo: "usado",
        images: [
            "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Audi Q7 50 TDI Quattro, SUV premium de 7 lugares. Pack S line, teto panorâmico, bancos elétricos com memória, sistema de som Bang & Olufsen, air suspension. Veículo familiar espaçoso e luxuoso."
    },
    {
        id: 4,
        make: "Toyota",
        model: "Land Cruiser V8",
        year: 2023,
        price: 42500000,
        mileage: "0 KM",
        fuel: "Diesel",
        transmission: "Automático 8 velocidades",
        engine: "4.5L V8 Turbo Diesel",
        color: "Prata Metallic",
        origin: "Japão",
        status: "new",
        tipo: "novo",
        images: [
            "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Toyota Land Cruiser V8, o SUV definitivo para todo o terreno. Motor V8 diesel, tração integral permanente, KDSS, sistema de som JBL, bancos em pele ventilados, 7 lugares. Robustez e conforto premium."
    },
    {
        id: 5,
        make: "Range Rover",
        model: "Velar P400",
        year: 2021,
        price: 37500000,
        mileage: "18.000 KM",
        fuel: "Gasolina",
        transmission: "Automático 8 velocidades",
        engine: "3.0L V6 400cv",
        color: "Branco Fuji",
        origin: "Reino Unido",
        status: "negotiable",
        tipo: "usado",
        images: [
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Range Rover Velar P400, SUV coupé premium com design revolucionário. Interior minimalista com três telas touch, bancos em pele Windsor, suspensão a ar, sistema de som Meridian."
    },
    {
        id: 6,
        make: "Porsche",
        model: "Cayenne Coupe",
        year: 2023,
        price: 45500000,
        mileage: "0 KM",
        fuel: "Gasolina",
        transmission: "PDK Automático",
        engine: "3.0L V6 340cv",
        color: "Preto Jet Metallic",
        origin: "Alemanha",
        status: "new",
        tipo: "novo",
        images: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Porsche Cayenne Coupe, a combinação perfeita entre desempenho esportivo e conforto SUV. Design coupé, teto panorâmico fixo, interior em alcântara, Porsche Active Suspension Management."
    },
    {
        id: 7,
        make: "Volvo",
        model: "XC90 T8 Twin Engine",
        year: 2022,
        price: 33500000,
        mileage: "12.000 KM",
        fuel: "Híbrido Plug-in",
        transmission: "Automático 8 velocidades",
        engine: "2.0L Twin Engine 407cv",
        color: "Azul Onyx Metallic",
        origin: "Suécia",
        status: "negotiable",
        tipo: "usado",
        images: [
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Volvo XC90 T8 Twin Engine, SUV familiar híbrido plug-in de luxo. Pack Inscription, bancos em pele Nappa, sistema de som Bowers & Wilkins, pilot assist, pure air interior."
    },
    {
        id: 8,
        make: "Lexus",
        model: "RX 450h Luxury",
        year: 2023,
        price: 39500000,
        mileage: "0 KM",
        fuel: "Híbrido",
        transmission: "CVT Automático",
        engine: "3.5L V6 Hybrid 313cv",
        color: "Branco Cristal",
        origin: "Japão",
        status: "new",
        tipo: "novo",
        images: [
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Lexus RX 450h Luxury, SUV premium híbrido com design agressivo e tecnologia de ponta. Mark Levinson Premium Sound, heads-up display, sistema de segurança Lexus Safety System+ 2.0."
    },
    {
        id: 9,
        make: "Tesla",
        model: "Model Y Long Range",
        year: 2023,
        price: 38500000,
        mileage: "0 KM",
        fuel: "Elétrico",
        transmission: "Automático",
        engine: "Dual Motor AWD",
        color: "Vermelho Multi-Coat",
        origin: "USA",
        status: "new",
        tipo: "novo",
        images: [
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Tesla Model Y Long Range, SUV elétrico com autonomia de 533 km. Aceleração 0-100 km/h em 5 segundos, teto de vidro panorâmico, sistema de som premium, piloto automático completo."
    },
    {
        id: 10,
        make: "Jeep",
        model: "Grand Cherokee Overland",
        year: 2021,
        price: 31500000,
        mileage: "28.000 KM",
        fuel: "Diesel",
        transmission: "Automático 8 velocidades",
        engine: "3.0L V6 Turbo Diesel",
        color: "Preto Granite",
        origin: "USA",
        status: "negotiable",
        tipo: "usado",
        images: [
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Jeep Grand Cherokee Overland, SUV premium americano com capacidades off-road. Quadra-Lift Air Suspension, sistema de som Harman Kardon, bancos em pele ventilados, comandos de volante."
    }
];

// Array de Imóveis (Expandido)
const imoveisData = [
    {
        id: 1,
        titulo: "Villa de Luxo em Talatona",
        descricao: "Villa moderna com 5 quartos, piscina infinita, jardim paisagístico e vista panorâmica para o mar. Acabamentos de alto padrão com mármore italiano e automatização completa.",
        preco: "350.000.000 KZ",
        localizacao: "Talatona, Luanda, Angola",
        area: "800 m²",
        quartos: 5,
        banheiros: 6,
        tipo: "venda",
        status: "new",
        imagens: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 2,
        titulo: "Apartamento Premium no Centro",
        descricao: "Apartamento de 3 quartos no coração financeiro de Luanda. Vista deslumbrante para a baía, acabamentos premium, cozinha totalmente equipada e área de lazer completa.",
        preco: "120.000.000 KZ",
        localizacao: "Centro de Luanda, Angola",
        area: "220 m²",
        quartos: 3,
        banheiros: 3,
        tipo: "venda",
        status: "negotiable",
        imagens: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 3,
        titulo: "Casa para Arrendamento em Alvalade",
        descricao: "Casa espaçosa para arrendamento familiar. 4 quartos, garagem para 2 carros, quintal amplo e localização privilegiada perto de escolas e comércio.",
        preco: "800.000 KZ/mês",
        localizacao: "Alvalade, Luanda, Angola",
        area: "350 m²",
        quartos: 4,
        banheiros: 3,
        tipo: "arrendamento",
        status: "new",
        imagens: [
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 4,
        titulo: "Terreno Comercial na Marginal",
        descricao: "Terreno comercial de 1500 m² na Avenida Marginal, zona de alto valorização. Ideal para construção de edifício comercial ou hotel. Documentação regularizada.",
        preco: "550.000.000 KZ",
        localizacao: "Marginal de Luanda, Angola",
        area: "1500 m²",
        quartos: 0,
        banheiros: 0,
        tipo: "terrenos",
        status: "negotiable",
        imagens: [
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 5,
        titulo: "Loft Moderno no Bairro Alto",
        descricao: "Loft industrial moderno com pé-direito duplo, localizado na zona mais cool da cidade. Espaço aberto, cozinha americana e varanda privativa.",
        preco: "95.000.000 KZ",
        localizacao: "Bairro Alto, Luanda, Angola",
        area: "180 m²",
        quartos: 1,
        banheiros: 2,
        tipo: "venda",
        status: "new",
        imagens: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 6,
        titulo: "Escritório Corporativo",
        descricao: "Escritório corporativo totalmente mobiliado e equipado para arrendamento. Localizado em edifício classe A com recepção 24h, estacionamento e segurança.",
        preco: "1.200.000 KZ/mês",
        localizacao: "Torre CEO, Luanda, Angola",
        area: "300 m²",
        quartos: 6,
        banheiros: 4,
        tipo: "arrendamento",
        status: "negotiable",
        imagens: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 7,
        titulo: "Terreno Residencial em Camama",
        descricao: "Terreno residencial de 600 m² em condomínio fechado. Área plana, fácil acesso à água e energia. Ideal para construção de moradia familiar.",
        preco: "85.000.000 KZ",
        localizacao: "Camama, Luanda, Angola",
        area: "600 m²",
        quartos: 0,
        banheiros: 0,
        tipo: "terrenos",
        status: "new",
        imagens: [
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 8,
        titulo: "Casa Geminada para Arrendamento",
        descricao: "Casa geminada de 3 quartos em condomínio seguro. Jardim privativo, cozinha equipada, área de serviço. Arrendamento a longo prazo.",
        preco: "650.000 KZ/mês",
        localizacao: "Benfica, Luanda, Angola",
        area: "280 m²",
        quartos: 3,
        banheiros: 2,
        tipo: "arrendamento",
        status: "new",
        imagens: [
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    }
];

// Funções auxiliares
function formatCurrency(amount) {
    if (typeof amount === 'string') return amount;
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

// Exportar para uso global
window.carrosData = carrosData;
window.imoveisData = imoveisData;
window.formatCurrency = formatCurrency;
window.getStatusBadge = getStatusBadge;