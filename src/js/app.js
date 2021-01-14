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
    this._posX = 0;
    this._posY = 0;
    this._width = 50;
    this._height = 50;
    this._color = 'red';
    this._velocityX = 0.25;
    this._velocityY = 0.25;

    // FIXME
    // this still depends on the viewport context?
    this._ctx = ctx;
    this._ctxW = ctx.canvas.width;
    this._ctxH = ctx.canvas.height;
  }

  draw() {
    this._ctx.fillStyle = this._color;
    this._ctx.fillRect(this._posX, this._posY, this._width, this._height);
  }
  update(timestep) {
    if (this._posX <= 0) {
      this._posX = 0;
      this._velocityX = -this._velocityX;
    } else if (this._posX + this._width >= this._ctxW) {
      this._posX = this._ctxW - this._width;
      this._velocityX = -this._velocityX;
    }
    if (this._posY <= 0) {
      this._posY = 0;
      this._velocityY = -this._velocityY;
    } else if (this._posY + this._height >= this._ctxH) {
      this._posY = this._ctxH - this._height;
      this._velocityY = -this._velocityY;
    }

    this._posX += this._velocityX * timestep;
    this._posY += this._velocityY * timestep;
  }
}

// setup
const item = new Item(ctx);

// game loop
let currentTime = 0;
let elapsedTime = 0;
let updates = 0;
let timeStep = 1000 / 60;
function gameLoop(timestamp) {
  elapsedTime += timestamp - currentTime;
  currentTime = timestamp;
  // here the if in the other code

  updates = 0;
  while (elapsedTime >= timeStep) {
    item.update(timeStep, timeStep);
    elapsedTime -= timeStep;
    if (++updates > 240) {
      // panic()
      break;
    }
  }
  ctx.clearRect(0, 0, viewport.width, viewport.height);
  item.draw();
  requestAnimationFrame(gameLoop);
}

export default () => {
  requestAnimationFrame(gameLoop);
  // gameLoop();
};
