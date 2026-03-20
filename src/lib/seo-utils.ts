const SITE_URL = "https://metalr.fr";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

/**
 * Ping Google and Bing to notify them of sitemap updates.
 * Called after publishing/updating an article or realisation.
 */
export async function pingSearchEngines(): Promise<void> {
  const urls = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  ];

  await Promise.allSettled(
    urls.map((url) =>
      fetch(url, { mode: "no-cors" }).catch(() => {
        // Silent fail — search engine pings are best-effort
      })
    )
  );
}

/**
 * Request indexing for a specific URL via Google's indexing ping.
 * For SPAs, this triggers a re-crawl of the sitemap.
 */
export async function requestIndexing(path: string): Promise<void> {
  await pingSearchEngines();
}
