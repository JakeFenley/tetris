import Board from "./Board";
import { ScoreKeeper } from "./Scoring";
import { Tetrominoes } from "./Tetrominoes";

export default class Movements {
  static getNewShape = () => {
    const index = Math.floor(Math.random() * Math.floor(7));
    if (Tetrominoes[index].type === "I") {
      Movements.playerX = 3;
    }
    return Tetrominoes[index];
  };

  static playerX = 4;
  static playerY = 0;
  static collisionOccurred = false;
  static playerShape = Movements.getNewShape();

  static reset() {
    Movements.playerX = 4;
    Movements.playerY = 0;
    Movements.resetPlayerShape();
  }

  static init() {
    Movements.reset();
    Movements.collisionOccurred = false;
  }

  static resetPlayerShape() {
    Movements.playerShape.reset();
    Movements.playerShape = Movements.getNewShape();
  }

  addListener() {
    window.addEventListener("keydown", this.handleKeydown);
  }

  removeListener() {
    window.removeEventListener("keydown", this.handleKeydown);
  }

  increasePlayerY = () => {
    Movements.playerY = Movements.playerY + 1;
    if (Board.checkIfMatrixCollides(this.createMatrix())) {
      this.dropShape();
    }
  };

  playerRotate = () => {
    if (Movements.playerShape.type === "O") return;
    Movements.playerShape.rotate();
    this.rotateCollisionFix();
  };

  createMatrix = (x = Movements.playerX, y = Movements.playerY) => {
    let dest = [];
    let matrix = Movements.playerShape.getCurrentMatrix();
    matrix.forEach((row, colIndex) => {
      row.forEach((col, rowIndex) => {
        if (col === 1) {
          dest.push({
            x: x + rowIndex,
            y: y + colIndex,
            color: Movements.playerShape.color,
          });
        }
      });
    });
    return dest;
  };

  rotateCollisionFix = () => {
    const checkRotateCollision = (x, y) => {
      if (!Board.checkIfMatrixCollides(this.createMatrix(x, y))) {
        Movements.playerX = x;
        Movements.playerY = y;
        return true;
      }
    };

    let x1 = Movements.playerX;
    let x2 = Movements.playerX;
    let y1 = Movements.playerY;
    let y2 = Movements.playerY;

    for (var i = 0; i < 2; i++) {
      if (checkRotateCollision(x1, y1)) return;
      if (checkRotateCollision(x2, y1)) return;
      if (checkRotateCollision(x1, y2)) return;
      if (checkRotateCollision(x2, y2)) return;

      x1--;
      x2++;
      y1--;
      y2++;
    }

    // If new spot is unreachable piece resets to original rotation
    Movements.playerShape.revertRotatation();
  };

  findShapeDestination = () => {
    let dest = this.createMatrix();
    for (var y = Movements.playerY; y < 19; y++) {
      const newDest = this.createMatrix(Movements.playerX, y);
      if (!Board.checkIfMatrixCollides(newDest)) {
        dest = newDest;
      } else {
        Board.playerShapeOutline = dest;
        return;
      }
    }

    Board.playerShapeOutline = dest;
    return;
  };

  dropShape = () => {
    Board.addPieceToGrid();
    Movements.resetPlayerShape();

    ScoreKeeper.scoreMove(Movements.playerY, Board.checkCompletedRow());

    Movements.reset();

    if (Board.checkIfMatrixCollides(this.createMatrix())) {
      Movements.collisionOccurred = true;
    }
  };

  checkCollision = (direction) => {
    let dest;
    switch (direction) {
      case "left":
        dest = this.createMatrix(Movements.playerX - 1, Movements.playerY);
        if (Board.checkIfMatrixCollides(dest)) return true;
        else return false;

      case "right":
        dest = this.createMatrix(Movements.playerX + 1, Movements.playerY);
        if (Board.checkIfMatrixCollides(dest)) return true;
        else return false;

      case "down":
        dest = this.createMatrix(Movements.playerX, Movements.playerY + 1);
        if (Board.checkIfMatrixCollides(dest)) return true;
        else return false;

      default:
        return false;
    }
  };

  handleKeydown = (e) => {
    switch (e.code) {
      case "ArrowLeft":
      case "KeyA":
        e.preventDefault();
        if (!this.checkCollision("left")) Movements.playerX--;
        break;

      case "ArrowRight":
      case "KeyD":
        e.preventDefault();
        if (!this.checkCollision("right")) Movements.playerX++;
        break;

      case "ArrowUp":
      case "KeyW":
        e.preventDefault();
        this.playerRotate();
        break;

      case "ArrowDown":
      case "KeyS":
        e.preventDefault();
        if (!this.checkCollision("down")) Movements.playerY++;
        break;

      case "Space":
        e.preventDefault();
        this.dropShape();
        break;

      default:
        break;
    }
  };
}
