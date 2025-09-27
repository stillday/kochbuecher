<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	export let showModal = false;

	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}

	// Close modal on escape key press
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if showModal}
	<div
		transition:fly={{ y: -50, duration: 300 }}
		class="fixed inset-0 z-50 flex items-center justify-center"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={close} class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

		<div
			class="relative bg-white rounded-lg shadow-xl px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full max-w-lg"
		>
			<div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
				<button
					on:click={close}
					type="button"
					class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<span class="sr-only">Schließen</span>
					<!-- Heroicon name: outline/x -->
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<slot />
		</div>
	</div>
{/if}