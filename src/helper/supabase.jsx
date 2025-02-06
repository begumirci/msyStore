import { createClient } from '@supabase/supabase-js';

const Url = 'https://xujaclfwvbvinrsvpllx.supabase.co';
const Key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1amFjbGZ3dmJ2aW5yc3ZwbGx4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODc4MzQ2MSwiZXhwIjoyMDU0MzU5NDYxfQ.PLtdkgk8pGJ_R0n3ZqUzz3aJukBdjulbuIig5gQhglg';

export const supabase = createClient(Url, Key);
