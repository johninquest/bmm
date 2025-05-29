import { writable, type Writable } from 'svelte/store';
import type { User } from 'firebase/auth';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

function createAuthStore() {
    const { subscribe, set } = writable<User | null>(null);

    return {
        subscribe,  // Make sure subscribe is exposed
        set,
        init: () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    set(user);
                } else {
                    set(null);
                }
            });
        }
    };
}

export const authStore = createAuthStore();