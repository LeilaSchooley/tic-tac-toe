let nameButton = document.getElementById("names")

let grid = document.getElementById("grid")

let startButton = document.getElementById("start")

let playerOne = new Player("PlayerOne", "X",0)


let playerTwo = new Player("PlayerTwo","O",0)

gameBoard = [ 
    ["","",""],
    ["","",""],
    ["","",""]
]


function Player(name, marker){
    this.name = name
    this.marker = marker

}


function gameOver(winningPlayer){

    console.log("Congratulations!")
    console.log(winningPlayer.name + " is the winner!")
  }


let diagonalCheck = (arr) => {
    let diagonalOne = ""
    let diagonalTwo = ""

    arr.forEach((element, index) => diagonalOne += element[index])

        
    diagonalTwo += arr[0][2] + arr[1][1] + arr[2][0]
    

    if (diagonalOne =="XXX" || diagonalTwo === "XXX") gameOver(playerOne)

    if (diagonalOne === "OOO"|| diagonalTwo === "OOO") gameOver(playerTwo)

}


let horizontalCheck = (arr) => {

    arr.forEach(element => {

    if ((element[0] === "X" && element[1] === "X" && element[2]) === "X") gameOver(playerOne)
        if ((element[0] === "O"&& element[1] === "O"&& element[2]) === "O") gameOver(playerTwo)

    })

    }
    


let verticalCheck = (arr) => {

    let verticalOne = "";
    let verticalTwo = "";
    let verticalThree = "";
    
    arr.forEach(element => verticalOne += element[0])    
    arr.forEach(element => verticalTwo += element[1])   
    arr.forEach(element => verticalThree += element[2])    

        if (verticalOne  === "XXX" || verticalTwo  === "XXX" || verticalThree === ("XXX"))  gameOver(playerOne)
        if (verticalOne  === "OOO" || verticalTwo  === "OOO" || verticalThree === "OOO")  gameOver(playerTwo)


    }

function checkarr(arr){

    let newarr = [].concat(...arr);
    return newarr.indexOf("")>=0

}

let checkspace = (arr) => {

    let spaces = 0

    arr.forEach(element => element.forEach((item) => {
        if (item == ""){
            spaces++
        }
        
    }))

    return spaces
}
function addPlayerMove(element, index, arr){

    if (! checkarr(arr)){
        alert("All pieces taken! Press Restart!")

    }

    else{
        
        let rowIndex = Math.floor(index / 3)
        let columnIndex = element.getAttribute("data")
    
        columnIndex = +columnIndex
    
    
        if (arr[rowIndex][columnIndex] != ""){
            alert("Space already taken! Try another space.")
        }
    
        else{
            
            arr[rowIndex].splice(columnIndex, 1, playerOne.marker)
    
            render(gameBoard)
    
            computerMove(gameBoard)
    
            horizontalCheck(gameBoard)
            verticalCheck(gameBoard)
            diagonalCheck(gameBoard)
    
        }
    
    }
 
}


function computerMove(arr){

    spaces = checkspace(gameBoard)
    
    if (! checkarr(arr)){
        alert("All pieces taken! Press Restart!")

    }
    else{
    
        let randomRow = Math.floor(Math.random() * 3)

        let randomColumn = (Math.floor(Math.random() * spaces) /3)
        
        while (arr[randomRow][randomColumn] != ""){

            spaces = checkspace(gameBoard)

            randomRow = Math.floor(Math.random() * 3)

            randomColumn = (Math.floor(Math.random() * spaces))
            Math.floor(randomColumn / 3)
            
        }

        arr[randomRow].splice(randomColumn, 1, playerTwo.marker)
    
        render(gameBoard)
        
        horizontalCheck(gameBoard)
        verticalCheck(gameBoard)
        diagonalCheck(gameBoard)


    }

    }
    

function displayController(){

    let getBoard = document.querySelectorAll(".block")

    getBoard.forEach((element, index) => element.addEventListener("click", () => {    

        addPlayerMove(element, index, gameBoard)
    
    
    }))


}

nameButton.addEventListener("click", () => {

    let nameOne = prompt("Enter name of Player 1:")
    
    let nameTwo = prompt("Enter name of Player 2:")

    playerOne.name = nameOne

    playerTwo.name = nameTwo


})


startButton.addEventListener("click", () => resetBoard(gameBoard))


function render(arr){
    let count = -1
    grid.innerText=""   

    arr.forEach((element, index) => {
   

        for (let i=0; i < 3; i++){

            count ++

            let createGrid = document.createElement("div")

            createGrid.classList.add("block")

            createGrid.id=`block-${count}`

            createGrid.setAttribute("data", i)
            
            createGrid.textContent=arr[index][i]

            grid.appendChild(createGrid)

        }


    })
    displayController()

}
const resetBoard = () => {
    
    gameBoard = [ 
        ["","",""],
        ["","",""],
        ["","",""]
    ]
    render(gameBoard)

}

render(gameBoard)

