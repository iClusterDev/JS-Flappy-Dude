import Controller from './core/Controller';
import Display from './core/Display';
import Engine from './core/Engine';
import Bird from './assets/Bird';

const keyDownUp = (event) => {
  const { type, code } = event;
  controller.keyDownUp(type, code);
};

const Game = {
  update(timeStep) {
    bird.update(timeStep, controller);
  },

  render() {
    display.clear();
    bird.draw();
  },
};

const bird = new Bird();
const display = new Display();
const controller = new Controller();
const engine = new Engine(Game.update, Game.render);

window.addEventListener('resize', () => display.resize());
window.addEventListener('keydown', keyDownUp);
window.addEventListener('keyup', keyDownUp);

// listeners setup

export default () => {
  display.resize();
  engine.start();
};
