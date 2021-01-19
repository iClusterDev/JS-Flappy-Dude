import Vec2D from '../utils/Vec2D';

class SpaceShip {
  constructor(ctx) {
    this._ctx = ctx;
    this._ctxW = ctx.canvas.width;
    this._ctxH = ctx.canvas.height;

    this._size = new Vec2D(50, 50);
    this._position = new Vec2D(0, 0);
    this._velocity = new Vec2D(0, 0);
    this._acceleration = new Vec2D(0, 0);
    this._rotation = 0;
    this._friction = 0.9;
  }

  update(timeStep, controller) {
    if (controller.left.isActive) {
      this._rotation -= 0.05;
    } else if (controller.right.isActive) {
      this._rotation += 0.05;
    }

    if (controller.space.isActive) {
      this._acceleration.x = Math.sin(this._rotation) * 0.5;
      this._acceleration.y = Math.cos(this._rotation) * 0.5;
    } else {
      this._acceleration.x = this._acceleration.y = 0;
    }

    this._velocity.x += this._acceleration.x;
    this._velocity.y += this._acceleration.y;
    this._velocity.x *= this._friction;
    this._velocity.y *= this._friction;
    this._position.x += this._velocity.x;
    this._position.y += this._velocity.y;
  }

  draw() {
    this._ctx.fillStyle = this._color;
    // this._ctx.save();
    // this._ctx.translate(this._position.x, this._position.y);
    // this._ctx.rotate((this._rotation * Math.PI) / 180);
    this._ctx.fillRect(
      this._position.x,
      this._position.y,
      this._size.x,
      this._size.y
    );
    // this._ctx.restore();
    // this._ctx.beginPath();
    // this._ctx.moveTo(75, 50);
    // this._ctx.lineTo(100, 75);
    // this._ctx.lineTo(100, 25);
    // this._ctx.fill();
  }
}

export default SpaceShip;
