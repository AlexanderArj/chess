const boardJson = './json/board.json';

export async function getSquares() {
    const response = await fetch(boardJson);
    const dataBoard = await response.json();
    return dataBoard;
}

const piecesJson = './json/pieces.json';

export async function getPieces() {
    const response = await fetch(piecesJson);
    const dataPieces = await response.json();
    return dataPieces;
}
