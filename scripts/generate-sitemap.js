/**
 * Sitemap generator — run after build to include dynamic article/realisation pages.
 * Usage: node scripts/generate-sitemap.js
 *
 * Reads VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from .env
 */
import { createClient } from "@supabase/supabase-js";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Simple .env parser (avoids dotenv dependency)
function loadEnv() {
  const envPath = resolve(__dirname, "../.env");
  if (!existsSync(envPath)) return;
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const match = line.match(/^\s*([\w.]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const [, key, rawVal] = match;
      process.env[key] = (rawVal || "").replace(/^["']|["']$/g, "");
    }
  }
}

loadEnv();

const SITE_URL = "https://metalr.fr";
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠ Supabase credentials missing — generating static sitemap only.");
}

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Static pages with priorities
const today = new Date().toISOString().split("T")[0];
const staticPages = [
  { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
  { path: "/solutions", changefreq: "monthly", priority: "0.9", lastmod: today },
  { path: "/solutions/agricole", changefreq: "monthly", priority: "0.8", lastmod: today },
  { path: "/solutions/photovoltaique", changefreq: "monthly", priority: "0.8", lastmod: today },
  { path: "/solutions/industriel", changefreq: "monthly", priority: "0.8", lastmod: today },
  { path: "/solutions/ouvrages-art", changefreq: "monthly", priority: "0.8", lastmod: today },
  { path: "/bureau-production", changefreq: "monthly", priority: "0.7", lastmod: today },
  { path: "/realisations", changefreq: "weekly", priority: "0.8", lastmod: today },
  { path: "/implantations", changefreq: "monthly", priority: "0.7", lastmod: today },
  { path: "/a-propos", changefreq: "monthly", priority: "0.7", lastmod: today },
  { path: "/contact", changefreq: "monthly", priority: "0.7", lastmod: today },
  { path: "/actualites", changefreq: "weekly", priority: "0.7", lastmod: today },
  { path: "/faq", changefreq: "monthly", priority: "0.6", lastmod: today },
  { path: "/documentation", changefreq: "monthly", priority: "0.5", lastmod: today },
  { path: "/mentions-legales", changefreq: "yearly", priority: "0.3", lastmod: today },
  { path: "/politique-confidentialite", changefreq: "yearly", priority: "0.3", lastmod: today },
  { path: "/cookies", changefreq: "yearly", priority: "0.3", lastmod: today },
];

async function fetchDynamicPages() {
  if (!supabase) return [];
  const pages = [];

  // Fetch published articles
  const { data: articles } = await supabase
    .from("articles")
    .select("slug, updated_at")
    .eq("status", "published");

  if (articles) {
    for (const a of articles) {
      pages.push({
        path: `/actualites/${a.slug}`,
        changefreq: "monthly",
        priority: "0.6",
        lastmod: a.updated_at ? new Date(a.updated_at).toISOString().split("T")[0] : undefined,
      });
    }
  }

  // Fetch realisations
  const { data: realisations } = await supabase
    .from("realisations")
    .select("slug, updated_at");

  if (realisations) {
    for (const r of realisations) {
      pages.push({
        path: `/realisations/${r.slug}`,
        changefreq: "monthly",
        priority: "0.6",
        lastmod: r.updated_at ? new Date(r.updated_at).toISOString().split("T")[0] : undefined,
      });
    }
  }

  return pages;
}

function buildSitemap(pages) {
  const urls = pages
    .map(
      (p) =>
        `  <url>
    <loc>${SITE_URL}${p.path}</loc>${p.lastmod ? `\n    <lastmod>${p.lastmod}</lastmod>` : ""}
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function main() {
  console.log("🗺  Generating sitemap...");
  const dynamicPages = await fetchDynamicPages();
  const allPages = [...staticPages, ...dynamicPages];
  const sitemap = buildSitemap(allPages);

  const outPath = resolve(__dirname, "../dist/sitemap.xml");
  const publicPath = resolve(__dirname, "../public/sitemap.xml");

  // Write to public (for dev) and dist (for production)
  writeFileSync(publicPath, sitemap, "utf-8");
  try {
    writeFileSync(outPath, sitemap, "utf-8");
  } catch {
    // dist may not exist yet
  }

  console.log(`✅ Sitemap generated with ${allPages.length} URLs (${dynamicPages.length} dynamic)`);

  // Ping search engines
  const pingUrls = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`,
  ];

  for (const url of pingUrls) {
    try {
      await fetch(url);
      console.log(`📡 Pinged: ${url.split("?")[0]}`);
    } catch {
      console.warn(`⚠ Failed to ping: ${url.split("?")[0]}`);
    }
  }
}

main().catch(console.error);
