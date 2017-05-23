/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tetrominoes_js__ = __webpack_require__(3);



class Game {
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
      [__WEBPACK_IMPORTED_MODULE_1__tetrominoes_js__["a" /* I */], "cyan"],
      [__WEBPACK_IMPORTED_MODULE_1__tetrominoes_js__["b" /* J */], "blue"],
      [__WEBPACK_IMPORTED_MODULE_1__tetrominoes_js__["c" /* L */], "orange"],
      [__WEBPACK_IMPORTED_MODULE_1__tetrominoes_js__["d" /* O */], "yellow"],
      [__WEBPACK_IMPORTED_MODULE_1__tetrominoes_js__["e" /* S */], "green"],
      [__WEBPACK_IMPORTED_MODULE_1__tetrominoes_js__["f" /* T */], "purple"],
      [__WEBPACK_IMPORTED_MODULE_1__tetrominoes_js__["g" /* Z */], "red"] ];
  }

  start() {
    this.drawBoard();
    this.newPiece();
    this.main();
  }

  newPiece() {
    const p = this.pieces[parseInt(Math.random() * this.pieces.length, 10)];
    return new __WEBPACK_IMPORTED_MODULE_0__piece_js__["a" /* default */](p[0], p[1], this.game);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(0);


document.addEventListener("DOMContentLoaded", () => {
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  game.start();
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Piece {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Piece;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
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
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];
/* harmony export (immutable) */ __webpack_exports__["a"] = I;


const J = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	]
];
/* harmony export (immutable) */ __webpack_exports__["b"] = J;


const L = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]
];
/* harmony export (immutable) */ __webpack_exports__["c"] = L;


const O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	]
];
/* harmony export (immutable) */ __webpack_exports__["d"] = O;


const S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];
/* harmony export (immutable) */ __webpack_exports__["e"] = S;


const T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];
/* harmony export (immutable) */ __webpack_exports__["f"] = T;


const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[1, 0, 0]
	]
];
/* harmony export (immutable) */ __webpack_exports__["g"] = Z;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map