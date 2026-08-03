<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<svelte:head>
	<title>Neues Kochbuch anlegen</title>
</svelte:head>

<div class="max-w-2xl mx-auto">
	<a href="/cookbooks" class="text-sm text-indigo-600 hover:underline mb-4 inline-block">
		&larr; Zurück zu meinen Kochbüchern
	</a>
	<h1 class="text-3xl font-bold text-gray-800 mb-6">Neues Kochbuch anlegen</h1>

	<form
		method="POST"
		use:enhance
		class="bg-white p-8 rounded-lg shadow-md space-y-6"
	>
		<div>
			<label for="title" class="block text-sm font-medium text-gray-700">
				Titel <span class="text-red-500">*</span>
			</label>
			<input
				type="text"
				id="title"
				name="title"
				bind:value={form?.title ?? ''}
				required
				class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>
		</div>

		<div>
			<label for="author" class="block text-sm font-medium text-gray-700">
				Autor (optional)
			</label>
			<input
				type="text"
				id="author"
				name="author"
				bind:value={form?.author ?? ''}
				class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>
		</div>

		{#if form?.error}
			<p class="text-sm text-red-600 bg-red-50 p-3 rounded-md">{form.error}</p>
		{/if}

		<div class="flex justify-end">
			<button
				type="submit"
				class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				Kochbuch speichern
			</button>
		</div>
	</form>
</div>