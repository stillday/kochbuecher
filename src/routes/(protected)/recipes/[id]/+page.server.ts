import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase, getSession } }) => {
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