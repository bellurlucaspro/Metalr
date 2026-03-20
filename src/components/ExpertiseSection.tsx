import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LINKS: Record<string, string> = {
  agricultural: "/solutions/agricole",
  photovoltaic: "/solutions/photovoltaique",
  industrial: "/solutions/industriel",
  civil: "/solutions/ouvrages-art",
};

const EXPERTISES = [
  { key: "agricultural", image: "/images/20250728_111723.webp",                    objectPosition: "center 40%" },
  { key: "photovoltaic", image: "/images/panneau3.webp",                             objectPosition: "center 50%" },
  { key: "industrial",   image: "/images/batiment industriel 2.webp",                objectPosition: "center 25%" },
  { key: "civil",        image: "/images/pontafriquesud3.webp",                       objectPosition: "center 50%" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ExpertiseRow({ exp, index }: { exp: (typeof EXPERTISES)[0]; index: number }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        position: "sticky",
        top: 80 + index * 8,
        zIndex: index + 1,
      }}
    >
      <motion.div
        className="bg-white overflow-hidden"
        style={{
          borderRadius: 20,
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: isHovered
            ? "0 20px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)"
            : "0 8px 30px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.02)",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          transition: "box-shadow 0.4s ease, transform 0.4s ease",
          position: "relative",
        }}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Arrow CTA — top right */}
        <Link
          to={LINKS[exp.key]}
          style={{ position: "absolute", top: 32, right: 32, zIndex: 2 }}
        >
          <motion.div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: isHovered ? "#E40714" : "rgba(0,0,0,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background-color 0.35s ease",
              boxShadow: isHovered
                ? "0 4px 12px rgba(228,7,20,0.25)"
                : "0 2px 8px rgba(0,0,0,0.04)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              style={{ display: "block" }}
              animate={{ x: isHovered ? 2 : 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <path
                d="M4 9h10M10 5l4 4-4 4"
                stroke={isHovered ? "#fff" : "#1A1A1A"}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "stroke 0.35s ease" }}
              />
            </motion.svg>
          </motion.div>
        </Link>

        <div style={{ padding: "44px 48px 48px" }}>
          {/* Top: step number + title/description */}
          <div style={{ display: "flex", gap: 0, marginBottom: 28 }}>
            <span
              style={{
                color: "#D4D4D4",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.05em",
                paddingTop: 8,
                width: 60,
                flexShrink: 0,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h3
                style={{
                  color: "#1A1A1A",
                  fontSize: 36,
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginBottom: 16,
                  letterSpacing: "-0.01em",
                }}
              >
                {t(`expertise.${exp.key}.title`)}
              </h3>

              <p
                style={{
                  color: "rgba(27,27,27,0.5)",
                  fontSize: 15,
                  lineHeight: 1.7,
                  maxWidth: 480,
                }}
              >
                {t(`expertise.${exp.key}.description`)}
              </p>
            </div>
          </div>

          {/* Bullet containers — responsive grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 24, paddingLeft: 60 }}>
            {["f1", "f2", "f3", "f4"].map((f) => (
              <div
                key={f}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: "rgba(0,0,0,0.02)",
                  border: "1px solid #E40714",
                  borderRadius: 12,
                  padding: "12px 16px",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: "#E40714",
                    borderRadius: "50%",
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: "rgba(27,27,27,0.75)", fontSize: 14, fontWeight: 500 }}>
                  {t(`expertise.${exp.key}.${f}`)}
                </span>
              </div>
            ))}
          </div>

          {/* Image — responsive height and margin */}
          <div
            style={{
              marginLeft: 60,
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <motion.img
              src={exp.image}
              alt={t(`expertise.${exp.key}.title`)}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: 380,
                objectFit: "cover",
                objectPosition: exp.objectPosition,
                display: "block",
              }}
              animate={{ scale: isHovered ? 1.03 : 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ExpertiseSection() {
  const { t } = useTranslation();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section id="expertise" className="py-24 px-6 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="text-[#E40714] text-[14px] font-bold tracking-widest uppercase">
              {t("expertise.title")}
            </span>
          </motion.div>

          <motion.p
            className="text-[#212121] text-[42px] leading-[1.2] font-bold max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            {t("expertise.subtitle")}
          </motion.p>

          {/* Animated horizontal line */}
          <motion.div
            style={{
              height: 2,
              backgroundColor: "#E40714",
              marginTop: 32,
              borderRadius: 1,
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={headerInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          />
        </div>

        {/* Stacking cards */}
        <div className="space-y-6">
          {EXPERTISES.map((exp, index) => (
            <ExpertiseRow key={exp.key} exp={exp} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          style={{ textAlign: "center", marginTop: 64 }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Link
            to="/solutions"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#E40714",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {t("expertise.viewAll", "Découvrir toutes nos solutions")}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="#E40714" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        {/* Bottom spacer so last card can be scrolled past */}
        <div style={{ height: 40 }} />
      </div>
    </section>
  );
}
