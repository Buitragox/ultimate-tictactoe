export abstract class Board {
	winner: string = '';

	abstract getBoardLength(): number;

	abstract getTileOwner(row: number, col: number): string;

	protected checkHorizontal(row: number, player: string): boolean {
		let has_won = true;
		let index = 0;
		while (index < this.getBoardLength() && has_won) {
			if (this.getTileOwner(row, index) !== player) {
				has_won = false;
				break;
			}
			index++;
		}

		return has_won;
	}

	protected checkVertical(col: number, player: string): boolean {
		let has_won = true;
		let index = 0;

		while (index < this.getBoardLength() && has_won) {
			if (this.getTileOwner(index, col) !== player) {
				has_won = false;
				break;
			}
			index++;
		}

		return has_won;
	}

	/**
     * Checks both diagonals **disregarding** the player move.
     Not the best since the player could make a move outside a diagonal, 
    but for 6 checks it's OK.
    */
	protected checkDiagonal(player: string): boolean {
		let has_won1 = true;
		let has_won2 = true;
		let index = 0;

		// Check diagonal from (0,0) to (N,N)
		while (index < this.getBoardLength() && has_won1) {
			if (this.getTileOwner(index, index) !== player) {
				has_won1 = false;
				break;
			}
			index++;
		}

		// Check diagonal from (0,N) to (N,0)
		index = 0;
		while (index < this.getBoardLength() && has_won2) {
			if (this.getTileOwner(index, this.getBoardLength() - 1 - index) !== player) {
				has_won2 = false;
				break;
			}
			index++;
		}

		return has_won1 || has_won2;
	}

	checkWin(i: number, j: number, player: string) {
		const hasWon =
			this.checkHorizontal(i, player) ||
			this.checkVertical(j, player) ||
			this.checkDiagonal(player);
		this.winner = hasWon ? player : '';
	}
}
