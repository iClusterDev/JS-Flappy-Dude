import Vec2D from '../utils/Vec2D';
import context from '../lib/Context';

class Buffer {
  constructor(width = 100, height = 100) {
    this._instance = document.createElement('canvas').getContext('2d');
    this._instance.canvas.height = height || canvas.height;
    this._instance.canvas.width = width || canvas.width;
  }

  get instance() {
    return this._instance;
  }

  get canvas() {
    return this._instance;
  }

  get width() {
    return this._instance.canvas.width;
  }

  get height() {
    return this._instance.canvas.height;
  }

  set width(width) {
    this._instance.canvas.width = width;
  }

  set height(height) {
    this._instance.canvas.height = height;
  }
}

class Bird {
  constructor() {
    this._buffer = new Buffer(20, 20);
    this._position = new Vec2D(150, 150);
    this._velocity = new Vec2D(0, 0.5);
    this._angle = 0;
    this._idle = false;
    this._color = 'red';
  }

  draw() {
    this._buffer.instance.fillStyle = this._color;
    this._buffer.instance.fillRect(
      0,
      0,
      this._buffer.width,
      this._buffer.height
    );

    context.instance.drawImage(
      this._buffer.instance.canvas,
      0,
      0,
      this._buffer.width,
      this._buffer.height,
      this._position.x,
      this._position.y,
      this._buffer.width,
      this._buffer.height
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
      this._idle = false;
    } else if (this._position.y < context.height - 3 * this._buffer.height) {
      this._idle = false;
    } else if (
      !controller.space.isActive &&
      this._position.y === context.height - 2 * this._buffer.height &&
      this._position.y - oldPositionY === 0
    ) {
      this._idle = true;
    }

    if (this._idle) {
      this._angle <= 359 ? (this._angle += 20) : (this._angle = 0);
      this._position.y -= 2 * Math.sin(this._angle * (Math.PI / 180));
    } else {
      this._angle = 0;
      this._velocity.y += 0.125; // this is really world specific?
      this._velocity.y *= 0.9; // this is really world specific?
      this._position.y += this._velocity.y * timeStep;
    }

    if (this._position.y <= this._buffer.height) {
      this._position.y = this._buffer.height;
      this._velocity.y = -this._velocity.y;
    } else if (
      this._position.y + this._buffer.height >=
      context.height - this._buffer.height
    ) {
      this._position.y = context.height - 2 * this._buffer.height;
      this._velocity.y = 0;
    }
  }
}

export default Bird;
