/**
 * iClusterDev 2021
 *
 * This is a fixed time step game loop.
 * can be used for any game and ensure that the game state is
 * updated at the same time step across different devices.
 * In case of slow devices, a memory spiral catch is in place
 * to never allow three full frames passing without an update
 */
class Engine {
  constructor(update, render) {
    this._frameRequest = null;
    this._currentTime = null;
    this._elapsedTime = 0;
    this._timeStep = 1000 / 60;
    this._updated = false;
    this._updates = 0;
    this._update = update;
    this._render = render;
    this._panic = () => console.log('PANIC!');

    this._framesThisSecond = 0;
    this._lastFpsUpdate = 0;
    this._fps = 60;
  }

  run(timestamp) {
    if (!this._currentTime) this._currentTime = window.performance.now();
    this._frameRequest = window.requestAnimationFrame((timestamp) => {
      this.run(timestamp);
    });

    this._elapsedTime += timestamp - this._currentTime;
    this._currentTime = timestamp;
    this._updates = 0;

    if (this._elapsedTime >= this._timeStep * 3) {
      this._elapsedTime = this._timeStep;
    }

    while (this._elapsedTime >= this._timeStep) {
      this._elapsedTime -= this._timeStep;
      this._update(this._timeStep);
      if (++this._updates > 2) {
        this._panic();
        break;
      }
      this._updated = true;
    }

    if (this._updated) {
      this._render();
      this._updated = false;
    }
  }

  debug() {
    if (this._currentTime > this._lastFpsUpdate + 1000) {
      this._fps = 0.25 * this._framesThisSecond + 0.75 * this._fps;
      this._lastFpsUpdate = this._currentTime;
      this._framesThisSecond = 0;
    }
    this._framesThisSecond++;
    return {
      updates: this._updates,
      elapsedTime: this._elapsedTime,
      currentTime: this._currentTime,
      fps: this._fps,
    };
  }

  start() {
    this._currentTime = window.performance.now();
    this._frameRequest = window.requestAnimationFrame((timestamp) => {
      this.run(timestamp);
    });
  }

  stop() {
    window.cancelAnimationFrame(this._frameRequest);
  }
}

export default Engine;
