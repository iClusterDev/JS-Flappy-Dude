import Controller from './core/Controller';
import Engine from './core/Engine';
import BouncingBall from './assets/BouncingBall';

// viewport block -----------------------------------------------
let viewport = document.createElement('canvas');
viewport.id = 'viewport';
viewport.width = 600;
viewport.height = 400;
viewport.style.border = 'solid 1px black';
document.body.appendChild(viewport);
console.log(viewport);
const ctx = viewport.getContext('2d');
ctx.imageSmoothingEnabled = false;
// viewport block -----------------------------------------------

const update = (timeStep) => {
  bouncingBall.update(timeStep, controller);
};

const render = () => {
  ctx.clearRect(0, 0, viewport.width, viewport.height);
  bouncingBall.draw();

  const { fps, elapsedTime, updates } = engine.debug();
  ctx.fillStyle = 'black';
  ctx.fillText(`FPS: ${fps}`, 20, viewport.height - 30);
  ctx.fillText(`Elapsed: ${elapsedTime}`, 20, viewport.height - 50);
  ctx.fillText(`Updates: ${updates}`, 20, viewport.height - 70);
};

// init
const bouncingBall = new BouncingBall(ctx);
const controller = new Controller();
const engine = new Engine(update, render);

// controller: setup
const keyDownUp = (event) => {
  const { type, code } = event;
  controller.keyDownUp(type, code);
};

// listeners setup
window.addEventListener('keydown', keyDownUp);
window.addEventListener('keyup', keyDownUp);

export default () => {
  engine.start();
  setTimeout(() => {
    viewport.width += 200;
    viewport.height += 200;
  }, 3000);
};
