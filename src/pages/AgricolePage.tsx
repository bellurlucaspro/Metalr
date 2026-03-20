import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wheat, Home, PackageCheck, Sun, Download, ArrowRight } from "lucide-react";
import { useRealisations } from "../hooks/useRealisations";
import { tField } from "../lib/i18n-helpers";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import SEOHead from "../components/SEOHead";
import { MiniFAQ } from "../components/MiniFAQ";

export default function AgricolePage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { realisations, loading: realisationsLoading } = useRealisations({ category: "agriculture" });

  const buildingTypes = [
    {
      icon: Home,
      title: t("agricole.b1Title"),
      description: t("agricole.b1Desc"),
    },
    {
      icon: PackageCheck,
      title: t("agricole.b2Title"),
      description: t("agricole.b2Desc"),
    },
    {
      icon: Wheat,
      title: t("agricole.b3Title"),
      description: t("agricole.b3Desc"),
    },
  ];

  const benefits = [
    t("agricole.ben1"),
    t("agricole.ben2"),
    t("agricole.ben3"),
    t("agricole.ben4"),
    t("agricole.ben5"),
    t("agricole.ben6"),
  ];

  const agripvPoints = [
    t("agricole.agripv1"),
    t("agricole.agripv2"),
    t("agricole.agripv3"),
    t("agricole.agripv4"),
  ];

  const agripvImages = [
    "/images/IMG_1825.webp",
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ];
  const [agripvSlide, setAgripvSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgripvSlide((prev) => (prev + 1) % agripvImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [agripvImages.length]);


  return (
    <>
      <SEOHead
        title={t("seo.agricoleTitle")}
        description={t("seo.agricoleDesc")}
        path="/solutions/agricole"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Construction de bâtiments agricoles métalliques",
          "provider": { "@type": "Organization", "name": "METALR", "url": "https://metalr.fr" },
          "description": "Conception et construction de bâtiments agricoles en charpente métallique : stabulations, hangars de stockage, structures AgriPV. Fabrication certifiée EN 1090.",
          "areaServed": { "@type": "Country", "name": "France" },
          "serviceType": "Construction métallique agricole",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Bâtiments agricoles",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Stabulations métalliques" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hangars de stockage agricole" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Structures AgriPV" } }
            ]
          }
        }}
      />
      <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] mb-20 overflow-hidden rounded-3xl max-w-7xl mx-auto">
        <img
          src="/images/DEE59EC1-2254-49AC-9F23-A0A1BCB6D5A0.webp"
          alt="Secteur Agricole"
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
              <h1 className="text-[56px] text-white mb-4" style={{ fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
                {t("agricole.heroTitle")}
              </h1>
              <p className="text-white/70 text-[18px] leading-relaxed">
                {t("agricole.heroSubtitle")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Types de bâtiments */}
      <section ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 80 }}>
        <div style={{ marginBottom: 48 }}>
          <motion.div
            style={{
              width: 40,
              height: 3,
              backgroundColor: "#E40714",
              borderRadius: 2,
              marginBottom: 24,
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            {t("agricole.buildingsTitle")}
          </motion.h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {buildingTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 + index * 0.1 }}
              style={{
                backgroundColor: "#F7F7F8",
                borderRadius: 20,
                padding: "36px 28px",
                border: "1px solid rgba(0,0,0,0.06)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 28,
                  width: 40,
                  height: 3,
                  backgroundColor: "#E40714",
                  borderRadius: "0 0 2px 2px",
                }}
              />
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  backgroundColor: "rgba(228,7,20,0.08)",
                  color: "#E40714",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <type.icon size={28} strokeWidth={1.5} />
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#1A1A1A",
                  lineHeight: 1.3,
                  marginBottom: 10,
                }}
              >
                {type.title}
              </h3>
              <p
                style={{
                  color: "rgba(27,27,27,0.5)",
                  fontSize: 14,
                  lineHeight: 1.65,
                }}
              >
                {type.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Focus AgriPV */}
      <section style={{ backgroundColor: "#fff", padding: "96px 0", marginBottom: 80 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div
                style={{
                  width: 40,
                  height: 3,
                  backgroundColor: "#E40714",
                  borderRadius: 2,
                  marginBottom: 24,
                }}
              />
              <h2
                style={{
                  fontSize: 64,
                  fontWeight: 700,
                  color: "#1A1A1A",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  marginBottom: 16,
                }}
              >
                {t("agricole.agripvTitle")}
              </h2>
              <p
                style={{
                  color: "rgba(27,27,27,0.5)",
                  fontSize: 15,
                  lineHeight: 1.7,
                  marginBottom: 28,
                }}
              >
                {t("agricole.agripvDesc")}
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {agripvPoints.map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "start", gap: 12 }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        backgroundColor: "rgba(228,7,20,0.08)",
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 2,
                        color: "#E40714",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span style={{ color: "#1A1A1A", fontSize: 15, lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ borderRadius: 20, overflow: "hidden", height: 420, position: "relative" }}
            >
              {agripvImages.map((src, idx) => (
                <motion.img
                  key={idx}
                  src={src}
                  alt={`AgriPV ${idx + 1}`}
                  initial={false}
                  animate={{ opacity: idx === agripvSlide ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  width={800}
                  height={420}
                  decoding="async"
                  loading="lazy"
                />
              ))}
              {/* Dots */}
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 8,
                  zIndex: 10,
                }}
              >
                {agripvImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setAgripvSlide(idx)}
                    style={{
                      width: idx === agripvSlide ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: idx === agripvSlide ? "#E40714" : "rgba(255,255,255,0.6)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bénéfices pour exploitants */}
      <section style={{ padding: "0 0 80px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ marginBottom: 48 }}
          >
            <div
              style={{
                width: 40,
                height: 3,
                backgroundColor: "#E40714",
                borderRadius: 2,
                marginBottom: 24,
              }}
            />
            <h2
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: "#1A1A1A",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {t("agricole.benefitsTitle")}
            </h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "1fr 1fr",
              gap: 20,
            }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  backgroundColor: "#F7F7F8",
                  borderRadius: 20,
                  padding: "32px 28px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 160,
                }}
              >
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 700,
                    color: "#E40714",
                    lineHeight: 1,
                    fontFamily: "'Rajdhani', sans-serif",
                    marginBottom: 16,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p style={{ color: "#1A1A1A", fontSize: 15, lineHeight: 1.6, fontWeight: 500 }}>{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie de réalisations */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 80 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ marginBottom: 48 }}
        >
          <div
            style={{
              width: 40,
              height: 3,
              backgroundColor: "#E40714",
              borderRadius: 2,
              marginBottom: 24,
            }}
          />
          <h2
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            {t("agricole.projectsTitle")}
          </h2>
        </motion.div>

        {realisationsLoading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
            <div className="w-8 h-8 border-3 border-[#E40714] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : realisations.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {realisations.map((project, index) => (
              <Link key={project.id} to={`/realisations/${project.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,0.06)",
                    backgroundColor: "#F7F7F8",
                  }}
                >
                  <div style={{ height: 220, overflow: "hidden" }}>
                    <ImageWithFallback
                      src={project.main_image_url || ""}
                      alt={tField(project.title, lang)}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "20px 24px" }}>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#1A1A1A",
                        marginBottom: 6,
                        lineHeight: 1.3,
                      }}
                    >
                      {tField(project.title, lang)}
                    </h3>
                    <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 13, marginBottom: 4 }}>
                      {tField(project.location, lang)}
                    </p>
                    {project.year && (
                      <span
                        style={{
                          color: "#E40714",
                          fontSize: 13,
                          fontWeight: 600,
                          fontFamily: "'Rajdhani', sans-serif",
                        }}
                      >
                        {project.year}
                      </span>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "rgba(27,27,27,0.5)", padding: "48px 0" }}>
            {t("projects.noResults")}
          </p>
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
              {t("agricole.viewAll")}
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Mini-FAQ SEO */}
      <MiniFAQ
        title={t("agricole.miniFaqTitle")}
        items={[
          { q: t("agricole.miniFaq1Q"), a: t("agricole.miniFaq1A") },
          { q: t("agricole.miniFaq2Q"), a: t("agricole.miniFaq2A") },
          { q: t("agricole.miniFaq3Q"), a: t("agricole.miniFaq3A") },
        ]}
      />

      {/* Solutions associées — maillage interne */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 48 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link to="/solutions/photovoltaique" style={{ textDecoration: "none" }}>
            <span style={{ display: "inline-block", padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#F7F7F8", color: "#1A1A1A", fontSize: 14, fontWeight: 500, transition: "border-color 0.2s" }}>
              Nos solutions photovoltaïques &amp; AgriPV
            </span>
          </Link>
          <Link to="/bureau-production" style={{ textDecoration: "none" }}>
            <span style={{ display: "inline-block", padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#F7F7F8", color: "#1A1A1A", fontSize: 14, fontWeight: 500, transition: "border-color 0.2s" }}>
              Notre bureau d'études intégré
            </span>
          </Link>
          <Link to="/faq" style={{ textDecoration: "none" }}>
            <span style={{ display: "inline-block", padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#F7F7F8", color: "#1A1A1A", fontSize: 14, fontWeight: 500, transition: "border-color 0.2s" }}>
              Questions fréquentes
            </span>
          </Link>
        </div>
      </section>

      {/* CTA Contact */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: 20,
            padding: "48px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 32,
          }}
        >
          <div>
            <h3
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 8,
              }}
            >
              {t("agricole.ctaTitle")}
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 15,
                lineHeight: 1.6,
                maxWidth: 480,
              }}
            >
              {t("agricole.ctaDesc")}
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
                {t("agricole.ctaBtn")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 8h14M8 1l7 7-7 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </Link>
            <motion.button
              onClick={() => { const a = document.createElement("a"); a.href = "/pdfs/METALR-Solutions-Agricoles.pdf"; a.download = "METALR-Solutions-Agricoles.pdf"; a.click(); }}
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
                padding: "16px 24px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Download size={16} />
              {t("agricole.dlBtn")}
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
    </>
  );
}
