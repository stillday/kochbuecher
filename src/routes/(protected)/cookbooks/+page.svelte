<script lang="ts">
	import { Plus } from 'lucide-svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Meine Kochbücher</title>
</svelte:head>

<div class="flex justify-between items-center mb-6">
	<h1 class="text-3xl font-bold text-gray-800">Meine Kochbücher</h1>
	<a
		href="/cookbooks/new"
		class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
	>
		<Plus class="w-5 h-5 mr-2" />
		Neues Kochbuch
	</a>
</div>

{#if data.cookbooks && data.cookbooks.length > 0}
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
		{#each data.cookbooks as cookbook (cookbook.id)}
			<a
				href={`/cookbooks/${cookbook.id}`}
				class="group block bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
			>
				<div class="h-48 bg-gray-200 flex items-center justify-center relative overflow-hidden">
					<div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
					<svg
						class="w-16 h-16 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6.253v11.494m-5.747-8.494l11.494 0"
						></path></svg
					>
				</div>
				<div class="p-4">
					<h3 class="font-bold text-lg text-gray-800 truncate group-hover:text-indigo-600">
						{cookbook.title}
					</h3>
					<p class="text-sm text-gray-600">{cookbook.author || 'Unbekannter Autor'}</p>
				</div>
			</a>
		{/each}
	</div>
{:else}
	<div class="text-center py-16 px-6 border-2 border-dashed border-gray-300 rounded-lg">
		<svg
			class="mx-auto h-12 w-12 text-gray-400"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path
				vector-effect="non-scaling-stroke"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
			/>
		</svg>
		<h3 class="mt-2 text-sm font-medium text-gray-900">Noch keine Kochbücher</h3>
		<p class="mt-1 text-sm text-gray-500">
			Fangen Sie an, indem Sie Ihr erstes digitales Kochbuch erstellen.
		</p>
		<div class="mt-6">
			<a
				href="/cookbooks/new"
				class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				<Plus class="w-5 h-5 mr-2" />
				Erstes Kochbuch anlegen
			</a>
		</div>
	</div>
{/if}