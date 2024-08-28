const numBoids = 1500;
const flock = [];
let quadTree;

let borderObstacles = [];
let Obstacles = [];


function setup() {
    let canvas = createCanvas(windowWidth, select('#home').height);
    canvas.parent('home');
    createBorderObstacles();
    // Obstacles.push(new ObstacleCircle(width/2, height/2, 59));
    for (let i = 0; i < numBoids; i++) {
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
        // boid.avoid(Obstacles);
        boid.flock(quadTree);
        boid.update();
        boid.show();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, select('#home').height);
    createBorderObstacles();
}

function createBorderObstacles() {
    borderObstacles = [];
    borderObstacles.push(new BorderObstacle(0, 0, width, 0));
    borderObstacles.push(new BorderObstacle(0, 0, 0, height));
    borderObstacles.push(new BorderObstacle(width, 0, width, height));
    borderObstacles.push(new BorderObstacle(0, height, width, height));
}