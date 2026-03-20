import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Landmark, ArrowRight, Download } from "lucide-react";
import { useRealisations } from "../hooks/useRealisations";
import { tField } from "../lib/i18n-helpers";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import SEOHead from "../components/SEOHead";
import { MiniFAQ } from "../components/MiniFAQ";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function OuvragesArtPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { realisations, loading: realisationsLoading } = useRealisations({ category: "ouvrages" });

  const typologies = [
    { num: "01", title: t("ouvragesArt.typ1Title"), desc: t("ouvragesArt.typ1Desc") },
    { num: "02", title: t("ouvragesArt.typ2Title"), desc: t("ouvragesArt.typ2Desc") },
    { num: "03", title: t("ouvragesArt.typ3Title"), desc: t("ouvragesArt.typ3Desc") },
    { num: "04", title: t("ouvragesArt.typ4Title"), desc: t("ouvragesArt.typ4Desc") },
    { num: "05", title: t("ouvragesArt.typ5Title"), desc: t("ouvragesArt.typ5Desc") },
    { num: "06", title: t("ouvragesArt.typ6Title"), desc: t("ouvragesArt.typ6Desc") },
  ];

  const expertise = [
    { title: t("ouvragesArt.exp1Title"), desc: t("ouvragesArt.exp1Desc") },
    { title: t("ouvragesArt.exp2Title"), desc: t("ouvragesArt.exp2Desc") },
    { title: t("ouvragesArt.exp3Title"), desc: t("ouvragesArt.exp3Desc") },
    { title: t("ouvragesArt.exp4Title"), desc: t("ouvragesArt.exp4Desc") },
    { title: t("ouvragesArt.exp5Title"), desc: t("ouvragesArt.exp5Desc") },
    { title: t("ouvragesArt.exp6Title"), desc: t("ouvragesArt.exp6Desc") },
  ];

  const chiffres = [
    { value: t("ouvragesArt.ch1Value"), label: t("ouvragesArt.ch1Label") },
    { value: t("ouvragesArt.ch2Value"), label: t("ouvragesArt.ch2Label") },
    { value: t("ouvragesArt.ch3Value"), label: t("ouvragesArt.ch3Label") },
    { value: t("ouvragesArt.ch4Value"), label: t("ouvragesArt.ch4Label") },
  ];

  return (
    <>
      <SEOHead
        title={t("seo.ouvragesArtTitle")}
        description={t("seo.ouvragesArtDesc")}
        path="/solutions/ouvrages-art"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Ouvrages d'art et génie civil métalliques",
          "provider": { "@type": "Organization", "name": "METALR", "url": "https://metalr.fr" },
          "description": "Conception et construction d'ouvrages d'art en charpente métallique : passerelles piétonnes, ponts métalliques, tabliers, structures de génie civil. Certification EN 1090 EXC3.",
          "areaServed": { "@type": "Country", "name": "France" },
          "serviceType": "Ouvrages d'art métalliques",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Ouvrages d'art",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Passerelles piétonnes et cyclables" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ponts et tabliers métalliques" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Charpentes complexes" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Réhabilitation d'ouvrages" } }
            ]
          }
        }}
      />
      <div className="pt-32 pb-20">

        {/* Hero */}
        <section className="relative h-[60vh] mb-20 overflow-hidden rounded-3xl max-w-7xl mx-auto">
          <img
            src="/images/pontafriquesud.webp"
            alt="Ouvrages d'art"
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
                transition={{ duration: 0.8, ease: EASE }}
                className="max-w-2xl"
              >
                <h1 className="text-[56px] text-white mb-4" style={{ fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em" }}>{t("ouvragesArt.heroTitle")}</h1>
                <p className="text-white/70 text-[18px] leading-relaxed">
                  {t("ouvragesArt.heroSubtitle")}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Typologies — Numbered card grid */}
        <section ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginBottom: 48 }}
          >
            <motion.div
              style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 24, transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            />
            <h2 style={{ fontSize: 42, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.1, marginBottom: 12 }}>
              {t("ouvragesArt.typologiesTitle")}
            </h2>
            <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 15, lineHeight: 1.7, maxWidth: 600 }}>
              {t("ouvragesArt.typologiesSubtitle")}
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {typologies.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                style={{
                  backgroundColor: "#F7F7F8",
                  borderRadius: 20,
                  padding: "32px 28px",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <span style={{ fontSize: 48, fontWeight: 700, color: "#E40714", fontFamily: "'Rajdhani', sans-serif", lineHeight: 1 }}>
                  {item.num}
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A", marginTop: 16, marginBottom: 8 }}>
                  {item.title}
                </h3>
                <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 14, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats — Inline with vertical separators */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            viewport={{ once: true }}
            style={{ marginBottom: 40 }}
          >
            <motion.div
              style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 24, transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            />
            <h2 style={{ fontSize: 42, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.1 }}>
              {t("ouvragesArt.chiffresTitle")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ display: "flex", alignItems: "center", gap: 0 }}
          >
            {chiffres.map((ch, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && (
                  <div style={{ width: 1, height: 48, backgroundColor: "rgba(0,0,0,0.1)", margin: "0 48px" }} />
                )}
                <div>
                  <span style={{ fontSize: 42, fontWeight: 700, color: "#E40714", fontFamily: "'Rajdhani', sans-serif", lineHeight: 1 }}>
                    {ch.value}
                  </span>
                  <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 14, marginTop: 4 }}>
                    {ch.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Expertise — Dark band with 2-column layout + horizontal separators */}
        <section style={{ backgroundColor: "#1A1A1A", borderRadius: 24, maxWidth: 1280, margin: "0 auto 80px", padding: "56px 48px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            viewport={{ once: true }}
            style={{ marginBottom: 48 }}
          >
            <motion.div
              style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 24, transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            />
            <h2 style={{ fontSize: 42, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, marginBottom: 12 }}>
              {t("ouvragesArt.expertiseTitle")}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.7, maxWidth: 600 }}>
              {t("ouvragesArt.expertiseSubtitle")}
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 0 }}>
            {/* Left column */}
            <div>
              {expertise.slice(0, 3).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                  viewport={{ once: true }}
                  style={{
                    padding: "24px 32px 24px 0",
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{ width: 3, height: 32, backgroundColor: "#E40714", borderRadius: 2, flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 600, color: "#FFFFFF", marginBottom: 6 }}>
                        {item.title}
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Vertical separator */}
            <div style={{ backgroundColor: "rgba(255,255,255,0.1)", margin: "0 0" }} />

            {/* Right column */}
            <div>
              {expertise.slice(3, 6).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (i + 3) * 0.1, ease: EASE }}
                  viewport={{ once: true }}
                  style={{
                    padding: "24px 0 24px 32px",
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{ width: 3, height: 32, backgroundColor: "#E40714", borderRadius: 2, flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 600, color: "#FFFFFF", marginBottom: 6 }}>
                        {item.title}
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Réalisations */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            viewport={{ once: true }}
            style={{ marginBottom: 48 }}
          >
            <motion.div
              style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 24, transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            />
            <h2 style={{ fontSize: 42, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.1 }}>
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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
                    viewport={{ once: true }}
                    style={{
                      backgroundColor: "#F7F7F8",
                      borderRadius: 20,
                      overflow: "hidden",
                      border: "1px solid rgba(0,0,0,0.06)",
                      cursor: "pointer",
                    }}
                    className="group"
                  >
                    <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
                      <ImageWithFallback
                        src={project.main_image_url || ""}
                        alt={tField(project.title, lang)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
                    </div>
                    <div style={{ padding: "20px 24px" }}>
                      <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A", marginBottom: 4 }}>{tField(project.title, lang)}</h3>
                      <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 13 }}>{tField(project.location, lang)}</p>
                      {project.year && <p style={{ color: "#E40714", fontSize: 13, marginTop: 4 }}>{project.year}</p>}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "rgba(27,27,27,0.4)", padding: "48px 0" }}>{t("projects.noResults")}</p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            viewport={{ once: true }}
            style={{ marginTop: 40 }}
          >
            <Link to="/realisations">
              <motion.button
                style={{
                  backgroundColor: "#E40714",
                  color: "#FFFFFF",
                  padding: "14px 28px",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>{t("projects.viewAll")}</span>
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </section>

        {/* Mini-FAQ SEO */}
        <MiniFAQ
          title={t("ouvragesArt.miniFaqTitle")}
          items={[
            { q: t("ouvragesArt.miniFaq1Q"), a: t("ouvragesArt.miniFaq1A") },
            { q: t("ouvragesArt.miniFaq2Q"), a: t("ouvragesArt.miniFaq2A") },
            { q: t("ouvragesArt.miniFaq3Q"), a: t("ouvragesArt.miniFaq3A") },
          ]}
        />

        {/* Solutions associées — maillage interne */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 48 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link to="/solutions/industriel" style={{ textDecoration: "none" }}>
              <span style={{ display: "inline-block", padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#F7F7F8", color: "#1A1A1A", fontSize: 14, fontWeight: 500 }}>
                Bâtiments industriels
              </span>
            </Link>
            <Link to="/solutions/photovoltaique" style={{ textDecoration: "none" }}>
              <span style={{ display: "inline-block", padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#F7F7F8", color: "#1A1A1A", fontSize: 14, fontWeight: 500 }}>
                Structures photovoltaïques
              </span>
            </Link>
            <Link to="/bureau-production" style={{ textDecoration: "none" }}>
              <span style={{ display: "inline-block", padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#F7F7F8", color: "#1A1A1A", fontSize: 14, fontWeight: 500 }}>
                Notre bureau d'études
              </span>
            </Link>
            <Link to="/faq" style={{ textDecoration: "none" }}>
              <span style={{ display: "inline-block", padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#F7F7F8", color: "#1A1A1A", fontSize: 14, fontWeight: 500 }}>
                Questions fréquentes
              </span>
            </Link>
          </div>
        </section>

        {/* CTA — Dark horizontal band */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            viewport={{ once: true }}
            style={{
              backgroundColor: "#1A1A1A",
              borderRadius: 20,
              padding: "48px 48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 40,
            }}
          >
            <div>
              <h3 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>
                {t("ouvragesArt.ctaTitle")}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, maxWidth: 500 }}>
                {t("ouvragesArt.ctaDesc")}
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
              <Link to="/contact">
              <motion.button
                style={{
                  backgroundColor: "#E40714",
                  color: "#FFFFFF",
                  padding: "14px 32px",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("ouvragesArt.ctaBtn")}
              </motion.button>
            </Link>
              <motion.button
                onClick={() => { const a = document.createElement("a"); a.href = "/pdfs/METALR-Ouvrages-Art-Genie-Civil.pdf"; a.download = "METALR-Ouvrages-Art-Genie-Civil.pdf"; a.click(); }}
                style={{
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  padding: "14px 32px",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 500,
                  border: "1px solid rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("common.downloadPDF")}
                <Download size={16} />
              </motion.button>
            </div>
          </motion.div>
        </section>

      </div>
    </>
  );
}
