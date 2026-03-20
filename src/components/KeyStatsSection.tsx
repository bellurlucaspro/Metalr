import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  start,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  start: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, duration]);

  const formatted = count >= 1000 ? count.toLocaleString("fr-FR") : String(count);

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export function KeyStatsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const stats = [
    { target: 1000, prefix: "+", suffix: "", label: t("stats.projectsDone") },
    { target: 250, prefix: "", suffix: "", unit: "MW", label: t("stats.installed") },
    { target: 12000, prefix: "", suffix: "", unit: "t/an", label: t("stats.capacity") },
    { target: 200, prefix: "", suffix: "", label: t("stats.employees") },
    { target: 8, prefix: "", suffix: "", label: t("stats.locations") },
  ];

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#fff", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
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
            {t("stats.title")}
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
            {t("stats.subtitle")}
          </motion.p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 + index * 0.1 }}
              style={{
                backgroundColor: "#F7F7F8",
                borderRadius: 20,
                padding: "36px 28px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 28,
                  width: 40,
                  height: 3,
                  backgroundColor: "#E40714",
                  borderRadius: "0 0 2px 2px",
                }}
              />

              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 10 }}>
                <span
                  style={{
                    fontSize: 52,
                    fontWeight: 700,
                    color: "#E40714",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                >
                  <AnimatedCounter
                    target={stat.target}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    start={isInView}
                    duration={2000 + index * 300}
                  />
                </span>
                {stat.unit && (
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#E40714",
                      fontFamily: "'Rajdhani', sans-serif",
                    }}
                  >
                    {stat.unit}
                  </span>
                )}
              </div>
              <p
                style={{
                  color: "rgba(27,27,27,0.5)",
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontFamily: "'Rajdhani', sans-serif",
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
