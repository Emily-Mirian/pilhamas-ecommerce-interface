/* CADASTRO */

// pega o icone que vai ser clicado 
const iconeMostrarSenha = document.querySelector('.icone-aparecer');
// Pega o campo da senha
const campoSenha = document.querySelector('input[name="password"]');

// é para confirmar se existe as coisas na página
if (iconeMostrarSenha && campoSenha) {
    // add um "listener" de clique no ícone
    iconeMostrarSenha.addEventListener('click', () => {
        
        // ve se o campo atual é tipo texto ou senha 
        if (campoSenha.type === 'password') {
            // se for senha muda para texto 
            campoSenha.type = 'text';
            // muda o icone para dizer q agora ta em texto
            iconeMostrarSenha.innerHTML = '&#9650;'; 
            
        } else {
            // Se não volta para o formato de senha (as bolinhas)
            campoSenha.type = 'password';
            // volta para o icone normal
            iconeMostrarSenha.innerHTML = '&#9660;';
        }
    });
}

/* filtragem de produtos na pag produtos */

// pega a minha classe para usar 
const todasSecoes = document.querySelectorAll('.categoria-produtos');
const mainContent = document.querySelector('main');

//essa função verifica se estamos na pag produtos, é para garantir que só funcione onde tem o categoria-produtos
function isProdutosPage() {
    // Retorna verdadeiro se achar pelo menos uma categoria produtos 
    return todasSecoes.length > 0;
}

// garante que o código principal de injeção só deve rodar se for a página de produtos
if (mainContent && isProdutosPage()) {

    const filtrosHTML = `
        <div id="controles-filtro" style="text-align: center; margin: 30px 0;">
            <button class="btn-filtro-categoria" data-categoria-alvo="categoria-bichinhos">Pijamas de Bichinhos</button>
            <button class="btn-filtro-categoria" data-categoria-alvo="categoria-comidinhas">Pijamas de Comidinhas</button>
            <button class="btn-filtro-categoria" data-categoria-alvo="categoria-familia">Pijamas de Família</button>
            <button class="btn-filtro-categoria" data-categoria-alvo="categoria-desenhos">Pijamas de Desenhos</button>
            <button id="btn-mostrar-tudo" style="background-color: #e87d25;">Mostrar Tudo</button>
        </div>
    `;
    // insere os novos botões na tag <main>, que vamos usar para filtrar os pijamas 

    // usamos 'afterend' para que os botões fiquem de baixo da navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.insertAdjacentHTML('afterend', filtrosHTML);
    } else {
         // se a navbar não existir, insere no topo do main
        mainContent.insertAdjacentHTML('afterbegin', filtrosHTML);
    }

    // para deixar os botoes bonitos
    const style = document.createElement('style');
    style.innerHTML = `
        .btn-filtro-categoria, #btn-mostrar-tudo {
            padding: 10px 15px;
            margin: 5px;
            font-weight: bold;
            background-color: #ffce58;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: transform 0.2s, background-color 0.2s;
        }
        .btn-filtro-categoria:hover, #btn-mostrar-tudo:hover {
            transform: translateY(-2px);
            background-color: #e87d25;
        }
    `;
    document.head.appendChild(style);


    // função principal para filtrar (esconder o que nn precisa e mostrar o que foi clicado)
    function filtrarProdutos(categoriaId) {
        todasSecoes.forEach(secao => {
            // Se o ID da seção for igual o ID do botão ele mostra
            if (secao.id === categoriaId) {
                secao.style.display = 'block';
            } else {
                // se não, esconda
                secao.style.display = 'none';
            }
        });
    }

    // função para mostrar todas as categorias
    function mostrarTudo() {
        todasSecoes.forEach(secao => {
            // para garantir que o displayé 'block'
            secao.style.display = 'block';
        });
    }


    // adiciona os "listeners" de evento aos botões
    document.addEventListener('DOMContentLoaded', () => {

        const botoesFiltro = document.querySelectorAll('.btn-filtro-categoria');
        const botaoMostrarTudo = document.getElementById('btn-mostrar-tudo');

        // listener para os botões de categoria
        botoesFiltro.forEach(btn => {
            btn.addEventListener('click', () => {
                // pega o ID da categoria a ser mostrada
                const categoriaAlvo = btn.getAttribute('data-categoria-alvo');
                filtrarProdutos(categoriaAlvo);
            });
        });

        // listener para o botão 'Mostrar Tudo'
        if (botaoMostrarTudo) {
            botaoMostrarTudo.addEventListener('click', mostrarTudo);
        }
    });
}