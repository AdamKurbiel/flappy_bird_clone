import { Pillar } from "../entities/pillar.js";

export function FlappyBird(CTX, GAME_HEIGHT, GAME_WIDTH, BIRD){
    let running = false;
    let obstacles = [];
    let maxObstacles = 1;

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
        const gapHeight = 160;
        const topHeight = object.y;
        const bottomY = object.y + gapHeight;
        const bottomHeight = GAME_HEIGHT - bottomY;

        CTX.fillRect(object.x, 0, 50, topHeight);
        CTX.fillRect(object.x, bottomY, 50, bottomHeight);
    }

    function createPillar(y){
        if (obstacles.length < maxObstacles){
            
        let pillar = new Pillar(y);
        obstacles.push(pillar);
        }
    }

    function step(){
        if (!running) return;
        clearCanvas();
        
        BIRD.update();
        drawBird();

        let coords = Math.random() * 250;

        createPillar(coords);


        if (BIRD.started){
        for (let i = obstacles.length - 1; i >= 0; i--) {
            const pillar = obstacles[i];
            pillar.update();

            if (pillar.finished) {
                obstacles.splice(i, 1);
            } else {
                drawPillar(pillar);

                if (pillar.x < 200 && maxObstacles === 1) {
                    maxObstacles = 2;
                }
            }
        }
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