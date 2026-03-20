import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  Target,
  Award,
  Users,
  TrendingUp,
  Zap,
  Globe,
  Shield,
  Sparkles,
  ChevronRight,
  Factory,
  Leaf,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEOHead from "../components/SEOHead";
import { AnimatePresence } from "motion/react";

const heroImages = [
  "/images/44892a9b-bfd5-4265-83ab-2c4a93101de5.webp",
  "/images/IMG_0881.webp",
  "/images/IMG_5495.webp",
  "/images/19-1920w.webp",
];

function AccordionItem({ number, text, isOpen, onToggle }: { number: string; text: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}
      onClick={onToggle}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0" }}>
        <span style={{
          fontSize: 13, fontWeight: 700, color: "#E40714",
          fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.05em", flexShrink: 0,
        }}>
          {number}
        </span>
        <motion.div
          style={{ flex: 1, fontSize: 15, fontWeight: 600, color: isOpen ? "#fff" : "rgba(255,255,255,0.65)", lineHeight: 1.5 }}
          animate={{ color: isOpen ? "#fff" : "rgba(255,255,255,0.65)" }}
        >
          {text.split(".")[0]}.
        </motion.div>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ flexShrink: 0 }}
        >
          <ChevronRight size={16} color={isOpen ? "#E40714" : "rgba(255,255,255,0.3)"} />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0, paddingBottom: 16, paddingLeft: 27 }}>
              {text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MissionsValeurs({ t }: { t: (key: string) => string }) {
  const [openMission, setOpenMission] = useState<number | null>(1);
  const [openValue, setOpenValue] = useState<number | null>(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="missions-valeurs-grid"
      style={{
        background: "#1A1A1A",
        borderRadius: 24,
        padding: "64px 56px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
      }}
    >
      {/* Missions */}
      <div style={{ paddingRight: 48, borderRight: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <div style={{ width: 4, height: 28, backgroundColor: "#E40714", borderRadius: 2 }} />
          <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>
            {t("about.missionsTitle")}
          </h3>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <AccordionItem
            key={i}
            number={String(i).padStart(2, "0")}
            text={t(`about.mission${i}`)}
            isOpen={openMission === i}
            onToggle={() => setOpenMission(openMission === i ? null : i)}
          />
        ))}
      </div>

      {/* Valeurs */}
      <div style={{ paddingLeft: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <div style={{ width: 4, height: 28, backgroundColor: "#E40714", borderRadius: 2 }} />
          <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>
            {t("about.missionValuesTitle")}
          </h3>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <AccordionItem
            key={i}
            number={String(i).padStart(2, "0")}
            text={t(`about.value${i}`)}
            isOpen={openValue === i}
            onToggle={() => setOpenValue(openValue === i ? null : i)}
          />
        ))}
      </div>
    </motion.div>
  );
}

function HeroAbout({ heroRef, heroInView, t }: { heroRef: React.RefObject<HTMLElement | null>; heroInView: boolean; t: (key: string) => string }) {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % heroImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[100vh] mb-20 overflow-hidden rounded-3xl max-w-7xl mx-auto bg-[#1A1A1A]"
    >
      {/* Carousel background */}
      {heroImages.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt="METALR construction métallique"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
          }}
          animate={{ opacity: i === slide ? 1 : 0, scale: i === slide ? 1 : 1.08 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          width={1200}
          height={800}
          decoding="async"
        />
      ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.5) 50%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div
        className="px-6 sm:px-10 lg:px-16 pb-12 sm:pb-20"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1280,
          margin: "0 auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
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
          animate={heroInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.05,
            marginBottom: 20,
            letterSpacing: "-0.02em",
            maxWidth: 700,
          }}
        >
          {t("about.heroTitle")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 17,
            lineHeight: 1.7,
            maxWidth: 560,
            marginBottom: 28,
          }}
        >
          {t("about.heroDesc")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ display: "flex", gap: 10 }}
        >
          <Link to="/contact">
            <motion.button
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
                padding: "12px 22px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {t("about.heroCta1")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M1 8h14M8 1l7 7-7 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </Link>
          <Link to="/solutions">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 10,
                padding: "12px 22px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {t("about.heroCta2")}
            </motion.button>
          </Link>
        </motion.div>

      </div>

      {/* Dots — positionnés en bas absolu */}
      <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 8, zIndex: 20 }}>
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            style={{
              width: slide === i ? 32 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: slide === i ? "#E40714" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default function AboutPage() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroRef = useRef(null);
  const valuesRef = useRef(null);
  const statsRef = useRef(null);
  const teamRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.2 });

  const stats = [
    { value: "1 000", label: t("about.statProjects"), suffix: "+", icon: Building2 },
    { value: "250", label: t("about.statMW"), suffix: "+", icon: Zap },
    { value: "12 000", label: t("about.statCapacity"), suffix: "", icon: Factory },
    { value: "8", label: t("about.statLocations"), suffix: "", icon: Globe },
  ];

  const values = [
    { icon: Target, title: t("about.v1Title"), description: t("about.v1Desc"), color: "from-blue-500 to-blue-600", delay: 0 },
    { icon: Award, title: t("about.v2Title"), description: t("about.v2Desc"), color: "from-red-500 to-red-600", delay: 0.1 },
    { icon: Leaf, title: t("about.v3Title"), description: t("about.v3Desc"), color: "from-green-500 to-green-600", delay: 0.2 },
    { icon: Shield, title: t("about.v4Title"), description: t("about.v4Desc"), color: "from-purple-500 to-purple-600", delay: 0.3 },
  ];

  const timeline = [
    { year: "2018", title: t("about.t1Title"), description: t("about.t1Desc") },
    { year: "2019", title: t("about.t2Title"), description: t("about.t2Desc"), image: "/images/IMG_1447.webp" },
    { year: "2020", title: t("about.t3Title"), description: t("about.t3Desc"), image: "/images/usine Kosovo.webp" },
    { year: "2021", title: t("about.t4Title"), description: t("about.t4Desc"), image: "/images/IMG_1069.webp" },
    { year: "2022", title: t("about.t5Title"), description: t("about.t5Desc"), image: "/images/usine tunisie.webp" },
    { year: "2023", title: t("about.t6Title"), description: t("about.t6Desc"), image: "/images/certif.webp" },
    { year: "2024", title: t("about.t7Title"), description: t("about.t7Desc"), image: "/images/usine france.webp" },
    { year: "2025", title: t("about.t8Title"), description: t("about.t8Desc"), image: "/images/ATT00527-1920w.webp" },
  ];

  const team = [
    { name: "Jean Dupont", role: t("about.m1Role"), expertise: t("about.m1Expertise"), image: "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?w=400" },
    { name: "Marie Laurent", role: t("about.m2Role"), expertise: t("about.m2Expertise"), image: "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?w=400" },
    { name: "Ahmed Benali", role: t("about.m3Role"), expertise: t("about.m3Expertise"), image: "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?w=400" },
  ];

  return (
    <>
      <SEOHead title={t("seo.aboutTitle")} description={t("seo.aboutDesc")} path="/a-propos" />
      <div ref={containerRef} className="overflow-hidden bg-white pt-32">
      {/* Hero Section */}
      <HeroAbout heroRef={heroRef} heroInView={heroInView} t={t} />

      {/* Founders Section */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          {/* Top: Photo + Titre/Desc */}
          <div style={{ display: "flex", gap: 48, alignItems: "center", marginBottom: 48 }}>
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ flexShrink: 0 }}
            >
              <img
                src="/images/MetalR-fondateurs.webp"
                alt="Mickaël et Charlotte Rochefort — Fondateurs de METALR"
                style={{
                  width: 340,
                  height: 400,
                  objectFit: "cover",
                  borderRadius: 20,
                }}
                width={340}
                height={400}
                decoding="async"
                loading="lazy"
              />
            </motion.div>

            {/* Titre + Description */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={{ flex: 1 }}
            >
              <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 20 }} />
              <h2 style={{ fontSize: 42, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.01em", marginBottom: 8 }}>
                {t("about.foundersTitle")}
              </h2>
              <p style={{ fontSize: 18, fontWeight: 600, color: "#E40714", marginBottom: 20 }}>
                {t("about.foundersNames")}
              </p>
              <p style={{ fontSize: 15, color: "rgba(27,27,27,0.6)", lineHeight: 1.8 }}>
                {t("about.foundersDesc")}
              </p>
            </motion.div>
          </div>

          {/* Missions + Valeurs — bande sombre */}
          <MissionsValeurs t={t} />
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} style={{ padding: "60px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ textAlign: "center", padding: "0 48px" }}>
                  <div style={{ fontSize: 48, fontWeight: 700, color: "#E40714", fontFamily: "'Rajdhani', sans-serif", lineHeight: 1 }}>
                    {stat.value}{stat.suffix}
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(27,27,27,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 8 }}>
                    {stat.label}
                  </p>
                </div>
                {index < stats.length - 1 && (
                  <div style={{ width: 1, height: 48, backgroundColor: "rgba(0,0,0,0.1)" }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Timeline Section */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 48 }}
          >
            <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 20 }} />
            <h2 style={{ fontSize: 64, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.01em", marginBottom: 12 }}>
              {t("about.timelineTitle1")} <span style={{ color: "#E40714" }}>{t("about.timelineTitle2")}</span>
            </h2>
            <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 15, lineHeight: 1.7, maxWidth: 600 }}>
              {t("about.timelineSubtitle")}
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E40714] via-[#C6C6C6] to-[#E40714] -translate-x-1/2 hidden lg:block" />
            <div className="space-y-24">
              {timeline.map((item, index) => (
                <motion.div key={index} className="relative" initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.2 }}>
                  <div className={`flex flex-col lg:flex-row gap-8 items-center ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                    <motion.div className="relative z-10 shrink-0" whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.6 }}>
                      <div className="w-32 h-32 bg-gradient-to-br from-[#E40714] to-[#C00612] rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                        <span className="text-[28px] font-rajdhani font-black text-white">{item.year}</span>
                      </div>
                    </motion.div>
                    <motion.div className="flex-1 group" whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.3 }}>
                      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-[#C6C6C6]/20 hover:border-[#E40714]/50 transition-all duration-500">
                        <div className="relative overflow-hidden bg-[#F5F5F5] flex items-center justify-center" style={{ height: item.image ? 256 : 200 }}>
                          <img
                            src={item.image ?? "/images/MetalR_bonlogo.webp"}
                            alt={item.image ? item.title : "METALR"}
                            className={item.image?.includes("certif") ? "w-full h-full object-contain p-4" : item.image ? "w-full h-full object-cover" : "max-h-full w-auto object-contain p-6"}
                            width={600}
                            height={256}
                            decoding="async"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-8">
                          <h3 className="text-[32px] font-rajdhani font-bold text-[#212121] mb-3 group-hover:text-[#E40714] transition-colors duration-300">{item.title}</h3>
                          <p className="text-[18px] text-[#1B1B1B]/70 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                    <div className="hidden lg:block flex-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                {t("about.ctaTitle1")} {t("about.ctaTitle2")}
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                {t("about.ctaDesc")}
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
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
                  }}
                >
                  {t("about.ctaBtn1")}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8h14M8 1l7 7-7 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              </Link>
              <Link to="/realisations">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    backgroundColor: "transparent",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: 12,
                    padding: "16px 28px",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {t("about.ctaBtn2")}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
