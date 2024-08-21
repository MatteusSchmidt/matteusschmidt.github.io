const flock = [];
const numBoids = 200

function setup() {
    createCanvas(innerWidth, innerHeight);
    for (let i = 0; i < numBoids; i++)
    flock.push(new Boid());
}

function draw() {
    background(51);
    for (let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
}