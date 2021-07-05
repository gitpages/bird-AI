let townImage;
let pUpImage;
let pDImage;

let b0;
let b1;
let b2;
let b3;
let animation = [];

const POP = 500;
let birds = [];
let backedUpBirds = [];
let pipes = [];
let counter = 0;
let slider;
let genNum = 1;
let gameScore = 0;
let hgameScore = 0;

function preload() {
    font = loadFont('fonts/Minecraft.ttf');

    b0 = loadImage('img/bird00.png');
    b1 = loadImage('img/bird01.png');
    b2 = loadImage('img/bird02.png');
    b3 = loadImage('img/bird03.png');

    pUpImage = loadImage('img/pipeUp.png');
    pDImage = loadImage('img/pipeD.png');

    townImage = loadImage('img/town1.png');
}

function setup() {
    createCanvas(640, 480);
    slider = createSlider(1, 100, 1);

    animation[0] = b0;
    animation[1] = b1;
    animation[2] = b2;
    animation[3] = b3;

    for (let i = 0; i < POP; i++) {
        birds[i] = new Bird();
    }
}

function drawGen() {
    textFont(font);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    noStroke();
    text('Generation Number: ' + genNum, 500, 20);
}

function drawScr() {
    textFont(font);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    noStroke();
    for (let bird of birds) {
        text('Score: ' + gameScore, 500, 40);
    }

}

function drawhScr() {
    textFont(font);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    noStroke();
    for (let bird of birds) {
        text('Highest Score: ' + hgameScore, 500, 60);
    }

}



function draw() {

    for (let k = 0; k < slider.value(); k++) {

        if (counter % 130 == 0) {
            pipes.push(new Pipe());
        }
        counter++;

        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update();

            //delete dead birds and save them
            for (let j = birds.length - 1; j >= 0; j--) {
                if (pipes[i].hits(birds[j])) {
                    backedUpBirds.push(birds.splice(j, 1)[0]); //this zero is to prevent an array of arrays
                }
            }

            //delete pipes offscreen
            if (pipes[i].isGone()) {
                pipes.splice(i, 1);
                gameScore++;
            }
            //
        }

        for (let i = birds.length - 1; i >= 0; i--) {
            if (birds[i].isOffScreen()) {
                backedUpBirds.push(birds.splice(i, 1)[0]); //this zero is to prevent an array of arrays
            }
        }

        for (let bird of birds) {
            bird.think(pipes);
            bird.update();
        }

        if (gameScore > hgameScore) {
            hgameScore = gameScore;
        }

        if (birds.length === 0) {
            counter = 0;
            gameScore = 0;
            nextGen();
            pipes = [];
            genNum++;
        }
    }



    //draw
    background(0);
    //imageMode(CENTER);
    image(townImage, 0, 0, 640, 480);
    for (let bird of birds) {
        bird.show(animation[counter % animation.length]);
    }
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
    }
    drawGen();
    drawScr();
    drawhScr();
}