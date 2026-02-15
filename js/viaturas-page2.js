// Página Viaturas - Lógica Principal
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Página Viaturas carregada!');
    console.log(`📊 Carros disponíveis: ${carrosData.length}`);
    console.log(`🏠 Imóveis disponíveis: ${imoveisData.length}`);
    
    // Estado inicial
    let estadoAtual = {
        servico: 'automoveis', // automoveis ou imoveis
        pagina: 1,
        filtros: {
            condicao: 'todos', // todos, novo, usado
            marca: 'todas',
            tipo: 'todos', // venda, arrendamento, terreno
            localizacao: 'todas',
            pesquisa: ''
        }
    };
    
    // Elementos DOM
    const carsGrid = document.getElementById('carsGrid');
    const houseGrid = document.getElementById('houseGrid');
    
    // Inicializar
    inicializarPagina();
    
    function inicializarPagina() {
        console.log('🔄 Inicializando página...');
        // Aqui vamos implementar as funções gradualmente
    }
});