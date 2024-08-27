class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.strokeWeight = 2
        this.velocity.setMag(random(0.5,1))
        this.acceleration = createVector();
        this.perceptionRadius = 12;
        this.maxForce = 0.18;
        this.maxSpeed = 1.5;
    }

    avoid(obstacles) {
        for (let obstacle of obstacles) {
            let distance = obstacle.distance(this.position);
            if (distance < 40) {
                let normalVec = obstacle.getNormal(this.position);
                normalVec.setMag(this.maxSpeed);
                let steer = p5.Vector.sub(normalVec, this.velocity);
                steer.limit(this.maxForce);
                this.acceleration.add(steer);
            }
        }
    }

    steerTowards(neighbors, getTargetVector) {
        let steering = createVector();
        let counter = 0;

        for (let other of neighbors) {
            let distance = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
            if (other !== this && distance < this.perceptionRadius) {
                steering.add(getTargetVector(this, other, distance));
                counter++;
            }
        }
        if (counter > 0) {
            steering.div(counter);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    align(neighbors) {
        return this.steerTowards(neighbors, (self, other) => other.velocity);
    }

    separation(neighbors) {
        return this.steerTowards(neighbors, (self, other, distance) => {
            let difference = p5.Vector.sub(self.position, other.position);
            return difference.div(distance);
        });
    }

    cohesion(neighbors) {
        return this.steerTowards(neighbors, (self, other) => other.position.copy().sub(self.position));
    }

    flock(quadTree) {
        // Query neighbors only once
        const neighbors = quadTree.queryRange(
            this.position.x - this.perceptionRadius,
            this.position.x + this.perceptionRadius,
            this.position.y - this.perceptionRadius,
            this.position.y + this.perceptionRadius
        );

        this.acceleration.add(this.align(neighbors).mult(1));
        this.acceleration.add(this.cohesion(neighbors).mult(0.85));
        this.acceleration.add(this.separation(neighbors).mult(1.2));
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed)
        this.acceleration.mult(0);
    }

    show() {
        strokeWeight(this.strokeWeight);
        stroke(255);
        point(this.position.x, this.position.y)
    }
}

class BorderObstacle {
    constructor(x1, y1, x2, y2) {
        this.start = createVector(x1, y1);
        this.end = createVector(x2, y2);
    }

    show() {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    getNormal(point) {
        let lineVec = p5.Vector.sub(this.end, this.start);
        let pointVec = p5.Vector.sub(point, this.start);
        let projLength = pointVec.dot(lineVec) / lineVec.mag();
        let projVec = lineVec.copy().setMag(projLength);
        let normalVec = p5.Vector.sub(pointVec, projVec);
        return normalVec;
    }

    distance(point) {
        let normalVec = this.getNormal(point);
        return normalVec.mag();
    }
}

class ObstacleCircle {
    constructor(x, y, radius) {
        this.position = createVector(x, y);
        this.radius = radius;
    }

    show() {
        stroke(255, 0, 0);
        strokeWeight(2);
        ellipse(this.position.x, this.position.y, this.radius * 2);
    }

    // Method to calculate distance from a point (boid's position) to the obstacle's center
    distance(point) {
        return dist(point.x, point.y, this.position.x, this.position.y);
    }

    // Method to calculate the normal vector pointing away from the obstacle's surface
    getNormal(point) {
        let normalVec = p5.Vector.sub(point, this.position);
        normalVec.normalize(); // Get the direction of the normal
        normalVec.mult(this.radius); // Scale it to the obstacle's radius
        return p5.Vector.add(this.position, normalVec); // Return the point on the obstacle's surface
    }
}