import { motion } from "motion/react";
import { useRef, useState, useMemo } from "react";
import { useInView } from "motion/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEOHead from "../components/SEOHead";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  key: string;
  items: FAQItem[];
}

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 16,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: "#1A1A1A", lineHeight: 1.4 }}>
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            backgroundColor: isOpen ? "#E40714" : "#F7F7F8",
            color: isOpen ? "#fff" : "#1A1A1A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 300,
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{ overflow: "hidden" }}
      >
        <p style={{
          fontSize: 14,
          color: "rgba(27,27,27,0.6)",
          lineHeight: 1.7,
          paddingBottom: 20,
          margin: 0,
          maxWidth: 700,
        }}>
          {item.a}
        </p>
      </motion.div>
    </div>
  );
}

export default function FAQPage() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories: FAQCategory[] = [
    {
      key: "general",
      items: [
        {
          q: t("faq.general.q1"),
          a: t("faq.general.a1"),
        },
        {
          q: t("faq.general.q2"),
          a: t("faq.general.a2"),
        },
        {
          q: t("faq.general.q3"),
          a: t("faq.general.a3"),
        },
        {
          q: t("faq.general.q4"),
          a: t("faq.general.a4"),
        },
      ],
    },
    {
      key: "solutions",
      items: [
        {
          q: t("faq.solutions.q1"),
          a: t("faq.solutions.a1"),
        },
        {
          q: t("faq.solutions.q2"),
          a: t("faq.solutions.a2"),
        },
        {
          q: t("faq.solutions.q3"),
          a: t("faq.solutions.a3"),
        },
        {
          q: t("faq.solutions.q4"),
          a: t("faq.solutions.a4"),
        },
      ],
    },
    {
      key: "technique",
      items: [
        {
          q: t("faq.technique.q1"),
          a: t("faq.technique.a1"),
        },
        {
          q: t("faq.technique.q2"),
          a: t("faq.technique.a2"),
        },
        {
          q: t("faq.technique.q3"),
          a: t("faq.technique.a3"),
        },
      ],
    },
    {
      key: "commercial",
      items: [
        {
          q: t("faq.commercial.q1"),
          a: t("faq.commercial.a1"),
        },
        {
          q: t("faq.commercial.q2"),
          a: t("faq.commercial.a2"),
        },
        {
          q: t("faq.commercial.q3"),
          a: t("faq.commercial.a3"),
        },
        {
          q: t("faq.commercial.q4"),
          a: t("faq.commercial.a4"),
        },
      ],
    },
  ];

  const faqSchema = useMemo(() => {
    const allItems = categories.flatMap((cat) => cat.items);
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": allItems.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a,
        },
      })),
    });
  }, [categories]);

  return (
    <>
      <SEOHead title={t("seo.faqTitle")} description={t("seo.faqDesc")} path="/faq" />
      <Helmet>
        <script type="application/ld+json">{faqSchema}</script>
      </Helmet>
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
              {t("faq.heroTitle")}
            </h1>
            <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 18, lineHeight: 1.7, maxWidth: 600 }}>
              {t("faq.heroSubtitle")}
            </p>
          </motion.div>
        </section>

        {/* FAQ sections */}
        <section ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 80 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            {categories.map((cat, catIndex) => (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE, delay: catIndex * 0.1 }}
              >
                <h2 style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#E40714",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 20,
                  fontFamily: "'Rajdhani', sans-serif",
                }}>
                  {t(`faq.${cat.key}.title`)}
                </h2>

                <div>
                  {cat.items.map((item, itemIndex) => {
                    const id = `${cat.key}-${itemIndex}`;
                    return (
                      <AccordionItem
                        key={id}
                        item={item}
                        isOpen={!!openItems[id]}
                        onToggle={() => toggleItem(id)}
                      />
                    );
                  })}
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
              <h2 style={{ fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                {t("faq.ctaTitle")}
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                {t("faq.ctaDesc")}
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
                {t("faq.ctaBtn")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 8h14M8 1l7 7-7 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </Link>
          </motion.div>
        </section>

      </div>
    </>
  );
}
