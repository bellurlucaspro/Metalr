import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function QuoteBanner() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRTL = i18n.language === "ar";

  if (location.pathname === "/contact") return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "12px",
        ...(isRTL ? { left: "12px" } : { right: "12px" }),
        zIndex: 9999,
      }}
    >
      <Link to="/contact">
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "#E40714",
            color: "white",
            fontSize: "14px",
            fontWeight: 600,
            height: "48px",
            paddingLeft: "20px",
            paddingRight: "12px",
            border: "none",
            borderRadius: isRTL ? "0 10px 0 0" : "10px 0 0 0",
            cursor: "pointer",
            boxShadow: "0 2px 20px rgba(0,0,0,0.15)",
            whiteSpace: "nowrap" as const,
          }}
        >
          {t("quoteBtn.label")}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.2)",
              flexShrink: 0,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </Link>
    </div>
  );
}
