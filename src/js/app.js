import Controller from './core/Controller';
import Engine from './core/Engine';
import Dummy from './assets/Dummy';

// viewport block
let viewport = document.createElement('canvas');
viewport.id = 'viewport';
viewport.width = 600;
viewport.height = 400;
viewport.style.border = 'solid 1px black';
document.body.appendChild(viewport);
const ctx = viewport.getContext('2d');

const update = (timeStep) => {
  if (controller.right.isActive) dummy.moveRight(timeStep);
  // if (controller.down.isActive) dummy.moveDown(timeStep);
  // if (controller.left.isActive) dummy.moveLeft(timeStep);
  // if (controller.up.isActive) dummy.moveUp(timeStep);
  // dummy.update(timeStep);
};

const render = () => {
  ctx.clearRect(0, 0, viewport.width, viewport.height);
  dummy.draw();

  const { fps, elapsedTime, updates } = engine.debug();
  ctx.fillStyle = 'black';
  ctx.fillText(`FPS: ${fps}`, 20, viewport.height - 30);
  ctx.fillText(`Elapsed: ${elapsedTime}`, 20, viewport.height - 50);
  ctx.fillText(`Updates: ${updates}`, 20, viewport.height - 70);
};

const dummy = new Dummy(ctx);
const controller = new Controller();
const engine = new Engine(update, render);

// controller: setup
const keyDownUp = (event) => {
  const { type, code } = event;
  controller.keyDownUp(type, code);
};

window.addEventListener('keydown', keyDownUp);
window.addEventListener('keyup', keyDownUp);

const game = {
  running: false,
};
export default () => {
  engine.start();
  game.running = true;
};
