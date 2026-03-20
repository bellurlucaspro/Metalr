import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CERTIFICATIONS = [
  {
    key: "iso9001",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: "en1090",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 8h2v4H7z" />
        <path d="M11 8h2v4h-2z" />
        <path d="M15 8h2v4h-2z" />
      </svg>
    ),
  },
  {
    key: "ce",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: "warranty",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    key: "decennale",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    key: "qualipv",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2" />
        <path d="M12 21v2" />
        <path d="M4.22 4.22l1.42 1.42" />
        <path d="M18.36 18.36l1.42 1.42" />
        <path d="M1 12h2" />
        <path d="M21 12h2" />
        <path d="M4.22 19.78l1.42-1.42" />
        <path d="M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    key: "opqb",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20" />
        <path d="M5 20V8h3v12" />
        <path d="M10 20V4h3v16" />
        <path d="M15 20V10h3v10" />
      </svg>
    ),
  },
];

export function CertificationsSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} style={{ backgroundColor: "#F7F7F8", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
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
            {t("certifications.title")}
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
            {t("certifications.subtitle")}
          </motion.p>
        </div>

        {/* Cards grid — 4 top, 3 bottom centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CERTIFICATIONS.slice(0, 4).map((cert, index) => (
            <motion.div
              key={cert.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 + index * 0.1 }}
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                padding: "36px 28px",
                border: "1px solid rgba(0,0,0,0.06)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent */}
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

              {/* Badge */}
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "rgba(228,7,20,0.08)",
                  color: "#E40714",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  padding: "4px 10px",
                  borderRadius: 6,
                  marginBottom: 16,
                  fontFamily: "'Rajdhani', sans-serif",
                }}
              >
                {t(`certifications.${cert.key}.badge`)}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#1A1A1A",
                  lineHeight: 1.3,
                  marginBottom: 10,
                }}
              >
                {t(`certifications.${cert.key}.title`)}
              </h3>

              {/* Description */}
              <p
                style={{
                  color: "rgba(27,27,27,0.5)",
                  fontSize: 14,
                  lineHeight: 1.65,
                }}
              >
                {t(`certifications.${cert.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Second row — 3 cards centered */}
        <div className="flex justify-center gap-8 mt-8">
          {CERTIFICATIONS.slice(4).map((cert, index) => (
            <motion.div
              key={cert.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.6 + index * 0.1 }}
              className="w-full md:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]"
              style={{
                backgroundColor: "#fff",
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
                  display: "inline-block",
                  backgroundColor: "rgba(228,7,20,0.08)",
                  color: "#E40714",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  padding: "4px 10px",
                  borderRadius: 6,
                  marginBottom: 16,
                  fontFamily: "'Rajdhani', sans-serif",
                }}
              >
                {t(`certifications.${cert.key}.badge`)}
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
                {t(`certifications.${cert.key}.title`)}
              </h3>
              <p
                style={{
                  color: "rgba(27,27,27,0.5)",
                  fontSize: 14,
                  lineHeight: 1.65,
                }}
              >
                {t(`certifications.${cert.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
