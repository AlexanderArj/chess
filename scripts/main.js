
import Board from "./board.mjs";
import { getSquares, getPieces } from "./chessSetUp.mjs";
import { createAllPieces } from "./piecesFactory.mjs";
import { initialPositionAllPieces, makeMove} from "./movement.mjs";
import { getMoves } from "./readMove.mjs";
import { findPiece, deletePiece, castling } from "./findPiece.mjs";

const tablero = document.getElementById('chess-board');
// console.log(tablero);
const boardData = await getSquares();
let piecesData = await getPieces();
// console.log(piecesData);

const unidadPX = tablero.clientWidth / 8;

const board = new Board(boardData, tablero);
board.init();

// console.log(board);
// console.log(boardData);

await createAllPieces();
initialPositionAllPieces(piecesData, unidadPX);

const moves = await getMoves();
// console.log(moves);

function splitMoves(moves) {
  const movestp = moves.game.split(" "); // separa por espacios
  return movestp; // ["a2a4", "c7c5", "g1f3"]
}


function start(turn) {
  const piece = turn.slice(0, 2); // a2
  const destinationSquare =  turn.slice(2, 4); // a4

  return { piece, destinationSquare };
}

const movesToPlay = splitMoves(moves);
// console.log(movesToPlay);

// COLOCAR ERRORES PARA LA LECTURA  DE JUGADAS! SI HAY ERROR TOMAR ALGUNA ACCION PERTINENTE!
// EJEMPLO LA JUGADA ESTABA ESCRITA COMO f6b8, EN LUGAR DE d7b8!!!

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function play() {
  for (let i = 0; i < movesToPlay.length; i++) {
    const move = start(movesToPlay[i]);

    const pieceSquare = move.piece;
    const pieceDestination = move.destinationSquare;

    const squareR = boardData.find(s => pieceSquare === s.square);
    // console.log(squareR);

    const squareD = boardData.find(d => pieceDestination === d.square);
    // console.log(squareD);

    // console.log(piecesData);

    const pieceToMove = piecesData.find(p => p.file === squareR.file && p.rank === squareR.rank);

    let enemyPiece = piecesData.find(ep => ep.file === squareD.file && ep.rank === squareD.rank && ep.color != pieceToMove.color);

    // console.log(pieceToMove);
    // console.log(enemyPiece);

    if (enemyPiece) {
      let enemyPieceContainer = document.querySelector(`[data-id="${enemyPiece.pId}"]`);
      piecesData = piecesData.filter(p => p.pId !== enemyPiece.pId);
      // console.log(enemyPieceContainer);
      // console.log(tablero);
      deletePiece(tablero, enemyPieceContainer);
    } else {
      enemyPiece = null;
    }

    makeMove(pieceToMove, [squareD.file, squareD.rank], unidadPX);

    if (pieceToMove.category === 'king') {
      const rookToMove = castling(piecesData, squareD.file, squareD.rank);
      // console.log(rookToMove);
      makeMove(rookToMove, [3, 7], unidadPX);
    }

    if (i == movesToPlay.length -1) {
      const end = document.getElementById('move-notation');
      end.textContent = "Checkmate!";
    }
    
    await sleep(2000);

  }
}


// musiquita
const audio = document.getElementById("audio");
const modal = document.getElementById("startModal");
const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {

  audio.play();
  modal.classList.add("fade-out");

  setTimeout(() => {
    modal.style.display = "none";
  }, 800);

  play();

});



