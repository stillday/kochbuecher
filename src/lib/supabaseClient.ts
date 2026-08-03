import { createClient } from '@supabase/supabase-js'
import { env } from '$env/dynamic/public'

// It's important to use dynamic public variables here,
// as they are available in both server and client contexts.
const supabaseUrl = env.VITE_PUBLIC_SUPABASE_URL
const supabaseAnonKey = env.VITE_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)