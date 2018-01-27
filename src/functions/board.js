import { defaultField, visitedField } from './field';

/**
 * Generates 2D array with a given field
 * @param { Number } width - Number of board columns
 *  * @param { Number } height - Number of board rows
 * @param { Object } field - Value of every generated field
 * @return { Array<Object> } board - Generated board
 */
export function generateBoard( width = 10, height = 8, field = defaultField ) {
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
      return yIndex !== yPosition ? field : { ...field, ...value };
    });
  })
}

/**
 * Generates random coordinates
 * @param { Number } width
 * @param { Number } height
 * @return { Object } generatedCoordinates
 */
export function generateRandomCoordinates( width, height ) {

  // Generates random number from 0 to x (including x)
  const generate = x => Math.floor(Math.random() * x + 1);

  return {
    x: generate(width - 1),
    y: generate(height - 1),
  };
}