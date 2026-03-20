import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import SEOHead from "../components/SEOHead";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function MentionsLegalesPage() {
  const { t } = useTranslation();

  const sections = [
    {
      title: t("legalPage.s1Title"),
      content: [
        t("legalPage.s1c1"),
        t("legalPage.s1c2"),
        t("legalPage.s1c3"),
        t("legalPage.s1c4"),
        t("legalPage.s1c5"),
        t("legalPage.s1c6"),
      ],
    },
    {
      title: t("legalPage.s2Title"),
      content: [
        t("legalPage.s2c1"),
        t("legalPage.s2c2"),
        t("legalPage.s2c3"),
      ],
    },
    {
      title: t("legalPage.s3Title"),
      content: [
        t("legalPage.s3c1"),
        t("legalPage.s3c2"),
        t("legalPage.s3c3"),
      ],
    },
    {
      title: t("legalPage.s4Title"),
      content: [
        t("legalPage.s4c1"),
        t("legalPage.s4c2"),
        t("legalPage.s4c3"),
      ],
    },
    {
      title: t("legalPage.s5Title"),
      content: [
        t("legalPage.s5c1"),
        t("legalPage.s5c2"),
        t("legalPage.s5c3"),
      ],
    },
    {
      title: t("legalPage.s6Title"),
      content: [
        t("legalPage.s6c1"),
        t("legalPage.s6c2"),
      ],
    },
    {
      title: t("legalPage.s7Title"),
      content: [
        t("legalPage.s7c1"),
      ],
    },
  ];

  return (
    <>
      <SEOHead title={t("legalPage.seoTitle")} description={t("legalPage.seoDesc")} path="/mentions-legales" />
      <div className="pt-32 pb-20">
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginBottom: 56 }}
          >
            <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 24 }} />
            <h1 style={{ fontSize: 56, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 16 }}>
              {t("legalPage.title")}
            </h1>
            <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 14 }}>
              {t("legalPage.lastUpdate")}
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 + index * 0.05 }}
              >
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1A1A1A", marginBottom: 16 }}>
                  {section.title}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} style={{ fontSize: 14, color: "rgba(27,27,27,0.6)", lineHeight: 1.7, margin: 0 }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
