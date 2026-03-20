import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const images = [
  { src: "/images/19-1920w.webp",                                           badgeKey: "badgeOssature" },
  { src: "/images/44892a9b-bfd5-4265-83ab-2c4a93101de5.webp",               badgeKey: "badgeOmbrAgri" },
  { src: "/images/ATT00527-1920w.webp",                                     badgeKey: "badgeToiturePV" },
  { src: "/images/batiment-bardage-couverture-1920w.webp",                  badgeKey: "badgeBatAgri" },
  { src: "/images/ad488368-b96e-4e24-bc53-ebfab275757f.webp",               badgeKey: "badgeOmbrParking" },
  { src: "/images/bf4a71b8-5c2b-431f-9d98-8d1db0facc98.webp",               badgeKey: "badgeToiturePV" },
  { src: "/images/batiment.webp",                                          badgeKey: "badgeBatIndus" },
  { src: "/images/c2696fc2-89f4-4819-8800-ed90f27076ce.webp",               badgeKey: "badgeTracker" },
  { src: "/images/centrale sol 1.webp",                                      badgeKey: "badgeCentraleSol" },
  { src: "/images/f738116d-61e8-4f60-9864-453b2e5426e6.webp",               badgeKey: "badgeCentrale" },
];

const allImages = [...images, ...images, ...images];

export function RealisationsScroller() {
  const { t } = useTranslation();
  return (
    <section className="py-20 overflow-hidden bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <p className="text-[13px] font-rajdhani font-bold uppercase tracking-widest text-[#E40714] mb-3">
          {t("realisations.scrollerLabel")}
        </p>
        <h2 className="text-[42px] font-bold text-[#212121] leading-tight">
          {t("realisations.scrollerTitle")}
        </h2>
        <p className="text-[#1B1B1B]/50 text-[15px] mt-3">
          {t("realisations.scrollerSubtitle")}
        </p>
      </div>

      {/* Scroller */}
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        <motion.div
          className="flex"
          style={{ width: "max-content", gap: "20px", paddingLeft: "20px" }}
          animate={{ x: [0, -(images.length * 440)] }}
          transition={{
            x: { duration: 50, repeat: Infinity, ease: "linear" },
          }}
        >
          {allImages.map((item, i) => (
            <div
              key={i}
              className="shrink-0 rounded-2xl overflow-hidden relative group cursor-pointer"
              style={{ width: 420, height: 300 }}
            >
              <motion.img
                src={item.src}
                alt={t(`realisations.${item.badgeKey}`)}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

              {/* Badge */}
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center bg-white/15 backdrop-blur-md border border-white/30 text-white text-[11px] font-semibold rounded-full"
                  style={{ padding: "6px 12px", gap: "8px" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#E40714", flexShrink: 0, display: "inline-block" }} />
                  {t(`realisations.${item.badgeKey}`)}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
