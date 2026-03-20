import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const ROUTE_LABELS: Record<string, string> = {
  solutions: "nav.solutions",
  agricole: "nav.agricultural",
  photovoltaique: "nav.photovoltaic",
  industriel: "nav.industrial",
  "ouvrages-art": "nav.civilEngineering",
  "bureau-production": "nav.bureau",
  realisations: "nav.projects",
  implantations: "footer.locations",
  "a-propos": "nav.about",
  contact: "nav.contact",
  actualites: "nav.news",
  documentation: "footer.documentation",
  faq: "seo.faqTitle",
  "mentions-legales": "legalPage.seoTitle",
  "politique-confidentialite": "privacyPage.seoTitle",
  cookies: "cookiesPage.seoTitle",
};

const BASE_URL = "https://metalr.fr";

export function Breadcrumbs() {
  const location = useLocation();
  const { t } = useTranslation();

  const segments = location.pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs = [{ label: t("nav.home"), path: "/" }];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const labelKey = ROUTE_LABELS[segment];
    const label = labelKey ? t(labelKey) : decodeURIComponent(segment);
    crumbs.push({ label, path: currentPath });
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${BASE_URL}${crumb.path}`,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      <nav
        aria-label="Fil d'Ariane"
        className="breadcrumbs-nav"
        style={{
          maxWidth: 1280,
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: 92,
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 0,
          marginBottom: -112,
          position: "relative",
          zIndex: 10,
        }}
      >
        <ol
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            listStyle: "none",
            margin: 0,
            padding: 0,
            fontSize: 13,
            flexWrap: "wrap",
          }}
        >
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <li key={crumb.path} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {index > 0 && (
                  <span style={{ color: "rgba(27,27,27,0.3)", fontSize: 11 }}>/</span>
                )}
                {isLast ? (
                  <span style={{ color: "#E40714", fontWeight: 500 }}>
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    style={{
                      color: "rgba(27,27,27,0.5)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#1A1A1A"; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(27,27,27,0.5)"; }}
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
