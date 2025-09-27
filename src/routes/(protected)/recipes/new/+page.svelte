<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Trash2, PlusCircle } from 'lucide-svelte';

	let { form } = $props();

	// Structure for dynamic ingredients
	type Ingredient = { id: number; name: string; amount: string; unit: string };
	let ingredients: Ingredient[] = [{ id: 1, name: '', amount: '', unit: '' }];
	let nextId = 2;

	function addIngredient() {
		ingredients = [...ingredients, { id: nextId++, name: '', amount: '', unit: '' }];
	}

	function removeIngredient(id: number) {
		ingredients = ingredients.filter((ing) => ing.id !== id);
	}

	// Get cookbook_id from URL query params
	const cookbookId = $page.url.searchParams.get('cookbook_id');
</script>

<svelte:head>
	<title>Neues Rezept erstellen</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
	<a
		href={cookbookId ? `/cookbooks/${cookbookId}` : '/cookbooks'}
		class="text-sm text-indigo-600 hover:underline mb-4 inline-block"
	>
		&larr; Zurück zum Kochbuch
	</a>
	<h1 class="text-3xl font-bold text-gray-800 mb-6">Neues Rezept erstellen</h1>

	<form method="POST" use:enhance class="bg-white p-8 rounded-lg shadow-md space-y-8">
		<!-- Hidden input for cookbook_id -->
		{#if cookbookId}
			<input type="hidden" name="cookbook_id" value={cookbookId} />
		{/if}

		<!-- Main Recipe Details -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div>
				<label for="title" class="block text-sm font-medium text-gray-700">
					Titel <span class="text-red-500">*</span>
				</label>
				<input
					type="text"
					id="title"
					name="title"
					required
					class="mt-1 block w-full input"
				/>
			</div>
			<div>
				<label for="duration" class="block text-sm font-medium text-gray-700">
					Dauer (in Minuten)
				</label>
				<input
					type="number"
					id="duration"
					name="duration"
					class="mt-1 block w-full input"
				/>
			</div>
			<div>
				<label for="rating" class="block text-sm font-medium text-gray-700">
					Bewertung (1-5)
				</label>
				<input
					type="number"
					id="rating"
					name="rating"
					min="1"
					max="5"
					class="mt-1 block w-full input"
				/>
			</div>
		</div>

		<!-- Ingredients Section -->
		<div>
			<h2 class="text-xl font-semibold text-gray-800 mb-4">Zutaten</h2>
			<div class="space-y-4">
				{#each ingredients as ingredient, i (ingredient.id)}
					<div class="grid grid-cols-12 gap-2 items-center">
						<div class="col-span-3">
							<label class="sr-only" for={`ingredient_amount_${i}`}>Menge</label>
							<input
								type="text"
								name={`ingredient_amount_${i}`}
								placeholder="Menge"
								class="w-full input"
							/>
						</div>
						<div class="col-span-3">
							<label class="sr-only" for={`ingredient_unit_${i}`}>Einheit</label>
							<input
								type="text"
								name={`ingredient_unit_${i}`}
								placeholder="Einheit (g, ml..)"
								class="w-full input"
							/>
						</div>
						<div class="col-span-5">
							<label class="sr-only" for={`ingredient_name_${i}`}>Zutat</label>
							<input
								type="text"
								name={`ingredient_name_${i}`}
								placeholder="Zutat"
								required
								class="w-full input"
							/>
						</div>
						<div class="col-span-1">
							<button
								type="button"
								on:click={() => removeIngredient(ingredient.id)}
								class="text-red-500 hover:text-red-700 p-2 rounded-full transition-transform hover:scale-110"
								aria-label="Zutat entfernen"
							>
								<Trash2 class="w-5 h-5" />
							</button>
						</div>
					</div>
				{/each}
			</div>
			<button
				type="button"
				on:click={addIngredient}
				class="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-transform hover:scale-105"
			>
				<PlusCircle class="w-5 h-5 mr-2" />
				Zutat hinzufügen
			</button>
		</div>

		<!-- Notes Section -->
		<div>
			<label for="notes" class="block text-sm font-medium text-gray-700">Notizen</label>
			<textarea
				id="notes"
				name="notes"
				rows="4"
				class="mt-1 block w-full input"
				placeholder="Zubereitungsschritte, persönliche Anmerkungen, etc."
			></textarea>
		</div>

		{#if form?.error}
			<p class="text-sm text-red-600 bg-red-50 p-3 rounded-md">{form.error}</p>
		{/if}

		<!-- Submit Button -->
		<div class="flex justify-end">
			<button
				type="submit"
				class="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform duration-200 ease-in-out hover:scale-105"
			>
				Rezept speichern
			</button>
		</div>
	</form>
</div>

<style>
	.input {
		--tw-ring-color: theme(colors.indigo.500);
		border-width: 1px;
		border-color: theme(colors.gray.300);
		border-radius: theme(borderRadius.md);
		padding: theme(spacing.2) theme(spacing.3);
		width: 100%;
		transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
	}
	.input:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
		--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
	--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
		box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
		border-color: theme(colors.indigo.500);
	}
</style>