export class Game {
    board: Section[][];
    playerTurn: string;
    localPlayer: string;
    enemyPlayer: string;
    winner: string;

    constructor(matrix: string | undefined = undefined, 
                playerTurn: string | undefined = undefined,
                localPlayer: string | undefined = undefined,
                winner: string | undefined = undefined) {
        
        this.board = []
        this.playerTurn = playerTurn ? playerTurn : "x";
        this.localPlayer = localPlayer ? localPlayer : "x";
        this.enemyPlayer = (this.localPlayer === "x") ? "o" : "x"; 
        this.winner = winner ? winner : "";
        
        // TODO: build this.matrix from matrix param.
        // Currently: Always create new matrix.
        // Should: Handle input. 
        // for (let i = 0; i < 3; i++) {
        //     this.board.push([new Section(), new Section(), new Section()]);
        // }
        this.board.push([new Section()]);
    }

    /**
     * Resets the game board, player turn and winner.
     * @returns the game object
     */
    resetGame(): Game {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                this.board[i][j].resetSection()
            }
        }
        this.playerTurn = this.localPlayer;
        this.winner = "";

        // Returns itself to handle svelte reactivity 
        // like this: game = game.localMove;
        return this;
    }

    /**
     * Validates if the move is valid. If it's valid it calls processMove to handle the logic.
     * If the game is not finished after the player moves, it calls computerMove to process the
     * enemy move.
     * 
     * Currently it only works for a single section and needs some work.
     * @param i row of the section that was selected.
     * @param j column of the section that was selected.
     * @returns the game object
     */
    localMove(i: number, j: number): Game {
        let section =  this.board[0][0];
        if (this.localPlayer === this.playerTurn && section.matrix[i][j] === "" && !this.isGameFinished()){
            this.processMove(i, j, section);
            if (!this.isGameFinished()) {
                this.computerMove(section);
            }
        }

        // Returns itself to handle svelte reactivity 
        // like this: game = game.localMove;
        return this;
    }

    /**
     * Marks the position with the player symbol and calls section.checkGame.
     * It also sets the value of playerTurn after each move.
     * 
     * If the current player wins, it sets the value to the winner attribute.
     * @param i row index of the selected section
     * @param j column index of the select section
     * @param section selected section
     */
    private processMove(i: number, j: number, section: Section) {
        console.log("Processing", this.playerTurn);
        section.matrix[i][j] = this.playerTurn;
        section.checkGame(i, j, this.playerTurn);

        // Change the current player after the move was checked.
        this.playerTurn = (this.playerTurn === "x") ? "o" : "x";
        
        // TODO: This should set the winner after all sections were validated.
        this.winner = section.winner;
        if (this.winner !== "") {
            console.log("Winner:", this.winner);
        }
    }

    private computerMove(section: Section) {
        let emptySpaces: [number, number][] = [];
        for (let i = 0; i < section.matrix.length; i++) {
            for (let j = 0; j < section.matrix[i].length; j++) {
                if (section.matrix[i][j] === "") {
                    emptySpaces.push([i, j]);
                }
            }
        }

        const index = Math.floor(Math.random() * emptySpaces.length);
        let [i, j] = emptySpaces[index];
        this.processMove(i, j, section)
    }

    /**
     * Checks if the game is finished.
     * @returns true if the game is finished, false otherwise.
     */
    isGameFinished() : boolean {
        return this.winner !== "";
    }
    
}

class Section {
    matrix: string[][];
    winner: string;

    constructor(data: string | undefined = undefined) {
        const DATA_LENGTH = 9;

        this.matrix = [["", "", ""], ["", "", ""], ["", "", ""]]; // Create default section
        this.winner = "";
        
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
                this.checkGame(i, i, "x"); 
                this.checkGame(i, i, "o");         
            }
        }
    }

    checkGame(i: number, j: number, player: string): string {
        if (this.winner !== "") {
            return this.winner;
        }
        else {
            const hasWon = this.checkHorizontal(i, player) || 
                           this.checkVertical(j, player) || 
                           this.checkDiagonal(player);
            this.winner = hasWon ? player : "";
        }

        return this.winner;
    }

    private checkHorizontal(i: number, player: string): boolean {
        console.log("horizonal")

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
        console.log("vertical")
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
        
        console.log("diagonal", has_won1, has_won2);

        return has_won1 || has_won2;
    }

    resetSection() {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix.length; j++) {
                this.matrix[i][j] = "";
            }
        }
        this.winner = "";
    }
}