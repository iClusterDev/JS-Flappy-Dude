// iClusterDev 2021

const KEY_MAP = [
  { code: 'Space', action: 'space' },
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

/**
 * Controller.js
 * singleton object handling the input state
 *
 * FIXME:
 * include mouse functionality
 * make use of a .json file for KEY_MAP?
 */
class Controller {
  constructor() {
    if (Controller.instance) return Controller.instance;
    Controller.instance = this;
    KEY_MAP.forEach((keyItem) => {
      const { action } = keyItem;
      this[action] = new KeyInput();
    });
    return this;
  }

  keyDownUp(type, code) {
    const isDown = type === 'keydown' ? true : false;
    const keyItem = KEY_MAP.find((keyItem) => code === keyItem.code) || null;
    if (keyItem) {
      const { action } = keyItem;
      this[action].getInput(isDown);
    }
  }
}

// controller initialize
const controller = new Controller();
window.addEventListener('keydown', (event) => {
  const { type, code } = event;
  controller.keyDownUp(type, code);
});
window.addEventListener('keyup', (event) => {
  const { type, code } = event;
  controller.keyDownUp(type, code);
});

export default controller;
