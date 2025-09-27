<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { user, session } from '$lib/stores/authStore';
	import { goto } from '$app/navigation';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
		// We get the initial session on the client
		supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
			session.set(currentSession);
			user.set(currentSession?.user ?? null);
		});

		const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
			session.set(newSession);
			user.set(newSession?.user ?? null);

			// If the user is in a password recovery state, redirect them to the update-password page.
			if (event === 'PASSWORD_RECOVERY') {
				goto('/update-password');
			}
		});

		return () => {
			authListener?.subscription.unsubscribe();
		};
	});

	async function handleLogout() {
		await supabase.auth.signOut();
		// onAuthStateChange will trigger, clearing the user store.
		goto('/login');
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-gray-100 font-sans">
	<header class="bg-white shadow-sm sticky top-0 z-40">
		<nav class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center py-4">
				<a href="/" class="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
					Digitales Kochbuch
				</a>
				<div class="flex items-center space-x-4">
					{#if $user}
						<span class="text-gray-700 hidden sm:block">Hallo, {$user.email?.split('@')[0]}</span>
						<a href="/cookbooks" class="text-gray-600 hover:text-indigo-600 hover:underline transition-colors duration-200">Meine Kochbücher</a>
						<a href="/shared-with-me" class="text-gray-600 hover:text-indigo-600 hover:underline transition-colors duration-200">Mit mir geteilt</a>
						<button
							on:click={handleLogout}
							class="px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 ease-in-out hover:scale-105"
						>
							Abmelden
						</button>
					{:else}
						<a href="/login" class="text-gray-600 hover:text-indigo-600 hover:underline transition-colors duration-200">Anmelden</a>
						<a
							href="/register"
							class="px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out hover:scale-105"
						>
							Registrieren
						</a>
					{/if}
				</div>
			</div>
		</nav>
	</header>

	<main class="container mx-auto p-4 sm:p-6 lg:p-8">
		{@render children?.()}
	</main>
</div>
<style>
	:global(body) {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>