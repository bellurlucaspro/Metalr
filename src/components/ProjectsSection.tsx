import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "react-i18next";
import { useRealisations } from "../hooks/useRealisations";
import { tField } from "../lib/i18n-helpers";

export function ProjectsSection() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { realisations, loading } = useRealisations({ limit: 6 });

  return (
    <section id="realisations" className="py-24 px-6 bg-white">
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
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            {t("projects.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{
              color: "rgba(27,27,27,0.5)",
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: 560,
            }}
          >
            {t("projects.subtitle")}
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-3 border-[#E40714] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {realisations.map((project, index) => (
              <Link key={project.id} to={`/realisations/${project.slug}`}>
                <div
                  className="rounded-3xl overflow-hidden"
                  style={{ height: index % 3 === 0 ? 400 : index % 3 === 1 ? 350 : 450 }}
                >
                <motion.div
                  className="relative group h-full cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileHover={{ scale: 1.03 }}
                  style={{
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                  }}
                >
                  <ImageWithFallback
                    src={project.main_image_url || ""}
                    alt={tField(project.title, lang)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{
                        y: hoveredIndex === index ? 0 : 20,
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="mb-4"
                    >
                      <span className="inline-block px-3 py-1 bg-[#E40714] text-white rounded-full text-sm font-bold uppercase">
                        {tField(project.category_label, lang)}
                      </span>
                    </motion.div>
                    <h3 className="text-[#212121] mb-4 font-rajdhani font-bold text-[22px] uppercase">
                      {tField(project.title, lang)}
                    </h3>
                    <motion.span
                      className="inline-block px-6 py-3 bg-[#E40714] text-white rounded-xl font-bold"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{
                        y: hoveredIndex === index ? 0 : 20,
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {t("projects.viewProject")}
                    </motion.span>
                  </div>
                  <motion.div
                    className="absolute inset-0 border-2 border-[#E40714] rounded-3xl pointer-events-none"
                    style={{ borderRadius: "1.5rem" }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      scale: hoveredIndex === index ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link to="/realisations">
            <motion.button
              className="px-8 py-4 bg-white border-2 border-[#C6C6C6] text-[#1B1B1B] rounded-full hover:border-[#E40714] hover:text-[#E40714] transition-all duration-300 font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("projects.viewAll")}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
