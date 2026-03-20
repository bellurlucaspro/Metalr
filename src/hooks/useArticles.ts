import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { Article } from "../types/database";
import { sanitizeRow } from "../lib/i18n-helpers";

// Fields that should remain as TranslatedField objects
const ARTICLE_TRANSLATED_KEYS = ["title", "excerpt", "content", "category_label", "badge"];

interface UseArticlesOptions {
  category?: string;
  featured?: boolean;
  limit?: number;
  includeUnpublished?: boolean;
}

export function useArticles(options: UseArticlesOptions = {}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    let query = supabase
      .from("articles")
      .select("*")
      .order("date", { ascending: false });

    if (!options.includeUnpublished) {
      query = query.eq("status", "published");
    }
    if (options.category && options.category !== "all") {
      query = query.eq("category", options.category);
    }
    if (options.featured !== undefined) {
      query = query.eq("featured", options.featured);
    }
    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error: err } = await query;

    if (err) {
      setError(err.message);
    } else {
      setArticles(((data as Article[]) || []).map(a => sanitizeRow(a, ARTICLE_TRANSLATED_KEYS) as Article));
    }
    setLoading(false);
  }, [options.category, options.featured, options.limit, options.includeUnpublished]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, loading, error, refetch: fetchArticles };
}

export function useArticle(slug: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchArticle() {
      try {
        setLoading(true);
        const { data, error: err } = await supabase
          .from("articles")
          .select("*")
          .eq("slug", slug)
          .single();

        if (err) {
          setError(err.message);
        } else {
          setArticle(sanitizeRow(data as any, ARTICLE_TRANSLATED_KEYS) as Article);
          // Increment views atomically
          if (data) {
            supabase.rpc("increment_article_views", { article_id: (data as Article).id }).then(() => {});
          }
        }
      } catch (e: any) {
        setError(e?.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  return { article, loading, error };
}
