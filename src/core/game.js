export function FlappyBird(CTX, GAME_HEIGHT, GAME_WIDTH){
    let running = false;
    
    function clearCanvas(){
        CTX.setTransform(1,0,0,1,0,0);
        CTX.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
 
        CTX.fillStyle = "#c4e7ff";
        CTX.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    }

    function step(){
        clearCanvas()

        requestAnimationFrame(step)
    }   

    return{
        start(){
            running = true;

            requestAnimationFrame(step)
        },
        stop(){
            running = false
        }
    }
}