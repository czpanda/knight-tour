import {
  visitedField,
  defaultField,
  inactiveField
} from './field';

/**
 * Generates 2D array with a given field
 *
 * @param { Number } width - Number of board columns
 * @param { Number } height - Number of board rows
 * @param { Object } field - Value of every generated field
 * @return { Array<Object> } board - Generated board
 */
export function generateBoard( width = 8, height = 8, field = defaultField ) {
  return new Array(width).fill(
    new Array(height).fill(field)
  )
}

/**
 * Updates board at given coordinates with a given value
 *
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

  /**
   * Returns given field extended with inactiveField property
   * @param { Object } field
   */
  const createInactiveField = field => ({ ...field, ...inactiveField });

  return board.map((column, xIndex) => {
    if (xIndex !== xPosition) return column.map(createInactiveField);

    return column.map((field, yIndex) => {
      if (yIndex !== yPosition) return createInactiveField(field);

      return { ...field, ...value };
    });
  })
}

/**
 * Generates random coordinates
 *
 * @param { Number } width
 * @param { Number } height
 * @return { Object } generatedCoordinates
 */
export function generateRandomCoordinates( width, height ) {

  // Generates random number from 0 to x (excluding x)
  const generate = x => Math.floor(Math.random() * x);

  return {
    x: generate(width),
    y: generate(height),
  };
}

/**
 * Prints passed board into a console
 *
 * @param board
 */
export function printBoard( board ) {

  const b = board.map(columns => {
    return columns.map(field => {
      if (field.visited && field.current) return 'X';
      else if (field.visited) return 'V';
      else if (field.current) return 'C';
      else return 'O';
    }).join('');
  }).join('\n');

  console.log(b);

}