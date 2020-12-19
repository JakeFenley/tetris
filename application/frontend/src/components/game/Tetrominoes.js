class Shape {
  constructor(type, color, matrices) {
    this.type = type;
    this.color = color;
    this.matrices = matrices;
    this.size = 20;
    this.position = 0;
  }

  getCurrentMatrix() {
    return this.matrices[this.position];
  }

  // Increments Shape's position attribute to match the next matrix index.
  rotate() {
    if (this.position < this.matrices.length - 1) {
      this.position = this.position + 1;
    } else {
      this.position = 0;
    }
  }

  revertRotatation() {
    if (this.position === 0) {
      this.position = this.matrices.length - 1;
    } else {
      this.position--;
    }
  }

  // Used to predict where to move player's X position
  getNextShape() {
    if (this.position < this.matrices.length - 1) {
      return this.position + 1;
    } else {
      return 0;
    }
  }

  // Used when Shape is no longer in play
  reset() {
    this.position = 0;
  }
}

const T = new Shape("T", "#0D73E8", [
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
]);

const S = new Shape("S", "#E41E1E", [
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
  ],
]);

const Z = new Shape("Z", "#23E80D", [
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
  ],
  [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
]);

const I = new Shape("I", "#0DE8E8", [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
]);

const O = new Shape("O", "#E6EE07", [
  [
    [1, 1],
    [1, 1],
  ],
]);

const L = new Shape("L", "#EE6307", [
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
]);

const J = new Shape("J", "#EE07A1", [
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
]);

export const Tetrominoes = [L, O, Z, I, S, T, J];
