export default class Board {
  static playerShapeOutline = [];
  static grid = [];

  static reset() {
    Board.grid = [];
  }

  static checkIfMatrixCollides(dest, gridArr = Board.grid) {
    for (var i = 0; i < dest.length; i++) {
      const destination = dest[i];

      // Edge case for pieces falling off the grid
      if (destination.y > 19 || destination.x < 0 || destination.x > 9) {
        return true;
      }

      for (var y = 0; y < gridArr.length; y++) {
        const grid = gridArr[y];

        if (grid.x === destination.x && grid.y === destination.y) {
          return true;
        }
      }
    }
  }

  static addPieceToGrid() {
    Board.grid = [...Board.grid, ...Board.playerShapeOutline];
    Board.grid.sort(Board._compareDesc);
  }

  static checkCompletedRow() {
    let completedRows = [];
    let columnCounter = 0;
    for (var i = 0; i < Board.grid.length; i++) {
      if (columnCounter == 9) {
        if (Board.grid[i].x == 9) {
          completedRows.push(Board.grid[i].y);
          columnCounter = 0;

          // Edge case where counter and grid would get out of sync, setting counter to 1 corrects it.
        } else if (Board.grid[i].x == 0) {
          columnCounter = 1;
        } else {
          columnCounter = 0;
        }
      } else if (columnCounter != Board.grid[i].x) {
        columnCounter = 0;
      } else {
        columnCounter++;
      }
    }

    if (completedRows.length > 0) Board._rearrangeRows(completedRows);

    return completedRows.length;
  }

  static _rearrangeRows(completedRows) {
    for (let i = 0; i < completedRows.length; i++) {
      const row = completedRows[i];
      Board.grid = Board.grid.filter((point) => point.y !== row);
    }

    let newGrid = [...Board.grid];

    for (let i = 0; i < completedRows.length; i++) {
      Board.grid.forEach((point, gridIndex) => {
        if (point.y < completedRows[0]) {
          newGrid[gridIndex].y++;
        }
      });
    }

    Board.checkCompletedRow();
  }

  static _compareDesc(a, b) {
    if (a.y > b.y) return -1;
    if (a.y < b.y) return 1;
    if (a.x < b.x) return -1;
    if (a.x > b.x) return 1;
    return 0;
  }
}
