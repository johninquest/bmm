import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

function createAuthStore() {
    const { subscribe, set } = writable<User | null>(null);

    return {
        subscribe,
        init: () => {
            onAuthStateChanged(auth, (user) => {
                set(user);
            });
        }
    };
}

export const authStore = createAuthStore();