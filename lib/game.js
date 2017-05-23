import Piece from './piece.js';
import * as Tetros from './tetrominoes.js';

export default class Game {
  constructor() {

    this.canvas = document.getElementById("board");
    this.ctx = this.canvas.getContext("2d");
    this.score = document.getElementById("score");

    this.width = 10;
    this.height = 20;
    this.tilesz = 36;

    this.canvas.width = this.width * this.tilesz;
    this.canvas.height = this.height * this.tilesz;

    this.nlines = 0;
    this.done = false;
    this.dropStart = Date.now;
    this.createEmptyBoard(this.height, this.width);
    this.main = this.main.bind(this);

    this.removeFullLines = this.removeFullLines.bind(this);
    this.newPiece = this.newPiece.bind(this);

    this.pieces = [
      [Tetros.I, "cyan"],
      [Tetros.J, "blue"],
      [Tetros.L, "orange"],
      [Tetros.O, "yellow"],
      [Tetros.S, "green"],
      [Tetros.T, "purple"],
      [Tetros.Z, "red"] ];
  }

  start() {
    this.drawBoard();
    this.newPiece();
    this.main();
  }

  newPiece() {
    const p = this.pieces[parseInt(Math.random() * this.pieces.length, 10)];
    return new Piece(p[0], p[1], this.game);
  }

  main() {
    this.now = Date.now();
    this.delta = this.now - this.dropStart;
    if (this.delta > 1000) {
      this.piece.down();
      this.dropStart = this.now;
    }

    if (!this.done) {
      requestAnimationFrame(this.main);
    }
  }

  createEmptyBoard(height, width) {
    this.board = [];
    for (let row = 0; row < height; row++) {
      this.board[row] = [];
      for (let tile = 0; tile < width; tile++) {
        this.board[row][tile] = false;
      }
    }
  }

  removeFullLines() {
    for (let y = 0; y < this.height; y ++) {
      let line = true;
      for (let x = 0; x < this.width; x++) {
        line = line && !this.board[y][x];
      }

      if (line) {
        for (let y2 = y; y2 > 1; y2--) {
          for (let x = 0; x < this.width; x++) {
            this.board[y2][x] = this.board[y2-1][x];
          }
        }
        for (let x = 0; x < this.width; x++) {
          this.board[0][x] = false;
        }
        this.nlines++;
      }
    }
    let lines = 0;
    if (this.nlines > 0) {
      lines += this.nlines;
      this.drawBoard();
      console.log(lines);
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
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.ctx.fillStyle = this.board[y][x] ? 'red' : 'white';
        this.drawSquare(x, y, this.tilesz, this.tilesz);
      }
    }
    this.ctx.fillStyle = this.fs;
  }

  handleKeyPress() {
    document.body.addEventListener("keypress", (e) => {
      this.dropStart = Date.now;
      if (e.keyCode === 38) {
        this.piece.rotate();
        this.dropStart = Date.now();
      }
      if (e.keyCode === 40) {
        this.piece.down();
      }
      if (e.keyCode === 38) {
        this.piece.moveLeft();
        this.dropStart = Date.now();
      }
      if (e.keyCode === 39) {
        this.piece.moveRight();
        this.dropStart = Date.now();
      }

    }, false);
  }
}
