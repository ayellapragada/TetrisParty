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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", () => {
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  game.start();
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// import Board from './board';

class Game {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map