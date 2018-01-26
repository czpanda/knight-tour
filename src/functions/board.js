/**
 * Field default value
 */
const defaultField = {
  visited: false,
};

const visitedField = {
  visited: true,
};

/**
 * Generates 2D array with a given field
 * @param { Number } height - Number of board rows
 * @param { Number } width - Number of board columns
 * @param { Object } field - Value of every generated field
 * @return { Array<Object> } board - Generated board
 */
export function generateBoard( height = 8, width = 8, field = defaultField ) {
  return new Array(width).fill(
    new Array(height).fill(field)
  )
}

/**
 * Updates board at given coordinates with a given value
 * @param { Array<Array<Object>> } board - 2D array
 * @param { Number } xPosition
 * @param { Number } yPosition
 * @param { Object } value
 * @return { Array<Array<Object>> } updatedBoard
 */
export function updateBoard( board, xPosition, yPosition, value = visitedField ) {
  if (xPosition < 0 || xPosition > board.length - 1) {
    throw new Error('xPosition has to be within board');
  }

  if (yPosition < 0 || board.some(column => yPosition > column.length - 1)) {
    throw new Error('yPosition has to be within board');
  }

  return board.map((column, xIndex) => {
    return xIndex !== xPosition ? column : column.map((field, yIndex) => {
      return yIndex !== yPosition ? field : value;
    });
  })
}