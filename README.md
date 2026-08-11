# Laissa - E-commerce Simple

Site e-commerce simplifié avec système de commande via WhatsApp et base de données Supabase.

## Fonctionnalités

- 🛒 Catalogue de produits avec catégories
- 📱 Commandes via WhatsApp (paiement à la livraison)
- 🌍 Livraison uniquement en Côte d'Ivoire avec sélection de villes
- 💾 Base de données Supabase pour le stockage en ligne
- 🎨 Interface moderne et responsive

## Installation

1. Installer les dépendances:
```bash
npm install
```

2. Configurer l'environnement:
```bash
cp .env.example .env
```

3. Éditer `.env` avec vos informations Supabase:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_WHATSAPP_NUMBER=2250503744336
```

## Démarrage

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## Construction pour la production

```bash
npm run build
npm run preview
```

## Configuration Supabase

Voir [SETUP_ENV.md](./SETUP_ENV.md) pour les instructions détaillées sur la configuration de Supabase.

## Structure du projet

- `src/pages/` - Pages du site (Home, Shop, Checkout, etc.)
- `src/components/` - Composants réutilisables
- `src/store/` - État global (cartStore)
- `src/lib/` - Utilitaires et connexion Supabase
- `src/data/` - Données statiques (produits, catégories)

## Technologies

- React 19
- Vite
- React Router
- Framer Motion
- Supabase
- Zustand (gestion d'état)