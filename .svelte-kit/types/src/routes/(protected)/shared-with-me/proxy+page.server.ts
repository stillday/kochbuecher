// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ locals: { supabase, getSession } }: Parameters<PageServerLoad>[0]) => {
	const session = await getSession();
	if (!session) {
		// This should be caught by the layout guard, but as a fallback.
		return { sharedRecipes: [] };
	}

	const { data: sharedRecipes, error } = await supabase
		.from('recipe_shares')
		.select(
			`
			created_at,
			recipes (
				id,
				title,
				duration_minutes,
				rating
			),
			profiles:shared_by_user_id (
				username
			)
		`
		)
		.eq('shared_with_user_id', session.user.id)
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching shared recipes:', error);
		return { sharedRecipes: [] };
	}

	return { sharedRecipes };
};