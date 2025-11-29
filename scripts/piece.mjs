export default class Piece {
    constructor(piece, mainCointainer) {
        this.piece = piece;
        this.mainCointainer = mainCointainer;
    }

    create(piece, mainCointainer) {

        const pContainer = document.createElement('div');
        pContainer.classList.add("piece", `${piece.color}${piece.category}`);

        const pImage = document.createElement('img');
        pImage.setAttribute('src', piece.image);
        pImage.setAttribute('alt', `${piece.color} ${piece.category} icon`);

        pContainer.dataset.id = this.piece.pId;

        pContainer.style.transform = `translate(0px, 0px)`;

        pContainer.appendChild(pImage);
        mainCointainer.appendChild(pContainer);

        // console.log(pContainer);
    }
}
