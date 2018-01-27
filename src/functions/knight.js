import { currentField } from './field';
import { updateBoard } from './board';

/**
 * Returns knight's current position on a given board
 *
 * @param { Array<Array<Object>> } board
 * @return { Object } coordinates - x and y coordinates
 */
export function getCurrentPosition ( board ) {
  return board.reduce((acc, cur, xIndex) => {
    const hasCurrent = cur.some(field => field.current);

    if (hasCurrent) {
      return {
        x: xIndex,
        y: cur.reduce((acc, cur, yIndex) => cur.current ? yIndex : acc, 0),
      }
    }

    return acc;
  }, {});
}

/**
 * Returns an array of all possible paths knight can take
 *
 * @param { Array<Array<Object>> } board
 * @return { Array<Array<Object>> } possiblePaths
 */
export function findPath ( board ) {

  const initialPossibleMoves = getPossibleMoves(board);

  function loop(moves, board, path = []) {
    return moves.reduce((acc, move) => {
      const updatedBoard = updateBoard(board, move.x, move.y, currentField);
      const updatedPath = path.concat([move]);
      const possibleMoves = getPossibleMoves(updatedBoard);

      if (possibleMoves.length === 0) {
        const isComplete = board => board.every(column => column.every(field => field.visited));

        return isComplete(updatedBoard) ? [updatedPath] : acc;
      }

      return acc.concat(loop(possibleMoves, updatedBoard, updatedPath));
    }, []);
  }

  return loop(initialPossibleMoves, board);

}

/**
 * Returns all possible moves knight can make on a given board
 *
 * @param { Array<Array<Object>> } board
 * @return { Array<Object> } possibleMoves
 */
export function getPossibleMoves( board ) {
  const currentPosition = getCurrentPosition(board);

  const move = (x, y) => ({ x: currentPosition.x + x, y: currentPosition.y + y});

  const possibleMoves = [
    move(-1, 2),
    move(1, 2),
    move(-2, 1),
    move(2, 1),
    move(-2, -1),
    move(2, -1),
    move(-1, -2),
    move(1, -2),
  ];

  return possibleMoves
    .filter(move => move.x >= 0 && move.y >= 0)
    .filter(move => move.x < board.length && move.y < board[0].length)
    .filter(move => !board[move.x][move.y].visited);
}