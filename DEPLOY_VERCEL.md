# Déploiement sur Vercel

## Prérequis

1. Un compte Vercel (https://vercel.com)
2. Un compte GitHub (pour connecter votre repository)
3. Un projet Supabase configuré

## Étape 1: Préparer le repository

1. Poussez votre code sur GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/votre-username/laissa.git
git push -u origin main
```

## Étape 2: Déployer sur Vercel

### Option A: Via l'interface Vercel

1. Allez sur https://vercel.com et connectez-vous
2. Cliquez sur "Add New Project"
3. Importez votre repository GitHub
4. Configurez les variables d'environnement:
   - `VITE_SUPABASE_URL`: URL de votre projet Supabase
   - `VITE_SUPABASE_ANON_KEY`: Clé anonyme Supabase
   - `VITE_WHATSAPP_NUMBER`: Numéro WhatsApp (ex: 2250503744336)

5. Cliquez sur "Deploy"

### Option B: Via Vercel CLI

1. Installez Vercel CLI:
```bash
npm install -g vercel
```

2. Connectez-vous:
```bash
vercel login
```

3. Déployez:
```bash
vercel
```

4. Configurez les variables d'environnement quand demandé

## Étape 3: Configurer les variables d'environnement sur Vercel

1. Allez dans votre projet sur Vercel
2. Cliquez sur "Settings" > "Environment Variables"
3. Ajoutez les variables suivantes:

| Nom | Valeur |
|-----|--------|
| `VITE_SUPABASE_URL` | https://votre-projet.supabase.co |
| `VITE_SUPABASE_ANON_KEY` | votre-clé-anon-supabase |
| `VITE_WHATSAPP_NUMBER` | 2250503744336 |

## Étape 4: Intégration Supabase sur Vercel (Optionnel)

Pour une intégration plus poussée avec Supabase:

1. Sur Vercel, allez dans "Settings" > "Integrations"
2. Cliquez sur "Supabase"
3. Connectez votre compte Supabase
4. Sélectionnez votre projet
5. Les variables d'environnement seront automatiquement configurées

## Vérification du déploiement

Une fois déployé, votre site sera accessible via:
- `https://votre-projet.vercel.app`

## Déploiements automatiques

Vercel déploiera automatiquement votre site à chaque:
- Push sur la branche `main`
- Pull request vers `main`

## Domaine personnalisé (Optionnel)

Pour utiliser votre propre domaine:

1. Allez dans "Settings" > "Domains"
2. Ajoutez votre domaine
3. Configurez les DNS selon les instructions de Vercel

## Support

- Documentation Vercel: https://vercel.com/docs
- Documentation Supabase: https://supabase.com/docs