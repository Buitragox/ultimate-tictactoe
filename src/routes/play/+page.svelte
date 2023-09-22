<script lang="ts">
    import { Game } from "./game";

    let game = new Game();

</script>

<main>
    <div class="grid place-items-center">
        <h1 class="font-medium text-3xl p-2 pb-10">The best tic-tac-toe in the world</h1>

        <div class="grid grid-cols-3 border-4 border-pink-400">
        {#each game.board[0][0].matrix as row, i (i)}
            {#each row as value, j (j)}
                <button class="col-span-1 border-2 border-white w-20 h-20" 
                        on:click={() => {game = game.localMove(i, j);}}>
                    <p class="text-3xl">{value}</p>
                </button> 
            {/each}
        {/each}
        </div>
    </div>

    {#if game.isGameFinished()}
        <p class="text-3xl">The winner is {game.winner}!</p>
    {/if}

    <!-- Fighting with styles i love it -->

    <div class="grid grid-cols-2">
        <a class="max-w-[6.5rem] border-2 border-solid border-green-50 rounded p-1.5 
            bg-green-600 hover:bg-green-500" href="/">
            Lets go back
        </a>

        <button class="border-2 border-solid border-red-50 rounded p-1.5 bg-red-600 hover:bg-red-500" 
        on:click={() => {game = game.resetGame();}}>
            Reset
        </button>
    </div>

    

    

</main>

<!-- <style>
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
</style> -->