export class Bird {
    constructor() {
        this.x = 200;
        this.y = 200;
        this.width = 32;
        this.height = 32;
        this.color = "green";

        this.velocity = 0;
        this.gravity = 0.6;
        this.jumpStrength = -10;
        this.terminalVelocity = 12;
    }

    update() {
        this.velocity += this.gravity;
        if (this.velocity > this.terminalVelocity) {
            this.velocity = this.terminalVelocity;
        }

        this.y += this.velocity;

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    jump() {
        this.velocity = this.jumpStrength;
    }
}