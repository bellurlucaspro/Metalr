-- ============================================
-- METALR - Schema Supabase
-- Executez ce script dans l'editeur SQL Supabase
-- ============================================

-- Extension pour generer des UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: articles
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title JSONB NOT NULL DEFAULT '{"fr":"","en":"","zh":"","ar":""}',
  excerpt JSONB NOT NULL DEFAULT '{"fr":"","en":"","zh":"","ar":""}',
  content JSONB NOT NULL DEFAULT '{"fr":"","en":"","zh":"","ar":""}',
  category TEXT NOT NULL CHECK (category IN ('innovation','projet','entreprise','evenement')),
  category_label JSONB NOT NULL DEFAULT '{"fr":"","en":"","zh":"","ar":""}',
  badge JSONB NOT NULL DEFAULT '{"fr":"","en":"","zh":"","ar":""}',
  date TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  author TEXT,
  read_time TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published','draft','scheduled')),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TABLE: realisations
-- ============================================
CREATE TABLE IF NOT EXISTS realisations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title JSONB NOT NULL DEFAULT '{"fr":"","en":"","zh":"","ar":""}',
  category TEXT NOT NULL CHECK (category IN ('agriculture','photovoltaique','industrie','ouvrages')),
  category_label JSONB NOT NULL DEFAULT '{"fr":"","en":"","zh":"","ar":""}',
  location JSONB NOT NULL DEFAULT '{"fr":"","en":"","zh":"","ar":""}',
  description JSONB NOT NULL DEFAULT '{"fr":"","en":"","zh":"","ar":""}',
  challenges JSONB DEFAULT '[]',
  solutions JSONB DEFAULT '[]',
  year TEXT,
  surface TEXT,
  client TEXT,
  duration TEXT,
  budget TEXT,
  main_image_url TEXT,
  gallery JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed','ongoing','planned')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- INDEX pour les requetes frequentes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_realisations_category ON realisations(category);
CREATE INDEX IF NOT EXISTS idx_realisations_slug ON realisations(slug);

-- ============================================
-- TRIGGER: updated_at automatique
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER realisations_updated_at
  BEFORE UPDATE ON realisations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- RLS (Row Level Security)
-- ============================================

-- Activer RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE realisations ENABLE ROW LEVEL SECURITY;

-- Lecture publique : articles publies uniquement
CREATE POLICY "Articles publies visibles par tous"
  ON articles FOR SELECT
  USING (status = 'published');

-- Lecture publique : toutes les realisations
CREATE POLICY "Realisations visibles par tous"
  ON realisations FOR SELECT
  USING (true);

-- Admin : lecture complete (y compris brouillons)
CREATE POLICY "Admin peut tout lire articles"
  ON articles FOR SELECT
  TO authenticated
  USING (true);

-- Admin : insertion articles
CREATE POLICY "Admin peut inserer articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Admin : mise a jour articles
CREATE POLICY "Admin peut modifier articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admin : suppression articles
CREATE POLICY "Admin peut supprimer articles"
  ON articles FOR DELETE
  TO authenticated
  USING (true);

-- Admin : CRUD realisations
CREATE POLICY "Admin peut inserer realisations"
  ON realisations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin peut modifier realisations"
  ON realisations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin peut supprimer realisations"
  ON realisations FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- STORAGE: Bucket media (images)
-- ============================================
-- Executez ceci dans l'editeur SQL ou creez le bucket via l'interface Storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Politique: lecture publique des images
CREATE POLICY "Images publiques"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

-- Politique: upload pour les utilisateurs authentifies
CREATE POLICY "Admin peut uploader"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media');

-- Politique: suppression pour les utilisateurs authentifies
CREATE POLICY "Admin peut supprimer images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media');
