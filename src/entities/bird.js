export function Bird(){
    this.x = 200;
    this.y = 200;
    this.color = "green";

    Bird.prototype.update = function(){
        this.y += 1;
    }
}