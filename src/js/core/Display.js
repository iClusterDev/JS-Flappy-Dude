// iClusterDev 2021

/**
 * Display.js
 * deals with resizing the context maintaining a constant aspect ratio
 */
class Display {
  constructor() {
    this._canvas = document.querySelector('canvas');
    this._context = this._canvas.getContext('2d');
    this._aspectRatio = 0.75;
    this._maxWidth = 900;
  }

  // render() {
  //   const { canvas: source } = this._buffer;
  //   const { canvas: dest } = this._context;
  //   this._context.drawImage(
  //     source,
  //     0,
  //     0,
  //     source.width,
  //     source.height,
  //     0,
  //     0,
  //     dest.width,
  //     dest.height
  //   );
  // }

  clear() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  resize() {
    const { innerWidth: width, innerHeight: height } = window;

    if (height / width > this._aspectRatio) {
      this._canvas.width = width;
      this._canvas.height = width * this._aspectRatio;
    } else {
      this._canvas.width = height / this._aspectRatio;
      this._canvas.height = height;
    }

    if (this._canvas.width >= this._maxWidth) {
      this._canvas.width = this._maxWidth;
      this._canvas.height = this._maxWidth * this._aspectRatio;
    }

    this._context.imageSmoothingEnabled = false;
  }
}

export default Display;
