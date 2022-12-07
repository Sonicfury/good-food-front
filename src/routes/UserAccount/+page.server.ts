import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default({ cookies }) {
        cookies.set('session', '');
        cookies.set('userId', '');
        throw redirect(302, '/login');
    },
};
