// ===== DADOS DOS CARROS =====
const carrosData = [
    {
        id: 1,
        marca: "Mercedes-Benz",
        modelo: "Classe C 220d",
        ano: 2023,
        preco: 32500000,
        quilometros: "0 KM",
        combustivel: "Diesel",
        cambio: "Automático",
        cor: "Cinza",
        condicao: "novo",
        imagens: [
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800",
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800",
            "video/video.mp4"
        ],
        descricao: "Mercedes-Benz Classe C 220d, zero km. Interior em couro, teto solar, câmera 360°."
    },
    {
        id: 2,
        marca: "BMW",
        modelo: "X5 M Sport",
        ano: 2022,
        preco: 42500000,
        quilometros: "12.000 KM",
        combustivel: "Gasolina",
        cambio: "Automático",
        cor: "Azul",
        condicao: "usado",
        imagens: [
            "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=800",
            "video/video2.mp4"
        ],
        descricao: "BMW X5 M Sport, completo. Teto panorâmico, bancos em couro, head-up display."
    },
    {
        id: 3,
        marca: "Toyota",
        modelo: "Land Cruiser V8",
        ano: 2023,
        preco: 42500000,
        quilometros: "0 KM",
        combustivel: "Diesel",
        cambio: "Automático",
        cor: "Prata",
        condicao: "novo",
        imagens: [
            "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=800"
        ],
        descricao: "Toyota Land Cruiser V8 4.5, zero km. 7 lugares, tração 4x4, bancos em couro."
    },
    {
        id: 4,
        marca: "Audi",
        modelo: "Q7",
        ano: 2022,
        preco: 38500000,
        quilometros: "15.000 KM",
        combustivel: "Diesel",
        cambio: "Automático",
        cor: "Preto",
        condicao: "usado",
        imagens: [
            "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800"
        ],
        descricao: "Audi Q7 3.0 TDI, 7 lugares, teto solar, bancos em couro, multimídia."
    },
    {
        id: 5,
        marca: "Porsche",
        modelo: "Cayenne",
        ano: 2021,
        preco: 48500000,
        quilometros: "25.000 KM",
        combustivel: "Gasolina",
        cambio: "Automático",
        cor: "Vermelho",
        condicao: "usado",
        imagens: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"
        ],
        descricao: "Porsche Cayenne S, completo. Bancos em couro, som Bose, rodas 21\"."
    },
    {
        id: 6,
        marca: "Range Rover",
        modelo: "Velar",
        ano: 2022,
        preco: 39500000,
        quilometros: "18.000 KM",
        combustivel: "Gasolina",
        cambio: "Automático",
        cor: "Branco",
        condicao: "usado",
        imagens: [
            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800"
        ],
        descricao: "Range Rover Velar R-Dynamic, teto panorâmico, bancos em couro, câmera 360°."
    },
    {
        id: 4,
        marca: "Audi",
        modelo: "Q7",
        ano: 2022,
        preco: 38500000,
        quilometros: "15.000 KM",
        combustivel: "Diesel",
        cambio: "Automático",
        cor: "Preto",
        condicao: "usado",
        imagens: [
            "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800"
        ],
        descricao: "Audi Q7 3.0 TDI, 7 lugares, teto solar, bancos em couro, multimídia."
    },
    {
        id: 5,
        marca: "Porsche",
        modelo: "Cayenne",
        ano: 2021,
        preco: 48500000,
        quilometros: "25.000 KM",
        combustivel: "Gasolina",
        cambio: "Automático",
        cor: "Vermelho",
        condicao: "usado",
        imagens: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"
        ],
        descricao: "Porsche Cayenne S, completo. Bancos em couro, som Bose, rodas 21\"."
    },
    {
        id: 6,
        marca: "Range Rover",
        modelo: "Velar",
        ano: 2022,
        preco: 39500000,
        quilometros: "18.000 KM",
        combustivel: "Gasolina",
        cambio: "Automático",
        cor: "Branco",
        condicao: "usado",
        imagens: [
            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800"
        ],
        descricao: "Range Rover Velar R-Dynamic, teto panorâmico, bancos em couro, câmera 360°."
    }
];