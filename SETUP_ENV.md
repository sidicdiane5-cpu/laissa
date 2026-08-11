# Configuration de l'environnement

Pour que le site fonctionne avec Supabase, vous devez configurer le fichier `.env`:

1. Copiez le fichier `.env.example` vers `.env`:
   ```
   cp .env.example .env
   ```

2. Remplacez les valeurs dans `.env` avec vos vraies informations Supabase:
   - `VITE_SUPABASE_URL`: URL de votre projet Supabase
   - `VITE_SUPABASE_ANON_KEY`: Clé anonyme de votre projet Supabase
   - `VITE_WHATSAPP_NUMBER`: Numéro WhatsApp pour les commandes (déjà configuré)

## Obtenir les informations Supabase

1. Allez sur https://supabase.com
2. Créez un nouveau projet ou utilisez un existant
3. Dans les paramètres du projet, allez dans "API"
4. Copiez l'URL du projet et la clé "anon/public"

## Structure de la base de données

Le site peut fonctionner avec ou sans Supabase:
- **Sans Supabase**: Le site fonctionne en mode démo avec les données locales
- **Avec Supabase**: Les données sont stockées dans votre base de données en ligne

Pour l'instant, le site utilise principalement les données locales pour les produits et le système de commande WhatsApp.