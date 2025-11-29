export function findPiece(sfile, srank, piecesData) {
    const pieceF = piecesData.find(
        piece => piece.file === sfile && piece.rank === srank);
    return pieceF;
}

export function deletePiece(boardContainer, pContainer) {

    boardContainer.removeChild(pContainer);
    console.log("A piece has been deleted");

}

export function castling(piecesData, file, rank) {

    if ( file === 2 && rank === 7) {
        return findPiece(0, 7, piecesData);
        // castling queen side 
    }

    else {
        
        if (file === 6 && rank === 7) {
            return findPiece(6, 7, piecesData);
        }
        // castling king side
    }

}


// const personas = [
//   { id: 1, nombre: "Ana", edad: 25 },
//   { id: 2, nombre: "Luis", edad: 30 },
//   { id: 3, nombre: "Sara", edad: 22 }
// ];

// const resultado = personas.find(p => p.id === 2);

// console.log(resultado);
// // { id: 2, nombre: "Luis", edad: 30 }
