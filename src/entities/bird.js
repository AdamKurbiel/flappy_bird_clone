export class Bird {
    constructor() {
        this.x = 225;
        this.y = 225;
        this.width = 32;
        this.height = 32;
        this.color = "green";

        this.velocity = 0;
        this.gravity = 0.6;
        this.jumpStrength = -10;
        this.terminalVelocity = 15;

        this.started = false
    }

    update() {
        if (this.y > 500 || this.started == false)  return;

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
        this.started = true
        if (this.y > 500){
            this.y = 500;
            this.velocity = 0;
            return;
        }
        this.velocity = this.jumpStrength;
    }
}