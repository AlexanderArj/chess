import { getPieces } from "./chessSetUp.mjs";
import Piece from "./piece.mjs";

const pieces = await getPieces();
const piecesContainer = document.getElementById('chess-board');


export async function createAllPieces() {
    pieces.forEach(piece => {
        const newPiece = new Piece(piece);
        newPiece.create(piece, piecesContainer);

    });
}