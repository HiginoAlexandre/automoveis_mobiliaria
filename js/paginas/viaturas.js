import { renderCarCards } from '../shared/carCard.js';
import { initVideoHover } from '../shared/videoHover.js';
import { initModal } from '../components/modal.js';
import { getMarcaIcon } from '../shared/utils.js';

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

    // ===== ELEMENTOS DO DOM =====
    const marcasGrid = document.getElementById('marcasGrid');
    const pesquisaInput = document.getElementById('pesquisaInput');
    const pesquisaBtn = document.getElementById('pesquisaBtn');
    const resetBtn = document.getElementById('resetFiltros');
    const itemsGrid = document.getElementById('itemsGrid');

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

    // ===== TOGGLE FILTROS - SOMENTE QUANDO CLICA =====
    const toggleFiltrosBtn = document.getElementById('toggleFiltrosBtn');
    const filtrosSection = document.querySelector('.filtros-section');

    if (toggleFiltrosBtn && filtrosSection) {
        // Remover a classe 'collapsed' inicialmente para garantir que os filtros comecem abertos
        filtrosSection.classList.remove('collapsed');

        // Adicionar evento de clique para toggle manual
        toggleFiltrosBtn.addEventListener('click', function () {
            filtrosSection.classList.toggle('collapsed');

            // Opcional: mudar o ícone quando recolhido/expandido
            const icon = this.querySelector('i');
            if (icon) {
                if (filtrosSection.classList.contains('collapsed')) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                } else {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            }
        });
    }

    // ===== INICIALIZAR MODAL =====
    initModal(carrosData);

    // ===== FUNÇÕES AUXILIARES =====
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

        // Usar o componente compartilhado para renderizar os cards
        renderCarCards(carrosPagina, 'itemsGrid', false);

        // Reinicializar hover dos vídeos
        initVideoHover(carrosData);
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

            const itemsGrid = document.getElementById('navTop');
            if (itemsGrid) {
                itemsGrid.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Botão reset
    if (resetBtn) {
        resetBtn.addEventListener('click', window.resetarFiltros);
    }

    // Navegação
    function mudarPagina(direcao) {
        const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);
        const novaPagina = paginaAtual + direcao;

        if (novaPagina >= 1 && novaPagina <= totalPaginas) {
            paginaAtual = novaPagina;
            renderizarCarros();
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

    // ===== INICIALIZAR =====
    inicializarMarcas();
    filtrarCarros();
});