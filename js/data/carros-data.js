// Banco de dados de Carros - Eduardo Automóveis
const carrosData = [
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
        condition: "novo",
        brand: "Mercedes-Benz",
        images: [
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Mercedes-Benz Classe C 220d AMG Line, importado da Alemanha em excelente estado."
    },
    {
        id: 2,
        make: "BMW",
        model: "Série 5 530e M Sport",
        year: 2022,
        price: 28500000,
        mileage: "8.500 KM",
        fuel: "Híbrido",
        transmission: "Automático Steptronic",
        engine: "2.0L Hybrid 292cv",
        color: "Azul Tanzanite Metallic",
        origin: "Portugal",
        status: "negotiable",
        condition: "novo",
        brand: "BMW",
        images: [
            "https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "BMW Série 5 530e M Sport, veículo híbrido plug-in com baixíssimo consumo."
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
        condition: "usado",
        brand: "Audi",
        images: [
            "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        description: "Audi Q7 50 TDI Quattro, SUV premium de 7 lugares."
    }
];

// Exportar para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = carrosData;
}