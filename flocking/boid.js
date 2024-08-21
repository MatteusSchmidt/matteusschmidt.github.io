class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,3.5))
        this.acceleration = createVector();
        this.perceptionRadius = 30;
        this.maxForce = 0.1;
        this.maxSpeed = 4;
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0
        }
        else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0
        }
        else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    align(boids) {
        let counter = 0;
        let steering = createVector();
        for (let other of boids) {
            let distance = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
            if (other != this && distance < this.perceptionRadius) {
                steering.add(other.velocity);
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

    separation(boids) {
        let counter = 0;
        let steering = createVector();
        for (let other of boids) {
            let distance = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
            if (other != this && distance < this.perceptionRadius) {
                let difference = p5.Vector.sub(this.position, other.position)
                steering.add(difference.div(distance));
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

    cohesion(boids) {
        let counter = 0;
        let steering = createVector();
        for (let other of boids) {
            let distance = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
            if (other != this && distance < this.perceptionRadius) {
                steering.add(other.position);
                counter++;
            }
        }
        if (counter > 0) {
            steering.div(counter);
            steering.setMag(this.maxSpeed);
            steering.sub(this.position)
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    flock(boids) {
        this.acceleration.add(this.align(boids));
        this.acceleration.add(this.cohesion(boids));
        this.acceleration.add(this.separation(boids));
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed)
        this.acceleration.mult(0);
    }

    show() {
        strokeWeight(4);
        stroke(255);
        point(this.position.x, this.position.y)
    }
}