import { Board } from './board';

/**
 * Represents a single board of tictactoe.
 * This class is used by the Game class and is not meant to be used directly.
 */
export class Section extends Board {
	matrix: string[][];

	constructor(data?: string) {
		super();
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
				this.checkWin(i, i, 'x');
				this.checkWin(i, i, 'o');
			}
		}
	}

	getBoardLength(): number {
		return this.matrix.length;
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

	emptyTiles(): [number, number][] {
		let emptySpaces: [number, number][] = [];
		for (let i = 0; i < this.matrix.length; i++) {
			for (let j = 0; j < this.matrix[i].length; j++) {
				if (this.isTileEmpty(i, j)) {
					emptySpaces.push([i, j]);
				}
			}
		}

		return emptySpaces;
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
