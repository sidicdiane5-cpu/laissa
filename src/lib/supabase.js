// Client Supabase pour la base de données
import { createClient } from '@supabase/supabase-js'

// Essayer de lire les variables d'environnement
const envUrl = import.meta.env?.VITE_SUPABASE_URL;
const envKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

// Utiliser les variables si disponibles, sinon null (mode sans base de données)
export const supabase = envUrl && envKey 
  ? createClient(envUrl, envKey) 
  : null;
