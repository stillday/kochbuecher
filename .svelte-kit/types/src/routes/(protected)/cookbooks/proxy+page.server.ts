// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ locals: { supabase, getSession } }: Parameters<PageServerLoad>[0]) => {
	const session = await getSession();

	// The layout's load function already protects this page, but it's good practice
	// to handle the case where the session might somehow be null.
	if (!session) {
		return { cookbooks: [] };
	}

	const { data: cookbooks, error } = await supabase
		.from('cookbooks')
		.select('id, title, author, cover_image_url')
		.eq('user_id', session.user.id)
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching cookbooks:', error);
		return { cookbooks: [] };
	}

	return { cookbooks };
};