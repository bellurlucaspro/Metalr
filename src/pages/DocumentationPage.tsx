import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function downloadPDF(url: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = url.split("/").pop() || "document.pdf";
  a.click();
}

interface DocItem {
  titleKey: string;
  descKey: string;
  generate: () => void;
  linkTo: string;
  icon: React.ReactNode;
}

export default function DocumentationPage() {
  const { t } = useTranslation();

  const documents: DocItem[] = [
    {
      titleKey: "documentation.agricoleTitle",
      descKey: "documentation.agricoleDesc",
      generate: () => downloadPDF("/pdfs/METALR-Solutions-Agricoles.pdf"),
      linkTo: "/solutions/agricole",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      titleKey: "documentation.photovoltaiqueTitle",
      descKey: "documentation.photovoltaiqueDesc",
      generate: () => downloadPDF("/pdfs/METALR-Solutions-Photovoltaiques.pdf"),
      linkTo: "/solutions/photovoltaique",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ),
    },
    {
      titleKey: "documentation.industrielTitle",
      descKey: "documentation.industrielDesc",
      generate: () => downloadPDF("/pdfs/METALR-Solutions-Industrielles.pdf"),
      linkTo: "/solutions/industriel",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20h20M5 20V8l5-4v16M13 20V4l7 4v12" />
        </svg>
      ),
    },
    {
      titleKey: "documentation.ouvragesArtTitle",
      descKey: "documentation.ouvragesArtDesc",
      generate: () => downloadPDF("/pdfs/METALR-Ouvrages-Art-Genie-Civil.pdf"),
      linkTo: "/solutions/ouvrages-art",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
        </svg>
      ),
    },
    {
      titleKey: "documentation.rseTitle",
      descKey: "documentation.rseDesc",
      generate: () => downloadPDF("/pdfs/METALR-Rapport-RSE-2025.pdf"),
      linkTo: "/#engagements",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <SEOHead
        title={t("seo.documentationTitle")}
        description={t("seo.documentationDesc")}
        path="/documentation"
      />
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
              {t("documentation.title")}
            </h1>
            <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 17, lineHeight: 1.7, maxWidth: 600 }}>
              {t("documentation.subtitle")}
            </p>
          </motion.div>
        </section>

        {/* Documents grid */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 80 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {documents.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 + index * 0.08 }}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  padding: "36px 28px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Top accent */}
                <div style={{ position: "absolute", top: 0, left: 28, width: 40, height: 3, backgroundColor: "#E40714", borderRadius: "0 0 2px 2px" }} />

                {/* Icon */}
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
                  {doc.icon}
                </div>

                {/* Title */}
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.3, marginBottom: 10 }}>
                  {t(doc.titleKey)}
                </h3>

                {/* Description */}
                <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 14, lineHeight: 1.65, marginBottom: 24, flex: 1 }}>
                  {t(doc.descKey)}
                </p>

                {/* Actions */}
                <div style={{ display: "flex", gap: 10 }}>
                  <motion.button
                    onClick={() => doc.generate()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: "#E40714",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      padding: "12px 20px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Download size={15} />
                    {t("common.downloadPDF")}
                  </motion.button>
                  <Link to={doc.linkTo} style={{ textDecoration: "none" }}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        border: "1px solid rgba(0,0,0,0.08)",
                        backgroundColor: "#F7F7F8",
                        color: "#1A1A1A",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                {t("documentation.ctaTitle")}
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                {t("documentation.ctaDesc")}
              </p>
            </div>
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
                  flexShrink: 0,
                }}
              >
                {t("documentation.ctaBtn")}
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
}
