// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { session } from '$lib/stores/session'
import type { Actions } from './$types';
import type { Session } from '$lib/models/session'

export const actions = {
    default() {
        session.set({} as Session)

        throw redirect(302, '/login');
    },
};
;null as any as Actions;