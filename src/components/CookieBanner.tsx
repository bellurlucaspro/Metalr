import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const COOKIE_KEY = "metalr_cookie_consent";

export function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const handleRefuse = () => {
    localStorage.setItem(COOKIE_KEY, "refused");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            right: 24,
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: 720,
              width: "100%",
              background: "#1A1A1A",
              borderRadius: 16,
              padding: "20px 20px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ flex: "1 1 250px", minWidth: 0 }}>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, margin: 0 }}>
                {t("cookies.bannerText")}{" "}
                <Link to="/cookies" style={{ color: "#E40714", textDecoration: "underline" }}>
                  {t("cookies.learnMore")}
                </Link>
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexShrink: 0, marginInlineStart: "auto" }}>
              <button
                onClick={handleRefuse}
                style={{
                  padding: "10px 20px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {t("cookies.refuse")}
              </button>
              <button
                onClick={handleAccept}
                style={{
                  padding: "10px 20px",
                  borderRadius: 10,
                  border: "none",
                  background: "#E40714",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {t("cookies.accept")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
