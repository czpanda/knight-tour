import { generateBoard, updateBoard } from './board';
import { currentField } from './field';
import { getPossibleMoves } from './knight';

// Init board
let board = generateBoard(5, 5);

board = updateBoard(board, 2, 2, currentField);

function loop(moves, board, path = []) {
  return moves.forEach(move => {
    const updatedBoard = updateBoard(board, move.x, move.y, currentField);
    const updatedPath = path.concat([move]);
    const possibleMoves = getPossibleMoves(updatedBoard);

    if (possibleMoves.length === 0) {
      const isComplete = board => board.every(column => column.every(field => field.visited));

      if (isComplete(updatedBoard)) console.log('Solution found', updatedPath);
    }

    return loop(possibleMoves, updatedBoard, updatedPath);
  }, 0);
}

// Get first possible moves
const firstPossibleMoves = getPossibleMoves(board);

loop(firstPossibleMoves, board);
