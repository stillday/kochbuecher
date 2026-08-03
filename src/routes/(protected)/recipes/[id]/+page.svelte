<script lang="ts">
	let { data } = $props();
	const { recipe, ingredients } = data;

	// The cookbook might be null if the recipe isn't associated with one.
	const cookbook = Array.isArray(recipe.cookbooks) ? recipe.cookbooks[0] : recipe.cookbooks;

</script>

<svelte:head>
	<title>{recipe.title} | Digitales Kochbuch</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
	<a
		href={cookbook ? `/cookbooks/${cookbook.id}` : '/cookbooks'}
		class="text-sm text-indigo-600 hover:underline mb-4 inline-block"
	>
		&larr; Zurück {cookbook ? `zum Kochbuch "${cookbook.title}"` : 'zur Übersicht'}
	</a>

	<div class="bg-white rounded-lg shadow-md overflow-hidden">
		<div class="p-6 md:p-8">
			<h1 class="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{recipe.title}</h1>

			<div class="flex items-center space-x-6 text-gray-600 mt-4">
				{#if recipe.duration_minutes}
				<div class="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
					<span>{recipe.duration_minutes} Minuten</span>
				</div>
				{/if}
				{#if recipe.rating}
				<div class="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
					<span>{recipe.rating} / 5</span>
				</div>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-8 pb-8">
			<!-- Ingredients List -->
			<div class="md:col-span-1">
				<h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Zutaten</h2>
				<ul class="space-y-2 text-gray-700">
					{#if ingredients && ingredients.length > 0}
						{#each ingredients as item}
							<li class="flex">
								<span class="font-semibold w-20 text-right pr-2">{item.amount || ''} {item.unit || ''}</span>
								<span>{item.ingredients.name}</span>
							</li>
						{/each}
					{:else}
						<li>Keine Zutaten angegeben.</li>
					{/if}
				</ul>
			</div>

			<!-- Notes / Instructions -->
			<div class="md:col-span-2">
				<h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Zubereitung</h2>
				<div class="prose max-w-none text-gray-800">
					{@html recipe.notes ? recipe.notes.replace(/\\n/g, '<br>') : '<p>Keine Anleitung vorhanden.</p>'}
				</div>
			</div>
		</div>
	</div>
</div>