import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
  schema?: Record<string, unknown>;
}

const SITE_NAME = "METALR";
const BASE_URL = "https://metalr.fr";
const DEFAULT_IMAGE = "/images/MetalR_bonlogo.webp";

const LOCALE_MAP: Record<string, string> = {
  fr: "fr_FR",
  en: "en_US",
  zh: "zh_CN",
  ar: "ar_SA",
};

export default function SEOHead({
  title,
  description,
  path = "",
  image,
  type = "website",
  schema,
}: SEOHeadProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isHome = title === t("nav.home");
  const fullTitle = isHome ? t("seo.homeTitle") : `${title} | ${SITE_NAME}`;
  const url = `${BASE_URL}${path}`;
  const ogImage = image || `${BASE_URL}${DEFAULT_IMAGE}`;
  const ogLocale = LOCALE_MAP[lang] || "fr_FR";

  return (
    <Helmet>
      <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
