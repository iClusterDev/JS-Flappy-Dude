class Context {
  constructor() {
    if (Context.instance) return Context.instance;
    Context.instance = this;
    this._instance = document.querySelector('canvas').getContext('2d');
    return this;
  }

  get instance() {
    return this._instance;
  }

  get canvas() {
    return this._instance;
  }

  get width() {
    return this._instance.canvas.width;
  }

  get height() {
    return this._instance.canvas.height;
  }

  set width(width) {
    this._instance.canvas.width = width;
  }

  set height(height) {
    this._instance.canvas.height = height;
  }
}

const context = new Context();

export default context;
