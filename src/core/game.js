import { Pillar } from "../entities/pillar.js";
import { clearCanvas, drawBird, drawPillar, GAP_HEIGHT, drawScore, drawOverlayText } from "./render.js";
import { checkCollision } from "./collision.js";
import { getHighScores, saveHighScore } from "./score.js";

export function FlappyBird(CTX, GAME_HEIGHT, GAME_WIDTH, BIRD){
    let running = false;
    let obstacles = [];
    let maxObstacles = 1;
    let score = 0;
    let state = "start";
    let highScores = getHighScores();

    function resetGame() {
        obstacles = [];
        maxObstacles = 1;
        score = 0;
        state = "playing";
        BIRD.reset();
    }

    function createPillar(){
        if (obstacles.length < maxObstacles){
            const minY = 60;
            const maxY = GAME_HEIGHT - GAP_HEIGHT - 60;
            const y = minY + Math.random() * (maxY - minY);
            const pillar = new Pillar(y);
            obstacles.push(pillar);
        }
    }

    function step(){
        if (!running) return;
        clearCanvas(CTX,GAME_WIDTH,GAME_HEIGHT);

        if (state === "start") {
            drawOverlayText(
                CTX,
                GAME_WIDTH,
                GAME_HEIGHT,
                "Click to Play",
                "Tap to begin",
                ["High Scores:", ...highScores.map((value, index) => `${index + 1}. ${value}`)]
            );
            requestAnimationFrame(step);
            return;
        }

        if (state === "playing") {
            BIRD.update();
            drawBird(CTX,BIRD);
            createPillar();

            for (let i = obstacles.length - 1; i >= 0; i--) {
                const pillar = obstacles[i];
                pillar.update();

                if (checkCollision(BIRD, pillar, GAP_HEIGHT, GAME_HEIGHT) || BIRD.y + BIRD.height >= GAME_HEIGHT) {
                    state = "gameover";
                    highScores = saveHighScore(score);
                    break;
                }

                if (!pillar.passed && pillar.x + 50 < BIRD.x) {
                    pillar.passed = true;
                    score += 1;
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

            drawScore(CTX, GAME_WIDTH, GAME_HEIGHT, score);
            requestAnimationFrame(step);
            return;
        }

        if (state === "gameover") {
            drawBird(CTX,BIRD);
            obstacles.forEach(pillar => drawPillar(CTX, pillar, GAME_HEIGHT));
            drawScore(CTX, GAME_WIDTH, GAME_HEIGHT, score);
            drawOverlayText(
                CTX,
                GAME_WIDTH,
                GAME_HEIGHT,
                "Game Over",
                `Score: ${score}`,
                [
                    "High Scores:",
                    ...highScores.map((value, index) => `${index + 1}. ${value}`),
                    "",
                    "Click to restart"
                ]
            );
            requestAnimationFrame(step);
            return;
        }
    }

    function onCanvasClick() {
        if (state === "start" || state === "gameover") {
            resetGame();
        }

        BIRD.jump();
    }

    document.addEventListener("click", onCanvasClick);

    return{
        start(){
            running = true;
            requestAnimationFrame(step);
        },
        stop(){
            running = false;
        }
    }
}
