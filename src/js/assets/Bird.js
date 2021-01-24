import Vec2D from '../utils/Vec2D';

class Buffer {
  constructor(width, height, posX, posY) {
    this._buffer = document.createElement('canvas').getContext('2d');
    this._buffer.canvas.height = height;
    this._buffer.canvas.width = width;
    this._posX = posX;
    this._posY = posY;
  }

  get size() {
    return new Vec2D(this.buffer.canvas.width, this._buffer.canvas.height);
  }

  get position() {
    return new Vec2D(this._posX, this._posY);
  }

  get center() {
    return new Vec2D(
      this.position.x + this.size.x / 2,
      this.position.y + this.size.y / 2
    );
  }
}

class Bird {
  constructor() {
    this._context = document.querySelector('canvas').getContext('2d');
    this._size = new Vec2D(50, 50);
    this._position = new Vec2D(150, 0);
    this._velocity = new Vec2D(0, 0.5);
    this._color = 'red';
    this._angle = 0;
    this._isIdle = false;
  }

  draw() {
    this._context.fillStyle = this._color;
    this._context.fillRect(
      this._position.x,
      this._position.y,
      this._size.x,
      this._size.y
    );
  }

  update(timeStep, controller) {
    /**
     * on space pressed
     * the bird will flap
     * and changes the idle state to false
     */
    const oldPositionY = this._position.y;
    if (controller.space.isActive) {
      this._velocity.y -= 0.25;
      this._isIdle = false;
    } else if (
      !controller.space.isActive &&
      this._position.y === this._context.canvas.height - 2 * this._size.y &&
      this._position.y - oldPositionY === 0
    ) {
      this._isIdle = true;
    }

    if (this._isIdle) {
      /**
       * a sinusoid with 20* amplitude
       * changes the position
       */
      this._angle <= 359 ? (this._angle += 20) : (this._angle = 0);
      this._position.y -= 2 * Math.sin(this._angle * (Math.PI / 180));
    } else {
      /**
       * since a flap is taking place
       * the velocity.y updates accordingly by
       * the acceleration and gravity
       */
      this._angle = 0;
      this._velocity.y += 0.125;
      this._velocity.y *= 0.9;
      this._position.y += this._velocity.y * timeStep;

      /**
       * in order to control the collision with the world boundaries
       * the min max position have been set to be +/- the bird size
       * within the y world limits.
       * the bird will bounce at the limits on top only while
       * when it reaches the bottom it will enter in the idle state
       * when the controller is inactive
       */
      if (this._position.y <= this._size.y && !this._isIdle) {
        this._position.y = this._size.y;
        this._velocity.y = -this._velocity.y;
      } else if (
        this._position.y + this._size.y >=
        this._context.canvas.height - this._size.y
      ) {
        this._position.y = this._context.canvas.height - 2 * this._size.y;
        this._velocity.y = 0;
      }
    }
  }
}

export default Bird;
