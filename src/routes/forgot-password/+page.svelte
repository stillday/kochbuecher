<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let email = '';
	let errorMessage = '';
	let successMessage = '';
	let loading = false;

	async function handlePasswordReset() {
		loading = true;
		errorMessage = '';
		successMessage = '';
		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/update-password`
			});

			if (error) {
				throw error;
			}

			successMessage = 'Anweisungen zum Zurücksetzen des Passworts wurden an Ihre E-Mail-Adresse gesendet.';

		} catch (error: any) {
			errorMessage = error.message;
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Passwort vergessen | Mein Digitales Kochbuch</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Passwort zurücksetzen
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				Geben Sie Ihre E-Mail-Adresse ein, wir senden Ihnen einen Link zum Zurücksetzen.
			</p>
		</div>
		<form class="mt-8 space-y-6" on:submit|preventDefault={handlePasswordReset}>
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
						class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="E-Mail-Adresse"
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
					{loading ? 'Senden...' : 'Link zum Zurücksetzen anfordern'}
				</button>
			</div>
		</form>
		<div class="text-sm text-center">
			<a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
				Zurück zum Login
			</a>
		</div>
	</div>
</div>