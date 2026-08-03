import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/login');
		}

		const formData = await request.formData();
		const title = formData.get('title') as string;
		const author = formData.get('author') as string;

		if (!title || title.trim().length === 0) {
			return fail(400, {
				title,
				author,
				error: 'Ein Titel ist erforderlich.',
			});
		}

		const { error } = await supabase.from('cookbooks').insert({
			user_id: session.user.id,
			title: title.trim(),
			author: author ? author.trim() : null,
		});

		if (error) {
			console.error('Error inserting cookbook:', error);
			return fail(500, {
				title,
				author,
				error: 'Das Kochbuch konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.',
			});
		}

		throw redirect(303, '/cookbooks');
	},
};