import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default({ cookies }) {
        cookies.delete('token')
        cookies.delete('user')

        throw redirect(302, '/login');
    },
};
