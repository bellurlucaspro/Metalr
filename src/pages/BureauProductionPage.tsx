import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function BureauProductionPage() {
  const { t } = useTranslation();
  const refBureau = useRef(null);
  const isBureauInView = useInView(refBureau, { once: true, amount: 0.2 });
  const refFactories = useRef(null);
  const isFactoriesInView = useInView(refFactories, { once: true, amount: 0.2 });
  const refProcess = useRef(null);
  const isProcessInView = useInView(refProcess, { once: true, amount: 0.2 });

  const bureauServices = [
    {
      title: t("bureauProduction.s1Title"),
      description: t("bureauProduction.s1Desc"),
      number: "01",
    },
    {
      title: t("bureauProduction.s2Title"),
      description: t("bureauProduction.s2Desc"),
      number: "02",
    },
    {
      title: t("bureauProduction.s3Title"),
      description: t("bureauProduction.s3Desc"),
      number: "03",
    },
  ];

  const designFeatures = [
    t("bureau.design.f1"),
    t("bureau.design.f2"),
    t("bureau.design.f3"),
    t("bureau.design.f4"),
    t("bureau.design.f5"),
    t("bureau.design.f6"),
    t("bureau.design.f7"),
    t("bureau.design.f8"),
  ];

  const usines = [
    { name: t("bureauProduction.countryFrance"), location: "Mur-sur-Allier", capacity: "4,000", highlight: true },
    { name: t("bureauProduction.countryRomania"), location: t("bureauProduction.cityBucharest"), capacity: "3,000", highlight: false },
    { name: t("bureauProduction.countryKosovo"), location: "Pristina", capacity: "2,500", highlight: false },
    { name: t("bureauProduction.countryTunisia"), location: t("bureauProduction.cityTunis"), capacity: "1,500", highlight: false },
    { name: t("bureauProduction.countryGuinea"), location: t("bureauProduction.cityConakry"), capacity: "1,000", highlight: false },
  ];

  const processSteps = [
    { title: t("bureauProduction.step1"), desc: t("bureau.factory.f1") },
    { title: t("bureauProduction.step2"), desc: t("bureau.factory.f2") },
    { title: t("bureauProduction.step3"), desc: t("bureau.factory.f3") },
    { title: t("bureauProduction.step4"), desc: t("bureau.factory.f4") },
  ];

  const stats = [
    { value: "5", label: t("bureauProduction.factoriesTitle").replace("Nos ", "").replace("Our ", "") },
    { value: t("bureauProduction.totalCapacity"), label: t("bureauProduction.capacityLabel") },
    { value: "EN 1090", label: "Certification" },
  ];

  return (
    <>
      <SEOHead title={t("seo.bureauTitle")} description={t("seo.bureauDesc")} path="/bureau-production" />
      <div className="pt-32 pb-20">

        {/* Hero — DA left-aligned */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 64 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 24 }} />
            <h1 style={{ fontSize: 56, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 16 }}>
              {t("bureauProduction.heroTitle")}
            </h1>
            <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 18, lineHeight: 1.7, maxWidth: 600 }}>
              {t("bureauProduction.heroSubtitle")}
            </p>
          </motion.div>
        </section>

        {/* Stats band — dark */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 64 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            style={{
              background: "#1A1A1A",
              borderRadius: 20,
              padding: "48px 56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {stats.map((stat, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", fontFamily: "'Rajdhani', sans-serif", lineHeight: 1.2 }}>
                    {stat.value}
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 10 }}>
                    {stat.label}
                  </p>
                </div>
                {index < stats.length - 1 && (
                  <div style={{ width: 1, height: 48, backgroundColor: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
                )}
              </div>
            ))}
          </motion.div>
        </section>

        {/* Bureau d'études — light cards + feature tags */}
        <section ref={refBureau} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isBureauInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginBottom: 48 }}
          >
            <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 20 }} />
            <h2 style={{ fontSize: 42, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.01em", marginBottom: 12 }}>
              {t("bureauProduction.bureauTitle")}
            </h2>
            <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 15, lineHeight: 1.7, maxWidth: 560 }}>
              {t("bureau.design.description")}
            </p>
          </motion.div>

          {/* Services grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 32 }}>
            {bureauServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={isBureauInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 + index * 0.08 }}
                style={{
                  background: "#F7F7F8",
                  borderRadius: 20,
                  padding: "32px 28px",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: "#E40714", fontFamily: "'Rajdhani', sans-serif", lineHeight: 1 }}>
                    {service.number}
                  </span>
                  <div style={{ width: 24, height: 1, backgroundColor: "rgba(0,0,0,0.1)" }} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1A1A1A", marginBottom: 10 }}>{service.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(27,27,27,0.5)", lineHeight: 1.7, margin: 0 }}>{service.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Feature tags */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isBureauInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
          >
            {designFeatures.map((feature, idx) => (
              <span
                key={idx}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#1A1A1A",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 13,
                  fontWeight: 500,
                  borderRadius: 8,
                }}
              >
                {feature}
              </span>
            ))}
          </motion.div>
        </section>

        {/* Usines — dark featured France + grid others */}
        <section ref={refFactories} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFactoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginBottom: 48 }}
          >
            <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 20 }} />
            <h2 style={{ fontSize: 42, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.01em", marginBottom: 12 }}>
              {t("bureauProduction.factoriesTitle")}
            </h2>
          </motion.div>

          {/* France — featured dark card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isFactoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              background: "#1A1A1A",
              borderRadius: 24,
              padding: "48px 48px",
              marginBottom: 20,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 3, height: 24, backgroundColor: "#E40714", borderRadius: 2 }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {t("implantations.act_siege")}
                </span>
              </div>
              <h3 style={{ fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 6 }}>France</h3>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", margin: 0 }}>Mur-sur-Allier</p>
            </div>
            <div style={{ display: "flex", gap: 40 }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#E40714", fontFamily: "'Rajdhani', sans-serif", lineHeight: 1.2 }}>
                  4,000
                </div>
                <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 6 }}>{t("bureauProduction.tonnesYear")}</p>
              </div>
              <div style={{ width: 1, height: 48, backgroundColor: "rgba(255,255,255,0.1)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{t("implantations.act_conception")}</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{t("implantations.act_fabrication")}</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{t("implantations.act_installation")}</span>
              </div>
            </div>
          </motion.div>

          {/* Other factories — 2x2 grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {usines.slice(1).map((usine, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={isFactoriesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 + index * 0.08 }}
                style={{
                  background: "#F7F7F8",
                  borderRadius: 20,
                  padding: "32px 28px",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1A1A1A", marginBottom: 4 }}>{usine.name}</h3>
                    <p style={{ fontSize: 14, color: "rgba(27,27,27,0.5)", margin: 0 }}>{usine.location}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#E40714", fontFamily: "'Rajdhani', sans-serif", lineHeight: 1 }}>
                      {usine.capacity}
                    </div>
                    <p style={{ fontSize: 10, color: "rgba(27,27,27,0.4)", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0, marginTop: 2 }}>{t("bureauProduction.tonnesYear")}</p>
                  </div>
                </div>
                <div style={{ paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", gap: 6 }}>
                  <span style={{ padding: "4px 10px", backgroundColor: "#1A1A1A", color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 500, borderRadius: 6 }}>
                    {t("implantations.act_fabrication")}
                  </span>
                  <span style={{ padding: "4px 10px", backgroundColor: "#1A1A1A", color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 500, borderRadius: 6 }}>
                    {t("implantations.act_installation")}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Processus industriel — dark horizontal timeline */}
        <section ref={refProcess} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              background: "#1A1A1A",
              borderRadius: 24,
              padding: "56px 48px",
            }}
          >
            <div style={{ marginBottom: 48 }}>
              <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 20 }} />
              <h2 style={{ fontSize: 36, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
                {t("bureauProduction.processTitle")}
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0 }}>
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.2 + index * 0.1 }}
                  style={{ position: "relative", paddingRight: index < processSteps.length - 1 ? 32 : 0 }}
                >
                  {/* Step number */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, backgroundColor: index === 0 ? "#E40714" : "rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "'Rajdhani', sans-serif",
                    }}>
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    {index < processSteps.length - 1 && (
                      <div style={{ flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.1)" }} />
                    )}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
                {t("solutions.ctaTitle")}
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                {t("solutions.ctaDesc")}
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
                {t("solutions.ctaBtn")}
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
