export class EnemForPhaseThree{
    constructor(image, width, height, spriteWidth, spriteHeight, imageCoordX, imageCoordY) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.imageCoordX = imageCoordX;
        this.imageCoordY = imageCoordY;
        this.direction = 'Down';
    }
    draw(context) {
        context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.imageCoordX, this.imageCoordY, this.width, this.height);
    }
    update() {
        if (this.imageCoordY == -20) {
            this.direction = 'Down';
        } else if (this.imageCoordY == 410) {
            this.direction = 'Up';
        }
        if (this.direction == 'Down') {
            this.imageCoordY += 2;
        } else if (this.direction == 'Up') {
            this.imageCoordY -= 2;
        }
    }
}

export class EnemTPTBullet {
    constructor (width, height, positionX, positionY, ) {
        this.width = width;
        this.height = height;
        this.positionX = positionX;
        this.positionY = positionY;
    }
    draw (ctx) {
        ctx.fillStyle = "green";
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    }
    update() {
        this.positionX -= 10;
    }
}