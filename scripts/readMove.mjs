const movesJson = './json/testJson1.json';

export async function getMoves() {
    const response = await fetch(movesJson);
    const moves = await response.json();
    return moves;
}

export function splitMoves(moves) { return moves.game.split(" ");}


