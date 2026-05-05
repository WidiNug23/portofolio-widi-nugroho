import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xhoqctfumqyauyctlekz.supabase.co';
const supabaseAnonKey = 'sb_publishable_5YXvr1CnuXk8v8uTY06MUA_4XPyrDpt';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);