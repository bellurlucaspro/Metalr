import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function BureauSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeSlide, setActiveSlide] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const slides = [
    {
      id: 1,
      title: t("bureau.design.title"),
      subtitle: t("bureau.design.subtitle"),
      description: t("bureau.design.description"),
      image: "/images/maquettes-plans-gadgets-bureau_274679-48366.avif",
      features: [
        t("bureau.design.f1"),
        t("bureau.design.f2"),
        t("bureau.design.f3"),
        t("bureau.design.f4"),
        t("bureau.design.f5"),
        t("bureau.design.f6"),
        t("bureau.design.f7"),
        t("bureau.design.f8"),
      ],
    },
    {
      id: 2,
      title: t("bureau.factory.title"),
      subtitle: t("bureau.factory.subtitle"),
      description: t("bureau.factory.description"),
      image: "/images/production-acier-metaux_110955-689.avif",
      features: [
        t("bureau.factory.f1"),
        t("bureau.factory.f2"),
        t("bureau.factory.f3"),
        t("bureau.factory.f4"),
      ],
    },
    {
      id: 3,
      title: t("bureau.assembly.title"),
      subtitle: t("bureau.assembly.subtitle"),
      description: t("bureau.assembly.description"),
      image: "/images/IMG_0881.webp",
      features: [
        t("bureau.assembly.f1"),
        t("bureau.assembly.f2"),
        t("bureau.assembly.f3"),
        t("bureau.assembly.f4"),
      ],
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="bureau"
      ref={ref}
      className="py-24 px-6 bg-gradient-to-b from-[#C6C6C6]/20 to-white"
    >
      <div className="max-w-7xl mx-auto">
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.05,
              marginBottom: 16,
              letterSpacing: "-0.02em",
            }}
          >
            {t("bureau.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{
              color: "rgba(27,27,27,0.5)",
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: 520,
            }}
          >
            {t("bureau.subtitle")}
          </motion.p>
        </div>

        <div className="relative">
          {/* Carousel */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="rounded-3xl overflow-hidden" style={{ height: 500 }}>
              <motion.div
                className="relative h-full rounded-3xl overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback
                    src={slides[activeSlide].image}
                    alt={slides[activeSlide].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/50 to-transparent" />
                </motion.div>

                {/* Play button — centre de l'image, caché quand modale ouverte */}
                {!showVideoModal && <div className="absolute inset-0 flex items-center justify-center z-10">
                  <motion.button
                    onClick={() => setShowVideoModal(true)}
                    className="group flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Voir la vidéo de l'usine"
                  >
                    {/* Cercle pulsant */}
                    <span className="absolute w-24 h-24 rounded-full bg-white/20 animate-ping" />
                    <span
                      className="relative w-20 h-20 rounded-full flex items-center justify-center border-2 border-white/60 transition-all duration-300 group-hover:border-[#E40714]"
                      style={{ background: "rgba(228,7,20,0.75)", backdropFilter: "blur(8px)" }}
                    >
                      <Play size={30} color="white" fill="white" style={{ marginLeft: 4 }} />
                    </span>
                  </motion.button>
                </div>}

                {/* Navigation buttons */}
                {!showVideoModal && <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-10">
                  <motion.button
                    onClick={prevSlide}
                    className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1B1B1B] hover:bg-[#E40714] hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft size={24} />
                  </motion.button>

                  <div className="flex gap-2">
                    {slides.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === activeSlide
                            ? "w-8 bg-[#E40714]"
                            : "w-2 bg-white/60"
                        }`}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>

                  <motion.button
                    onClick={nextSlide}
                    className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1B1B1B] hover:bg-[#E40714] hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </div>}
              </motion.div>
            </div>

            {/* Contenu */}
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <motion.div
                  className="inline-block px-4 py-2 bg-[#E40714]/10 rounded-full mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="text-[#E40714]">
                    {slides[activeSlide].subtitle}
                  </span>
                </motion.div>

                <h3 className="text-[#212121] uppercase mb-4">
                  {slides[activeSlide].title}
                </h3>

                <p className="text-[#1B1B1B]">
                  {slides[activeSlide].description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slides[activeSlide].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#C6C6C6]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{
                      scale: 1.05,
                      borderColor: "#E40714",
                    }}
                  >
                    <div className="w-2 h-2 bg-[#E40714] rounded-full shrink-0" />
                    <span className="text-[#1B1B1B] text-[14px]">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="px-8 py-4 bg-[#E40714] text-white rounded-full inline-flex items-center gap-2"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(228, 7, 20, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {t("bureau.visitBtn")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M1 8h14M8 1l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={() => setShowVideoModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex rounded-2xl overflow-hidden"
            style={{ maxHeight: "88vh", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#E40714")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.55)")}
            >
              <X size={15} color="white" />
            </button>

            {/* Video — portrait */}
            <div style={{ background: "#000", flexShrink: 0 }}>
              <video
                src="/images/WhatsApp Video 2026-02-04 at 19.18.47.mp4"
                controls
                autoPlay
                playsInline
                style={{ height: "min(82vh, 620px)", width: "auto", display: "block" }}
              />
            </div>

            {/* Info panel — right */}
            <div
              className="flex flex-col justify-between"
              style={{ width: 300, padding: "36px 28px", background: "#151515", flexShrink: 0 }}
            >
              {/* Logo + titre */}
              <div>
                <img
                  src="/images/MetalR_bonlogo.webp"
                  alt="METALR"
                  width={100}
                  height={28}
                  loading="lazy"
                  decoding="async"
                  style={{ height: 28, marginBottom: 28, filter: "brightness(0) invert(1)" }}
                />
                <div style={{ width: 28, height: 2, background: "#E40714", borderRadius: 1, marginBottom: 18 }} />
                <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, lineHeight: 1.35, marginBottom: 12, letterSpacing: "-0.01em" }}>
                  {t("bureau.videoTitle")}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.75 }}>
                  {t("bureau.videoDesc")}
                </p>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "24px 0" }}>
                {[
                  { v: "8", l: t("bureau.videoStatFactories") },
                  { v: "8+", l: t("bureau.videoStatCountries") },
                  { v: "1000+", l: t("bureau.videoStatProjects") },
                  { v: "200+", l: t("bureau.videoStatExperts") },
                ].map((s) => (
                  <div
                    key={s.l}
                    style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div style={{ color: "#E40714", fontSize: 20, fontWeight: 700, fontFamily: "'Rajdhani', sans-serif", lineHeight: 1 }}>{s.v}</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 500, marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link to="/contact" onClick={() => setShowVideoModal(false)}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ width: "100%", background: "#E40714", color: "#fff", border: "none", borderRadius: 12, padding: "13px 18px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                  >
                    {t("bureau.videoQuote")}
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path d="M1 8h14M8 1l7 7-7 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.button>
                </Link>
                <Link to="/a-propos" onClick={() => setShowVideoModal(false)}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ width: "100%", background: "transparent", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "13px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
                  >
                    {t("bureau.videoMore")}
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
