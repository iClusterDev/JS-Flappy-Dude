const particlesArray = [];

class Particle {
  constructor(target) {
    this.x = target.x;
    this.y = target.y;
    this.size = Math.random() * 7 + 3;
    this.speed = Math.random() * 1 - 0.5;
    this.color = 'red';
  }

  update(gameSpeed) {
    this.x -= gameSpeed;
    this.y += this.speed;
  }

  draw(ctx2d) {
    ctx2d.fillStyle = this.color;
    ctx2d.beginPath();
    ctx2d.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx2d.fill();
  }
}

export default (gameSpeed, ctx2d, target) => {
  particlesArray.unshift(new Particle(target));
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update(gameSpeed);
    particlesArray[i].draw(ctx2d);
  }
  if (particlesArray.length > 200) {
    for (let i = 0; i < 20; i++) {
      particlesArray.pop(particlesArray[i]);
    }
  }
};
