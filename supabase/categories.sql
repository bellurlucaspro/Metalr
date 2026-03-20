-- ============================================
-- METALR - Categories dynamiques
-- Executez ce script dans l'editeur SQL Supabase
-- ============================================

-- Table categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('article', 'realisation')),
  slug TEXT NOT NULL,
  label JSONB NOT NULL DEFAULT '{"fr":"","en":"","zh":"","ar":""}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(type, slug)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(type);

-- RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories visibles par tous"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Admin peut inserer categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin peut modifier categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin peut supprimer categories"
  ON categories FOR DELETE
  TO authenticated
  USING (true);

-- Retirer les CHECK constraints des tables existantes
ALTER TABLE articles DROP CONSTRAINT IF EXISTS articles_category_check;
ALTER TABLE realisations DROP CONSTRAINT IF EXISTS realisations_category_check;

-- Seed des categories existantes
INSERT INTO categories (type, slug, label, sort_order) VALUES
  ('article', 'innovation', '{"fr":"Innovation","en":"Innovation","zh":"创新","ar":"ابتكار"}', 1),
  ('article', 'projet', '{"fr":"Projet","en":"Project","zh":"项目","ar":"مشروع"}', 2),
  ('article', 'entreprise', '{"fr":"Entreprise","en":"Company","zh":"企业","ar":"شركة"}', 3),
  ('article', 'evenement', '{"fr":"Evenement","en":"Event","zh":"活动","ar":"حدث"}', 4),
  ('realisation', 'agriculture', '{"fr":"Agriculture","en":"Agriculture","zh":"农业","ar":"زراعة"}', 1),
  ('realisation', 'photovoltaique', '{"fr":"Photovoltaique","en":"Photovoltaic","zh":"光伏","ar":"كهروضوئي"}', 2),
  ('realisation', 'industrie', '{"fr":"Industrie","en":"Industry","zh":"工业","ar":"صناعة"}', 3),
  ('realisation', 'ouvrages', '{"fr":"Ouvrages d''art","en":"Civil engineering","zh":"土木工程","ar":"أعمال هندسية"}', 4)
ON CONFLICT (type, slug) DO NOTHING;
