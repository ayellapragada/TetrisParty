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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _piece = __webpack_require__(2);

var _piece2 = _interopRequireDefault(_piece);

var _tetrominoes = __webpack_require__(3);

var Tetros = _interopRequireWildcard(_tetrominoes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

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

    this.pieces = [[Tetros.I, "cyan"], [Tetros.J, "blue"], [Tetros.L, "orange"], [Tetros.O, "yellow"], [Tetros.S, "green"], [Tetros.T, "purple"], [Tetros.Z, "red"]];
    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  _createClass(Game, [{
    key: 'start',
    value: function start() {
      this.drawBoard();
      this.piece = this.newPiece();
      this.main();
    }
  }, {
    key: 'newPiece',
    value: function newPiece() {
      var p = this.pieces[parseInt(Math.random() * this.pieces.length, 10)];
      return new _piece2.default(p[0], p[1], this);
    }
  }, {
    key: 'main',
    value: function main() {
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
  }, {
    key: 'createEmptyBoard',
    value: function createEmptyBoard(height, width) {
      this.board = [];
      for (var row = 0; row < height; row++) {
        this.board[row] = [];
        for (var tile = 0; tile < width; tile++) {
          this.board[row][tile] = false;
        }
      }
    }
  }, {
    key: 'removeFullLines',
    value: function removeFullLines() {
      this.nlines = 0;
      for (var y = 0; y < this.height; y++) {
        var line = true;
        for (var x = 0; x < this.width; x++) {
          line = line && this.board[y][x];
        }

        if (line) {
          for (var y2 = y; y2 > 1; y2--) {
            for (var _x = 0; _x < this.width; _x++) {
              this.board[y2][_x] = this.board[y2 - 1][_x];
            }
          }
          for (var _x2 = 0; _x2 < this.width; _x2++) {
            this.board[0][_x2] = false;
          }
          this.nlines++;
        }
      }
      if (this.nlines > 0) {
        if (this.nlines === 4) {
          this.lines += this.nlines * 4;
        } else if (this.nlines === 3) {
          this.lines += this.nlines * 3;
        } else if (this.nlines === 2) {
          this.lines += this.nlines * 2;
        } else {
          this.lines += this.nlines;
        }
        this.score.textContent = "Score: " + this.lines * 50;
        this.drawBoard();
      }
    }
  }, {
    key: 'drawSquare',
    value: function drawSquare(x, y) {
      this.ctx.fillRect(x * this.tilesz, y * this.tilesz, this.tilesz, this.tilesz);

      this.ss = this.ctx.strokeStyle;
      this.ctx.strokeStyle = "#555";

      this.ctx.strokeRect(x * this.tilesz, y * this.tilesz, this.tilesz, this.tilesz);

      this.ctx.strokeStyle = this.ss;
    }
  }, {
    key: 'drawBoard',
    value: function drawBoard() {
      this.fs = this.ctx.fillStyle;
      for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          this.ctx.fillStyle = this.board[y][x] || 'white';
          this.drawSquare(x, y, this.tilesz, this.tilesz);
        }
      }
      this.ctx.fillStyle = this.fs;
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(e) {
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
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var game = new _game2.default();
  game.start();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piece = function () {
  function Piece(patterns, color, game) {
    _classCallCheck(this, Piece);

    this.pattern = patterns[0];
    this.patterns = patterns;
    this.patterni = 0;

    this.drawSquare = game.drawSquare;
    this.ctx = game.ctx;
    this.game = game;

    this.color = color;

    this.x = game.width / 2 - parseInt(Math.ceil(this.pattern.length / 2), 10);
    this.y = -2;
    this.undraw = this.undraw.bind(this);
    this.draw = this.draw.bind(this);
  }

  _createClass(Piece, [{
    key: "undraw",
    value: function undraw() {
      this._fill("white");
    }
  }, {
    key: "draw",
    value: function draw() {
      this._fill(this.color);
    }
  }, {
    key: "down",
    value: function down() {
      if (this._collides(0, 1, this.pattern)) {
        this.lock();
        this.game.piece = this.game.newPiece();
      } else {
        this.undraw();
        this.y++;
        this.draw();
      }
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      if (!this._collides(1, 0, this.pattern)) {
        this.undraw();
        this.x++;
        this.draw();
      }
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      if (!this._collides(-1, 0, this.pattern)) {
        this.undraw();
        this.x--;
        this.draw();
      }
    }
  }, {
    key: "rotate",
    value: function rotate() {
      var nextpat = this.patterns[(this.patterni + 1) % this.patterns.length];
      var nudge = 0;

      if (this._collides(0, 0, nextpat)) {
        nudge = this.x > this.game.width / 2 ? -1 : 1;
      }

      if (!this._collides(nudge, 0, nextpat)) {
        this.undraw();
        this.x += nudge;
        this.patterni = (this.patterni + 1) % this.patterns.length;
        this.pattern = this.patterns[this.patterni];
        this.draw();
      }
    }
  }, {
    key: "lock",
    value: function lock() {
      for (var ix = 0; ix < this.pattern.length; ix++) {
        for (var iy = 0; iy < this.pattern.length; iy++) {
          if (!this.pattern[ix][iy]) {
            continue;
          }

          if (this.y + iy < 0) {
            //GG
            this.game.done = true;
            return;
          }

          this.game.board[this.y + iy][this.x + ix] = this.color;
        }
      }
      this.game.removeFullLines();
    }
  }, {
    key: "_collides",
    value: function _collides(dx, dy, pat) {
      for (var ix = 0; ix < pat.length; ix++) {
        for (var iy = 0; iy < pat.length; iy++) {
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
  }, {
    key: "_fill",
    value: function _fill(color) {
      this.fs = this.ctx.fillStyle;
      this.ctx.fillStyle = color;
      for (var ix = 0; ix < this.pattern.length; ix++) {
        for (var iy = 0; iy < this.pattern.length; iy++) {
          if (this.pattern[ix][iy]) {
            this.drawSquare(this.x + ix, this.y + iy);
          }
        }
      }
      this.ctx.fillStyle = this.fs;
    }
  }]);

  return Piece;
}();

exports.default = Piece;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var I = exports.I = [[[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]];

var J = exports.J = [[[1, 0, 0], [1, 1, 1], [0, 0, 0]], [[0, 1, 1], [0, 1, 0], [0, 1, 0]], [[0, 0, 0], [1, 1, 1], [0, 0, 1]], [[0, 1, 0], [0, 1, 0], [1, 1, 0]]];

var L = exports.L = [[[0, 0, 1], [1, 1, 1], [0, 0, 0]], [[0, 1, 0], [0, 1, 0], [0, 1, 1]], [[0, 0, 0], [1, 1, 1], [1, 0, 0]], [[1, 1, 0], [0, 1, 0], [0, 1, 0]]];

var O = exports.O = [[[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]];

var S = exports.S = [[[0, 1, 1], [1, 1, 0], [0, 0, 0]], [[0, 1, 0], [0, 1, 1], [0, 0, 1]], [[0, 0, 0], [0, 1, 1], [1, 1, 0]], [[1, 0, 0], [1, 1, 0], [0, 1, 0]]];

var T = exports.T = [[[0, 1, 0], [1, 1, 1], [0, 0, 0]], [[0, 1, 0], [0, 1, 1], [0, 1, 0]], [[0, 0, 0], [1, 1, 1], [0, 1, 0]], [[0, 1, 0], [1, 1, 0], [0, 1, 0]]];

var Z = exports.Z = [[[1, 1, 0], [0, 1, 1], [0, 0, 0]], [[0, 0, 1], [0, 1, 1], [0, 1, 0]], [[0, 0, 0], [1, 1, 0], [0, 1, 1]], [[0, 1, 0], [1, 1, 0], [1, 0, 0]]];

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map