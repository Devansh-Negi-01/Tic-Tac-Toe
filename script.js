let boxes = document.querySelectorAll(".box");
let message = document.querySelector("#message");
let messageContainer = document.querySelector(".message_container");
let resetButton = document.querySelector("#reset_game");
let newButton = document.querySelector("#new_game");

let turn = true ;
let count = 0 ;

winningPatterns = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

boxes.forEach((box) =>{
    box.addEventListener("click", () => {
        if (turn){
            box.innerText="X" ;
            turn = false ;
        }else{
            box.innerText="O" ;
            turn = true ;
        }
        count++ ;
        
        let winner = checkWinner();
        if (count === 9 && !winner){
            gameDraw();
        }
    });
});

const checkWinner = ()  => {
    for (pattern of winningPatterns){
        let value1 = boxes[pattern[0]].innerText ;
        let value2 = boxes[pattern[1]].innerText ;
        let value3 = boxes[pattern[2]].innerText ;      
        
        if (value1 != "" && value2 != "" && value3 != ""){
            if (value1 === value2 && value2 === value3){
                disableBoxes();
                isWinner(value1);
                resetButton.classList.add("hide");
                
                return true ;
            };
        };
    };
}

const gameDraw = () => {
    message.innerText = "The game is draw !";
    messageContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

const isWinner = (winner) => {
    message.innerText = `The winner is ${winner}`;
    messageContainer.classList.remove("hide");
}

const enableBoxes = () =>{
    boxes.forEach((box) =>{
        box.disabled = false;
    })
}

const resetGame = () => {
    enableBoxes();
    boxes.forEach((box) => {
        box.innerText = "" ;
    })
    count = 0 ;
    messageContainer.classList.add("hide");
    resetButton.classList.remove("hide");
}

resetButton.addEventListener("click", resetGame)
newButton.addEventListener("click", resetGame)