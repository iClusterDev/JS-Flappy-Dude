// viewport block
let viewport = document.createElement('canvas');
viewport.id = 'viewport';
viewport.width = 600;
viewport.height = 400;
viewport.style.border = 'solid 1px black';
document.body.appendChild(viewport);
const ctx = viewport.getContext('2d');

// item block
class Item {
  constructor(ctx) {
    this.posX = 0;
    this.posY = 0;
    this.width = 50;
    this.height = 50;
    this.color = 'red';
    this.velocityX = 0.25;
    this.velocityY = 0.25;

    // FIXME
    // this still depends on the viewport context?
    this.ctx = ctx;
    this.ctxW = ctx.canvas.width;
    this.ctxH = ctx.canvas.height;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }
  update(timestep) {
    if (this.posX <= 0) {
      this.posX = 0;
      this.velocityX = -this.velocityX;
    } else if (this.posX + this.width >= this.ctxW) {
      this.posX = this.ctxW - this.width;
      this.velocityX = -this.velocityX;
    }
    if (this.posY <= 0) {
      this.posY = 0;
      this.velocityY = -this.velocityY;
    } else if (this.posY + this.height >= this.ctxH) {
      this.posY = this.ctxH - this.height;
      this.velocityY = -this.velocityY;
    }

    this.posX += this.velocityX * timestep;
    this.posY += this.velocityY * timestep;
  }
}

// setup
const item = new Item(ctx);

// game loop
let frameLastTimeMs = 0;
let frameDeltaTimeMs = 0;
let timeStep = 1000 / 60;
function gameLoop(timestamp) {
  frameDeltaTimeMs += timestamp - frameLastTimeMs;
  frameLastTimeMs = timestamp;
  while (frameDeltaTimeMs >= timeStep) {
    item.update(timeStep, timeStep);
    requestAnimationFrame(gameLoop);
    frameDeltaTimeMs -= timeStep;
  }
  ctx.clearRect(0, 0, viewport.width, viewport.height);
  item.draw();
}

export default () => {
  requestAnimationFrame(gameLoop);
  // gameLoop();
};
