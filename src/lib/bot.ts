import { BoardState, Player, Position, Move, getValidMoves } from './checkers';

export function getBotMove(board: BoardState, player: Player): { from: Position, move: Move } | null {
  const validMoves = getValidMoves(board, player);
  if (validMoves.size === 0) return null;

  const allMoves: { from: Position, move: Move }[] = [];

  validMoves.forEach((moves, fromStr) => {
    const [r, c] = fromStr.split(',').map(Number);
    const from: Position = { r, c };
    moves.forEach(move => {
      allMoves.push({ from, move });
    });
  });

  if (allMoves.length === 0) return null;

  // Simple random move picker
  const randomIndex = Math.floor(Math.random() * allMoves.length);
  return allMoves[randomIndex];
}
