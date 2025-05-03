
import { createClient } from '@supabase/supabase-js';

// These are public keys, safe to be in the frontend
const supabaseUrl = 'https://supabase-public-url-placeholder.supabase.co';
const supabaseAnonKey = 'supabase-anonymous-key-placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
