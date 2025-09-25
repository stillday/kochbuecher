<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let password = '';
	let errorMessage = '';
	let successMessage = '';
	let loading = false;

	async function handleUpdatePassword() {
		loading = true;
		errorMessage = '';
		successMessage = '';
		try {
			const { error } = await supabase.auth.updateUser({ password: password });

			if (error) {
				throw error;
			}

			successMessage = 'Ihr Passwort wurde erfolgreich aktualisiert. Sie werden in Kürze zum Login weitergeleitet.';
			setTimeout(() => {
				// Sign out to ensure the old session is cleared, then redirect.
				supabase.auth.signOut().then(() => {
					goto('/login');
				});
			}, 3000);

		} catch (error: any) {
			errorMessage = error.message;
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Passwort aktualisieren | Mein Digitales Kochbuch</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Neues Passwort festlegen
			</h2>
		</div>
		<form class="mt-8 space-y-6" on:submit|preventDefault={handleUpdatePassword}>
			<div class="rounded-md shadow-sm">
				<div>
					<label for="new-password" class="sr-only">Neues Passwort</label>
					<input
						bind:value={password}
						id="new-password"
						name="password"
						type="password"
						autocomplete="new-password"
						required
						minlength="6"
						class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Neues Passwort (mind. 6 Zeichen)"
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
					{loading ? 'Aktualisieren...' : 'Passwort aktualisieren'}
				</button>
			</div>
		</form>
	</div>
</div>