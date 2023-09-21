<script lang="ts">
    import { Game } from "./game";

    let game = new Game();

</script>

<main>

    <h1>The best tic-tac-toe in the world</h1>

    <div class="game-container">
        <div class="grid-container">
        {#each game.board[0][0].matrix as row, i}
            {#each row as value, j}
                <button class="grid-item" on:click={() => {game = game.localMove(i, j);}}>
                    {value}
                </button> 
            {/each}
        {/each}
        </div>
    </div>

    {#if game.isGameFinished()}
        <p>The winner is {game.winner}</p>
    {/if}

    <button on:click={() => {game = game.resetGame();}}>Reset</button>
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