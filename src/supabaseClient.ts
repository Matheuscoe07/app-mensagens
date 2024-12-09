import { createClient } from '@supabase/supabase-js';
import { Database } from './types/database';

// Verifica se as variáveis estão definidas
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    throw new Error('As variáveis SUPABASE_URL e SUPABASE_ANON_KEY não estão definidas no arquivo .env');
}

export const supabase = createClient<Database>(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);
