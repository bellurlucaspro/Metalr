import type { TranslatedField } from "../types/database";

/**
 * Extract the value for the current language from a TranslatedField.
 * Falls back to French if the requested language is not available.
 */
export function tField(
  field: TranslatedField | string | null | undefined,
  lang: string
): string {
  if (!field) return "";
  // If the DB still stores this field as a plain string, return it directly
  if (typeof field === "string") return field;
  if (typeof field !== "object") return String(field);
  const value = (field as TranslatedField)[lang as keyof TranslatedField];
  if (value) return value;
  return (field as TranslatedField).fr || "";
}

/**
 * Safely convert any DB value to a renderable string.
 * Handles TranslatedField objects, strings, numbers, nulls, etc.
 */
export function safe(value: unknown, lang = "fr"): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "object" && "fr" in (value as Record<string, unknown>)) {
    return tField(value as TranslatedField, lang);
  }
  return String(value);
}

/**
 * Sanitize a raw DB row: any field that is a TranslatedField object
 * but typed as string/number in TypeScript gets converted to its French value.
 * Fields that SHOULD remain as TranslatedField (title, excerpt, content, etc.) are preserved.
 */
export function sanitizeRow<T extends Record<string, unknown>>(
  row: T,
  translatedKeys: string[]
): T {
  const result = { ...row };
  for (const [key, value] of Object.entries(result)) {
    // Skip keys that are supposed to be TranslatedField
    if (translatedKeys.includes(key)) continue;
    // Convert unexpected TranslatedField objects to French string
    if (
      value != null &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      "fr" in (value as Record<string, unknown>)
    ) {
      (result as Record<string, unknown>)[key] = (value as TranslatedField).fr || "";
    }
  }
  return result;
}

/**
 * Create an empty TranslatedField
 */
export function emptyTranslated(): TranslatedField {
  return { fr: "", en: "", zh: "", ar: "" };
}
