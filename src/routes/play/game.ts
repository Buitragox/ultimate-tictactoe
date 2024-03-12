import { Section } from './section';
import type { Board } from "./board";

/**
 * Represents the Ultimate-TicTacToe game
 * and handles all of the game logic.
 */
export class Game implements Board {
	matrix: Section[][];
	private nextSecRow: number;
	private nextSecCol: number;
	playerTurn: string;
	localPlayer: string;
	enemyPlayer: string;
	winner: string;

	constructor(
		matrix: string | undefined = undefined,
		playerTurn: string | undefined = undefined,
		localPlayer: string | undefined = undefined,
		winner: string | undefined = undefined
	) {
		this.matrix = [];
		this.playerTurn = playerTurn ? playerTurn : 'x';
		this.localPlayer = localPlayer ? localPlayer : 'x';
		this.enemyPlayer = this.localPlayer === 'x' ? 'o' : 'x';
		this.winner = winner ? winner : '';
		this.nextSecRow = -1;
		this.nextSecCol = -1;

		// TODO: build this.matrix from matrix param.
		// Currently: Always create new matrix.
		// Should: Handle input.
		for (let i = 0; i < 3; i++) {
			this.matrix.push([new Section(), new Section(), new Section()]);
		}
	}

	getTileOwner(row: number, col: number): string {
		return this.matrix[row][col].winner;
	}

	/**
	 * Resets the game board, player turn and winner.
	 * @returns the game object
	 */
	resetGame(): Game {
		for (let i = 0; i < this.matrix.length; i++) {
			for (let j = 0; j < this.matrix[i].length; j++) {
				this.matrix[i][j].resetSection();
			}
		}
		this.nextSecRow = -1;
		this.nextSecCol = -1;
		this.playerTurn = this.localPlayer;
		this.winner = '';

		// Returns itself to handle svelte reactivity
		// like this: game = game.localMove();
		return this;
	}

	/**
	 * Validates if the move is valid. If it's valid it calls processMove to handle the logic.
	 * If the game is not finished after the player moves, it calls computerMove to process the
	 * enemy move.
	 *
	 * TODO Currently it only works for a single section and needs some work.
	 * @param secRow row index of the selected section
	 * @param secCol column index of the selected section
	 * @param i row of the section that was selected.
	 * @param j column of the section that was selected.
	 * @returns the game object
	 */
	localMove(secRow: number, secCol: number, i: number, j: number): Game {
		let section = this.matrix[secRow][secCol];
		if (this.isMoveValid(secRow, secCol, i, j)) {
			this.processMove(i, j, section);
			if (!this.isGameFinished()) {
				this.computerMove();
			}
		}

		// Returns itself to handle svelte reactivity
		// like this: game = game.localMove();
		return this;
	}

	/**
	 * Checks if the selected section is the next playable section
	 * @param secRow row index of the selected section
	 * @param secCol column index of the selected section
	 * @returns true if the selected section is the next playable section
	 * 			or it's the first move, false otherwise
	 */
	isNextSection(secRow: number, secCol: number): boolean {
		return (
			(this.nextSecRow === -1 || this.nextSecRow === secRow) &&
			(this.nextSecCol === -1 || this.nextSecCol === secCol)
		);
	}

	/**
	 * Checks if a move is valid. A move is valid if the following conditions are met:
	 * 
	 * - The player must be on his turn.
	 * - It's the first move OR the selected section is the next section to be played
	 * - The selected tile is empty.
	 * - The game is not finished.

	 * @param secRow row index of the selected section
	 * @param secCol column index of the selected section
	 * @param i matrix row index
	 * @param j matrix column index
	 * @returns true if the move is valid, false otherwise
	 */
	private isMoveValid(secRow: number, secCol: number, i: number, j: number): boolean {
		return (
			this.localPlayer === this.playerTurn &&
			this.isNextSection(secRow, secCol) &&
			this.matrix[secRow][secCol].isTileEmpty(i, j) &&
			!this.isGameFinished()
		);
	}

	/**
	 * Marks the position with the player symbol and calls section.checkGame().
	 * This function sets the game attributes for the next move.
	 *
	 * If the current player wins, it sets the value to the winner attribute.
	 * @param i row index of the selected section
	 * @param j column index of the select section
	 * @param section selected section
	 */
	private processMove(i: number, j: number, section: Section) {
		console.log('Processing', this.playerTurn);
		section.matrix[i][j] = this.playerTurn;
		section.checkGame(i, j, this.playerTurn);

		// Change the current player after the move was checked.
		this.playerTurn = this.playerTurn === 'x' ? 'o' : 'x';

		// Change the next playable section to the coordinates of the last played tile.
		this.nextSecRow = i;
		this.nextSecCol = j;

		// TODO This should set the winner after all sections were validated.
		this.winner = section.winner;
		if (this.winner !== '') {
			console.log('Winner:', this.winner);
		}
	}

	private nextSection() : Section {
		return this.matrix[this.nextSecRow][this.nextSecCol]
	}

	/**
	 * Randomly makes a move for the computer.
	 */
	private computerMove() {
		let section = this.nextSection();
		let emptySpaces = section.emptyTiles();

		const index = Math.floor(Math.random() * emptySpaces.length);
		let [i, j] = emptySpaces[index];
		this.processMove(i, j, section);
	}

	/**
	 * Checks if the game is finished.
	 * @returns true if the game is finished, false otherwise.
	 */
	isGameFinished(): boolean {
		return this.winner !== '';
	}
}
