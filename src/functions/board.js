/**
 * Field default value
 */
const defaultField = {
  visited: false,
};

/**
 * Generates 2D array with a given field
 * @param { number } height - Number of board rows
 * @param { number } width - Number of board columns
 * @param { object } field - Value of every generated field
 * @return { Array<Object> } board - Generated board
 */
export function generateBoard( height = 10, width = 8, field = defaultField ) {
  return new Array(width).fill(
    new Array(height).fill(field)
  )
}