import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Factory, Building2, Wrench, TrendingUp, ArrowRight, Download } from "lucide-react";
import { generateIndustrielPDF } from "../lib/generateIndustrielPDF";
import { useRealisations } from "../hooks/useRealisations";
import { tField } from "../lib/i18n-helpers";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import SEOHead from "../components/SEOHead";
import { MiniFAQ } from "../components/MiniFAQ";

export default function IndustrielPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { realisations, loading: realisationsLoading } = useRealisations({ category: "industrie" });

  const solutions = [
    { title: t("industriel.sol1Title"), description: t("industriel.sol1Desc") },
    { title: t("industriel.sol2Title"), description: t("industriel.sol2Desc") },
    { title: t("industriel.sol3Title"), description: t("industriel.sol3Desc") },
    { title: t("industriel.sol4Title"), description: t("industriel.sol4Desc") },
    { title: t("industriel.sol5Title"), description: t("industriel.sol5Desc") },
    { title: t("industriel.sol6Title"), description: t("industriel.sol6Desc") },
  ];

  const advantages = [
    { title: t("industriel.adv1Title"), description: t("industriel.adv1Desc") },
    { title: t("industriel.adv2Title"), description: t("industriel.adv2Desc") },
    { title: t("industriel.adv3Title"), description: t("industriel.adv3Desc") },
    { title: t("industriel.adv4Title"), description: t("industriel.adv4Desc") },
    { title: t("industriel.adv5Title"), description: t("industriel.adv5Desc") },
    { title: t("industriel.adv6Title"), description: t("industriel.adv6Desc") },
  ];

  const process = [
    { title: t("industriel.proc1Title"), description: t("industriel.proc1Desc") },
    { title: t("industriel.proc2Title"), description: t("industriel.proc2Desc") },
    { title: t("industriel.proc3Title"), description: t("industriel.proc3Desc") },
    { title: t("industriel.proc4Title"), description: t("industriel.proc4Desc") },
    { title: t("industriel.proc5Title"), description: t("industriel.proc5Desc") },
    { title: t("industriel.proc6Title"), description: t("industriel.proc6Desc") },
  ];

  const capacities = [
    { title: t("industriel.cap1Title"), value: t("industriel.cap1Value") },
    { title: t("industriel.cap2Title"), value: t("industriel.cap2Value") },
    { title: t("industriel.cap3Title"), value: t("industriel.cap3Value") },
  ];

  return (
    <>
      <SEOHead
        title={t("seo.industrielTitle")}
        description={t("seo.industrielDesc")}
        path="/solutions/industriel"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Construction de bâtiments industriels métalliques",
          "provider": { "@type": "Organization", "name": "METALR", "url": "https://metalr.fr" },
          "description": "Construction clé en main de bâtiments industriels en charpente métallique : halls de production, entrepôts logistiques, mezzanines, extensions et rénovations. Certifié EN 1090.",
          "areaServed": { "@type": "Country", "name": "France" },
          "serviceType": "Construction métallique industrielle",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Bâtiments industriels",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Halls industriels" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Entrepôts et plateformes logistiques" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mezzanines et extensions" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Rénovation de bâtiments industriels" } }
            ]
          }
        }}
      />
      <div className="pt-32 pb-20">
      <section className="relative h-[60vh] mb-20 overflow-hidden rounded-3xl max-w-7xl mx-auto">
        <img
          src="/images/IMG_0879.webp"
          alt="Industriel"
          className="w-full h-full object-cover"
          width={1200}
          height={800}
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/80 via-[#212121]/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-[56px] text-white mb-4" style={{ fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em" }}>{t("industriel.heroTitle")}</h1>
              <p className="text-white/70 text-[18px] leading-relaxed">
                {t("industriel.heroSubtitle")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section ref={ref} style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 48 }}
          >
            <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 20 }} />
            <h2 style={{ fontSize: 42, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.01em", marginBottom: 12 }}>
              {t("industriel.solutionsTitle")}
            </h2>
            <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 15, lineHeight: 1.7, maxWidth: 600 }}>
              {t("industriel.solutionsSubtitle")}
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {solutions.map((sol, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                style={{
                  background: "#F7F7F8",
                  borderRadius: 20,
                  padding: "32px 28px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  minHeight: 160,
                }}
              >
                <div style={{ fontSize: 48, fontWeight: 700, color: "#E40714", fontFamily: "'Rajdhani', sans-serif", lineHeight: 1, marginBottom: 16 }}>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1A1A1A", marginBottom: 8 }}>{sol.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(27,27,27,0.5)", lineHeight: 1.6 }}>{sol.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capacités */}
      <section style={{ padding: "60px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "#1A1A1A",
              borderRadius: 20,
              padding: "48px 56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {capacities.map((cap, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#E40714", fontFamily: "'Rajdhani', sans-serif", lineHeight: 1.2, whiteSpace: "nowrap" }}>
                    {cap.value}
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 10 }}>
                    {cap.title}
                  </p>
                </div>
                {index < capacities.length - 1 && (
                  <div style={{ width: 1, height: 48, backgroundColor: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Avantages — bande sombre 2 colonnes */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 48 }}
          >
            <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 20 }} />
            <h2 style={{ fontSize: 42, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.01em", marginBottom: 12 }}>
              {t("industriel.advantagesTitle")}
            </h2>
            <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 15, lineHeight: 1.7, maxWidth: 600 }}>
              {t("industriel.advantagesSubtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "#1A1A1A",
              borderRadius: 24,
              padding: "56px 48px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 64px",
            }}
          >
            {advantages.map((adv, index) => (
              <div
                key={index}
                style={{
                  padding: "20px 0",
                  borderBottom: (index < 4) ? "1px solid rgba(255,255,255,0.06)" : "none",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <span style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#E40714",
                  fontFamily: "'Rajdhani', sans-serif",
                  letterSpacing: "0.05em",
                  flexShrink: 0,
                  marginTop: 2,
                }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{adv.title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>{adv.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Processus — timeline horizontale */}
      <section style={{ padding: "80px 0", background: "#F7F7F8" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 48 }}
          >
            <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 20 }} />
            <h2 style={{ fontSize: 42, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.01em", marginBottom: 12 }}>
              {t("industriel.processTitle")}
            </h2>
            <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 15, lineHeight: 1.7, maxWidth: 600 }}>
              {t("industriel.processSubtitle")}
            </p>
          </motion.div>

          {/* Timeline line + steps */}
          <div style={{ position: "relative" }}>
            {/* Horizontal line */}
            <div style={{ position: "absolute", top: 20, left: 20, right: 20, height: 2, backgroundColor: "rgba(0,0,0,0.06)" }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                  style={{ position: "relative", textAlign: "center" }}
                >
                  {/* Dot */}
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#E40714",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "'Rajdhani', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    position: "relative",
                    zIndex: 2,
                  }}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A", marginBottom: 6 }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(27,27,27,0.5)", lineHeight: 1.5 }}>{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Réalisations */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 48 }}
          >
            <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 20 }} />
            <h2 style={{ fontSize: 42, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.01em" }}>
              {t("projects.title")}
            </h2>
          </motion.div>

          {realisationsLoading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
              <div className="w-8 h-8 border-3 border-[#E40714] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : realisations.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {realisations.map((project, index) => (
                <Link key={project.id} to={`/realisations/${project.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                    viewport={{ once: true }}
                    style={{
                      background: "#F7F7F8",
                      borderRadius: 20,
                      overflow: "hidden",
                      border: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <div style={{ height: 220, overflow: "hidden" }}>
                      <ImageWithFallback
                        src={project.main_image_url || ""}
                        alt={tField(project.title, lang)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div style={{ padding: "20px 24px" }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1A1A1A", marginBottom: 4 }}>{tField(project.title, lang)}</h3>
                      <p style={{ fontSize: 13, color: "rgba(27,27,27,0.5)" }}>{tField(project.location, lang)}</p>
                      {project.year && <p style={{ fontSize: 13, color: "#E40714", marginTop: 4 }}>{project.year}</p>}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "rgba(27,27,27,0.5)", padding: "48px 0" }}>{t("projects.noResults")}</p>
          )}

          <div style={{ marginTop: 40 }}>
            <Link to="/realisations">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: "#E40714",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "16px 28px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {t("projects.viewAll")}
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mini-FAQ SEO */}
      <MiniFAQ
        title={t("industriel.miniFaqTitle")}
        items={[
          { q: t("industriel.miniFaq1Q"), a: t("industriel.miniFaq1A") },
          { q: t("industriel.miniFaq2Q"), a: t("industriel.miniFaq2A") },
          { q: t("industriel.miniFaq3Q"), a: t("industriel.miniFaq3A") },
        ]}
      />

      {/* Solutions associées — maillage interne */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 48 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link to="/solutions/photovoltaique" style={{ textDecoration: "none" }}>
            <span style={{ display: "inline-block", padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#F7F7F8", color: "#1A1A1A", fontSize: 14, fontWeight: 500 }}>
              Structures photovoltaïques
            </span>
          </Link>
          <Link to="/solutions/agricole" style={{ textDecoration: "none" }}>
            <span style={{ display: "inline-block", padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#F7F7F8", color: "#1A1A1A", fontSize: 14, fontWeight: 500 }}>
              Bâtiments agricoles
            </span>
          </Link>
          <Link to="/bureau-production" style={{ textDecoration: "none" }}>
            <span style={{ display: "inline-block", padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#F7F7F8", color: "#1A1A1A", fontSize: 14, fontWeight: 500 }}>
              Notre bureau d'études intégré
            </span>
          </Link>
          <Link to="/realisations" style={{ textDecoration: "none" }}>
            <span style={{ display: "inline-block", padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#F7F7F8", color: "#1A1A1A", fontSize: 14, fontWeight: 500 }}>
              Toutes nos réalisations
            </span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "#1A1A1A",
              borderRadius: 20,
              padding: "48px 48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 40,
            }}
          >
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                {t("industriel.ctaTitle")}
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                {t("industriel.ctaDesc")}
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    backgroundColor: "#E40714",
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    padding: "16px 28px",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {t("industriel.ctaBtn")}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8h14M8 1l7 7-7 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              </Link>
              <motion.button
                onClick={() => generateIndustrielPDF()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 12,
                  padding: "16px 28px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {t("common.downloadPDF")}
                <Download size={16} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
