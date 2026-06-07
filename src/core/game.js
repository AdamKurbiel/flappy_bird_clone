export function FlappyBird(CTX, GAME_HEIGHT, GAME_WIDTH, BIRD){
    let running = false;


    function drawBird(){
        CTX.fillStyle = "black";
        CTX.fillRect(BIRD.x,BIRD.y,BIRD.width, BIRD.height);
    }
    
    function clearCanvas(){
        CTX.setTransform(1,0,0,1,0,0);
        CTX.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
 
        CTX.fillStyle = "#c4e7ff";
        CTX.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    }

    function step(){
        if (!running) return;
        clearCanvas();

        BIRD.update();
        drawBird();

        requestAnimationFrame(step);
    }


    document.addEventListener("click", (event) => { 
        BIRD.jump();

    })


    return{
        start(){
            running = true;

            requestAnimationFrame(step)
        },
        stop(){
            running = false;
        }
    }
}