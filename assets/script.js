//Initial data
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}

let player = 'x';
let warning = '';
let playing = false;


reset();

//Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick)
})

//functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item')
    

    if ( playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer();
    };
};


function reset() {

    warning = ''

    let random = Math.floor(Math.random() * 2);

    player = (random === 0) ? 'x' : 'o';

    console.log('Player', player)
    for (let i in square) {
        square[i] = ''
    }
    
    renderSquare()
    renderInfo()

    playing = true
}

function renderSquare() {
    for (let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('div.vez').innerHTML = player;
    document.querySelector('div.resultado').innerHTML = warning
}


function togglePlayer() { 
    player = player == 'x' ? 'o' : 'x';
    renderInfo();
}

function checkGame() {

    if (checkWinnerFor('x')) {
        warning = 'X';
        playing = false;
    } else if (checkWinnerFor('o')) {
        warning = 'O';
        playing = false
    } else if (checkDraw()) {
        warning = 'Deu velha';
        playing = false;
    }
    renderInfo();
    
}

function checkWinnerFor(player) {

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


    for (let i in possibilities) {
        let pArray = possibilities[i].split(',');
        let hasWin = pArray.every(option => square[option] == player);
        
        if (hasWin) {
            return true
        }
        
    }

    return false
}



function checkDraw() { 
    for (let i in square) {

        if (square[i] === '') {
            return false
        }
    }
    return true
}