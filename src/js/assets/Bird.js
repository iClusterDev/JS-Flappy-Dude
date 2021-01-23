import Vec2D from '../utils/Vec2D';

class Bird {
  constructor() {
    this._ctx = document.querySelector('canvas').getContext('2d');

    this._size = new Vec2D(50, 50);
    this._position = new Vec2D(150, 0);
    this._velocity = new Vec2D(0, 0.5);
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

  update(timeStep, controller) {
    if (this._position.y <= 0) {
      this._position.y = 0;
      this._velocity.y = -this._velocity.y;
    } else if (this._position.y + this._size.y >= this._ctx.canvas.height) {
      this._position.y = this._ctx.canvas.height - this._size.y;
      this._velocity.y = -this._velocity.y;
    }

    // on space pressed
    // the bird will flap
    if (controller.space.isActive) {
      this._velocity.y -= 0.25;
    }

    this._velocity.y += 0.125;
    this._velocity.y *= 0.9;
    this._position.y += this._velocity.y * timeStep;
  }
}

export default Bird;
