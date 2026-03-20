import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sun, TreeDeciduous, Factory as FactoryIcon, ParkingCircle, RotateCw, ArrowRight, Download } from "lucide-react";
import { useRealisations } from "../hooks/useRealisations";
import { tField } from "../lib/i18n-helpers";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import SEOHead from "../components/SEOHead";
import { MiniFAQ } from "../components/MiniFAQ";

export default function PhotovoltaiquePage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeType, setActiveType] = useState(0);
  const { realisations, loading: realisationsLoading } = useRealisations({ category: "photovoltaique" });

  const projectTypes = [
    {
      icon: ParkingCircle,
      title: t("photovoltaique.pt1Title"),
      description: t("photovoltaique.pt1Desc"),
      image: "/images/5cdc51ed-4015-4ff5-b157-c77721b6121b.webp",
    },
    {
      icon: TreeDeciduous,
      title: t("photovoltaique.pt2Title"),
      description: t("photovoltaique.pt2Desc"),
      image: "/images/pexels-tomfisk-9893729.webp",
    },
    {
      icon: FactoryIcon,
      title: t("photovoltaique.pt3Title"),
      description: t("photovoltaique.pt3Desc"),
      image: "/images/e9f84c7a-443b-40e1-b602-b50a4747ea2a.webp",
    },
    {
      icon: RotateCw,
      title: t("photovoltaique.pt4Title"),
      description: t("photovoltaique.pt4Desc"),
      image: "/images/c2696fc2-89f4-4819-8800-ed90f27076ce.webp",
    },
  ];

  const process = [
    { step: t("photovoltaique.proc1"), description: t("photovoltaique.proc1Desc") },
    { step: t("photovoltaique.proc2"), description: t("photovoltaique.proc2Desc") },
    { step: t("photovoltaique.proc3"), description: t("photovoltaique.proc3Desc") },
    { step: t("photovoltaique.proc4"), description: t("photovoltaique.proc4Desc") },
    { step: t("photovoltaique.proc5"), description: t("photovoltaique.proc5Desc") },
    { step: t("photovoltaique.proc6"), description: t("photovoltaique.proc6Desc") },
  ];

  const certifications = [
    { title: t("photovoltaique.cert1Title"), desc: t("photovoltaique.cert1Desc") },
    { title: t("photovoltaique.cert2Title"), desc: t("photovoltaique.cert2Desc") },
    { title: t("photovoltaique.cert3Title"), desc: t("photovoltaique.cert3Desc") },
    { title: t("photovoltaique.cert4Title"), desc: t("photovoltaique.cert4Desc") },
  ];

  const advantages = [
    { title: t("photovoltaique.adv1Title"), desc: t("photovoltaique.adv1Desc") },
    { title: t("photovoltaique.adv2Title"), desc: t("photovoltaique.adv2Desc") },
    { title: t("photovoltaique.adv3Title"), desc: t("photovoltaique.adv3Desc") },
    { title: t("photovoltaique.adv4Title"), desc: t("photovoltaique.adv4Desc") },
    { title: t("photovoltaique.adv5Title"), desc: t("photovoltaique.adv5Desc") },
    { title: t("photovoltaique.adv6Title"), desc: t("photovoltaique.adv6Desc") },
  ];

  const keyNumbers = [
    { value: "250 MW", label: t("photovoltaique.kn1Label") },
    { value: "+500", label: t("photovoltaique.kn2Label") },
    { value: "-45 000", label: t("photovoltaique.kn3Label") },
    { value: "25 ans", label: t("photovoltaique.kn4Label") },
  ];

  return (
    <>
      <SEOHead
        title={t("seo.photovoltaiqueTitle")}
        description={t("seo.photovoltaiqueDesc")}
        path="/solutions/photovoltaique"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Structures photovoltaïques métalliques",
          "provider": { "@type": "Organization", "name": "METALR", "url": "https://metalr.fr" },
          "description": "Conception, fabrication et installation de structures métalliques pour installations solaires : ombrières de parking, carports solaires, centrales au sol, toitures photovoltaïques.",
          "areaServed": { "@type": "Country", "name": "France" },
          "serviceType": "Construction métallique photovoltaïque",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Solutions photovoltaïques",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ombrières photovoltaïques" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Centrales solaires au sol" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Toitures photovoltaïques" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Trackers solaires" } }
            ]
          }
        }}
      />
      <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] mb-20 overflow-hidden rounded-3xl max-w-7xl mx-auto">
        <img
          src="/images/panneau3.webp"
          alt="Photovoltaïque"
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
                {t("photovoltaique.heroTitle")}
              </h1>
              <p className="text-white/70 text-[18px] leading-relaxed">
                {t("photovoltaique.heroSubtitle")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {keyNumbers.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                backgroundColor: "#F7F7F8",
                borderRadius: 20,
                padding: "32px 28px",
                border: "1px solid rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 140,
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: "#E40714",
                  lineHeight: 1,
                  fontFamily: "'Rajdhani', sans-serif",
                  marginBottom: 12,
                }}
              >
                {stat.value}
              </div>
              <p style={{ color: "#1A1A1A", fontSize: 14, lineHeight: 1.6, fontWeight: 500 }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Types de projets */}
      <section ref={ref} className="relative mb-20 bg-[#F7F7F7]">
        <div className="absolute top-0 left-0 right-0 h-px bg-[#E8E8E8]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E8E8E8]" />

        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
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
                marginBottom: 12,
              }}
            >
              {t("photovoltaique.typesTitle")}
            </h2>
            <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 15, lineHeight: 1.7, maxWidth: 600 }}>
              {t("photovoltaique.heroSubtitle")}
            </p>
          </motion.div>

          {/* Split panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden border border-[#E0E0E0] shadow-sm bg-white"
            style={{ height: "560px" }}
          >

            {/* Left — Image panel (3/5) */}
            <div className="lg:col-span-3 relative overflow-hidden hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeType}
                  src={projectTypes[activeType].image}
                  alt={projectTypes[activeType].title}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  width={800}
                  height={560}
                  decoding="async"
                  loading="lazy"
                />
              </AnimatePresence>

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Number watermark */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`num-${activeType}`}
                  className="absolute top-6 right-4 text-[130px] font-black text-white/8 leading-none select-none font-rajdhani"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                >
                  0{activeType + 1}
                </motion.div>
              </AnimatePresence>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`title-${activeType}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-px w-6 bg-[#E40714]" />
                      <span className="text-[#E40714] text-[11px] font-bold uppercase tracking-[0.2em]">
                        {(() => { const Icon = projectTypes[activeType].icon; return <Icon size={14} className="inline mr-1.5" />; })()}
                        Solutions
                      </span>
                    </div>
                    <h3 className="text-white text-[30px] font-rajdhani font-bold uppercase leading-tight tracking-wide">
                      {projectTypes[activeType].title}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Séparateur vertical */}
            <div className="hidden lg:block absolute left-[60%] top-0 bottom-0 w-px bg-[#E8E8E8] pointer-events-none" />

            {/* Right — List panel (2/5) */}
            <div className="lg:col-span-2 bg-white flex flex-col">
              {projectTypes.map((type, index) => {
                const isActive = activeType === index;
                return (
                  <button
                    key={index}
                    onMouseEnter={() => setActiveType(index)}
                    onClick={() => setActiveType(index)}
                    className={`group flex-1 flex flex-col justify-center px-10 text-left transition-colors duration-200 relative border-b border-[#E8E8E8] last:border-b-0 ${
                      isActive ? "bg-[#FAFAFA]" : "hover:bg-[#FAFAFA]"
                    }`}
                  >
                    {/* Active left border */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#E40714]"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Numéro */}
                    <span className={`text-[11px] font-mono tracking-widest mb-2 transition-colors duration-200 ${
                      isActive ? "text-[#E40714]" : "text-[#D5D5D5]"
                    }`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Ligne rouge active */}
                    <motion.div
                      className="h-px bg-[#E40714] mb-3 origin-left"
                      initial={false}
                      animate={{ width: isActive ? "28px" : "0px", opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Titre */}
                    <span className={`text-[16px] font-rajdhani font-bold uppercase tracking-wide leading-snug transition-colors duration-200 ${
                      isActive ? "text-[#1B1B1B]" : "text-[#BBBBBB] group-hover:text-[#777777]"
                    }`}>
                      {type.title}
                    </span>

                    {/* Description (active only) */}
                    <motion.div
                      initial={false}
                      animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-[#999999] text-[12px] leading-relaxed mt-2.5 pr-4">
                        {type.description}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full border border-[#E40714]/50 flex items-center justify-center">
                          <ArrowRight size={9} className="text-[#E40714]" />
                        </div>
                      </div>
                    </motion.div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process photovoltaïque */}
      <section style={{ backgroundColor: "#F7F7F8", padding: "96px 0", marginBottom: 80 }}>
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
              {t("photovoltaique.processTitle")}
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
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  backgroundColor: "#fff",
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
                <div>
                  <p style={{ color: "#1A1A1A", fontSize: 15, lineHeight: 1.6, fontWeight: 600, marginBottom: 4 }}>{item.step}</p>
                  <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 13, lineHeight: 1.5 }}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages — Numbered card grid */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 80 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{ marginBottom: 48 }}
        >
          <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 24 }} />
          <h2 style={{ fontSize: 42, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.1, marginBottom: 12 }}>
            {t("photovoltaique.advantagesTitle")}
          </h2>
          <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 15, lineHeight: 1.7, maxWidth: 600 }}>
            {t("photovoltaique.advantagesSubtitle")}
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {advantages.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              style={{
                backgroundColor: "#F7F7F8",
                borderRadius: 20,
                padding: "32px 28px",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ width: 3, height: 24, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A", marginBottom: 8 }}>
                {item.title}
              </h3>
              <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 14, lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Normes et certifications — Dark band 2 columns */}
      <section style={{ backgroundColor: "#1A1A1A", borderRadius: 24, maxWidth: 1280, margin: "0 auto 80px", padding: "56px 48px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{ marginBottom: 48 }}
        >
          <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 24, transformOrigin: "left" }} />
          <h2 style={{ fontSize: 42, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, marginBottom: 12 }}>
            {t("photovoltaique.certsTitle")}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.7, maxWidth: 600 }}>
            {t("photovoltaique.certsSubtitle")}
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 0 }}>
          {/* Left column */}
          <div>
            {certifications.slice(0, 2).map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                style={{
                  padding: "24px 32px 24px 0",
                  borderBottom: i < 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 3, height: 32, backgroundColor: "#E40714", borderRadius: 2, flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 600, color: "#FFFFFF", marginBottom: 6 }}>{cert.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6 }}>{cert.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Vertical separator */}
          <div style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

          {/* Right column */}
          <div>
            {certifications.slice(2, 4).map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i + 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                style={{
                  padding: "24px 0 24px 32px",
                  borderBottom: i < 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 3, height: 32, backgroundColor: "#E40714", borderRadius: 2, flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 600, color: "#FFFFFF", marginBottom: 6 }}>{cert.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6 }}>{cert.desc}</p>
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
            {t("photovoltaique.projectsTitle")}
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                    <ImageWithFallback
                      src={project.main_image_url || ""}
                      alt={tField(project.title, lang)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div style={{ padding: "20px 24px" }}>
                    <h3 style={{ fontSize: 17, fontWeight: 600, color: "#1A1A1A", marginBottom: 4 }}>{tField(project.title, lang)}</h3>
                    <p style={{ fontSize: 13, color: "rgba(27,27,27,0.5)", marginBottom: 2 }}>{tField(project.location, lang)}</p>
                    {project.year && <p style={{ fontSize: 13, color: "#E40714", fontWeight: 600 }}>{project.year}</p>}
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
      </section>

      {/* Mini-FAQ SEO */}
      <MiniFAQ
        title={t("photovoltaique.miniFaqTitle")}
        items={[
          { q: t("photovoltaique.miniFaq1Q"), a: t("photovoltaique.miniFaq1A") },
          { q: t("photovoltaique.miniFaq2Q"), a: t("photovoltaique.miniFaq2A") },
          { q: t("photovoltaique.miniFaq3Q"), a: t("photovoltaique.miniFaq3A") },
        ]}
      />

      {/* Solutions associées — maillage interne */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 48 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link to="/solutions/agricole" style={{ textDecoration: "none" }}>
            <span style={{ display: "inline-block", padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#F7F7F8", color: "#1A1A1A", fontSize: 14, fontWeight: 500 }}>
              Structures agricoles &amp; AgriPV
            </span>
          </Link>
          <Link to="/solutions/industriel" style={{ textDecoration: "none" }}>
            <span style={{ display: "inline-block", padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#F7F7F8", color: "#1A1A1A", fontSize: 14, fontWeight: 500 }}>
              Bâtiments industriels
            </span>
          </Link>
          <Link to="/bureau-production" style={{ textDecoration: "none" }}>
            <span style={{ display: "inline-block", padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#F7F7F8", color: "#1A1A1A", fontSize: 14, fontWeight: 500 }}>
              Notre bureau d'études intégré
            </span>
          </Link>
          <Link to="/faq" style={{ textDecoration: "none" }}>
            <span style={{ display: "inline-block", padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#F7F7F8", color: "#1A1A1A", fontSize: 14, fontWeight: 500 }}>
              Questions fréquentes
            </span>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
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
              {t("photovoltaique.ctaTitle")}
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 15,
                lineHeight: 1.6,
                maxWidth: 480,
              }}
            >
              {t("photovoltaique.ctaDesc")}
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
                {t("photovoltaique.ctaBtn1")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 8h14M8 1l7 7-7 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </Link>
            <motion.button
              onClick={() => { const a = document.createElement("a"); a.href = "/pdfs/METALR-Solutions-Photovoltaiques.pdf"; a.download = "METALR-Solutions-Photovoltaiques.pdf"; a.click(); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 12,
                padding: "16px 28px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {t("agricole.dlBtn")}
              <Download size={16} />
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
    </>
  );
}
