// import Board from './board';

export default class Game {
  constructor() {

    this.canvas = document.getElementById("board");
    this.ctx = this.canvas.getContext("2d");
    this.score = document.getElementById("score");

    this.width = 10;
    this.height = 20;
    this.tilesz = 24;

    this.canvas.width = this.width * this.tilesz;
    this.canvas.height = this.height * this.tilesz;

    this.createEmptyBoard(this.height, this.width);
  }

  start() {
    this.drawBoard();

  }

  createEmptyBoard(height, width) {
    this.board = [];
    for (let row = 0; row < height; row++) {
      this.board[row] = [];
      for (let tile = 0; tile < width; tile++) {
        this.board[row][tile] = true;
      }
    }
  }

  drawSquare(x, y) {
    this.ctx.fillRect(
      x * this.tilesz, 
      y * this.tilesz, 
      this.tilesz, 
      this.tilesz);

    this.ss = this.ctx.strokeStyle;
    this.ctx.strokeStyle = "#555";

    this.ctx.strokeRect(
      x * this.tilesz, 
      y * this.tilesz, 
      this.tilesz, 
      this.tilesz);

    this.ctx.strokeStyle = this.ss;
  }

  drawBoard() {
    this.fs = this.ctx.fillStyle;
    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {
        this.ctx.fillStyle = this.board[x][y] ? 'red' : 'white';
        this.drawSquare(x, y, this.tilesz, this.tilesz);
      }
    }
    this.ctx.fillStyle = this.fs;
  }

}
