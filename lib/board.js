export default class Board {

  constructor(row, col) {
    this.grid = [];
    this.createEmptyGrid(row, col);
  }

  createEmptyGrid(rows, cols) {
    for (var row = 0; row < rows; row++) {
      this.grid[row] = [];
      for (var tile = 0; tile < cols; tile++) {
        this.grid[row][tile] = false;
      }
    }
  }

}
