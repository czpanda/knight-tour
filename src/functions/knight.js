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

function getCurrentPosition ( board ) {
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