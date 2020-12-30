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
    this.deltaX = 5; // pixel/s?
    this.deltaY = 5; // pixel/s?
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
  update() {
    if (this.posX <= 0) {
      this.posX = 0;
      this.deltaX = -this.deltaX;
    } else if (this.posX + this.width >= this.ctxW) {
      this.posX = this.ctxW - this.width;
      this.deltaX = -this.deltaX;
    }
    if (this.posY <= 0) {
      this.posY = 0;
      this.deltaY = -this.deltaY;
    } else if (this.posY + this.height >= this.ctxH) {
      this.posY = this.ctxH - this.height;
      this.deltaY = -this.deltaY;
    }
    this.posX += this.deltaX;
    this.posY += this.deltaY;
  }
}

// setup
const item = new Item(ctx);

// game loop
function gameLoop() {
  ctx.clearRect(0, 0, viewport.width, viewport.height);
  item.update();
  item.draw();
  requestAnimationFrame(gameLoop);
}

export default () => {
  requestAnimationFrame(gameLoop);
};
