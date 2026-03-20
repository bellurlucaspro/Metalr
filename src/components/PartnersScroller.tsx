import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

interface Partner {
  name: string;
  logo: string;
  invert?: boolean;
  scale?: number;
}

export function PartnersScroller() {
  const { t } = useTranslation();
  const partners: Partner[] = [
    { name: "ENOE", logo: "/images/Logo-enoe-retina.webp" },
    { name: "DISCHAMP ENERGIE", logo: "/images/DE-logo-blanc.svg", invert: true },
    { name: "ALTAREA", logo: "/images/altarea logo-Photoroom.webp", scale: 1.8 },
    { name: "VOLTA", logo: "/images/Logo-Volta-Groupe.webp" },
    { name: "SAMFI", logo: "/images/samfi (1).webp" },
    { name: "PROSOLIA", logo: "/images/prosolia.webp" },
    { name: "NOVAFRANCE", logo: "/images/novafrance-energy_nb.webp" },
    { name: "HELEXIA", logo: "/images/helexia.webp", scale: 1.8 },
    { name: "KOURBE", logo: "/images/logo-header.webp", invert: true },
    { name: "ORION", logo: "/images/orion-energies-logo-pilot-in.svg" },
    { name: "GIRASOLE", logo: "/images/logo-2048x506.webp" },
  ];

  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 bg-white overflow-hidden border-y-2 border-[#C6C6C6]/30">
      <style>{`
        .partner-logo {
          filter: brightness(0);
          transition: filter 0.3s, opacity 0.3s;
          opacity: 0.5;
        }
        .partner-logo.invert-logo {
          filter: invert(1) brightness(0);
        }
        .partner-logo:hover {
          filter: brightness(0) saturate(100%) invert(12%) sepia(95%) saturate(6000%) hue-rotate(355deg) brightness(0.95);
          opacity: 1;
        }
        .partner-logo.invert-logo:hover {
          filter: invert(1) brightness(0) saturate(100%) invert(12%) sepia(95%) saturate(6000%) hue-rotate(355deg) brightness(0.95);
          opacity: 1;
        }
      `}</style>

      <div className="mb-14 text-center">
        <h3 className="text-[16px] font-rajdhani font-bold uppercase text-[#E40714] tracking-wider">
          {t("partners.title")}
        </h3>
      </div>

      <div className="relative">
        <motion.div
          className="flex items-center"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: "180px", height: "60px" }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                width={140}
                height={40}
                className={`partner-logo ${partner.invert ? "invert-logo" : ""}`}
                loading="lazy"
                decoding="async"
                style={{
                  height: "40px",
                  width: "140px",
                  objectFit: "contain",
                  transform: partner.scale ? `scale(${partner.scale})` : undefined,
                }}
              />
            </div>
          ))}
        </motion.div>

        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
