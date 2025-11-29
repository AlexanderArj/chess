export default class Board {
    constructor(squares, boardContainer) {
        this.boardContainer = boardContainer;
        this.squares = squares;
    }

    init() {
        this.buildBoard(this.squares, this.boardContainer);
        this.squareReference();
    }

    buildBoard(squares, container) {
        squares.forEach(s => {
            const squareContainer = document.createElement('div');

            squareContainer.classList.add("square", s.colorCode);

            squareContainer.dataset.square = s.square;

            container.appendChild(squareContainer);
        });
    }

    squareReference() {
        const squareReference = document.getElementById('square-reference');

        this.boardContainer.querySelectorAll('.square').forEach(square => {
            square.addEventListener('mouseenter', () => {
                squareReference.textContent = square.dataset.square;
            });

            square.addEventListener('mouseleave', () => {
                squareReference.textContent = "";
            });
        });
    }
}
