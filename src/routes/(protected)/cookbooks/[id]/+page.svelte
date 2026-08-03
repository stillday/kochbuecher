<script lang="ts">
	import { Plus } from 'lucide-svelte';

	let { data } = $props();
	const { cookbook, recipes } = data;
</script>

<svelte:head>
	<title>{cookbook.title} | Meine Kochbücher</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
	<a href="/cookbooks" class="text-sm text-indigo-600 hover:underline mb-4 inline-block">
		&larr; Zurück zu meinen Kochbüchern
	</a>
	<div class="flex justify-between items-start mb-6">
		<div>
			<h1 class="text-3xl font-bold text-gray-800">{cookbook.title}</h1>
			{#if cookbook.author}
				<p class="text-lg text-gray-600">von {cookbook.author}</p>
			{/if}
		</div>
		<a
			href={`/recipes/new?cookbook_id=${cookbook.id}`}
			class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			<Plus class="w-5 h-5 mr-2" />
			Neues Rezept
		</a>
	</div>

	<div class="bg-white rounded-lg shadow-md">
		<ul class="divide-y divide-gray-200">
			{#if recipes && recipes.length > 0}
				{#each recipes as recipe (recipe.id)}
					<li>
						<a href={`/recipes/${recipe.id}`} class="block hover:bg-gray-50">
							<div class="px-4 py-4 sm:px-6 flex justify-between items-center">
								<div>
									<p class="text-lg font-medium text-indigo-600 truncate">{recipe.title}</p>
									<div class="flex items-center text-sm text-gray-500 mt-1">
										<p class="mr-4">
											Dauer: {recipe.duration_minutes || '?'} min
										</p>
										<p>
											Bewertung: {recipe.rating || '?'} / 5
										</p>
									</div>
								</div>
								<div class="text-gray-400">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
									</svg>
								</div>
							</div>
						</a>
					</li>
				{/each}
			{:else}
				<li class="px-4 py-12 text-center">
					<h3 class="text-lg font-medium text-gray-900">Noch keine Rezepte</h3>
					<p class="mt-1 text-sm text-gray-500">
						Dieses Kochbuch ist noch leer. Fügen Sie Ihr erstes Rezept hinzu!
					</p>
				</li>
			{/if}
		</ul>
	</div>
</div>