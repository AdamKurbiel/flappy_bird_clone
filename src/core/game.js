import { Pillar } from "../entities/pillar.js";

export function FlappyBird(CTX, GAME_HEIGHT, GAME_WIDTH, BIRD){
    let running = false;
    let obstacles = [];

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

    function drawPillar(object){
        CTX.fillRect(object.x,object.y, 50, 500);
        CTX.fillRect(object.x,-object.y - 160, 50, 500);

    }

    function step(){
        if (!running) return;
        clearCanvas();

        BIRD.update();
        drawBird();

        console.log(obstacles.length)
        if (obstacles.length < 1){
            let pillar = new Pillar(250);
            obstacles.push(pillar);
        }

        for (let i in obstacles){
            if (obstacles[i].finished){
                obstacles.splice(i,1);
                continue;
            }
            obstacles[i].update();
    
            drawPillar(obstacles[i])
        }


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