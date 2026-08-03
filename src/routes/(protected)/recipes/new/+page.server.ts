import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	// Ensure user is logged in before they can even see the page
	const session = await getSession();
	if (!session) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/login'); // Should be redundant due to layout guard, but safe
		}

		const formData = await request.formData();
		const cookbookId = formData.get('cookbook_id') as string;
		const title = formData.get('title') as string;
		const duration = formData.get('duration') as string;
		const rating = formData.get('rating') as string;
		const notes = formData.get('notes') as string;

		if (!title || title.trim().length === 0) {
			return fail(400, { error: 'Ein Titel ist erforderlich.' });
		}

		// --- Parse Ingredients ---
		const ingredients = [];
		let i = 0;
		while (formData.has(`ingredient_name_${i}`)) {
			const name = formData.get(`ingredient_name_${i}`) as string;
			const amount = formData.get(`ingredient_amount_${i}`) as string;
			const unit = formData.get(`ingredient_unit_${i}`) as string;

			if (name && name.trim().length > 0) {
				ingredients.push({
					name: name.trim(),
					amount: amount ? parseFloat(amount.replace(',', '.')) : null, // Support comma as decimal separator
					unit: unit ? unit.trim() : null
				});
			}
			i++;
		}

		// --- DB Operation: Insert Recipe ---
		const { data: recipeData, error: recipeError } = await supabase
			.from('recipes')
			.insert({
				user_id: session.user.id,
				cookbook_id: cookbookId ? Number(cookbookId) : null,
				title: title.trim(),
				duration_minutes: duration ? parseInt(duration, 10) : null,
				rating: rating ? parseInt(rating, 10) : null,
				notes: notes ? notes.trim() : null
			})
			.select('id')
			.single();

		if (recipeError || !recipeData) {
			console.error('Error inserting recipe:', recipeError);
			return fail(500, { error: 'Rezept konnte nicht gespeichert werden.' });
		}

		const newRecipeId = recipeData.id;

		// --- DB Operations: Handle Ingredients ---
		if (ingredients.length > 0) {
			// 1. Upsert all unique ingredients to get their IDs
			const ingredientNames = ingredients.map((i) => ({ name: i.name }));
			const { data: ingredientData, error: ingredientUpsertError } = await supabase
				.from('ingredients')
				.upsert(ingredientNames, { onConflict: 'name', ignoreDuplicates: false })
				.select('id, name');

			if (ingredientUpsertError) {
				console.error('Error upserting ingredients:', ingredientUpsertError);
				// Rollback: delete the recipe we just created for consistency
				await supabase.from('recipes').delete().eq('id', newRecipeId);
				return fail(500, { error: 'Zutaten konnten nicht gespeichert werden.' });
			}

			// 2. Create the links in the recipe_ingredients table
			const recipeIngredientsToInsert = ingredients.map((ing) => {
				const dbIngredient = ingredientData.find((dbIng) => dbIng.name === ing.name);
				return {
					recipe_id: newRecipeId,
					ingredient_id: dbIngredient.id,
					amount: ing.amount,
					unit: ing.unit
				};
			});

			const { error: recipeIngredientsError } = await supabase
				.from('recipe_ingredients')
				.insert(recipeIngredientsToInsert);

			if (recipeIngredientsError) {
				console.error('Error inserting recipe ingredients:', recipeIngredientsError);
				// Rollback: delete recipe
				await supabase.from('recipes').delete().eq('id', newRecipeId);
				return fail(500, { error: 'Zutaten-Verknüpfung ist fehlgeschlagen.' });
			}
		}

		throw redirect(303, `/recipes/${newRecipeId}`);
	}
};