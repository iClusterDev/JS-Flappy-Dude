// iClusterDev 2021

/**
 * Display.js
 * deals with resizing the context maintaining a constant aspect ratio
 *
 * FIXME:
 * the clear method should probably belong to a World class?
 */

import context from '../lib/Context';

class Display {
  constructor() {
    this._aspectRatio = 0.75;
    this._maxWidth = 900;
  }

  clear() {
    context.instance.clearRect(0, 0, context.width, context.height);
  }

  resize() {
    const { innerWidth: width, innerHeight: height } = window;

    if (height / width > this._aspectRatio) {
      context.width = width;
      context.height = width * this._aspectRatio;
    } else {
      context.width = height / this._aspectRatio;
      context.height = height;
    }

    if (context.width >= this._maxWidth) {
      context.width = this._maxWidth;
      context.height = this._maxWidth * this._aspectRatio;
    }

    context.instance.imageSmoothingEnabled = false;
  }
}

export default Display;
