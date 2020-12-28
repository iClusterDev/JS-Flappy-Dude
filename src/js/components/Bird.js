class Bird {
  constructor() {
    this.x = 150;
    this.y = 150;
    this.vy = 0;
    this.width = 20;
    this.height = 20;
    this.weight = 0.75;
    this.color = 'red';
  }

  update(viewport, spacePressed, angle) {
    let curve = Math.sin(angle) * 20;
    if (this.y > viewport.height - this.height * 3 + curve) {
      this.y = viewport.height - this.height * 3 + curve;
      this.vy = 0;
    } else {
      this.vy += this.weight;
      this.vy *= 0.9;
      this.y += this.vy;
    }
    if (this.y < this.height * 2) {
      this.y = this.height * 2;
      this.vy = 0;
    }
    if (spacePressed) this.flap();
  }

  draw(ctx2d) {
    ctx2d.fillStyle = this.color;
    ctx2d.fillRect(this.x, this.y, this.width, this.height);
  }

  flap() {
    this.vy -= 2;
  }
}

export default new Bird();
