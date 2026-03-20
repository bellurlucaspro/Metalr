import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import SEOHead from "../components/SEOHead";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FlagImg({ code, size = 36 }: { code: string; size?: number }) {
  return (
    <div
      className="overflow-hidden rounded-full shadow-sm border border-black/5"
      style={{ width: size, height: size, flexShrink: 0 }}
    >
      <img
        src={`https://hatscripts.github.io/circle-flags/flags/${code}.svg`}
        alt={code.toUpperCase()}
        width={size}
        height={size}
        className="w-full h-full object-cover"
        decoding="async"
        loading="lazy"
      />
    </div>
  );
}

const implantations = [
  { key: "france",     flagCode: "fr", featured: true,  image: "/images/IMG_1447.webp" },
  { key: "romania",    flagCode: "ro", featured: false },
  { key: "kosovo",     flagCode: "xk", featured: false },
  { key: "tunisia",    flagCode: "tn", featured: false },
  { key: "guinea",     flagCode: "gn", featured: false },
  { key: "thailand",   flagCode: "th", featured: false },
  { key: "uae",        flagCode: "ae", featured: false },
  { key: "ivoryCoast", flagCode: "ci", featured: false },
];

export default function ImplantationsPage() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const globalStats = [
    { value: "8", label: t("implantations.stat1Label") },
    { value: "4", label: t("implantations.stat5Label") },
    { value: "12 000", label: t("implantations.stat3Label") },
    { value: "24/7", label: t("implantations.stat4Label") },
  ];

  const featured = implantations[0];
  const others = implantations.slice(1);

  return (
    <>
      <SEOHead title={t("seo.implantationsTitle")} description={t("seo.implantationsDesc")} path="/implantations" />
      <div className="pt-32 pb-20">

        {/* Hero */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 64 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 24 }} />
            <h1 style={{ fontSize: 56, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 16 }}>
              {t("implantations.heroTitle")}
            </h1>
            <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 18, lineHeight: 1.7, maxWidth: 600 }}>
              {t("implantations.heroSubtitle")}
            </p>
          </motion.div>
        </section>

        {/* Stats inline — dark band */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 64 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            style={{
              background: "#1A1A1A",
              borderRadius: 20,
              padding: "48px 56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {globalStats.map((stat, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 32, fontWeight: 700, color: "#fff", fontFamily: "'Rajdhani', sans-serif", lineHeight: 1.2 }}>
                    {stat.value}
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 10 }}>
                    {stat.label}
                  </p>
                </div>
                {index < globalStats.length - 1 && (
                  <div style={{ width: 1, height: 48, backgroundColor: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
                )}
              </div>
            ))}
          </motion.div>
        </section>

        {/* Fiches pays */}
        <section ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginBottom: 48 }}
          >
            <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 20 }} />
            <h2 style={{ fontSize: 42, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.01em", marginBottom: 12 }}>
              {t("implantations.mapTitle")}
            </h2>
          </motion.div>

          {/* Featured — France (HQ) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              background: "#1A1A1A",
              borderRadius: 24,
              overflow: "hidden",
              marginBottom: 20,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "stretch",
            }}
          >
            {/* Image */}
            {featured.image && (
              <div style={{ position: "relative", minHeight: 280 }}>
                <img
                  src={featured.image}
                  alt={t(`map.locations.${featured.key}.name`)}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  width={640}
                  height={280}
                  decoding="async"
                  loading="lazy"
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, #1A1A1A)" }} />
              </div>
            )}

            {/* Content */}
            <div style={{ padding: "48px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <FlagImg code={featured.flagCode} size={48} />
                <div>
                  <h3 style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                    {t(`map.locations.${featured.key}.name`)}
                  </h3>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                    {t(`map.locations.${featured.key}.project`)}
                  </span>
                </div>
              </div>

              {/* Badge specialty */}
              <div style={{ marginBottom: 16 }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  backgroundColor: "rgba(228,7,20,0.15)",
                  borderRadius: 10,
                }}>
                  <MapPin size={12} color="#E40714" />
                  <span style={{ color: "#E40714", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {t(`map.locations.${featured.key}.specialty`)}
                  </span>
                </span>
              </div>

              {/* Description */}
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>
                {t(`map.locations.${featured.key}.description`)}
              </p>
            </div>
          </motion.div>

          {/* Other implantations — grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
            {others.map((impl, index) => (
              <motion.div
                key={impl.key}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 + index * 0.06 }}
                style={{
                  background: "#F7F7F8",
                  borderRadius: 20,
                  padding: "28px 24px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {/* Header: Flag + Name */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <FlagImg code={impl.flagCode} size={40} />
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A", marginBottom: 2 }}>
                      {t(`map.locations.${impl.key}.name`)}
                    </h3>
                    <span style={{ fontSize: 13, color: "rgba(27,27,27,0.4)" }}>
                      {t(`map.locations.${impl.key}.project`)}
                    </span>
                  </div>
                </div>

                {/* Badge specialty */}
                <div>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 12px",
                    backgroundColor: "rgba(228,7,20,0.08)",
                    borderRadius: 8,
                  }}>
                    <MapPin size={11} color="#E40714" />
                    <span style={{ color: "#E40714", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {t(`map.locations.${impl.key}.specialty`)}
                    </span>
                  </span>
                </div>

                {/* Description */}
                <p style={{ fontSize: 14, color: "rgba(27,27,27,0.5)", lineHeight: 1.65, margin: 0 }}>
                  {t(`map.locations.${impl.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "0 0 80px", background: "#fff" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
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
                  {t("implantations.ctaTitle")}
                </h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                  {t("implantations.ctaDesc")}
                </p>
              </div>
              <Link to="/contact" style={{ flexShrink: 0 }}>
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
                  {t("implantations.ctaBtn")}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8h14M8 1l7 7-7 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}
