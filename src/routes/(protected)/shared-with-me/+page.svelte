<script lang="ts">
	let { data } = $props();
	const { sharedRecipes } = data;
</script>

<svelte:head>
	<title>Mit mir geteilte Rezepte</title>
</svelte:head>

<div class="flex justify-between items-center mb-6">
	<h1 class="text-3xl font-bold text-gray-800">Mit mir geteilte Rezepte</h1>
</div>

{#if sharedRecipes && sharedRecipes.length > 0}
	<div class="bg-white rounded-lg shadow-md">
		<ul class="divide-y divide-gray-200">
			{#each sharedRecipes as share (share.recipes.id)}
				{@const recipe = share.recipes}
				{@const sharer = share.profiles}
				<li>
					<a href={`/recipes/${recipe.id}`} class="block hover:bg-gray-50">
						<div class="px-4 py-4 sm:px-6 flex justify-between items-center">
							<div>
								<p class="text-lg font-medium text-indigo-600 truncate">{recipe.title}</p>
								<div class="flex items-center text-sm text-gray-500 mt-1">
									<p class="mr-4">
										Dauer: {recipe.duration_minutes || '?'} min
									</p>
									<p class="mr-4">
										Bewertung: {recipe.rating || '?'} / 5
									</p>
									<p>
										Geteilt von: {sharer.username.split('@')[0]}
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
		</ul>
	</div>
{:else}
	<div class="text-center py-16 px-6 border-2 border-dashed border-gray-300 rounded-lg">
		<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
			<path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M5 7h14" />
		</svg>
		<h3 class="mt-2 text-sm font-medium text-gray-900">Noch nichts geteilt</h3>
		<p class="mt-1 text-sm text-gray-500">
			Wenn andere Benutzer Rezepte mit Ihnen teilen, erscheinen sie hier.
		</p>
	</div>
{/if}