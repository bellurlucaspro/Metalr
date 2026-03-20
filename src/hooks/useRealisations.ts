import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { Realisation, TranslatedField } from "../types/database";
import { sanitizeRow } from "../lib/i18n-helpers";

// Fields that should remain as TranslatedField objects
const REALISATION_TRANSLATED_KEYS = ["title", "category_label", "location", "description", "challenges", "solutions", "client", "duration", "budget"];

/** Wrap a plain string (or null) into a TranslatedField if needed */
function ensureTranslated(val: unknown): TranslatedField | null {
  if (!val) return null;
  if (typeof val === "string") return { fr: val, en: "", zh: "", ar: "" };
  return val as TranslatedField;
}

/** Normalize a raw DB row so client/duration/budget are always TranslatedField,
 *  and any other unexpected JSONB fields are flattened to strings */
function normalizeRealisation(raw: Record<string, unknown>): Realisation {
  const sanitized = sanitizeRow(raw, REALISATION_TRANSLATED_KEYS);
  return {
    ...sanitized,
    client: ensureTranslated(sanitized.client),
    duration: ensureTranslated(sanitized.duration),
    budget: ensureTranslated(sanitized.budget),
  } as Realisation;
}

interface UseRealisationsOptions {
  category?: string;
  limit?: number;
}

export function useRealisations(options: UseRealisationsOptions = {}) {
  const [realisations, setRealisations] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRealisations = useCallback(async () => {
    setLoading(true);
    setError(null);

    let query = supabase
      .from("realisations")
      .select("*")
      .order("year", { ascending: false });

    if (options.category && options.category !== "all") {
      query = query.eq("category", options.category);
    }
    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error: err } = await query;

    if (err) {
      setError(err.message);
    } else {
      setRealisations((data || []).map((r: any) => normalizeRealisation(r)));
    }
    setLoading(false);
  }, [options.category, options.limit]);

  useEffect(() => {
    fetchRealisations();
  }, [fetchRealisations]);

  return { realisations, loading, error, refetch: fetchRealisations };
}

export function useRealisation(slug: string) {
  const [realisation, setRealisation] = useState<Realisation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchRealisation() {
      try {
        setLoading(true);
        const { data, error: err } = await supabase
          .from("realisations")
          .select("*")
          .eq("slug", slug)
          .single();

        if (err) {
          setError(err.message);
        } else {
          setRealisation(normalizeRealisation(data as any));
          // Increment views atomically
          if (data) {
            supabase.rpc("increment_realisation_views", { realisation_id: (data as any).id }).then(() => {});
          }
        }
      } catch (e: any) {
        setError(e?.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    }

    fetchRealisation();
  }, [slug]);

  return { realisation, loading, error };
}
