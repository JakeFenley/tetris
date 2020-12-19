import Board from "./Board";

export default class Draw {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.SQ = 20;
  }

  clearCtx = () => {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1.5;
  };

  drawGrid = () => {
    const { SQ, ctx } = this;
    for (var x = 0; x < 10; x++) {
      for (var y = 0; y < 20; y++) {
        ctx.strokeStyle = "#100";
        ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
      }
    }
  };

  drawReflection = (x, y) => {
    const { SQ, ctx } = this;
    ctx.fillStyle = "#FAFAFA";

    ctx.beginPath();
    ctx.moveTo(x * SQ + 1.25, y * SQ + 1.25);
    ctx.lineTo(x * SQ + 9, y * SQ);
    ctx.lineTo(x * SQ, y * SQ + 10);
    ctx.fill();
  };

  drawSquare = (x, y, color) => {
    const { SQ, ctx } = this;
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

    ctx.strokeStyle = "#006";
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
  };

  drawShape = (playerShapeCoords) => {
    for (var i = 0; i < playerShapeCoords.length; i++) {
      const point = playerShapeCoords[i];
      this.drawSquare(point.x, point.y, point.color);
      this.drawReflection(point.x, point.y);
    }
  };

  drawShapeOutline = (outline, color) => {
    const { SQ, ctx } = this;
    for (var i = 0; i < outline.length; i++) {
      const el = outline[i];

      ctx.strokeStyle = color;
      ctx.strokeRect(el.x * SQ, el.y * SQ, SQ, SQ);
    }
  };

  drawBoard = () => {
    for (var i = 0; i < Board.grid.length; i++) {
      const point = Board.grid[i];
      this.drawSquare(point.x, point.y, point.color);
      this.drawReflection(point.x, point.y);
    }
  };

  animateFrame = (matrix) => {
    this.clearCtx();
    this.drawGrid();
    this.drawBoard();
    this.drawShape(matrix);
  };
}
