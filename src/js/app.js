import Controller from './core/Controller';
import Engine from './core/Engine';
// import BouncingBall from './assets/BouncingBall';
// import FlyingBird from './assets/FlyingBird';
import SpaceShip from './assets/SpaceShip';

// viewport block -----------------------------------------------
let viewport = document.createElement('canvas');
viewport.id = 'viewport';
viewport.width = 600;
viewport.height = 400;
viewport.style.border = 'solid 1px black';
document.body.appendChild(viewport);
const ctx = viewport.getContext('2d');
// viewport block -----------------------------------------------

const update = (timeStep) => {
  spaceShip.update(timeStep, controller);
};

const render = () => {
  ctx.clearRect(0, 0, viewport.width, viewport.height);
  // bouncingBall.draw();
  // flyingBird.draw();
  spaceShip.draw();

  const { fps, elapsedTime, updates } = engine.debug();
  ctx.fillStyle = 'black';
  ctx.fillText(`FPS: ${fps}`, 20, viewport.height - 30);
  ctx.fillText(`Elapsed: ${elapsedTime}`, 20, viewport.height - 50);
  ctx.fillText(`Updates: ${updates}`, 20, viewport.height - 70);
};

// const bouncingBall = new BouncingBall(ctx);
// const flyingBird = new FlyingBird(ctx);
const controller = new Controller();
const spaceShip = new SpaceShip(ctx);
const engine = new Engine(update, render);

// controller: setup
const keyDownUp = (event) => {
  const { type, code } = event;
  controller.keyDownUp(type, code);
};

window.addEventListener('keydown', keyDownUp);
window.addEventListener('keyup', keyDownUp);

export default () => {
  engine.start();
};
