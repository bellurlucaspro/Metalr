import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STEP_ICONS = [
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h5l3-9 4 18 3-9h5"/></svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
];

export function ProcessSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  const steps = [
    { title: t("process.engineering.title"), description: t("process.engineering.description") },
    { title: t("process.manufacturing.title"), description: t("process.manufacturing.description") },
    { title: t("process.installation.title"), description: t("process.installation.description") },
    { title: t("process.delivery.title"), description: t("process.delivery.description") },
  ];

  return (
    <section ref={ref} style={{ backgroundColor: "#fff", padding: "96px 0" }}>
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
            {t("process.title")}
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
            {t("process.subtitle")}
          </motion.p>
        </div>

        {/* Steps */}
        <div style={{ position: "relative" }}>
          {/* Connection line */}
          <motion.div
            className="hidden lg:block"
            style={{
              position: "absolute",
              top: 36,
              left: 36,
              right: 36,
              height: 1,
              backgroundColor: "rgba(0,0,0,0.06)",
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          />

          {/* Progress line overlay */}
          <motion.div
            className="hidden lg:block"
            style={{
              position: "absolute",
              top: 36,
              left: 36,
              right: 36,
              height: 2,
              backgroundColor: "#E40714",
              transformOrigin: "left",
              borderRadius: 1,
              zIndex: 1,
            }}
            animate={{
              scaleX: isInView ? (activeStep + 1) / 4 : 0,
            }}
            transition={{ duration: 0.8, ease: EASE }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.2 + index * 0.12 }}
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step number circle */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, position: "relative", zIndex: 2 }}>
                    <motion.div
                      animate={{
                        backgroundColor: isActive ? "#E40714" : "#F5F5F5",
                        borderColor: isActive ? "#E40714" : "#EBEBEB",
                        scale: isActive ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.5, ease: EASE }}
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        border: "2px solid",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <motion.span
                        animate={{
                          color: isActive ? "#fff" : "#1A1A1A",
                        }}
                        transition={{ duration: 0.5, ease: EASE }}
                        style={{
                          fontSize: 24,
                          fontWeight: 700,
                          fontFamily: "'Rajdhani', sans-serif",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </motion.span>
                    </motion.div>
                  </div>

                  {/* Icon */}
                  <motion.div
                    animate={{
                      backgroundColor: isActive ? "rgba(228,7,20,0.1)" : "rgba(228,7,20,0.04)",
                      color: isActive ? "#E40714" : "rgba(228,7,20,0.5)",
                    }}
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                  >
                    {STEP_ICONS[index]}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    animate={{
                      color: isActive ? "#E40714" : "#1A1A1A",
                    }}
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      marginBottom: 10,
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    animate={{
                      opacity: isActive ? 0.7 : 0.4,
                    }}
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{
                      color: "#1B1B1B",
                      fontSize: 14,
                      lineHeight: 1.65,
                    }}
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
