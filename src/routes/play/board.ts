export interface Board {
    matrix: any[][];
    getTileOwner(row: number, col: number): string;
}

export function checkHorizontal(board: Board, row: number, player: string) : boolean {
    let has_won = true;
    let index = 0;
    while (index < board.matrix.length && has_won) {
        if (board.getTileOwner(row, index)) {
            has_won = false;
            break;
        }
        index++;
    }

    return has_won;
}

