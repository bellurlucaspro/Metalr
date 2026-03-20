import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { Category, TranslatedField } from "../types/database";

export function useCategories(type: "article" | "realisation") {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("type", type)
      .order("sort_order", { ascending: true });

    if (!error && data) {
      setCategories(data as Category[]);
    }
    setLoading(false);
  }, [type]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async (slug: string, label: TranslatedField): Promise<boolean> => {
    const maxOrder = categories.length > 0
      ? Math.max(...categories.map((c) => c.sort_order)) + 1
      : 1;

    const { error } = await supabase.from("categories").insert({
      type,
      slug,
      label,
      sort_order: maxOrder,
    });

    if (error) return false;
    await fetchCategories();
    return true;
  };

  const deleteCategory = async (id: string): Promise<boolean> => {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) return false;
    await fetchCategories();
    return true;
  };

  return { categories, loading, refetch: fetchCategories, addCategory, deleteCategory };
}
