import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) {
		// This should be caught by the layout guard, but as a fallback.
		throw error(401, 'Unauthorized');
	}

	const cookbookId = params.id;

	// Fetch the cookbook details. The RLS policy ensures the user can only fetch their own.
	const { data: cookbook, error: cookbookError } = await supabase
		.from('cookbooks')
		.select('id, title, author')
		.eq('id', cookbookId)
		.single();

	if (cookbookError) {
		console.error('Error fetching cookbook details:', cookbookError);
		throw error(404, 'Kochbuch nicht gefunden');
	}

	if (!cookbook) {
		throw error(404, 'Kochbuch nicht gefunden');
	}

	// Fetch the recipes associated with this cookbook.
	const { data: recipes, error: recipesError } = await supabase
		.from('recipes')
		.select('id, title, duration_minutes, rating')
		.eq('cookbook_id', cookbookId)
		.order('created_at', { ascending: false });

	if (recipesError) {
		console.error('Error fetching recipes:', recipesError);
		// We can still render the page, just with an empty list of recipes.
		return { cookbook, recipes: [] };
	}

	return { cookbook, recipes };
};