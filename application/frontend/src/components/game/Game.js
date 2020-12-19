import React, { Component } from "react";
import Movements from "./Movements";
import Board from "./Board";
import Draw from "./Draw";
import { ScoreKeeper } from "./Scoring";
import { GlobalContext } from "../../context/GlobalContext";
import postScore from "../../api-calls/requests/postScore";

export default class Game extends Component {
  static contextType = GlobalContext;

  animationRequest = null;

  state = {
    score: 0,
    buttonText: "New Game",
    gameActive: false,
    gameOver: false,
    gameTimer: null,
    movements: null,
    canvas: null,
    ctx: null,
    draw: null,
  };

  gameOver = () => {
    this.setState({
      gameOver: true,
      gameActive: false,
      buttonText: "New Game",
    });

    cancelAnimationFrame(this.animationRequest);

    const userState = this.context.userState;
    if (userState.isAuthenticated) {
      postScore(userState.token, ScoreKeeper.score);
    }
    clearInterval(this.state.gameTimer);
  };

  startGame = () => {
    const { movements } = this.state;
    movements.addListener();
    Board.reset();
    ScoreKeeper.reset();
    Movements.init();

    this.setState({
      score: 0,
      gameOver: false,
      gameActive: true,
      buttonText: "Pause",
      gameTimer: setInterval(movements.increasePlayerY, 1000),
    });

    setTimeout(() => {
      this.animationRequest = requestAnimationFrame(this.game);
    }, 0);
  };

  resumeGame = () => {
    const { movements } = this.state;
    movements.addListener();

    this.setState({
      gameActive: true,
      buttonText: "Pause",
      gameTimer: setInterval(movements.increasePlayerY, 1000),
    });

    setTimeout(() => {
      this.animationRequest = requestAnimationFrame(this.game);
    }, 0);
  };

  pauseGame = () => {
    clearInterval(this.state.gameTimer);
    cancelAnimationFrame(this.animationRequest);
    this.setState({ gameActive: false, gameTimer: null, buttonText: "Resume" });
    this.state.movements.removeListener();
  };

  gameToggle = (e) => {
    e.target.blur();
    const { gameOver, gameActive } = this.state;

    if (!gameActive && gameOver) {
      this.startGame();
    } else if (gameActive) {
      this.pauseGame();
    } else {
      this.resumeGame();
    }
  };

  animateFrame = () => {
    const { draw, movements } = this.state;

    draw.animateFrame(this.state.movements.createMatrix());
    movements.findShapeDestination();

    draw.drawShapeOutline(
      Board.playerShapeOutline,
      Movements.playerShape.color
    );
  };

  game = () => {
    this.animateFrame();

    if (Movements.collisionOccurred) {
      this.gameOver();
    } else {
      this.setState({ score: ScoreKeeper.score });
      this.animationRequest = window.requestAnimationFrame(this.game);
    }
  };

  componentDidMount() {
    const canvas = document.getElementById("tetris");
    const ctx = canvas.getContext("2d");

    this.setState({
      canvas: canvas,
      ctx: ctx,
      board: new Board(),
      draw: new Draw(ctx, canvas),
      movements: new Movements(),
    });

    setTimeout(this.animateFrame, 0);
  }

  componentWillUnmount() {
    clearInterval(this.state.gameTimer);
    cancelAnimationFrame(this.animationRequest);
    Board.reset();
    ScoreKeeper.reset();
    Movements.init();
    this.state.movements.removeListener();
  }

  render() {
    return (
      <section className="game">
        <h1>Tetris</h1>
        {}
        <div className="game__score">{this.state.score}</div>
        <button className="game__toggle" onClick={this.gameToggle}>
          {this.state.buttonText}
        </button>
        <canvas id="tetris" width="200" height="400" />
      </section>
    );
  }
}
