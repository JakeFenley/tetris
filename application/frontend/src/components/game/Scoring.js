export class ScoreKeeper {
  static score = 0;

  static reset() {
    ScoreKeeper.score = 0;
  }

  static tetrisChain = false;

  static scoreMove = (playerY, completedRows) => {
    let score = playerY * 2;
    if (completedRows === 1) {
      score += 100;
    } else if (completedRows === 2) {
      score += 300;
    } else if (completedRows === 3) {
      score += 500;
    } else if (completedRows >= 4) {
      const tetris = completedRows / 4;
      const remainder = completedRows % 4;

      if (ScoreKeeper.tetrisChain) {
        score += tetris * 1200;
      } else {
        score += 800;
        score += tetris > 1 ? 1200 * tetris - 1 : 0;
        ScoreKeeper.tetrisChain = true;
      }

      if (remainder > 0) ScoreKeeper.tetrisChain = false;
      if (remainder === 1) score += 100;
      else if (remainder === 2) score += 300;
      else if (remainder === 3) score += 500;
    }

    ScoreKeeper.score += score;

    return ScoreKeeper.score;
  };
}
