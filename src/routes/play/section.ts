import type { Board } from "./board";

/**
 * Represents a single board of tictactoe.
 * This class is used by the Game class and is not meant to be used directly.
 */
export class Section implements Board {
	matrix: string[][];
	winner: string;

	constructor(data: string | undefined = undefined) {
		const DATA_LENGTH = 9;

		this.matrix = [
			['', '', ''],
			['', '', ''],
			['', '', '']
		]; // Create default section
		this.winner = '';

		// If data was provided, fill this.data
		if (data) {
			let col: number;
			let row: number;
			for (let i = 0; i < DATA_LENGTH; i++) {
				row = Math.floor(i / this.matrix.length);
				col = i % this.matrix.length;
				this.matrix[row][col] = data;
			}

			for (let i = 0; i < this.matrix.length; i++) {
				this.checkGame(i, i, 'x');
				this.checkGame(i, i, 'o');
			}
		}
	}

	getTileOwner(row: number, col: number): string {
		return this.matrix[row][col];
	}

	/**
	 * Checks if the if tile at i,j is empty
	 * @param i row index of the matrix
	 * @param j column index of the matrix
	 * @returns true if the tile is empty, false otherwise
	 */
	isTileEmpty(i: number, j: number): boolean {
		return this.matrix[i][j] === '';
	}

	emptyTiles() : [number, number][] {
		let emptySpaces: [number, number][] = [];
		for (let i = 0; i < this.matrix.length; i++) {
			for (let j = 0; j < this.matrix[i].length; j++) {
				if (this.isTileEmpty(i, j)) {
					emptySpaces.push([i, j]);
				}
			}
		}

		return emptySpaces
	}

	checkGame(i: number, j: number, player: string): string {
		if (this.winner !== '') {
			return this.winner;
		} else {
			const hasWon =
				this.checkHorizontal(i, player) ||
				this.checkVertical(j, player) ||
				this.checkDiagonal(player);
			this.winner = hasWon ? player : '';
		}

		return this.winner;
	}

	private checkHorizontal(i: number, player: string): boolean {
		console.log('horizonal');

		let has_won = true;
		let index = 0;
		while (index < this.matrix.length && has_won) {
			if (this.matrix[i][index] !== player) {
				has_won = false;
				break;
			}
			index++;
		}

		return has_won;
	}

	private checkVertical(j: number, player: string): boolean {
		console.log('vertical');
		let has_won = true;
		let index = 0;

		while (index < this.matrix.length && has_won) {
			if (this.matrix[index][j] !== player) {
				has_won = false;
				break;
			}
			index++;
		}

		return has_won;
	}

	/**
     * This checks both diagonals disregarding the player move.
       Not the best but for 6 checks it's OK.
     */
	private checkDiagonal(player: string): boolean {
		let has_won1 = true;
		let has_won2 = true;
		let index = 0;

		// Check diagonal from (0,0) to (N,N)
		while (index < this.matrix.length && has_won1) {
			if (this.matrix[index][index] !== player) {
				has_won1 = false;
				break;
			}
			index++;
		}

		// Check diagonal from (0,N) to (N,0)
		index = 0;
		while (index < this.matrix.length && has_won2) {
			if (this.matrix[index][this.matrix.length - 1 - index] !== player) {
				has_won2 = false;
				break;
			}
			index++;
		}

		console.log('diagonal', has_won1, has_won2);

		return has_won1 || has_won2;
	}

	/**
	 * Resets the section's tiles and winner.
	 */
	resetSection() {
		for (let i = 0; i < this.matrix.length; i++) {
			for (let j = 0; j < this.matrix.length; j++) {
				this.matrix[i][j] = '';
			}
		}
		this.winner = '';
	}
}
