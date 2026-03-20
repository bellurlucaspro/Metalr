import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const COMMITMENTS = [
  { key: "materials", value: "95%" },
  { key: "circular", value: "85%" },
  { key: "energy", value: "100%" },
  { key: "iso", value: "14001" },
];

export function SustainabilitySection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="engagements" ref={ref} style={{ backgroundColor: "#F7F7F8", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
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
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.1,
              marginBottom: 16,
              letterSpacing: "-0.01em",
            }}
          >
            {t("sustainability.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            style={{
              color: "rgba(27,27,27,0.5)",
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: 520,
            }}
          >
            {t("sustainability.subtitle")}
          </motion.p>
        </div>

        {/* Commitment cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, marginBottom: 48 }}>
          {COMMITMENTS.map((c, index) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 + index * 0.1 }}
              style={{
                backgroundColor: "#1A1A1A",
                borderRadius: 20,
                padding: "32px 24px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Value */}
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#E40714",
                  lineHeight: 1,
                  marginBottom: 6,
                  fontFamily: "'Rajdhani', sans-serif",
                }}
              >
                {c.value}
              </div>

              {/* Title */}
              <h4
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.08em",
                  marginBottom: 10,
                  fontFamily: "'Rajdhani', sans-serif",
                }}
              >
                {t(`sustainability.${c.key}.title`)}
              </h4>

              {/* Description */}
              <p
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                {t(`sustainability.${c.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: "32px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#1A1A1A",
                marginBottom: 6,
              }}
            >
              {t("sustainability.ctaTitle")}
            </h3>
            <p
              style={{
                color: "rgba(27,27,27,0.5)",
                fontSize: 14,
                lineHeight: 1.6,
                maxWidth: 480,
              }}
            >
              {t("sustainability.ctaText")}
            </p>
          </div>
          <motion.button
            onClick={() => { const a = document.createElement("a"); a.href = "/pdfs/METALR-Rapport-RSE-2025.pdf"; a.download = "METALR-Rapport-RSE-2025.pdf"; a.click(); }}
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
              padding: "14px 24px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {t("sustainability.ctaBtn")}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1v10M4 8l4 4 4-4M2 15h12" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
