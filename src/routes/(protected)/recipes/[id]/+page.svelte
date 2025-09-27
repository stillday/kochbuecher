<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	const { recipe, ingredients } = data;

	let showShareModal = false;

	// The cookbook might be null if the recipe isn't associated with one.
	const cookbook = Array.isArray(recipe.cookbooks) ? recipe.cookbooks[0] : recipe.cookbooks;

	function generateBringPayload() {
		const bringIngredients = ingredients.map((item: any) => {
			return `${item.amount || ''} ${item.unit || ''} ${item.ingredients.name}`.trim();
		});

		const payload = {
			'@context': 'http://schema.org',
			'@type': 'Recipe',
			name: recipe.title,
			recipeIngredient: bringIngredients
		};

		console.log('--- Bring! JSON Payload ---');
		console.log(JSON.stringify(payload, null, 2));
		alert('Bring! JSON-Payload wurde in der Browser-Konsole ausgegeben.');
	}
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

	<div class="bg-white rounded-lg shadow-xl overflow-hidden">
		<div class="p-6 md:p-8">
			<div class="flex justify-between items-start">
				<div>
					<h1 class="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
						{recipe.title}
					</h1>

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
				<div class="flex-shrink-0 flex space-x-2">
					<button
						on:click={generateBringPayload}
						class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform hover:scale-105"
					>
						Einkaufsliste
					</button>
					<button
						on:click={() => showShareModal = true}
						class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform hover:scale-105"
					>
						Teilen
					</button>
				</div>
			</div>
		</div>

		<div class="border-t border-gray-200">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 px-6 md:px-8 py-8">
				<!-- Ingredients List -->
				<div class="md:col-span-1">
					<h2 class="text-2xl font-bold text-gray-900 mb-4">Zutaten</h2>
					<ul class="space-y-3 text-gray-700">
						{#if ingredients && ingredients.length > 0}
							{#each ingredients as item}
								<li class="flex items-start border-b border-gray-100 pb-3">
									<svg class="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
									<div>
										<span class="font-semibold">{item.amount || ''} {item.unit || ''}</span>
										<span class="ml-2">{item.ingredients.name}</span>
									</div>
								</li>
							{/each}
						{:else}
							<li>Keine Zutaten angegeben.</li>
						{/if}
					</ul>
				</div>

				<!-- Notes / Instructions -->
				<div class="md:col-span-2">
					<h2 class="text-2xl font-bold text-gray-900 mb-4">Zubereitung</h2>
					<div class="prose prose-indigo lg:prose-lg max-w-none text-gray-800">
						{@html recipe.notes ? recipe.notes.replace(/\\n/g, '<br>') : '<p>Keine Anleitung vorhanden.</p>'}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<Modal bind:showModal={showShareModal} on:close={() => (showShareModal = false)}>
	<form
		method="POST"
		action="?/share"
		use:enhance={() => {
			return async ({ update }) => {
				await update();
				if (form?.success) {
					setTimeout(() => {
						showShareModal = false;
					}, 2000);
				}
			};
		}}
	>
		<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Rezept teilen</h3>
		<div class="mt-4">
			<p class="text-sm text-gray-500 mb-4">
				Geben Sie die E-Mail-Adresse des Benutzers ein, mit dem Sie dieses Rezept teilen möchten.
			</p>
			<div>
				<label for="email" class="sr-only">E-Mail</label>
				<input
					type="email"
					name="email"
					id="email"
					class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
					placeholder="benutzer@beispiel.com"
					bind:value={form?.email ?? ''}
				/>
			</div>

			{#if form?.message}
				<div class="mt-4 p-3 rounded-md {form.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}">
					<p>{form.message}</p>
				</div>
			{/if}
		</div>
		<div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
			<button
				type="submit"
				class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
			>
				Teilen
			</button>
			<button
				on:click={() => (showShareModal = false)}
				type="button"
				class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
			>
				Abbrechen
			</button>
		</div>
	</form>
</Modal>