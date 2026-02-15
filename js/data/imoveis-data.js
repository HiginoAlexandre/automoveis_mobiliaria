// Banco de dados de Imóveis - B.Eduardo Investimento
const imoveisData = [
    {
        id: 1,
        titulo: "Casa de Luxo em Luanda",
        descricao: "Casa moderna com 4 quartos, piscina e vista para o mar. Acabamentos premium, cozinha equipada, sistema de segurança 24h.",
        preco: "120.000.000",
        localizacao: "Luanda",
        bairro: "Ilha de Luanda",
        area: "500 m²",
        quartos: 4,
        banheiros: 3,
        vagas: 2,
        tipo: "venda",
        categoria: "casa",
        status: "new",
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 2,
        titulo: "Apartamento no Centro",
        descricao: "Apartamento de 3 quartos no coração da cidade. Próximo a bancos, restaurantes e comércio.",
        preco: "80.000.000",
        localizacao: "Luanda",
        bairro: "Ingombotas",
        area: "200 m²",
        quartos: 3,
        banheiros: 2,
        vagas: 1,
        tipo: "venda",
        categoria: "apartamento",
        status: "negotiable",
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 3,
        titulo: "Terreno em Talatona",
        descricao: "Terreno plano com 1000m², pronto para construção. Zona nobre em desenvolvimento.",
        preco: "45.000.000",
        localizacao: "Luanda",
        bairro: "Talatona",
        area: "1000 m²",
        tipo: "terreno",
        categoria: "terreno",
        status: "new",
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: 4,
        titulo: "Moradia para Arrendamento",
        descricao: "Moradia T3 com jardim, churrasqueira e área de lazer. Condomínio fechado.",
        preco: "350.000",
        localizacao: "Luanda",
        bairro: "Camama",
        area: "300 m²",
        quartos: 3,
        banheiros: 2,
        vagas: 2,
        tipo: "arrendamento",
        categoria: "moradia",
        status: "new",
        images: [
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    }
];

// Exportar para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = imoveisData;
}