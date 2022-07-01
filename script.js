const placingAreas = document.querySelectorAll('.placingArea')
const restartGame = document.getElementById('restartButton')
const winningMessageElement = document.querySelector('.win-msg')
const winningTextElement = document.querySelector('[data-winning-text]')
const winning_results = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let playerTurn
// if playerTurn is true, its cross's turn otherwise its circle's turn.

startGame()

restartGame.addEventListener('click', startGame)

function startGame(){
    playerTurn = false
    placingAreas.forEach(area => {
        area.classList.remove('cross')
        area.classList.remove('circle')
        area.removeEventListener('click', handleClick)
        area.addEventListener('click', handleClick, {once: true})
    })
    switchSymbol()
    winningMessageElement.classList.remove('show')
}


//handles what to do when a player clicks on the playing area
//currently options are: places users symbol, swaps turn after every click
function handleClick(e) {
    const area = e.target
    const currentSymbol = playerTurn ? 'cross' : 'circle'
    placeSymbol(area, currentSymbol)
    if(checkWin(currentSymbol)){
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        switchTurns()
        switchSymbol()
    }
}

//places the symbols on the selected area
function placeSymbol(area,currentSymbol){
    area.classList.add(currentSymbol)
}

// switches playerTurn truth value to allow switching player turns
function switchTurns() {
    playerTurn = !playerTurn
}

//swithces hovering symbols everytime after placing a mark down on the board
function switchSymbol() {
    if(playerTurn){
        document.documentElement.style.setProperty('--current-symbol', 'url(https://library.kissclipart.com/20180902/xlq/kissclipart-orange-x-transparent-background-clipart-fossil-fue-a676aa326e9ea7a9.png)');
    } else {
        document.documentElement.style.setProperty('--current-symbol', 'url(https://i.pinimg.com/originals/32/90/be/3290bed6840554f71997d071206fea64.png)');
    }
}

//function to check if a user won the game
function checkWin(currentSymbol){
    return winning_results.some(result => {
        return result.every(index => {
            return placingAreas[index].classList.contains(currentSymbol)
        })
    })
}

//function checks for the end of the game or a draw and returns corresponding result.
function endGame(draw){
    if(draw){
        winningTextElement.innerText = 'Draw!'
    } else {
        winningTextElement.innerText = `${playerTurn ? "X's" : "O's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

//checks if the game is a draw
function isDraw(){
    return [...placingAreas].every(area => {
        return area.classList.contains('cross') || area.classList.contains('circle')
    })
}
