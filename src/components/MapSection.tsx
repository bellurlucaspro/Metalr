import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Link } from "react-router-dom";
import createGlobe from "cobe";
import { useTranslation } from "react-i18next";
import { ChevronRight, MapPin } from "lucide-react";

type LocationData = {
  key: string;
  flagCode: string;
  lat: number;
  lng: number;
  image?: string;
};

const locations: LocationData[] = [
  { key: "france",      flagCode: "fr", lat: 46.2276, lng: 2.2137,   image: "/images/IMG_1447.webp" },
  { key: "romania",     flagCode: "ro", lat: 45.9432, lng: 24.9668 },
  { key: "kosovo",      flagCode: "xk", lat: 42.6026, lng: 20.903 },
  { key: "tunisia",     flagCode: "tn", lat: 33.8869, lng: 9.5375 },
  { key: "guinea",      flagCode: "gn", lat: 9.9456,  lng: -9.6966 },
  { key: "thailand",    flagCode: "th", lat: 15.87,   lng: 100.9925 },
  { key: "uae",         flagCode: "ae", lat: 23.4241, lng: 53.8478 },
  { key: "ivoryCoast",  flagCode: "ci", lat: 7.54,    lng: -5.5471 },
];

function FlagImg({ code, size = 32 }: { code: string; size?: number }) {
  return (
    <div
      className="overflow-hidden rounded-full shadow-sm border border-black/5"
      style={{ width: size, height: size, flexShrink: 0 }}
    >
      <img
        src={`https://hatscripts.github.io/circle-flags/flags/${code}.svg`}
        alt={code.toUpperCase()}
        width={size}
        height={size}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

const THETA = 0.3;
const HIT_RADIUS = 22;

function projectPoint(lat: number, lng: number, phi: number) {
  const latR = (lat * Math.PI) / 180;
  const lngR = (lng * Math.PI) / 180;

  const x = Math.cos(latR) * Math.sin(lngR);
  const y = Math.sin(latR);
  const z = Math.cos(latR) * Math.cos(lngR);

  const x1 = Math.cos(phi) * x - Math.sin(phi) * z;
  const z1 = Math.sin(phi) * x + Math.cos(phi) * z;

  const y2 = Math.cos(THETA) * y - Math.sin(THETA) * z1;
  const z2 = Math.sin(THETA) * y + Math.cos(THETA) * z1;

  return { nx: x1, ny: y2, visible: z2 > 0.05 };
}

export function MapSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const isPausedRef = useRef(false);

  const [hoveredLocation, setHoveredLocation] = useState<LocationData | null>(null);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [cursor, setCursor] = useState<"default" | "pointer">("default");
  const hoveredRef = useRef<string | null>(null);
  const rafId = useRef(0);

  const isInView = useInView(sectionRef as any, { once: true, amount: 0.2 });
  useEffect(() => {
    if (!canvasRef.current) return;
    let phi = 0;
    let prev = 0;

    const globe = (createGlobe as any)(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1040,
      height: 1040,
      phi: 0,
      theta: THETA,
      dark: 0,
      diffuse: 1.5,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.85, 0.87, 0.93],
      markerColor: [0.9, 0.03, 0.08],
      glowColor: [0.88, 0.9, 0.96],
      markers: locations.map((l) => ({ location: [l.lat, l.lng], size: 0.07 })),
      onRender: (state: Record<string, any>) => {
        const now = performance.now();
        if (prev) {
          const dt = Math.min((now - prev) / 1000, 0.05); // clamp to 50ms max
          if (!isPausedRef.current) phi += 0.18 * dt;
        }
        prev = now;
        state.phi = phi;
        phiRef.current = phi;
      },
    });

    return () => globe.destroy();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!canvasRef.current) return;

    // Throttle via rAF to avoid flooding React with setState during animation frames
    cancelAnimationFrame(rafId.current);
    const clientX = e.clientX;
    const clientY = e.clientY;

    rafId.current = requestAnimationFrame(() => {
      if (!canvasRef.current) return;
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const mx = clientX - canvasRect.left;
      const my = clientY - canvasRect.top;
      const cssSize = canvasRect.width;
      const cx = cssSize / 2;
      const cy = cssSize / 2;
      const globeRadius = (cssSize / 2) * 0.88;

      let closest: LocationData | null = null;
      let minDist = HIT_RADIUS;

      for (const loc of locations) {
        const { nx, ny, visible } = projectPoint(loc.lat, loc.lng, phiRef.current);
        if (!visible) continue;
        const sx = cx + nx * globeRadius;
        const sy = cy - ny * globeRadius;
        const dist = Math.sqrt((mx - sx) ** 2 + (my - sy) ** 2);
        if (dist < minDist) { minDist = dist; closest = loc; }
      }

      isPausedRef.current = closest !== null;

      // Only trigger re-render if the hovered location actually changed
      const newKey = closest?.key ?? null;
      if (newKey !== hoveredRef.current) {
        hoveredRef.current = newKey;
        setHoveredLocation(closest);
        setCursor(closest ? "pointer" : "default");
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    isPausedRef.current = false;
    setHoveredLocation(null);
    setCursor("default");
  }, []);

  const toggleExpand = (key: string) =>
    setExpandedKey((prev) => (prev === key ? null : key));

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Titre */}
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
              lineHeight: 1.1,
              marginBottom: 16,
              letterSpacing: "-0.01em",
            }}
          >
            {t("map.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{
              color: "rgba(27,27,27,0.5)",
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: 560,
            }}
          >
            {t("map.subtitle")}
          </motion.p>
        </div>

        {/* Container principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-3xl p-8 lg:p-10 border-2 border-[#C6C6C6]/30 shadow-xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(198,198,198,0.10) 0%, rgba(255,255,255,0.80) 100%)",
          }}
        >

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* Globe — gauche */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="flex justify-center"
            >
              <div
                className="w-full max-w-[520px] aspect-square"
                style={{ cursor }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <canvas
                  ref={canvasRef}
                  width={1040}
                  height={1040}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </motion.div>

            {/* Liste pays — droite */}
            <div className="flex flex-col">
              {/* Header liste */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-3 mb-5"
              >
                <div className="h-px w-8 bg-[#E40714]" />
                <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#E40714]">
                  {t("map.countriesLabel") !== "map.countriesLabel" ? t("map.countriesLabel") : "Nos implantations"}
                </span>
              </motion.div>

              {/* Scrollable list */}
              <div className="flex flex-col gap-2 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin">
                {locations.map((loc, index) => {
                  const isActive = hoveredLocation?.key === loc.key;
                  const isExpanded = expandedKey === loc.key;
                  return (
                    <motion.div
                      key={loc.key}
                      initial={{ opacity: 0, x: 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.35 + index * 0.06 }}
                      className="rounded-2xl overflow-hidden"
                    >
                      {/* Row cliquable */}
                      <button
                        onClick={() => toggleExpand(loc.key)}
                        className={`group w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 text-left relative ${
                          isExpanded
                            ? "bg-[#E40714] shadow-lg shadow-[#E40714]/25 rounded-b-none"
                            : isActive
                              ? "bg-[#E40714] shadow-lg shadow-[#E40714]/25"
                              : "bg-white/80 border border-transparent hover:border-[#E40714]/20 hover:shadow-md"
                        }`}
                      >
                        {/* Flag container */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isActive || isExpanded
                            ? "bg-white/20"
                            : "bg-[#F5F5F5] group-hover:bg-[#E40714]/10"
                        }`}>
                          <FlagImg code={loc.flagCode} size={32} />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className={`text-[15px] font-semibold leading-tight transition-colors duration-300 ${isActive || isExpanded ? "text-white" : "text-[#1B1B1B] group-hover:text-[#E40714]"}`}>
                            {t(`map.locations.${loc.key}.name`)}
                          </div>
                          <div className={`text-[12px] truncate mt-1 transition-colors duration-300 ${isActive || isExpanded ? "text-white/70" : "text-[#1B1B1B]/45"}`}>
                            {t(`map.locations.${loc.key}.project`)}
                          </div>
                        </div>

                        {/* Chevron rotate */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isActive || isExpanded
                            ? "bg-white/20"
                            : "bg-transparent group-hover:bg-[#E40714]/10"
                        }`}>
                          <ChevronRight
                            size={16}
                            className={`transition-all duration-300 ${isActive || isExpanded ? "text-white" : "text-[#C6C6C6] group-hover:text-[#E40714]"}`}
                            style={{
                              transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </div>
                      </button>

                      {/* Expanded detail */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="bg-white rounded-b-2xl overflow-hidden">
                              {/* Image pour France */}
                              {loc.image && (
                                <div className="relative h-40 overflow-hidden mx-4 mt-4 rounded-xl">
                                  <img
                                    src={loc.image}
                                    alt={t(`map.locations.${loc.key}.name`)}
                                    width={400}
                                    height={160}
                                    className="w-full h-full object-cover rounded-xl"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                </div>
                              )}

                              <div className="px-6 pt-4 pb-5">
                                {/* Séparateur subtil */}
                                <div className="w-8 h-0.5 bg-[#E40714]/20 rounded-full mb-3" />

                                {/* Badge spécialité */}
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#E40714]/8 rounded-lg mb-2.5">
                                  <MapPin size={10} className="text-[#E40714]" />
                                  <span className="text-[#E40714] text-[11px] font-semibold uppercase tracking-wider">
                                    {t(`map.locations.${loc.key}.specialty`)}
                                  </span>
                                </span>

                                {/* Description */}
                                <p className="text-[#1B1B1B]/50 text-[13px] leading-relaxed">
                                  {t(`map.locations.${loc.key}.description`)}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 text-center"
        >
          <Link to="/implantations">
            <motion.button
              className="bg-[#E40714] text-white px-8 py-4 rounded-full hover:bg-[#C00612] transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("map.cta")}
            </motion.button>
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
