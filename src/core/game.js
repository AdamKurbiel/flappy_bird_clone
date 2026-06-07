import { Pillar } from "../entities/pillar.js";
import { clearCanvas, drawBird, drawPillar, GAP_HEIGHT } from "./render.js";
import { checkCollision } from "./collision.js";

export function FlappyBird(CTX, GAME_HEIGHT, GAME_WIDTH, BIRD){
    let running = false;
    let obstacles = [];
    let maxObstacles = 1;

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

            if (checkCollision(BIRD, pillar, GAP_HEIGHT, GAME_HEIGHT)) {
                running = false;
                break;
            }

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
        }
    }
}