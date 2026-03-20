import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import SEOHead from "../components/SEOHead";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PolitiqueConfidentialitePage() {
  const { t } = useTranslation();

  const sections = [
    {
      title: t("privacyPage.s1Title"),
      content: [t("privacyPage.s1c1"), t("privacyPage.s1c2"), t("privacyPage.s1c3")],
    },
    {
      title: t("privacyPage.s2Title"),
      content: [t("privacyPage.s2c1"), t("privacyPage.s2c2"), t("privacyPage.s2c3"), t("privacyPage.s2c4")],
    },
    {
      title: t("privacyPage.s3Title"),
      content: [t("privacyPage.s3c1"), t("privacyPage.s3c2"), t("privacyPage.s3c3"), t("privacyPage.s3c4"), t("privacyPage.s3c5"), t("privacyPage.s3c6")],
    },
    {
      title: t("privacyPage.s4Title"),
      content: [t("privacyPage.s4c1"), t("privacyPage.s4c2"), t("privacyPage.s4c3"), t("privacyPage.s4c4")],
    },
    {
      title: t("privacyPage.s5Title"),
      content: [t("privacyPage.s5c1"), t("privacyPage.s5c2"), t("privacyPage.s5c3"), t("privacyPage.s5c4")],
    },
    {
      title: t("privacyPage.s6Title"),
      content: [t("privacyPage.s6c1"), t("privacyPage.s6c2"), t("privacyPage.s6c3"), t("privacyPage.s6c4")],
    },
    {
      title: t("privacyPage.s7Title"),
      content: [t("privacyPage.s7c1")],
    },
    {
      title: t("privacyPage.s8Title"),
      content: [t("privacyPage.s8c1"), t("privacyPage.s8c2"), t("privacyPage.s8c3"), t("privacyPage.s8c4"), t("privacyPage.s8c5"), t("privacyPage.s8c6"), t("privacyPage.s8c7"), t("privacyPage.s8c8"), t("privacyPage.s8c9"), t("privacyPage.s8c10")],
    },
    {
      title: t("privacyPage.s9Title"),
      content: [t("privacyPage.s9c1"), t("privacyPage.s9c2"), t("privacyPage.s9c3"), t("privacyPage.s9c4")],
    },
    {
      title: t("privacyPage.s10Title"),
      content: [t("privacyPage.s10c1"), t("privacyPage.s10c2")],
    },
    {
      title: t("privacyPage.s11Title"),
      content: [t("privacyPage.s11c1")],
    },
  ];

  return (
    <>
      <SEOHead title={t("privacyPage.seoTitle")} description={t("privacyPage.seoDesc")} path="/politique-confidentialite" />
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
              {t("privacyPage.title")}
            </h1>
            <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 14 }}>
              {t("privacyPage.lastUpdate")}
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
