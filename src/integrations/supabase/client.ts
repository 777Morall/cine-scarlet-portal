// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xockxmrptgwrukqarhtq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvY2t4bXJwdGd3cnVrcWFyaHRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4NTA4NzUsImV4cCI6MjA2ODQyNjg3NX0.dONxUgrzI2vAXrUzbOma02r6He_ZYHiYf3VEXeIpbUQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});