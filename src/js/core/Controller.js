// iClusterDev 2021

// FIXME
// make use of a .json file for this?
const KEY_MAP = [
  { code: 'Space', action: 'jump' },
  { code: 'ArrowRight', action: 'right' },
  { code: 'ArrowDown', action: 'down' },
  { code: 'ArrowLeft', action: 'left' },
  { code: 'ArrowUp', action: 'up' },
];

class KeyInput {
  constructor() {
    this.isActive = false;
    this.isDown = false;
  }

  getInput(isDown) {
    if (this.isDown !== isDown) this.isActive = isDown;
    this.isDown = isDown;
  }
}

class Controller {
  constructor() {
    KEY_MAP.forEach((keyItem) => {
      const { action } = keyItem;
      this[action] = new KeyInput();
    });
  }

  keyDownUp(type, code) {
    const isDown = type === 'keydown' ? true : false;
    const keyItem = KEY_MAP.find((keyItem) => code === keyItem.code) || null;
    if (keyItem) {
      const { action } = keyItem;
      this[action].getInput(isDown);
      // console.log('DEBUG ~ file: Controller.js ~ ', this[action]);
    }
  }
}

export default Controller;
