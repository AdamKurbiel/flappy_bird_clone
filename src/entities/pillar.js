export class Pillar{
    constructor(y){
        this.x = 500;
        this.y = y;
        this.finished = false;
    }

    update(){
        if (this.x < -64){
            this.finished = true;
            return;}
        this.x -= 2;
    }
}