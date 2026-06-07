import { Pillar } from "../entities/pillar.js";
import { clearCanvas, drawBird, drawPillar, GAP_HEIGHT, drawScore } from "./render.js";
import { checkCollision } from "./collision.js";

export function FlappyBird(CTX, GAME_HEIGHT, GAME_WIDTH, BIRD){
    let running = false;
    let obstacles = [];
    let maxObstacles = 1;
    let score = 0;


    function createPillar(){
        if (obstacles.length < maxObstacles){
        let y = Math.random() * 250;
            
        let pillar = new Pillar(y);
        obstacles.push(pillar);
        }
    }

    function step(){
        if (!running) return;
        clearCanvas(CTX,GAME_WIDTH,GAME_HEIGHT);
        drawScore(CTX,GAME_HEIGHT,GAME_WIDTH,score);
        
        BIRD.update();
        drawBird(CTX,BIRD);

        
        createPillar();


        if (BIRD.started){
        for (let i = obstacles.length - 1; i >= 0; i--) {
            const pillar = obstacles[i];
            pillar.update();

            if (checkCollision(BIRD, pillar, GAP_HEIGHT, GAME_HEIGHT)) {
                running = false;
                break;
            }

            if (pillar.finished) {
                obstacles.splice(i, 1);
            } else {
                drawPillar(CTX, pillar, GAME_HEIGHT);

                if (pillar.x < 200 && maxObstacles === 1) {
                    maxObstacles = 2;
                }
            }
        }

        score++;
        drawScore(CTX,GAME_HEIGHT,GAME_WIDTH,score);
        }
        

        if (!running) return;
        
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
            return;
        }
    }
}