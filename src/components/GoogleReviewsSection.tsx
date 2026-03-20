import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reviews = [
  {
    name: "Nolann Veyssiere",
    initial: "N",
    color: "#00897B",
    rating: 5,
    text: "Très pro et très bien réalisé!!!! Je recommande!!! Merci beaucoup",
    source: "Google",
  },
  {
    name: "Thomas Difernand",
    initial: "t",
    color: "#4CAF50",
    rating: 5,
    text: "Très pro et très sérieux",
    source: "Google",
  },
  {
    name: 'Auteur de l\'avis sur "Entreprise-charpentier.fr"',
    initial: "E",
    color: "#1565C0",
    rating: 5,
    text: "Très pro et très sérieux",
    source: "Entreprise-charpentier.fr",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#FBBC05">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export function GoogleReviewsSection() {
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
            {t("googleReviews.title")}
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
            {t("googleReviews.subtitle")}
          </motion.p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 + index * 0.1 }}
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 28,
                border: "1.5px solid #1A1A1A",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                cursor: "default",
              }}
            >
              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: review.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  {review.initial}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      color: "#1A1A1A",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {review.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(27,27,27,0.4)",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {t("googleReviews.reviewFrom")} <GoogleIcon size={12} /> {review.source}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#1A1A1A" }}>
                  {review.rating}/5
                </span>
                <Stars count={review.rating} />
              </div>

              {/* Text */}
              <p
                style={{
                  color: "rgba(27,27,27,0.65)",
                  fontSize: 15,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {review.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
