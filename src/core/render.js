export const GAP_HEIGHT = 160;

export function clearCanvas(CTX, GAME_WIDTH, GAME_HEIGHT) {
    CTX.setTransform(1, 0, 0, 1, 0, 0);
    CTX.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    CTX.fillStyle = "#c4e7ff";
    CTX.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}

export function drawBird(CTX, bird) {
    CTX.fillStyle = "#fcba03";
    CTX.fillRect(bird.x, bird.y, bird.width, bird.height);
}

export function drawScore(CTX, WIDTH, HEIGHT, SCORE){
    CTX.font = "38px Arial";
    CTX.fillStyle = "White";
    CTX.lineWidth = 4;
    CTX.strokeStyle = "Black";
    CTX.textAlign = "center";
    CTX.strokeText(`${SCORE}`, WIDTH / 2, 50);
    CTX.fillText(`${SCORE}`, WIDTH / 2, 50);
}

export function drawOverlayText(CTX, WIDTH, HEIGHT, title, subtitle, lines = []) {
    CTX.font = "48px Arial";
    CTX.fillStyle = "White";
    CTX.strokeStyle = "Black";
    CTX.lineWidth = 5;
    CTX.textAlign = "center";

    CTX.strokeText(title, WIDTH / 2, HEIGHT / 2 - 40);
    CTX.fillText(title, WIDTH / 2, HEIGHT / 2 - 40);

    CTX.font = "24px Arial";
    CTX.strokeText(subtitle, WIDTH / 2, HEIGHT / 2 + 10);
    CTX.fillText(subtitle, WIDTH / 2, HEIGHT / 2 + 10);

    CTX.font = "20px Arial";
    lines.forEach((line, index) => {
        const y = HEIGHT / 2 + 50 + index * 28;
        CTX.strokeText(line, WIDTH / 2, y);
        CTX.fillText(line, WIDTH / 2, y);
    });
}

export function drawPillar(CTX, object, GAME_HEIGHT) {
    const topHeight = object.y;
    const bottomY = object.y + GAP_HEIGHT;
    const bottomHeight = GAME_HEIGHT - bottomY;

    CTX.fillStyle = "green";
    CTX.fillRect(object.x, 0, 50, topHeight);
    CTX.fillRect(object.x, bottomY, 50, bottomHeight);
}
