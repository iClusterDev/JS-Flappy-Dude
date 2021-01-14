// FIXME
// add an handlePanic to pass into the constructor
// check the purpose of the updated variable
// add a debug functionality
// ctx.fillStyle = 'black';
// ctx.fillText(`FPS: ${fps}`, 20, viewport.height - 50);
class Engine {
  constructor(handleUpdate, handleRender, handlePanic = () => {}) {
    this.currentTime = 0;
    this.elapsedTime = 0;
    // this.maxFPS = 120;
    this.timeStep = 1000 / 120;
    this.fps = 60;
    this.framesThisSecond = 0;
    this.lastFpsUpdate = 0;
    this.updates = 0;
    this.update = handleUpdate;
    this.render = handleRender;
    this.panic = handlePanic;
    this.updated = true;
    this.requestAnimationFrame = null;
    // this.debug = false;
  }

  run(timestamp) {
    if (timestamp < this.currentTime + this.timeStep) {
      this.requestAnimationFrame = window.requestAnimationFrame((timestamp) =>
        this.run(timestamp)
      );
      return;
    }
    this.elapsedTime += timestamp - this.currentTime;
    this.currentTime = timestamp;
    if (timestamp > this.lastFpsUpdate + 1000) {
      this.fps = 0.25 * this.framesThisSecond + 0.75 * this.fps;
      this.lastFpsUpdate = timestamp;
      this.framesThisSecond = 0;
    }
    this.framesThisSecond++;
    this.updates = 0;
    while (this.elapsedTime >= this.timeStep) {
      this.elapsedTime -= this.timeStep;
      this.update(this.timeStep);
      if (++this.updates > 240) {
        this.panic();
        break;
      }
    }
    if (this.updated) {
      this.render();
    }
    this.requestAnimationFrame = window.requestAnimationFrame((timestamp) =>
      this.run(timestamp)
    );
  }

  start() {
    this._elapsedTime = this._timeStep;
    this._currentTime = window.performance.now();
    this.requestAnimationFrame = window.requestAnimationFrame((timestamp) =>
      this.run(timestamp)
    );
  }

  stop() {
    window.cancelAnimationFrame(this.requestAnimationFrame);
  }

  debug() {
    return {
      fps: this.fps,
    };
  }
}

export default Engine;
