class Bird {
    constructor(brain) {
        this.xPos = 64;
        this.yPos = height / 2;

        this.vel = 0;
        this.grav = 0.8;
        this.jumpheight = -12;
        this.airRes = 0.98;

        this.showDownHit = false;
        this.showUpHit = false;
        //inp = yLoc of bird, top pipe, bottom pipe, and pipexpos, vel

        this.scr = 0;
        this.fitness = 0;

        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetworkModel(5, 8, 2);
        }

    }

    isOffScreen() {
        return (this.yPos > height || this.yPos < 0);
    }

    show(img) {
        image(img, this.xPos, this.yPos, 48, 48);

    }

    jump() {
        this.vel += this.jumpheight;
    }

    think(pipes) {
        let closest = null;
        let closestD = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let dist = (pipes[i].pipeXpos + pipes[i].pipeWidth) - this.xPos;
            if (dist < closestD && dist > 0) {
                closest = pipes[i];
                closestD = dist;
            }
        }

        let inputs = []
        inputs[0] = this.yPos / height;
        inputs[1] = closest.upperPipe / height;
        inputs[2] = closest.lowerPipe / height;
        inputs[3] = closest.pipeXpos / width;
        inputs[4] = this.vel / 10;

        let output = this.brain.feedForward(inputs);
        //console.log(output[0]);
        if (output[0] > output[1]) {
            this.jump();
        }

    }

    update() {
        this.scr++;

        this.vel += this.grav;
        this.yPos += this.vel;
        // this.vel *= this.airRes;



    }

    mutate() {
        this.brain.mutate(0.1);
    }

}
