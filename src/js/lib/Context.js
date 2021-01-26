import Vec2D from '../utils/Vec2D';

class Context {
  constructor() {
    this._instance = document.querySelector('canvas').getContext('2d');
  }

  /**
   * Computed properties?
   * instance
   * canvas
   * size
   * corners
   * midpoint
   */
  get instance() {
    return this._instance;
  }

  get canvas() {
    return this._instance.canvas;
  }

  get size() {
    return new new Vec2D(
      this._instance.canvas.width,
      this._instance.canvas.height
    )();
  }

  // methods
  render(buffer) {
    this._context.instance.drawImage(
      buffer.canvas,
      0,
      0,
      buffer.size.x,
      buffer.size.y,
      buffer.position.x,
      buffer.position.y,
      buffer.size.x,
      buffer.size.y
    );
  }
}

export default Context;
