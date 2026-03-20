import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useArticles } from "../hooks/useArticles";
import { tField, safe } from "../lib/i18n-helpers";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function NewsSection() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const { articles, loading } = useArticles({ limit: 2 });

  return (
    <section id="actualites" ref={ref} style={{ backgroundColor: "#fff", padding: "96px 0" }}>
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
            {t("news.title")}
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
            {t("news.subtitle")}
          </motion.p>
        </div>

        {/* Loading state */}
        {loading && (
          <div style={{ display: "flex", gap: 24 }}>
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 420,
                  borderRadius: 20,
                  backgroundColor: "#F7F7F8",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
            ))}
          </div>
        )}

        {/* Articles grid */}
        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 + index * 0.15 }}
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  backgroundColor: "#fff",
                  border: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image */}
                <div style={{ height: 280, overflow: "hidden", position: "relative" }}>
                  <ImageWithFallback
                    src={article.image_url || ""}
                    alt={tField(article.title, lang)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  {/* Badge */}
                  {article.badge && tField(article.badge, lang) && (
                    <div
                      style={{
                        position: "absolute",
                        top: 20,
                        left: 20,
                        backgroundColor: "#E40714",
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        padding: "6px 14px",
                        borderRadius: 8,
                        fontFamily: "'Rajdhani', sans-serif",
                      }}
                    >
                      {tField(article.badge, lang)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: "32px 32px 36px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#1A1A1A",
                      lineHeight: 1.3,
                      marginBottom: 14,
                    }}
                  >
                    {tField(article.title, lang)}
                  </h3>

                  <p
                    style={{
                      color: "rgba(27,27,27,0.5)",
                      fontSize: 15,
                      lineHeight: 1.7,
                      marginBottom: 24,
                      flex: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical" as const,
                      overflow: "hidden",
                    }}
                  >
                    {tField(article.excerpt, lang)}
                  </p>

                  {/* Meta */}
                  <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E40714" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                      <span style={{ color: "rgba(27,27,27,0.6)", fontSize: 13, fontWeight: 500 }}>
                        {new Date(safe(article.date)).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {article.category_label && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#E40714" }} />
                        <span style={{ color: "rgba(27,27,27,0.6)", fontSize: 13, fontWeight: 500 }}>
                          {tField(article.category_label, lang)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <Link to={`/actualites/${article.slug}`} style={{ alignSelf: "flex-start", textDecoration: "none" }}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        backgroundColor: "#1A1A1A",
                        color: "#fff",
                        borderRadius: 12,
                        padding: "14px 24px",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {t("news.readMore")}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && articles.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            style={{ color: "rgba(27,27,27,0.4)", fontSize: 15, textAlign: "center", padding: "48px 0" }}
          >
            {t("news.noArticles")}
          </motion.p>
        )}

        {/* See all link */}
        {!loading && articles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
            style={{ textAlign: "center", marginTop: 48 }}
          >
            <Link
              to="/actualites"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "#E40714",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {t("news.viewAll", "Voir toutes les actualités")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#E40714" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
