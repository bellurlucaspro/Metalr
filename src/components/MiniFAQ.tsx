import { useState } from "react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";

interface MiniFAQProps {
  title: string;
  items: { q: string; a: string }[];
}

export function MiniFAQ({ title, items }: MiniFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 64 }}>
        <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 20 }} />
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.2, marginBottom: 24 }}>
          {title}
        </h2>
        <div style={{ maxWidth: 800 }}>
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: 16,
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A", lineHeight: 1.4 }}>
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 7,
                      backgroundColor: isOpen ? "#E40714" : "#F7F7F8",
                      color: isOpen ? "#fff" : "#1A1A1A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 17,
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
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <p style={{
                    fontSize: 14,
                    color: "rgba(27,27,27,0.6)",
                    lineHeight: 1.7,
                    paddingBottom: 18,
                    margin: 0,
                    maxWidth: 700,
                  }}>
                    {item.a}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
