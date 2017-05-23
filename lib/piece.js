export default class Piece {
  constructor(patterns, color, game) {
    this.pattern = patterns[0];
    this.patterns = patterns;
    this.patterni = 0;

    this.drawSquare = game.drawSquare;
    this.ctx = game.ctx;
    this.game = game;

    this.color = color;

    this.x = game.width/2 - parseInt(Math.ceil(this.pattern.length/2), 10);
    this.y = -2;
  }

  undraw() {
    this._fill("black");
  }

  draw() {
    this._fill(this.color);
  }

  down() {
    if (this._collides(0, 1, this.pattern)) {
      console.log("bottom of floor");

    } else {
      this.undraw();
      this.y++;
      this.draw();
    }
  }

  moveRight() {
    if (!this._collides(1, 0, this.pattern)) {
      this.undraw();
      this.x++;
      this.draw();
    }
  }

  moveLeft() {
    if (!this._collides(-1, 0, this.pattern)) {
      this.undraw();
      this.x--;
      this.draw();
    }
  }

  rotate() {
    let nextpat = this.patterns[(this.patterni + 1) % this.patterns.length];
    if (!this._collides(0, 0, nextpat)) {
      this.undraw();
      this.patterni = (this.patterni + 1) % this.patterns.length;
      this.pattern = this.patterns[this.patterni];
      this.draw();
    }
  }

  lock() {
    for (var ix = 0; ix < this.pattern.length; ix++) {
      for (var iy = 0; iy < this.pattern.length; iy++) {
        if (!this.pattern[ix][iy]) {
          continue;
        }

        if (this.y + iy < 0) {
          //GG
          alert("Game Over!");
          this.done = true;
          return;
        }

        this.game.board[this.y + iy][this.x + ix] = true;
      }
    }


  }

  _collides(dx, dy, pat) {
    for (let ix = 0; ix < pat.length; ix++) {
      for (let iy = 0; iy < pat.length; iy++) {
        if (!pat[ix][iy]) {
          continue;
        }

        var x = this.x + ix + dx;
        var y = this.y + iy + dy;

        if (y >= this.game.height || x < 0 || x >= this.game.width) {
          return true;
        }

        if (y < 0) {
          continue;
        }

        if (this.game.board[y][x]) {
          return true;
        }
      }
    }

    return false;
  }

  _fill(color) {
    this.fs = this.ctx.fillStyle;
    this.ctx.fillStyle = color;
    for (let ix=0; ix < this.pattern.length; ix++) {
      for (let iy = 0; iy < this.pattern.length; iy++) {
        if (this.pattern[ix][iy]) {
          this.drawSquare(this.x + ix, this.y + iy);
        }
      }
    }
    this.ctx.fillStyle = this.fs;
  }

}
