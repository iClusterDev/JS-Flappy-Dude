// COLLISION
// collisionX
// collisionY

// ACTIONS
// bounce
// moveLeft
// moveRight
// moveUp
// moveDown
// jump
// flap

// POSITION
// x
// y

// VELOCITY
// x
// y

// ACCELERATION
// y
// y

// ROTATION
// angle

// SIZE
// x
// y
import Vec2D from '../utils/Vec2D';

class Dummy {
  constructor(ctx) {
    // FIXME
    // this still depends on the viewport context?
    this._ctx = ctx;
    this._ctxW = ctx.canvas.width;
    this._ctxH = ctx.canvas.height;

    this._size = new Vec2D(50, 50);
    this._position = new Vec2D(0, 0);
    this._velocity = new Vec2D(0, 0);
    this._acceleration = new Vec2D(0.5, 0.5);
    this._color = 'red';
  }

  draw() {
    this._ctx.fillStyle = this._color;
    this._ctx.fillRect(
      this._position.x,
      this._position.y,
      this._size.x,
      this._size.y
    );
  }

  update(timeStep) {
    if (this._velocity.x !== 0) {
      this._velocity.x -= this._acceleration.x * (timeStep / 1000);
      if (this._velocity.x <= 0) this._velocity.x = 0;
      console.log('need update');
      // this.update(timeStep);
    }

    // if (this._position.x <= 0) {
    //   this._position.x = 0;
    //   this._velocity.x = -this._velocity.x;
    // } else if (this._position.x + this._size.x >= this._ctxW) {
    //   this._position.x = this._ctxW - this._size.x;
    //   this._velocity.x = -this._velocity.x;
    // }
    // if (this._position.y <= 0) {
    //   this._position.y = 0;
    //   this._velocity.y = -this._velocity.y;
    // } else if (this._position.y + this._size.y >= this._ctxH) {
    //   this._position.y = this._ctxH - this._size.y;
    //   this._velocity.y = -this._velocity.y;
    // }
    // this._position.x += this._velocity.x * timeStep;
    // this._position.y += this._velocity.y * timeStep;
  }

  moveRight(timeStep) {
    this._velocity.x += this._acceleration.x * (timeStep / 1000);
    if (this._velocity.x >= 0.25) this._velocity.x = 0.25;
    console.log(
      'DEBUG ~ file: Dummy.js ~ line 91 ~ Dummy ~ moveRight ~ this._velocity.x',
      this._velocity.x
    );
    // this._position.x += this._velocity.x * timeStep;
  }

  moveDown(timeStep) {
    this._velocity.y += this._acceleration.y * (timeStep / 1000);
    if (this._velocity.y >= 0.25) this._velocity.y = 0.25;
    this._position.y += this._velocity.y * timeStep;
  }

  moveLeft(timeStep) {
    this._velocity.x += this._acceleration.x * (timeStep / 1000);
    if (this._velocity.x >= 0.25) this._velocity.x = 0.25;
    this._position.x -= this._velocity.x * timeStep;
  }

  moveUp(timeStep) {
    this._velocity.y += this._acceleration.y * (timeStep / 1000);
    if (this._velocity.y >= 0.25) this._velocity.y = 0.25;
    this._position.y -= this._velocity.y * timeStep;
  }
}

export default Dummy;
