const numBoids = 1500;
const flock = [];
let quadTree;

let borderObstacles = [];

function setup() {
    let canvas = createCanvas(windowWidth, select('#home').height);
    canvas.parent('home');
    createBorderObstacles();
    for (let i = 0; i < windowWidth; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background('#ff7f26');
    quadTree = new QuadTree(0, width, 0, 570);
    for (let boid of flock) {
        quadTree.insert(boid);
    }
    for (let boid of flock) {
        boid.avoid(borderObstacles);
        boid.flock(quadTree);
        boid.update();
        boid.show();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, select('#home').height);
    if (windowWidth < flock.length) {
        for (let i = flock.length - 1; i >= windowWidth; i--) {
            flock.splice(i, 1);
        }
    }
    else {
        for (let i = flock.length; i < windowWidth; i++) {
            flock.push(new Boid());
        }
    }
    createBorderObstacles();
}

function createBorderObstacles() {
    borderObstacles = [];
    borderObstacles.push(new BorderObstacle(0, 0, width, 0));
    borderObstacles.push(new BorderObstacle(0, 0, 0, height));
    borderObstacles.push(new BorderObstacle(width, 0, width, height));
    borderObstacles.push(new BorderObstacle(0, height, width, height));
}