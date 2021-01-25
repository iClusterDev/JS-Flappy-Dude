import Vec2D from '../utils/Vec2D';

class Renderer {
  constructor(canvas, width = null, height = null) {
    this._renderer = canvas.getContext('2d');
    this._renderer.canvas.height = height || canvas.height;
    this._renderer.canvas.width = width || canvas.width;
  }

  get size() {
    return new Vec2D(this._renderer.canvas.width, this._renderer.canvas.height);
  }

  // get center() {
  //   return new Vec2D(this.size.x / 2, this.size.y / 2);
  // }

  get instance() {
    return this._renderer;
  }
}

class Context {
  constructor() {
    this._renderer = document.querySelector('canvas').getContext('2d');
  }

  get size() {
    return new Vec2D(this._renderer.canvas.width, this._renderer.canvas.height);
  }

  get instance() {
    return this._renderer;
  }
}

class Buffer {
  constructor(width, height) {
    this._renderer = document.createElement('canvas').getContext('2d');
    this._renderer.canvas.height = height;
    this._renderer.canvas.width = width;
  }

  get size() {
    return new Vec2D(this._renderer.canvas.width, this._renderer.canvas.height);
  }

  get instance() {
    return this._renderer;
  }
}

class Bird {
  constructor() {
    this._buffer = new Renderer(document.createElement('canvas'), 20, 20);
    // this._context = new Renderer(document.querySelector('canvas'));
    this._context = new Context();
    this._position = new Vec2D(150, 0);
    this._velocity = new Vec2D(0, 0.5);
    this._color = 'red';
    this._angle = 0;
    this._isIdle = false;
  }

  draw() {
    this._buffer.instance.fillStyle = this._color;
    this._buffer.instance.fillRect(
      0,
      0,
      this._buffer.size.x,
      this._buffer.size.y
    );

    this._context.instance.drawImage(
      this._buffer.instance.canvas,
      0,
      0,
      this._buffer.size.x,
      this._buffer.size.y,
      this._position.x,
      this._position.y,
      this._buffer.size.x,
      this._buffer.size.y
    );
  }

  /**
   * @param {*} timeStep
   * @param {*} controller
   * On space pressed the bird will flap and change the idle state to false.
   * In Idle state, sinusoid with 20* amplitude will update the position.
   * In non Idle state, the velocity.y updates trough the acceleration and gravity
   *
   * In order to control the collision with the world boundaries,
   * the min max position have been set to be +/- the bird size
   * within the y world limits.
   * The bird will bounce at the limits on top only while
   * when it reaches the bottom it will enter in the idle state
   * if the controller is inactive
   */
  update(timeStep, controller) {
    const oldPositionY = this._position.y;
    if (controller.space.isActive) {
      this._velocity.y -= 0.25;
      this._isIdle = false;
    } else if (
      !controller.space.isActive &&
      this._position.y === this._context.size.y - 2 * this._buffer.size.y &&
      this._position.y - oldPositionY === 0
    ) {
      this._isIdle = true;
    }

    if (this._isIdle) {
      this._angle <= 359 ? (this._angle += 20) : (this._angle = 0);
      this._position.y -= 2 * Math.sin(this._angle * (Math.PI / 180));
    } else {
      this._angle = 0;
      this._velocity.y += 0.125;
      this._velocity.y *= 0.9;
      this._position.y += this._velocity.y * timeStep;

      if (this._position.y <= this._buffer.size.y && !this._isIdle) {
        this._position.y = this._buffer.size.y;
        this._velocity.y = -this._velocity.y;
      } else if (
        this._position.y + this._buffer.size.y >=
        this._context.size.y - this._buffer.size.y
      ) {
        this._position.y = this._context.size.y - 2 * this._buffer.size.y;
        this._velocity.y = 0;
      }
    }
  }
}

export default Bird;
