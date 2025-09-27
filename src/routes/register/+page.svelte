<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let errorMessage = '';
	let successMessage = '';
	let loading = false;

	async function handleSignUp() {
		loading = true;
		errorMessage = '';
		successMessage = '';
		try {
			const { error } = await supabase.auth.signUp({
				email: email,
				password: password
			});

			if (error) {
				throw error;
			}

			successMessage = 'Registrierung erfolgreich! Bitte überprüfen Sie Ihre E-Mails, um Ihr Konto zu bestätigen.';
			// In a real app, you might want to wait for a bit before redirecting
			// or show the message more permanently.
			setTimeout(() => {
				goto('/login');
			}, 5000);

		} catch (error: any) {
			errorMessage = error.message;
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Registrieren | Mein Digitales Kochbuch</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Neues Konto erstellen
			</h2>
		</div>
		<form class="mt-8 space-y-6" on:submit|preventDefault={handleSignUp}>
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
						autocomplete="new-password"
						required
						minlength="6"
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Passwort (mind. 6 Zeichen)"
					/>
				</div>
			</div>

			{#if errorMessage}
				<p class="text-sm text-red-600">{errorMessage}</p>
			{/if}

			{#if successMessage}
				<p class="text-sm text-green-600">{successMessage}</p>
			{/if}

			<div>
				<button
					type="submit"
					disabled={loading}
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
				>
					{loading ? 'Registrieren...' : 'Konto erstellen'}
				</button>
			</div>
		</form>
		<div class="text-sm text-center">
			<a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
				Bereits ein Konto? Anmelden
			</a>
		</div>
	</div>
</div>