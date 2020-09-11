const GRAVITY = 9.8; // 9.8 meters / second^2
const fps = 30;
const boundRes = -0.5;
const drag = 0.1;
const friction = 0.2;
var ballGrabbed = false;
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
    this.velocity.div(fps);


    /* This detects when our ball has reached the edge of the canvas, and keeps it inside along with reflecting it
       by the boundary resistance.
    */
    var boundCollX = false;
    var boundCollY = false;
    if (this.position.x + this.radius > width) {
      boundCollX = true;
      this.position.x = width - this.radius;
    } else if (this.position.x - this.radius < 0) {
      boundCollX = true;
      this.position.x = xMargin;
    }
    if (this.position.y + this.radius > height) {
      boundCollY = true;
      this.position.y = height - this.radius;
    } else if (this.position.y - this.radius < 0) {
      boundCollY = true;
      this.position.y = this.radius;
    }
    this.velocity.x = boundCollX ? this.velocity.x * boundRes : this.velocity.x;
    this.velocity.y = boundCollY ? this.velocity.y * boundRes : this.velocity.y;

    /* Modifies the velocity by drag and friction values. Doesn't reflect physics to well.
    */
    var dragVelocity = p5.Vector.mult(this.velocity, drag / fps);
    var frictionVelocity = p5.Vector.mult(this.velocity, friction / fps);
    this.velocity.sub(dragVelocity);
    this.velocity.sub(frictionVelocity);

    var mouseToBall = createVector(mouseX, mouseY);
    mouseToBall.sub(this.position);
    if (ballGrabbed && mouseIsPressed) {
      this.mouseGrab()
    } else {
      ballGrabbed = false;
    }

    /* Notice that before this we check to see if the ball is on the ground, and if it is, set         the velocity to 0. Had we not done that, the velocity would be added here.
    */
    this.position.add(this.velocity);
  }

  draw() {
    fill(255, 0, 0);
    circle(this.position.x, this.position.y, this.radius * 2); // circle function takes diameter.
  }

  mouseGrab() {
    this.position = createVector(mouseX, mouseY);
    this.velocity = createVector(mouseX-pmouseX, mouseY-pmouseY);
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
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(event) {
  var mousePos = createVector(mouseX, mouseY);
  if (mousePos.dist(ball.position) < ball.radius) {
    ballGrabbed = true;
  }
} 