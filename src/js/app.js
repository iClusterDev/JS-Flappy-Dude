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

const keyDownUp = (event) => {
  const { type, keyCode } = event;
  controller.keyDownUp(type, keyCode);
};

const update = (timeStep) => {
  dummy.update(timeStep);
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

window.addEventListener('keydown', keyDownUp);
window.addEventListener('keyup', keyDownUp);

export default () => {
  engine.start();
  setTimeout(() => {
    engine.stop();
  }, 3000);
  setTimeout(() => {
    engine.start();
  }, 3000);
};
