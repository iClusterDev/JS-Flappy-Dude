import bird from './components/Bird';
import handleParticles from './components/Particles';
import handleObstacles from './components/Obstacles';

// global variables
const canvas = document.getElementById('canvas1');
canvas.width = 600;
canvas.height = 400;

const ctx = canvas.getContext('2d');

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2;

// events
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') spacePressed = true;
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'Space') spacePressed = false;
});

// functions
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleObstacles(canvas, ctx, gameSpeed, frame);
  bird.update(canvas, spacePressed, angle);
  bird.draw(ctx);
  handleParticles(gameSpeed, ctx, bird, hue);
  requestAnimationFrame(animate);
  angle += 0.25;
  hue++;
  frame++;
};

export default () => {
  animate();
};
