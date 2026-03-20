# METALR - Site Vitrine

Site vitrine complet pour METALR (Structures métalliques & Énergies renouvelables) avec design industriel élégant et système de gestion de contenu.

## 🎯 Fonctionnalités principales

### Pages publiques
- **Accueil** : Hero immersif, sections expertise, chiffres clés, processus, certifications
- **Solutions** : 4 secteurs (Agricole, Photovoltaïque, Industriel, Ouvrages d'art)
- **Réalisations** : Galerie de projets avec filtres et pages détaillées
- **Actualités** : Blog d'entreprise avec système de catégories
- **À propos** : Histoire et valeurs de l'entreprise
- **Contact** : Formulaire et informations de contact
- **Implantations** : Carte interactive des sites de production

### Interface Admin
Accessible via `/admin` pour gérer :
- ✅ Articles d'actualité (création, modification, suppression)
- ✅ Réalisations (gestion complète avec métadonnées)
- ✅ Dashboard avec statistiques
- ⚠️ Actuellement en localStorage (données non persistées côté serveur)

## 🎨 Design System

### Charte graphique stricte
- **Rouge primaire** : `#E40714` (CTA, accents)
- **Noir** : `#000000` (titres principaux)
- **Gris industriel** : `#C6C6C6` (fonds clairs)
- **Gris foncé** : `#1B1B1B` (titres secondaires)
- **Blanc** : `#FFFFFF` (textes sur fond foncé)

### Typographie
- **Corps de texte** : Montserrat
- **Titres H1/H2** : Rajdhani (police industrielle, grasse, uppercase)
- Tous les titres utilisent désormais une police plus impactante adaptée au secteur

### Animations
- ✨ Parallaxe et effets de profondeur
- ✨ Fade-in au scroll avec IntersectionObserver
- ✨ Micro-interactions sur tous les éléments cliquables
- ✨ Effets glass/blur sur la navigation
- ✨ Transitions fluides et professionnelles

## 🌐 Multi-langue

Sélecteur intégré pour 4 langues :
- 🇫🇷 Français
- 🇬🇧 English
- 🇨🇳 中文 (Chinois)
- 🇸🇦 العربية (Arabe)

## 📱 Responsive

Design entièrement responsive avec :
- Menu burger sur mobile
- Grilles adaptatives
- Images optimisées
- Navigation tactile

## 🔐 Interface Admin - Guide d'utilisation

### Accès
1. Naviguer vers `/admin`
2. Interface de connexion (à implémenter avec auth)

### Gestion des actualités
1. Cliquer sur l'onglet "Actualités"
2. Bouton "Nouvel article" pour créer
3. Champs disponibles :
   - Titre
   - Catégorie (Entreprise, Innovation, Projet, Événement)
   - Badge (Nouveau, Innovation, En cours, etc.)
   - Image (URL)
   - Excerpt (résumé)
   - Contenu complet
   - Featured (article à la une)

### Gestion des réalisations
1. Onglet "Réalisations"
2. Création avec métadonnées complètes :
   - Titre du projet
   - Catégorie (Agriculture, Photovoltaïque, Industrie, Ouvrages d'art)
   - Localisation
   - Année
   - Surface
   - Images (principale + galerie)
   - Client
   - Budget
   - Défis et solutions

## 🚀 Intégration Supabase (Recommandé)

Pour persister les données côté serveur et permettre une vraie gestion multi-utilisateurs :

### 1. Créer un projet Supabase
```bash
# Aller sur https://supabase.com
# Créer un nouveau projet
```

### 2. Schéma de base de données

```sql
-- Table actualités
CREATE TABLE news_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  badge TEXT,
  date TIMESTAMP DEFAULT NOW(),
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table réalisations
CREATE TABLE realisations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  year TEXT,
  surface TEXT,
  client TEXT,
  duration TEXT,
  budget TEXT,
  image_url TEXT,
  gallery JSONB,
  challenges JSONB,
  solutions JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index pour les recherches
CREATE INDEX idx_news_category ON news_articles(category);
CREATE INDEX idx_news_date ON news_articles(date DESC);
CREATE INDEX idx_realisations_category ON realisations(category);
```

### 3. Configuration dans le code

```typescript
// Dans un fichier lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 4. Exemples d'utilisation

```typescript
// Récupérer les actualités
const { data: news } = await supabase
  .from('news_articles')
  .select('*')
  .order('date', { ascending: false })

// Créer un article
const { data, error } = await supabase
  .from('news_articles')
  .insert([
    {
      title: 'Nouveau projet',
      category: 'Innovation',
      excerpt: 'Description...',
      image_url: 'https://...'
    }
  ])

// Modifier
await supabase
  .from('news_articles')
  .update({ title: 'Nouveau titre' })
  .eq('id', articleId)

// Supprimer
await supabase
  .from('news_articles')
  .delete()
  .eq('id', articleId)
```

## 📄 Structure des fichiers

```
/
├── pages/
│   ├── HomePage.tsx
│   ├── SolutionsPage.tsx
│   ├── ActualitesPage.tsx
│   ├── RealisationsPage.tsx
│   ├── actualites/
│   │   └── ActualiteDetailPage.tsx
│   ├── realisations/
│   │   └── StabulationPage.tsx (+ autres)
│   └── admin/
│       └── AdminDashboard.tsx
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── QuoteBanner.tsx
│   └── ...
└── styles/
    └── globals.css (Rajdhani + Montserrat)
```

## 🎯 Prochaines étapes recommandées

1. **Authentification** : Implémenter Supabase Auth pour l'admin
2. **Upload d'images** : Ajouter Supabase Storage pour les images
3. **SEO** : Ajouter meta tags et Open Graph
4. **Analytics** : Intégrer Google Analytics ou Plausible
5. **Newsletter** : Connecter à un service d'emailing
6. **i18n** : Implémenter la traduction réelle des 4 langues

## 📞 Support

Pour toute question sur la structure ou l'intégration Supabase, consulter la documentation complète du projet.

---

**METALR** - Structures métalliques & Énergies renouvelables depuis 2018
