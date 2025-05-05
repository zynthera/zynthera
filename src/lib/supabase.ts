import { createClient } from '@supabase/supabase-js';

// These are public keys, safe to be in the frontend
const supabaseUrl = 'https://ejbabotmowzixfhsebda.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqYmFib3Rtb3d6aXhmaHNlYmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDQ3NDYsImV4cCI6MjA2MTY4MDc0Nn0.n2zWqOFd1zsdzMEJY5D0ExvfWgUcXYYwjDFw3vYBqro';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
