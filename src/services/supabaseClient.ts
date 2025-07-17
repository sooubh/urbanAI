import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fssgqimjxbzpqdljjjox.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzc2dxaW1qeGJ6cHFkbGpqam94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NTI1NjUsImV4cCI6MjA2ODMyODU2NX0.T6PL9EksKj0d37aVwjh5TFQQe9j2lL8BwNmEKOguCGc';

export const supabase = createClient(supabaseUrl, supabaseKey); 