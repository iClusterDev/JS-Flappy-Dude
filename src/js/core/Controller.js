// iClusterDev 2021

class KeyInput {
  constructor() {
    this._isActive = false;
    this._isDown = false;
  }

  getInput(isDown) {
    if (this._isDown !== isDown) this._isActive = isDown;
    this._isDown = isDown;
  }
}

class Controller {
  constructor() {
    this._right = 0;
    this._down = 0;
    this._left = 0;
    this._up = 0;
  }

  keyDownUp(type, keyCode) {
    const isDown = type === 'keydown' ? true : false;
    console.log(
      'DEBUG ~ file: Controller.js ~ line 12 ~ Controller ~ keyDownUp ~ type, keyCode',
      type,
      keyCode
    );
  }
}

export default Controller;
