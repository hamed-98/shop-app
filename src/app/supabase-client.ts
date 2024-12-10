// src/app/services/supabase-client.ts
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://xvezgvwhnmyqedcruitr.supabase.co';
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2ZXpndndobm15cWVkY3J1aXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3Mzk5MjUsImV4cCI6MjA0OTMxNTkyNX0.yiVRfY1QJYXCFljoalJ07dF-XhDoFNN2TE-e1BEKk0k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
