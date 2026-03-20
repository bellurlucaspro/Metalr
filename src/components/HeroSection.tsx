import { motion } from "motion/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const VP = { once: true, amount: 0.2 };
const DUR = 0.7;
const STG = 0.12;

export function HeroSection() {
  const { t } = useTranslation();
  const ref = useRef(null);

  const solarImages = [
    "/images/pontafriquesud3.webp",
    "/images/batiment industriel 2.webp",
    "/images/IMG_0881.webp",
    "/images/IMG_1816.webp",
    "/images/IMG_1971.webp",
    "/images/tracker.webp",
  ];

  // Scroll position removed - using CSS animation instead for better performance

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20 px-6 bg-gradient-to-b from-white via-[#C6C6C6]/10 to-white"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: DUR }}
            >
              {/* Titre noir */}
              {/* Badge Contractant général */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: DUR, delay: STG * 0 }}
              >
                <span className="inline-flex items-center gap-2 bg-[#E40714]/10 border border-[#E40714]/20 text-[#E40714] font-bold text-[13px] uppercase tracking-wider rounded-full px-4 py-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  {t("hero.badge")}
                </span>
              </motion.div>

              <motion.h1
                className="text-[#212121] uppercase mb-6 text-[40px] lg:text-[56px] leading-[1.1] tracking-tight font-bold"
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={VP}
                transition={{ duration: DUR, delay: STG * 0.5 }}
              >
                {t("hero.title1")}{" "}
                <motion.span
                  className="text-[#E40714] relative inline"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: DUR, delay: STG * 1 }}
                >
                  {t("hero.title2")}
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#E40714] to-transparent rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={VP}
                    transition={{ duration: DUR, delay: STG * 1 + 0.3 }}
                  />
                </motion.span>
              </motion.h1>

              {/* Paragraphe */}
              <motion.p
                className="text-[#1B1B1B] mb-8 max-w-xl text-[18px] leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: DUR, delay: STG * 2 }}
              >
                {t("hero.description")}
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: DUR, delay: STG * 3 }}
              >
                <motion.a
                  href="#realisations"
                  className="px-8 py-4 bg-[#E40714] text-white rounded-full hover:bg-[#E40714]/90 transition-all duration-300 inline-flex items-center justify-center"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(228, 7, 20, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("hero.ctaProjects")}
                </motion.a>

                <motion.a
                  href="#contact"
                  className="px-8 py-4 bg-white/80 backdrop-blur-sm text-[#1B1B1B] rounded-full border-2 border-[#C6C6C6] hover:border-[#E40714] transition-all duration-300 inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("hero.ctaContact")}
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - Main Image & Scrolling Gallery */}
          <div className="relative h-[600px] lg:h-[700px]">
            {/* Main Large Image */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
              <motion.div
                className="absolute inset-0"
                style={{ borderRadius: "1.5rem", overflow: "hidden" }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VP}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/30 via-transparent to-transparent z-10" />
                <img
                  src="/images/IMG_1447.webp"
                  alt="Panneaux solaires"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                  decoding="sync"
                />

                {/* Overlay text on image */}
                <motion.div
                  className="absolute bottom-8 left-8 right-8 z-20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border-2 border-white/40">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#E40714] rounded-xl flex items-center justify-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                        >
                          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[#212121] text-[14px]">{t("hero.badgeEnergy")}</div>
                        <div className="text-[#E40714] text-[12px]">{t("hero.badgeSolutions")}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Scrolling Image Gallery - Right Side */}
            <motion.div
              className="absolute top-0 bottom-0 w-48 hidden xl:block -right-24"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="relative h-full overflow-hidden rounded-3xl">
                <div
                  className="absolute w-full space-y-4"
                  style={{
                    animation: "heroScroll 20s linear infinite",
                  }}
                >
                  {[...solarImages, ...solarImages, ...solarImages].map((image, index) => (
                    <div
                      key={index}
                      className="w-full h-40 rounded-3xl overflow-hidden border-4 border-white shadow-xl"
                    >
                      <img
                        src={image}
                        alt={`METALR ${index + 1}`}
                        width={192}
                        height={160}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
                <style>{`@keyframes heroScroll { from { transform: translateY(0); } to { transform: translateY(-${solarImages.length * 176}px); } }`}</style>
              </div>

              {/* Gradient overlays for smooth appearance */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-2 h-2 bg-[#E40714] rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-20 w-3 h-3 bg-[#E40714] rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
    </section>
  );
}
