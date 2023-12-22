const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {

  function incrementNeighboringCounts(matrix, row, col) {
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    const offsets = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
  
    for (const offset of offsets) {
      const newRow = row + offset[0];
      const newCol = col + offset[1];
  
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        matrix[newRow][newCol]++;
      }
    }
  }

  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let i = 0; i < rows; i++) {
    result.push(Array(cols).fill(0));
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col]) {
        incrementNeighboringCounts(result, row, col);
      }
    }
  }

  return result;
}

module.exports = {
  minesweeper
};
