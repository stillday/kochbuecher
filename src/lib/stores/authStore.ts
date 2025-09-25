import { writable } from 'svelte/store';
import type { Session, User } from '@supabase/supabase-js';

// The user store holds the user object, which is part of the session.
// We can derive the logged-in status from whether the user object exists.
export const user = writable<User | null>(null);

// The session store holds the complete session object.
// This might be useful for accessing the access token etc.
export const session = writable<Session | null>(null);