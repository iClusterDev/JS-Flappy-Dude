class Context {
  constructor() {
    if (Context.instance) return Context.instance;
    Context.instance = this;
    this._instance = document.querySelector('canvas').getContext('2d');
    return this;
  }

  get width() {
    return this._instance.canvas.width;
  }

  set width(width) {
    this._instance.canvas.width = width;
  }

  get height() {
    return this._instance.canvas.height;
  }

  set height(height) {
    this._instance.canvas.height = height;
  }

  get instance() {
    return this._instance;
  }
}

export default new Context();
