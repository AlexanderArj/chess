import Board from "./board.mjs";
import { getSquares, getPieces } from "./chessSetUp.mjs";
import { createAllPieces } from "./piecesFactory.mjs";
import { initialPositionAllPieces, makeMove } from "./movement.mjs";
import { getMoves, splitMoves } from "./readMove.mjs";
import { deletePiece, castling } from "./findPiece.mjs";

export async function initApp() {
  
  const tablero = document.getElementById('chess-board');

  const boardData = await getSquares();
  let piecesData = await getPieces();

  const unidadPX = tablero.clientWidth / 8;

  const board = new Board(boardData, tablero);
  board.init();

  await createAllPieces();

  initialPositionAllPieces(piecesData, unidadPX);

  const moves = await getMoves();

  const movesToPlay = splitMoves(moves);

  function pieceAndSquare(turn) {
    return {
      piece: turn.slice(0, 2),
      destinationSquare: turn.slice(2, 4)
    };
  }


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } 

  async function play() {
    for (let i = 0; i < movesToPlay.length; i++) {

      const move = pieceAndSquare(movesToPlay[i]);
      const pieceSquare = move.piece;
      const pieceDestination = move.destinationSquare;

      const squareR = boardData.find(s => pieceSquare === s.square);
      const squareD = boardData.find(d => pieceDestination === d.square);

      const pieceToMove = piecesData.find( p => p.file === squareR.file && p.rank === squareR.rank);

      let enemyPiece = piecesData.find( ep => ep.file === squareD.file && ep.rank === squareD.rank && ep.color != pieceToMove.color);

      if (enemyPiece) {
        let enemyPieceContainer = document.querySelector(`[data-id="${enemyPiece.pId}"]`);

        piecesData = piecesData.filter(p => p.pId !== enemyPiece.pId);

        deletePiece(tablero, enemyPieceContainer);
      } else {
        enemyPiece = null;
      }

      makeMove(pieceToMove, [squareD.file, squareD.rank], unidadPX);

      if (pieceToMove.category === 'king') {
        const rookToMove = castling(piecesData, squareD.file, squareD.rank);
        makeMove(rookToMove, [3, 7], unidadPX);
      }

      if (i === movesToPlay.length - 1) {
        document.getElementById('move-notation').textContent = "Checkmate!";
      }

      await sleep(2000);
    }
  }

  play();
}
