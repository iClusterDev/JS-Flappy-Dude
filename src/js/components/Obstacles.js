const obstaclesArray = [];

class Obstacle {
  constructor(viewport) {
    this.top = (Math.random() * viewport.height) / 3 + 20;
    this.bot = (Math.random() * viewport.height) / 3 + 20;
    this.x = viewport.width;
    this.width = 40;
    this.color = 'blue';
  }

  draw(ctx2d, viewport) {
    ctx2d.fillStyle = this.color;
    ctx2d.fillRect(this.x, 0, this.width, this.top);
    ctx2d.fillRect(this.x, viewport.height - this.bot, this.width, this.bot);
  }
  update(gameSpeed, ctx2d, viewport) {
    this.x -= gameSpeed;
    this.draw(ctx2d, viewport);
  }
}

const handleObstacles = (viewport, ctx2d, gamespeed, frame) => {
  if (frame % 100 === 0) {
    obstaclesArray.unshift(new Obstacle(viewport));
  }
  for (let i = 0; i < obstaclesArray.length; i++) {
    obstaclesArray[i].update(gamespeed, ctx2d, viewport);
  }
  if (obstaclesArray.length > 20) {
    obstaclesArray.pop(obstaclesArray[0]);
  }
};

const handleCollision = (player, viewport) => {
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (
      player.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      player.x + player.width > obstaclesArray[i].x &&
      (player.y < obstaclesArray[i].top ||
        player.y + player.height > viewport.height - obstaclesArray[i].bot)
    ) {
      return true;
    }
  }
};

const obstacles = { handleObstacles, handleCollision };

export default obstacles;
