import Piece from './piece.js';
import * as Tetros from './tetrominoes.js';

export default class Game {
  constructor() {

    this.canvas = document.getElementById("board");
    this.ctx = this.canvas.getContext("2d");
    this.score = document.getElementById("score");

    this.width = 10;
    this.height = 15;
    this.tilesz = 36;

    this.canvas.width = this.width * this.tilesz;
    this.canvas.height = this.height * this.tilesz;

    this.nlines = 0;
    this.lines = 0;
    this.done = false;
    this.dropStart = Date.now();
    this.createEmptyBoard(this.height, this.width);

    this.main = this.main.bind(this);
    this.drawSquare = this.drawSquare.bind(this);
    this.removeFullLines = this.removeFullLines.bind(this);

    this.pieces = [
      [Tetros.I, "cyan"],
      [Tetros.J, "blue"],
      [Tetros.L, "orange"],
      [Tetros.O, "yellow"],
      [Tetros.S, "green"],
      [Tetros.T, "purple"],
      [Tetros.Z, "red"] ];
    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  start() {
    this.drawBoard();
    this.piece = this.newPiece();
    this.main();
  }

  newPiece() {
    const p = this.pieces[parseInt(Math.random() * this.pieces.length, 10)];
    return new Piece(p[0], p[1], this);
  }

  main() {
    this.now = Date.now();
    this.delta = this.now - this.dropStart;
    if (this.delta > 700) {
      this.piece.down();
      this.dropStart = this.now;
    }

    if (!this.done) {
      requestAnimationFrame(this.main);
    }

    if (this.done) {
      alert("Game Over!");
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
    this.nlines = 0;
    for (let y = 0; y < this.height; y++) {
      let line = true;
      for (let x = 0; x < this.width; x++) {
        line = line && this.board[y][x];
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
    if (this.nlines > 0) {
      if (this.nlines === 4) {
        this.lines += ( this.nlines * 4 ) ;
      } else if (this.nlines === 3) {
        this.lines += ( this.nlines * 3 ) ;
      } else if (this.nlines === 2) {
        this.lines += ( this.nlines * 2 ) ;
      } else {
        this.lines += this.nlines;
      }
      this.score.textContent = "Score: " + this.lines * 50;
      this.drawBoard();
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
        this.ctx.fillStyle = this.board[y][x] || 'white';
        this.drawSquare(x, y, this.tilesz, this.tilesz);
      }
    }
    this.ctx.fillStyle = this.fs;
  }

  handleKeyPress(e) {
    if (e.keyCode === 38) {
      this.piece.rotate();
    }
    if (e.keyCode === 40) {
      this.dropStart = Date.now();
      this.piece.down();
    }
    if (e.keyCode === 37) {
      this.piece.moveLeft();
    }
    if (e.keyCode === 39) {
      this.piece.moveRight();
    }

  }
}
