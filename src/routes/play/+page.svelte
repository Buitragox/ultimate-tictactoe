<script lang="ts">
    const N = 3;
    let matrix: string[][] = [["", "", ""], ["", "", ""], ["", "", ""]]
    let playerTurn: string = "x";
    let localPlayer: string = "x";
    let player2: string = "o";
    let gameState = {
        is_finished: false,
        winner: ""
    };

    function processMove(i: number, j: number) {
        console.log("Processing", playerTurn);
        matrix[i][j] = playerTurn;
        checkGame(i, j);

        if (playerTurn === "x") {
            playerTurn = "o";
        } 
        else if (playerTurn === "o") {
            playerTurn = "x";
        }
    }

    function checkGame(i: number, j: number) {
        gameState.is_finished = checkHorizontal(i) || 
                                checkVertical(j) || 
                                checkDiagonal(i, j);

        if (gameState.is_finished) {
            gameState.winner = playerTurn;
        }
    }

    function checkHorizontal(i: number): boolean {
        console.log("horizonal")

        let has_won = true;
        let index = 0;
        while (index < N && has_won) {
            if (matrix[i][index] !== playerTurn) {
                has_won = false;
                break;
            }
            index++;
        }

        return has_won;
    }

    function checkVertical(j: number): boolean {
        console.log("vertical")
        let has_won = true;
        let index = 0;

        while (index < N && has_won) {
            if (matrix[index][j] !== playerTurn) {
                has_won = false;
                break;
            }
            index++;
        }

        return has_won;
    }

    /**
     * This checks both diagonals disregarding the player move
       not the best but for 6 checks doesn't matter 
     */
    function checkDiagonal(i: number, j: number): boolean {
        
        let has_won1 = true;
        let has_won2 = true;
        let index = 0;

        // Check diagonal from (0,0) to (2,2)
        while (index < N && has_won1) {
            if (matrix[index][index] !== playerTurn) {
                has_won1 = false;
                break;
            }
            index++;
        }
        
        // Check diagonal from (0,2) to (2,0)
        index = 0;
        while (index < N && has_won2) {
            if (matrix[index][N - 1 - index] !== playerTurn) {
                has_won2 = false;
                break;
            }
            index++;
        }
        
        console.log("diagonal", has_won1, has_won2);

        return has_won1 || has_won2;
    }

    function localMove(i: number, j: number) {
        if (localPlayer === playerTurn && matrix[i][j] === "" && !gameState.is_finished){
            processMove(i, j);
            if (!gameState.is_finished) {
                computerMove();
            }
        }

    }

    function computerMove() {
        let emptySpaces: [number, number][] = [];
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (matrix[i][j] === "") {
                    emptySpaces.push([i, j]);
                }
            }
        }

        const index = Math.floor(Math.random() * emptySpaces.length);
        let [i, j] = emptySpaces[index];
        processMove(i, j);
    }

    function resetGame() {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                matrix[i][j] = "";
            }
        }
        playerTurn = localPlayer;
        gameState.is_finished = false;
        gameState.winner = "";
    }

</script>

<main>

    <h1>The best tic-tac-toe in the world</h1>

    <div class="game-container">
        <div class="grid-container">
        {#each matrix as row, i}
            {#each row as value, j ((i+1) * (j+1))}
                <button class="grid-item" on:click={() => localMove(i, j)}>
                    {value}
                </button> 
            {/each}
        {/each}
        </div>
    </div>

    {#if gameState.is_finished}
        <p>The winner is {gameState.winner}</p>
    {/if}

    <button on:click={() => resetGame()}>Reset</button>
    <br/> 

    <a href="/">Lets go back</a>

</main>

<style>
    .game-container {
        display: grid;
        place-items: center;
    }

    .grid-container {
        display: grid;
        place-items: center;
        grid-template-columns: auto auto auto;
        /* background-color: black; */
        width: 25%;
        max-width: 75%;
        padding: 10px;
        position: relative;
    }

    .grid-item {
        background-color: gray;
        border: 3px;
        border-style: solid;
        border-color: rgb(0, 0, 0);
        text-align: center;
        font-size: xx-large;
        width: 100%;  
        min-width: 50px;
        max-width: 150px; 
        aspect-ratio: 1/1;
    }

    .grid-item:hover {
        background-color: rgb(184, 118, 118);
        border: 3px;
        border-color: yellow;
        border-style: solid;
        text-align: center;
        font-size: xx-large;       
    }
</style>