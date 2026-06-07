export const GAP_HEIGHT = 160;

export function clearCanvas(CTX, GAME_WIDTH, GAME_HEIGHT) {
    CTX.setTransform(1, 0, 0, 1, 0, 0);
    CTX.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    CTX.fillStyle = "#c4e7ff";
    CTX.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}

export function drawBird(CTX, bird) {
    CTX.fillStyle = "black";
    CTX.fillRect(bird.x, bird.y, bird.width, bird.height);
}

export function drawScore(CTX, WIDTH, HEIGHT, SCORE){
    CTX.font = "30px Arial";
    CTX.fillStyle = "White";
    CTX.lineWidth = 3;
    CTX.strokeStyle = "Black";
    CTX.textAlign = "center";
    CTX.strokeText(`Score: ${SCORE}`,WIDTH/2,30);
    CTX.fillText(`Score: ${SCORE}`,WIDTH/2,30)
}

export function drawPillar(CTX, object, GAME_HEIGHT) {
    const topHeight = object.y;
    const bottomY = object.y + GAP_HEIGHT;
    const bottomHeight = GAME_HEIGHT - bottomY;

    CTX.fillRect(object.x, 0, 50, topHeight);
    CTX.fillRect(object.x, bottomY, 50, bottomHeight);
}
