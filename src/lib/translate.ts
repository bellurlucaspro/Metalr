import type { TranslatedField } from "../types/database";

const LANG_PAIRS: Record<string, string> = {
  en: "fr|en",
  zh: "fr|zh-CN",
  ar: "fr|ar",
};

const MAX_CHUNK_CHARS = 1800;

/**
 * Split text into chunks at sentence boundaries, respecting a max character limit.
 */
function chunkText(text: string, maxChars = MAX_CHUNK_CHARS): string[] {
  if (text.length <= maxChars) return [text];

  const sentences = text.match(/[^.!?]+[.!?]+\s*/g);
  if (!sentences) return [text];

  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if (current.length + sentence.length > maxChars && current.length > 0) {
      chunks.push(current.trim());
      current = "";
    }
    current += sentence;
  }
  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks.length > 0 ? chunks : [text];
}

/**
 * Translate a single chunk via MyMemory API.
 */
async function translateChunk(text: string, langPair: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}&de=metalr@metalr.com`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[translate] HTTP ${res.status} for chunk: "${text.slice(0, 60)}..."`);
      return text;
    }
    const data = await res.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      let translated = data.responseData.translatedText as string;

      if (translated === translated.toUpperCase() && text !== text.toUpperCase() && text.length > 3) {
        translated = translated.charAt(0).toUpperCase() + translated.slice(1).toLowerCase();
      }

      return translated;
    }

    console.warn(`[translate] API status ${data.responseStatus}: ${data.responseDetails || "unknown error"}`);
    return text;
  } catch (err) {
    console.error(`[translate] Network error:`, err);
    return text;
  }
}

/**
 * Translate plain text from French to a target language.
 * Handles long texts by splitting into sentence-based chunks (translated in parallel).
 */
async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text.trim()) return "";
  const pair = LANG_PAIRS[targetLang];
  if (!pair) return text;

  const chunks = chunkText(text);
  // Translate all chunks in parallel
  const translatedChunks = await Promise.all(
    chunks.map((chunk) => translateChunk(chunk, pair))
  );

  return translatedChunks.join(" ");
}

/**
 * Translate HTML content, preserving all tags and structure.
 * Merges adjacent small text segments to reduce API calls,
 * then translates all segments in parallel.
 */
async function translateContent(html: string, targetLang: string): Promise<string> {
  if (!html.trim()) return "";

  if (!/<[^>]+>/.test(html)) {
    return translateText(html, targetLang);
  }

  const pair = LANG_PAIRS[targetLang];
  if (!pair) return html;

  // Split HTML into tag/text segments
  const parts = html.split(/(<[^>]+>)/g);

  // Collect text segments with their indices for parallel translation
  const textJobs: { index: number; text: string }[] = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part.startsWith("<") && part.trim()) {
      textJobs.push({ index: i, text: part });
    }
  }

  // Translate all text segments in parallel
  const translated = await Promise.all(
    textJobs.map(async (job) => {
      const chunks = chunkText(job.text);
      const results = await Promise.all(
        chunks.map((c) => translateChunk(c, pair))
      );
      return { index: job.index, text: results.join(" ") };
    })
  );

  // Reassemble
  const result = [...parts];
  for (const t of translated) {
    result[t.index] = t.text;
  }

  return result.join("");
}

/**
 * Auto-translate a TranslatedField from French to all 3 target languages in parallel.
 */
export async function autoTranslateField(
  field: TranslatedField,
  isHtml = false
): Promise<TranslatedField> {
  const frText = field.fr;
  if (!frText.trim()) return field;

  const translateFn = isHtml ? translateContent : translateText;

  // All 3 languages in parallel
  const [en, zh, ar] = await Promise.all([
    field.en?.trim() ? Promise.resolve(field.en) : translateFn(frText, "en"),
    field.zh?.trim() ? Promise.resolve(field.zh) : translateFn(frText, "zh"),
    field.ar?.trim() ? Promise.resolve(field.ar) : translateFn(frText, "ar"),
  ]);

  return { fr: frText, en, zh, ar };
}

/**
 * Auto-translate all TranslatedField fields of an article or realisation.
 * Set `force` to true to overwrite all translations from French.
 */
export async function autoTranslateObject<T extends Record<string, unknown>>(
  obj: T,
  translatedFields: string[],
  htmlFields: string[] = [],
  force = false
): Promise<T> {
  const result = { ...obj };

  // Build list of fields that need translation
  const jobs: { field: string; isHtml: boolean; value: TranslatedField }[] = [];

  for (const field of translatedFields) {
    const value = (obj as any)[field];
    if (!value || typeof value !== "object" || !value.fr) continue;

    const fieldValue = value as TranslatedField;
    const needsTranslation = force ||
      !fieldValue.en?.trim() ||
      !fieldValue.zh?.trim() ||
      !fieldValue.ar?.trim();

    if (needsTranslation) {
      const toTranslate = force
        ? { ...fieldValue, en: "", zh: "", ar: "" }
        : fieldValue;
      jobs.push({ field, isHtml: htmlFields.includes(field), value: toTranslate });
    }
  }

  // Translate all fields in parallel
  const results = await Promise.all(
    jobs.map(async (job) => ({
      field: job.field,
      translated: await autoTranslateField(job.value, job.isHtml),
    }))
  );

  for (const r of results) {
    (result as any)[r.field] = r.translated;
  }

  // Handle arrays of TranslatedField (challenges, solutions) in parallel
  for (const field of ["challenges", "solutions"]) {
    const arr = (obj as any)[field];
    if (!Array.isArray(arr)) continue;

    const translatedArr = await Promise.all(
      arr.map(async (item: TranslatedField) => {
        if (!item?.fr?.trim()) return item;
        const needsTranslation = force ||
          !item.en?.trim() ||
          !item.zh?.trim() ||
          !item.ar?.trim();
        if (needsTranslation) {
          const toTranslate = force
            ? { ...item, en: "", zh: "", ar: "" }
            : item;
          return autoTranslateField(toTranslate);
        }
        return item;
      })
    );
    (result as any)[field] = translatedArr;
  }

  return result;
}

/** Fields that are TranslatedField in articles */
export const ARTICLE_TRANSLATED_FIELDS = [
  "title", "excerpt", "content", "category_label", "badge",
];

/** Fields that contain HTML in articles */
export const ARTICLE_HTML_FIELDS = ["content"];

/** Fields that are TranslatedField in realisations */
export const REALISATION_TRANSLATED_FIELDS = [
  "title", "location", "description", "category_label", "client", "duration", "budget",
];

/** Fields that contain HTML in realisations */
export const REALISATION_HTML_FIELDS = ["description"];
