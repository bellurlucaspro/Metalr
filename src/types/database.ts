export type TranslatedField = {
  fr: string;
  en: string;
  zh: string;
  ar: string;
};

export interface Category {
  id: string;
  type: "article" | "realisation";
  slug: string;
  label: TranslatedField;
  sort_order: number;
  created_at: string;
}

export interface Article {
  id: string;
  slug: string;
  title: TranslatedField;
  excerpt: TranslatedField;
  content: TranslatedField;
  category: string;
  category_label: TranslatedField;
  badge: TranslatedField;
  date: string;
  image_url: string | null;
  featured: boolean;
  author: string | null;
  read_time: string | null;
  status: "published" | "draft" | "scheduled";
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Realisation {
  id: string;
  slug: string;
  title: TranslatedField;
  category: string;
  category_label: TranslatedField;
  location: TranslatedField;
  description: TranslatedField;
  challenges: TranslatedField[];
  solutions: TranslatedField[];
  year: string | null;
  surface: string | null;
  client: TranslatedField | null;
  duration: TranslatedField | null;
  budget: TranslatedField | null;
  main_image_url: string | null;
  gallery: string[];
  views: number;
  status: "completed" | "ongoing" | "planned";
  created_at: string;
  updated_at: string;
}
