import Vec2D from '../utils/Vec2D';

class BouncingBall {
  constructor() {
    // FIXME
    // this still depends on the viewport context?
    this._ctx = document.querySelector('canvas').getContext('2d');

    this._size = new Vec2D(50, 50);
    this._position = new Vec2D(0, 0);
    this._velocity = new Vec2D(0.25, 0.25);
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
    if (this._position.x <= 0) {
      this._position.x = 0;
      this._velocity.x = -this._velocity.x;
    } else if (this._position.x + this._size.x >= this._ctx.canvas.width) {
      this._position.x = this._ctx.canvas.width - this._size.x;
      this._velocity.x = -this._velocity.x;
    }
    if (this._position.y <= 0) {
      this._position.y = 0;
      this._velocity.y = -this._velocity.y;
    } else if (this._position.y + this._size.y >= this._ctx.canvas.height) {
      this._position.y = this._ctx.canvas.height - this._size.y;
      this._velocity.y = -this._velocity.y;
    }
    this._position.x += this._velocity.x * timeStep;
    this._position.y += this._velocity.y * timeStep;
  }
}

export default BouncingBall;
