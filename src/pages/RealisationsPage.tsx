import { motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useRealisations } from "../hooks/useRealisations";
import { useCategories } from "../hooks/useCategories";
import { tField } from "../lib/i18n-helpers";
import SEOHead from "../components/SEOHead";

export default function RealisationsPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [activeFilter, setActiveFilter] = useState("all");

  const { realisations, loading } = useRealisations({
    category: activeFilter === "all" ? undefined : activeFilter,
  });
  const { categories } = useCategories("realisation");

  const filters = [
    { key: "all", label: t("realisations.catAll") },
    ...categories.map((c) => ({ key: c.slug, label: tField(c.label, lang) })),
  ];

  return (
    <>
      <SEOHead title={t("seo.realisationsTitle")} description={t("seo.realisationsDesc")} path="/realisations" />
      <div className="pt-32 pb-20">
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 80 }}>
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
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#1A1A1A",
            lineHeight: 1.05,
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          {t("realisations.heroTitle")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            color: "rgba(27,27,27,0.5)",
            fontSize: 15,
            lineHeight: 1.7,
            maxWidth: 900,
          }}
        >
          {t("realisations.heroSubtitle")}
        </motion.p>
      </section>

      {/* Filtres */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Filter size={20} color="#1B1B1B" />
          {filters.map((filter) => (
            <motion.button
              key={filter.key}
              className={`px-6 py-3 rounded-xl transition-all duration-300 font-bold ${
                activeFilter === filter.key
                  ? "bg-[#E40714] text-white shadow-lg"
                  : "bg-white text-[#1B1B1B] border-2 border-[#C6C6C6]/30 hover:border-[#E40714]"
              }`}
              onClick={() => setActiveFilter(filter.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-3 border-[#E40714] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Grille projets */}
      {!loading && (
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {realisations.map((project, index) => (
              <Link key={project.id} to={`/realisations/${project.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                  whileHover={{ y: -8 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.main_image_url || ""}
                      alt={tField(project.title, lang)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      width={400}
                      height={300}
                      decoding="async"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="inline-block px-3 py-1 bg-[#E40714] text-white text-[12px] rounded-lg mb-2 font-bold uppercase tracking-wide">
                        {tField(project.category_label, lang)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[22px] text-[#212121] mb-3 font-rajdhani font-bold uppercase">
                      {tField(project.title, lang)}
                    </h3>
                    <div className="space-y-1 text-[14px] text-[#1B1B1B]/70">
                      <p>{tField(project.location, lang)}</p>
                      <p>{project.year}{project.surface ? ` • ${project.surface}` : ""}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {!loading && realisations.length === 0 && (
            <div className="text-center py-20 text-[#1B1B1B]/40 text-[16px]">
              {t("realisations.noRealisations")}
            </div>
          )}
        </section>
      )}
    </div>
    </>
  );
}
