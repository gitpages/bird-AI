class Pipe {
    constructor() {
        this.gap = 125;
        this.upperPipe = random(height / 6, 3 / 4 * height);
        this.lowerPipe = height - (this.upperPipe + this.gap);

        this.pipeXpos = width;
        this.pipeWidth = 80;

        this.showHit = false;

        this.pVel = 2;
    }

    show() {
        fill(255);
        if (this.showHit) {
            fill(255, 0, 0);
        }
        image(pDImage, this.pipeXpos, 0, this.pipeWidth, this.upperPipe);
        image(pUpImage, this.pipeXpos, height - this.lowerPipe, this.pipeWidth, this.lowerPipe);
    }

    update() {
        this.pipeXpos -= this.pVel;
    }

    hits(bird) {
        if (bird.yPos < this.upperPipe || bird.yPos > height - this.lowerPipe) {
            if (bird.xPos > this.pipeXpos && bird.xPos < this.pipeXpos + this.pipeWidth) {
                this.showHit = true;
                return true;
            }
        }
        this.showHit = false;
        return false;
    }

    isGone() {
        if (this.pipeXpos < -this.pipeWidth) {
            return true;
        } else {
            return false;
        }

    }

}
