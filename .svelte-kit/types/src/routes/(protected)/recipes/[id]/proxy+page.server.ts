// @ts-nocheck
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = async ({ params, locals: { supabase, getSession } }: Parameters<PageServerLoad>[0]) => {
	const session = await getSession();
	if (!session) {
		throw error(401, 'Unauthorized');
	}

	const recipeId = params.id;

	// Fetch the recipe details including its cookbook title and id
	const { data: recipe, error: recipeError } = await supabase
		.from('recipes')
		.select(
			`
			id,
			title,
			duration_minutes,
			rating,
			notes,
			cookbooks ( id, title )
		`
		)
		.eq('id', recipeId)
		.single();

	if (recipeError || !recipe) {
		console.error('Error fetching recipe:', recipeError);
		throw error(404, 'Rezept nicht gefunden');
	}

	// Fetch the ingredients for the recipe
	const { data: ingredients, error: ingredientsError } = await supabase
		.from('recipe_ingredients')
		.select(
			`
			amount,
			unit,
			ingredients ( name )
		`
		)
		.eq('recipe_id', recipeId);

	if (ingredientsError) {
		console.error('Error fetching ingredients:', ingredientsError);
		// We can still render the page, just with an empty list of ingredients.
		return { recipe, ingredients: [] };
	}

	return { recipe, ingredients };
};

export const actions = {
	share: async ({ request, params, locals: { supabase, getSession } }: import('./$types').RequestEvent) => {
		const session = await getSession();
		if (!session) {
			return fail(401, { message: 'Nicht authentifiziert' });
		}

		const formData = await request.formData();
		const emailToShareWith = formData.get('email') as string;

		if (!emailToShareWith) {
			return fail(400, { message: 'E-Mail-Adresse ist erforderlich.', email: emailToShareWith });
		}

		// 1. Find the user to share with
		const { data: profileToShareWith, error: profileError } = await supabase
			.from('profiles')
			.select('id')
			.eq('username', emailToShareWith) // Assuming email is stored in username field
			.single();

		if (profileError || !profileToShareWith) {
			return fail(404, {
				message: `Benutzer mit der E-Mail "${emailToShareWith}" nicht gefunden.`,
				email: emailToShareWith
			});
		}

		// 2. Check if user is trying to share with themselves
		if (profileToShareWith.id === session.user.id) {
			return fail(400, { message: 'Sie können ein Rezept nicht mit sich selbst teilen.', email: emailToShareWith });
		}

		const recipeId = params.id;

		// 3. Insert the share record
		const { error: shareError } = await supabase.from('recipe_shares').insert({
			recipe_id: Number(recipeId),
			shared_by_user_id: session.user.id,
			shared_with_user_id: profileToShareWith.id,
			can_edit: false // Defaulting to read-only access for now
		});

		if (shareError) {
			// Handle potential unique constraint violation (already shared)
			if (shareError.code === '23505') {
				return fail(409, {
					message: 'Dieses Rezept ist bereits mit diesem Benutzer geteilt.',
					email: emailToShareWith
				});
			}
			console.error('Error sharing recipe:', shareError);
			return fail(500, { message: 'Rezept konnte nicht geteilt werden.', email: emailToShareWith });
		}

		return { success: true, message: `Rezept erfolgreich mit ${emailToShareWith} geteilt!` };
	}
};;null as any as Actions;