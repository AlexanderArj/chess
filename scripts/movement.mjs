export function makeMove(piece, finalPosition, unidadD) {

    const [finalCol, finalRow] = finalPosition;

    const pContainer = document.querySelector(`[data-id="${piece.pId}"]`);
    piece.file = finalCol;
    piece.rank = finalRow;

    const pixelC = finalCol * unidadD;
    const pixelR = finalRow * unidadD;

    pContainer.style.transform = `translate(${pixelC}px, ${pixelR}px)`;
}


export function initialPositionAllPieces(pieces, unidadD) {

    pieces.forEach(piece => {

        const finalCol = piece.file;
        const finalRow = piece.rank;

        makeMove(piece, [finalCol, finalRow], unidadD);
    });
}
