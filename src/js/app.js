import controller from './core/Controller';
import Display from './core/Display';
import Engine from './core/Engine';
import Bird from './assets/Bird';

/**
 * Game has:
 * engine *
 * world *
 * player *
 * controller *
 */
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
const engine = new Engine(Game.update, Game.render);

window.addEventListener('resize', () => display.resize());

export default () => {
  display.resize();
  engine.start();
};
