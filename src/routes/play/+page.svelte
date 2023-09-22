<script lang="ts">
	import { Game } from './game';

	let game = new Game();
</script>

<main>
	<div class="grid place-items-center p-2">
		<h1 class="font-medium text-zinc-50 text-3xl p-2 pb-10">The best tic-tac-toe in the world</h1>

		<div class="grid grid-cols-3 border-4 border-pink-400">
			{#each game.board[0][0].matrix as row, i (i)}
				{#each row as value, j (j)}
					<button
						class="col-span-1 border-2 border-white w-20 h-20 hover:bg-slate-600"
						on:click={() => {
							game = game.localMove(i, j);
						}}
					>
						<p class="text-3xl text-zinc-50">{value}</p>
					</button>
				{/each}
			{/each}
		</div>
	</div>

	{#if game.isGameFinished()}
		<p class="grid place-items-center text-xl text-zinc-50 p-1 py-2">
			The winner is {game.winner}!
		</p>
	{/if}

	<div class="flex items-center space-x-4 justify-center p-2">
		<a
			class="border-2 border-solid rounded px-4 py-1
                 border-green-50 bg-green-600 hover:bg-green-500"
			href="/"
		>
			Go back
		</a>

		<button
			class="border-2 border-solid rounded px-4 py-1
                border-red-50 bg-red-600 hover:bg-red-500"
			on:click={() => {
				game = game.resetGame();
			}}
		>
			Reset
		</button>
	</div>
</main>
