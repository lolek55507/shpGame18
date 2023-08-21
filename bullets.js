export class Bullet {
    constructor(placeX, placeY, characterWidth,  characterHeight, bulletHeight) {
        this.placeX = placeX + characterWidth / 2;
        this.placeY = placeY + characterHeight / 2 - bulletHeight / 2;
    }
    update(bSpeed) {
        this.placeX += bSpeed;
    }
    draw(colour, bulletWidth, ctx, bulletHeight) {
        ctx.fillStyle = colour;
        ctx.fillRect(this.placeX, this.placeY, bulletWidth, bulletHeight);
    }
}