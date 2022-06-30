const placingAreas = document.querySelectorAll('.placingArea')
const crossImage = 'https://library.kissclipart.com/20180902/xlq/kissclipart-orange-x-transparent-background-clipart-fossil-fue-a676aa326e9ea7a9.png'
const circleImage = 'https://i.pinimg.com/originals/32/90/be/3290bed6840554f71997d071206fea64.png'

// if playerTurn is true, its cross's turn outwise its circle's turn.
let playerTurn = true

placingAreas.forEach(area => {
    area.addEventListener('click', handleClick, {once: true})
})

//handles what to do when a player clicks on the playing area
//currently options are: places users symbol, swaps turn after every click
function handleClick(e) {
    const area = e.target
    const currentSymbol = playerTurn ? 'cross' : 'circle'
    placeSymbol(area, currentSymbol)
    switchTurns()
    switchSymbol()
}

function placeSymbol(area,currentSymbol){
    area.classList.add(currentSymbol)
}

// switches playerTurn truth value to allow switching player turns
function switchTurns() {
    playerTurn = !playerTurn
}

//currently not changing image on hover. I think its because i'm not assigning style properties to the right hover affect.
//need to more work to find a solution.
function switchSymbol() {
    if(playerTurn){
        document.documentElement.style.setProperty('--current-symbol', 'url(https://library.kissclipart.com/20180902/xlq/kissclipart-orange-x-transparent-background-clipart-fossil-fue-a676aa326e9ea7a9.png)');
    } else {
        document.documentElement.style.setProperty('--current-symbol', 'url(https://i.pinimg.com/originals/32/90/be/3290bed6840554f71997d071206fea64.png)');
    }
}
