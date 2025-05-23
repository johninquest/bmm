import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { auth } from '../../firebase';

export const load: PageLoad = async () => {
    if (!auth.currentUser) {
        throw redirect(302, '/');
    }
    return {};
};