//Initial data
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}//objeto responsável por armazenar os valores das casas

let player = '';// variavel responsável por armazenar quem vai jogar
let warning = '';// variavel responsavel por armazenar a mensagem
let playing = false;//variavel responsável por armazenar o estado do jogo

//Função que inicia o jogo (criada mais abaixo)
reset();

//Events
document.querySelector('.reset').addEventListener('click', reset);//reseta o jogo no 'click'. (usa mesma função que inicializa o jogo)

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick)
})// Adiciona evento de click em todos elementos que tem a classe 'item' (Casas)


//Functions

/**
 * Função responsável por capturar o clique do usuário
 * em uma das casas do jogo e atualizar o estado do jogo.
 * @param {MouseEvent} event - evento de clique do usuário
 */
function itemClick(event) {

    // variável que armazena o id da casa clicada
    let item = event.target.getAttribute('data-item')


    if (playing && square[item] === '') {
        //verifica se a casa não está vazia e se o jogo está em andamento
        square[item] = player;
        renderSquare();//atualiza o estado do jogo
        togglePlayer();//alterna a vez do jogador
    };
};

//
/**
 * Função responsável por resetar o jogo.
 * Ela redefine as variáveis globais do jogo e rederiza o estado do jogo.
 */
function reset() {

    // Reseta a mensagem de aviso
    warning = ''

    // Define aleatoriamente quem vai jogar
    let random = Math.floor(Math.random() * 2);

    // Define o jogador atual
    player = (random === 0) ? 'X' : 'O';



    // Reseta as casas do jogo
    for (let i in square) {
        square[i] = ''
    }

    // Atualiza o estado do jogo
    renderSquare()
    // Atualiza a informação do jogo
    renderInfo()

    // Define o estado do jogo como em andamento
    playing = true
}

/**
 * Função responsável por renderizar o estado do jogo na tela.
 * Ela lê o estado do jogo armazenado na variável 'square' e
 * atualiza a tela com o estado atual.
 */
function renderSquare() {
    // Itera sobre as casas do jogo e atualiza a interface
    for (let i in square) {
        // Recupera o elemento que representa a casa atual
        let item = document.querySelector(`div[data-item=${i}]`);

        // Atualiza a interface da casa com o valor atual da casa
        item.innerHTML = square[i];
    }

    // Verifica se o jogo terminou
    checkGame();
}


function renderInfo() {
    // O elemento da classe 'vez' recebe o jogador atual
    document.querySelector('div.vez').innerHTML = player;



    // O elemento da classe 'resultado' recebe a mensagem de aviso
    document.querySelector('div.resultado').innerHTML = warning;
}

//Função responsável por alterar a vez do jogador
function togglePlayer() {
    player = player === 'X' ? 'O' : 'X';

    if (!playing) {
        player = 'Jogo Encerrado'
    }
    // Atualiza a informação do jogo
    renderInfo();
}

//Função responsável por verificar se o jogo terminou
function checkGame() {
    //Condições para verificar se alguem ganhou ou "deu velha", em caso afirmativo, altera o estado do jogo
    if (checkWinnerFor('X')) {
        warning = 'O vencedor é "X"';
        playing = false;

    } else if (checkWinnerFor('O')) {
        warning = 'O vencedor é "O"';
        playing = false

    } else if (checkDraw()) {
        warning = 'Deu velha ';
        playing = false;

    }

    // Atualiza a informação do jogo
    renderInfo();

}

//Função responsável por verificar quem ganhou
function checkWinnerFor(player) {

    //Array que armazenar todas as possibilidades de vitoria
    let possibilities = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]

    //Itera sobre as possibilidades de vitoria
    for (let i in possibilities) {

        let pArray = possibilities[i].split(',');//separa as possibilidades de vitoria em um array

        let hasWin = pArray.every(option => square[option] == player);//verifica se todas as casas da possibilidade de vitoria estao ocupadas pelo jogador

        //se todas as casas estiverem ocupadas pelo jogador, retorna true (informa que tem um vencedor)
        if (hasWin) {
            return true
        }

    }
    //se nenhuma das possibilidades de vitoria for verdadeira, retorna false (Jogo continua pois não houve vencedor ainda)
    return false
}


//Função para verificar se "deu velha"
function checkDraw() {
    //Verifica se todas as casas estao ocupadas
    for (let i in square) {

        //Se alguma casa estiver vazia, retorna false (jogo não terminou)
        if (square[i] === '') {
            return false
        }
    }
    //Caso contrário retorna true e o jogo finaliza
    return true
}