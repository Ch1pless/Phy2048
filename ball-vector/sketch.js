let GRAVITY = 9.8; // 9.8 meters / second^2

class Ball {
  
  // Called when we create a new ball.
  constructor(xPosition, yPosition, radius) {
    
    // Holds the position of the ball.
    this.position = createVector(xPosition, yPosition);
    
    // Holds the velocity of the ball.
    this.velocity = createVector(0, 0);
    
    // Holds the acceleration of the ball. We set the y to gravity as a default.
    this.acceleration = createVector(0, GRAVITY);
    
    // Sets the radius of the ball.
    this.radius = radius;
  }

  update() {
    /*  Add our acceleration to the ball's velocity. We add the accelerations divided by 30
    because our timestep is 30 times in a second. In order to get a velocity of 9.8 m/s^2 after
    1 second, we need to account for the fact that we add the acceleration to the velocity 30
    times within a second.
    */
    this.velocity.div(30);


    /* This detects when our ball is on the ground (when the ball's y position + its diameter
      is greater than the canvas' height + its radius / 2. In this environment, +y is down, -y is       up. However, +x is still right and -x is still left.
    */
    if (this.position.y + this.radius * 2 > height + this.radius / 2) {
      this.velocity.y = 0;
    }

    /* Notice that before this we check to see if the ball is on the ground, and if it is, set         the velocity to 0. Had we not done that, the velocity would be added here.
    */
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.add(this.velocity);
  }

  draw() {
    fill(255, 0, 0);
    circle(this.position.x, this.position.y, this.radius * 2); // circle function takes diameter.
  }
}

// Our first and only ball in a lonely world. Has a x and y position of 60, 60 respectively, and
// a radius of 20.
let ball;

/*
  First function called in p5.js. Creates a simple canvas to which we can draw to.
*/
function setup() {
  ball = new Ball(60, 60, 20);
  createCanvas(800, 600);
}

/*
  Draws our canvas that we created above. This is called 30 times a second, so be careful what you do in here as it gets repeated very frequently.
*/
function draw() {
  background(0, 0, 0); // rgb = 0, 0, 0 for black.
  ball.update();
  ball.draw();
  // It's good practice to update first and then draw the result.
}