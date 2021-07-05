function nextGen() {
    fitnessCalc();
    for (let i = 0; i < POP; i++) {
        birds[i] = pickBird();
    }
    //clear the saved birds
    backedUpBirds = [];
}

function pickBird(){
    //if you want add crossover here
    var index = 0;
    var r = random(1);
    while(r > 0) {
        r = r - backedUpBirds[index].fitness;
        index++;
    }
    index--;

    let bird = backedUpBirds[index];
    let child = new Bird(bird.brain);
    child.mutate();
    return child;
}


function fitnessCalc() {
    let sum = 0;
    for (let bird of backedUpBirds) {
        sum += bird.scr;
    }

    for (let bird of backedUpBirds) {
        bird.fitness = bird.scr / sum;
    }

}
