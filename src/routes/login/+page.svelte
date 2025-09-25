<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let errorMessage = '';
	let loading = false;

	async function handleLogin() {
		loading = true;
		errorMessage = '';
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email: email,
				password: password
			});

			if (error) {
				throw error;
			}

			// On successful login, Supabase client automatically handles the session.
			// The onAuthStateChange listener (which we will set up in the root layout) will detect the new session.
			// We can then redirect the user.
			goto('/cookbooks');

		} catch (error: any) {
			errorMessage = error.message;
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Anmelden | Mein Digitales Kochbuch</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Anmelden bei Ihrem Kochbuch
			</h2>
		</div>
		<form class="mt-8 space-y-6" on:submit|preventDefault={handleLogin}>
			<div class="rounded-md shadow-sm -space-y-px">
				<div>
					<label for="email-address" class="sr-only">E-Mail-Adresse</label>
					<input
						bind:value={email}
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="E-Mail-Adresse"
					/>
				</div>
				<div>
					<label for="password" class="sr-only">Passwort</label>
					<input
						bind:value={password}
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Passwort"
					/>
				</div>
			</div>

			{#if errorMessage}
				<p class="text-sm text-red-600">{errorMessage}</p>
			{/if}

			<div>
				<button
					type="submit"
					disabled={loading}
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
				>
					{loading ? 'Anmelden...' : 'Anmelden'}
				</button>
			</div>
		</form>
		<div class="text-sm text-center">
			<a href="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
				Noch kein Konto? Registrieren
			</a>
		</div>
	</div>
</div>