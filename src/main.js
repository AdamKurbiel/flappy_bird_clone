const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;

function clearCanvas(){
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
 
    ctx.fillStyle = "#c4e7ff";
    ctx.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);
}

function step(){
    clearCanvas()

    requestAnimationFrame(step)
}


requestAnimationFrame(step)