import Vec2D from '../utils/Vec2D';

class FlyingBird {
  constructor(ctx) {
    // FIXME
    // this still depends on the viewport context?
    this._ctx = ctx;
    this._ctxW = ctx.canvas.width;
    this._ctxH = ctx.canvas.height;

    this._position = new Vec2D(this._ctxW / 4, this._ctxH - 20);
    this._velocity = new Vec2D(0, 0);
    this._size = new Vec2D(20, 20);
    this.weight = 0.75;
    this.angle = 0;
    this.omega = 1;
    this.color = 'red';
  }

  update(spacePressed, timeStep) {
    // for the idle position we use
    // a sinusoid curve
    // let curve = Math.sin(this.angle * (Math.PI / 180)) * 2;
    // this.angle >= 359
    //   ? (this.angle = 0)
    //   : (this.angle += this.omega * timeStep);
    // this._position.y -= curve;
    // if (this._position.y > this._ctxH - this._size.y * 3 + curve) {
    //   this._position.y = this._ctxH - this._size.y * 3 + curve;
    //   this._velocity.y = 0;
    // } else {
    //   this._velocity.y += this.weight;
    //   this._velocity.y *= 0.9;
    //   this._position.y += this._velocity.y;
    // }
    // if (this._position.y < this._size.y * 2) {
    //   this._position.y = this._size.y * 2;
    //   this._velocity.y = 0;
    // }
    // if (spacePressed) this.flap();
  }

  draw() {
    this._ctx.fillStyle = this.color;
    this._ctx.fillRect(
      this._position.x,
      this._position.y,
      this._size.x,
      this._size.y
    );
  }

  // flap() {
  //   this._velocity.y -= 2;
  // }
}

export default FlyingBird;
