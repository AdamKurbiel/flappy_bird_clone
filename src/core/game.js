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

    const GAP_HEIGHT = 160;

    function drawPillar(object){
        const topHeight = object.y;
        const bottomY = object.y + GAP_HEIGHT;
        const bottomHeight = GAME_HEIGHT - bottomY;

        CTX.fillRect(object.x, 0, 50, topHeight);
        CTX.fillRect(object.x, bottomY, 50, bottomHeight);
    }

    function isColliding(rectA, rectB){
        return rectA.x < rectB.x + rectB.w &&
               rectA.x + rectA.w > rectB.x &&
               rectA.y < rectB.y + rectB.h &&
               rectA.y + rectA.h > rectB.y;
    }

    function checkCollision(bird, pillar){
        const birdRect = { x: bird.x, y: bird.y, w: bird.width, h: bird.height };
        const topRect = { x: pillar.x, y: 0, w: 50, h: pillar.y };
        const bottomY = pillar.y + GAP_HEIGHT;
        const bottomRect = { x: pillar.x, y: bottomY, w: 50, h: GAME_HEIGHT - bottomY };

        return isColliding(birdRect, topRect) || isColliding(birdRect, bottomRect);
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

            if (checkCollision(BIRD, pillar)) {
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