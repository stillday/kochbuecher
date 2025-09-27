import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();

	// if the user is not logged in, redirect to the login page
	if (!session) {
		throw redirect(303, '/login');
	}

	// if the user is logged in, return the session
	return {
		session,
	};
};