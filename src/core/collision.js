export function isColliding(rectA, rectB) {
    return rectA.x < rectB.x + rectB.w &&
           rectA.x + rectA.w > rectB.x &&
           rectA.y < rectB.y + rectB.h &&
           rectA.y + rectA.h > rectB.y;
}

export function checkCollision(bird, pillar, gapHeight, gameHeight) {
    const birdRect = { x: bird.x, y: bird.y, w: bird.width, h: bird.height };
    const topRect = { x: pillar.x, y: 0, w: 50, h: pillar.y };
    const bottomY = pillar.y + gapHeight;
    const bottomRect = { x: pillar.x, y: bottomY, w: 50, h: gameHeight - bottomY };

    return isColliding(birdRect, topRect) || isColliding(birdRect, bottomRect);
}
