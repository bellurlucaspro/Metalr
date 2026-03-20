import { motion } from "motion/react";
import { useState } from "react";
import { Calendar, ArrowRight, Filter, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useTranslation } from "react-i18next";
import { useArticles } from "../hooks/useArticles";
import { useCategories } from "../hooks/useCategories";
import { tField, safe } from "../lib/i18n-helpers";
import SEOHead from "../components/SEOHead";

export default function ActualitesPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [activeFilter, setActiveFilter] = useState("all");

  const { articles, loading } = useArticles({
    category: activeFilter === "all" ? undefined : activeFilter,
  });
  const { categories } = useCategories("article");

  const filters = [
    { key: "all", label: t("actualites.catAll") },
    ...categories.map((c) => ({ key: c.slug, label: tField(c.label, lang) })),
  ];

  const featuredArticle = activeFilter === "all"
    ? articles.find((a) => a.featured)
    : null;

  const regularArticles = articles.filter((a) =>
    featuredArticle ? a.id !== featuredArticle.id : true
  );

  return (
    <>
      <SEOHead title={t("seo.actualitesTitle")} description={t("seo.actualitesDesc")} path="/actualites" />
      <div className="pt-32 pb-20 bg-white">
      {/* Hero Section */}
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
          {t("actualites.heroTitle")}
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
          {t("actualites.heroSubtitle")}
        </motion.p>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <Link to={`/actualites/${featuredArticle.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="group relative bg-white rounded-3xl overflow-hidden border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-500 shadow-2xl hover:shadow-3xl"
              whileHover={{ y: -5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-96 lg:h-auto overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={featuredArticle.image_url || ""}
                      alt={tField(featuredArticle.title, lang)}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-[#E40714] text-white text-[12px] rounded-xl font-bold uppercase tracking-wide shadow-lg">
                      {tField(featuredArticle.badge, lang)}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/50 to-transparent lg:hidden" />
                </div>

                <div className="p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-[#E40714]/10 text-[#E40714] text-[13px] rounded-lg font-bold uppercase">
                      {tField(featuredArticle.category_label, lang)}
                    </span>
                    <div className="flex items-center gap-2 text-[#1B1B1B]/60 text-[14px]">
                      <Calendar size={16} />
                      <span>{featuredArticle.date}</span>
                    </div>
                  </div>
                  <h2 className="text-[42px] text-[#212121] mb-6 font-rajdhani font-bold uppercase leading-[1.1] group-hover:text-[#E40714] transition-colors duration-300">
                    {tField(featuredArticle.title, lang)}
                  </h2>
                  <p className="text-[#1B1B1B] text-[18px] leading-relaxed mb-8">
                    {tField(featuredArticle.excerpt, lang)}
                  </p>
                  <motion.div
                    className="flex items-center gap-2 text-[#E40714] font-bold group-hover:gap-4 transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-[16px]">{t("actualites.readMore")}</span>
                    <ArrowRight size={20} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Link>
        </section>
      )}

      {/* Filtres */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Filter size={20} color="#1B1B1B" />
          {filters.map((filter) => (
            <motion.button
              key={filter.key}
              className={`px-6 py-3 rounded-xl transition-all duration-300 font-bold text-[14px] ${
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

      {/* Articles Grid */}
      {!loading && (
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <Link key={article.id} to={`/actualites/${article.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-500 shadow-lg hover:shadow-2xl h-full flex flex-col"
                  whileHover={{ y: -8 }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <ImageWithFallback
                        src={article.image_url || ""}
                        alt={tField(article.title, lang)}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#E40714] text-white text-[11px] rounded-lg font-bold uppercase tracking-wide">
                        {tField(article.badge, lang)}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#E40714] text-[12px] rounded-lg font-bold">
                        {tField(article.category_label, lang)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-[#1B1B1B]/60 text-[13px] mb-3">
                      <Calendar size={14} />
                      <span>{safe(article.date)}</span>
                    </div>
                    <h3 className="text-[22px] text-[#212121] mb-3 font-rajdhani font-bold uppercase leading-tight group-hover:text-[#E40714] transition-colors duration-300 flex-1">
                      {tField(article.title, lang)}
                    </h3>
                    <p className="text-[#1B1B1B]/80 text-[14px] leading-relaxed mb-4 line-clamp-3">
                      {tField(article.excerpt, lang)}
                    </p>
                    <motion.div
                      className="flex items-center gap-2 text-[#E40714] font-bold text-[14px] group-hover:gap-3 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span>{t("actualites.readArticle")}</span>
                      <ArrowRight size={16} />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {!loading && regularArticles.length === 0 && (
            <div className="text-center py-20 text-[#1B1B1B]/40 text-[16px]">
              {t("actualites.noArticles")}
            </div>
          )}
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#1B1B1B] to-[#212121] rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
          <div className="relative z-10">
            <h3 className="text-[42px] mb-6 font-rajdhani font-bold uppercase">
              {t("actualites.newsletterTitle")}
            </h3>
            <p className="text-[18px] mb-8 max-w-2xl mx-auto leading-relaxed">
              {t("actualites.newsletterDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("actualites.newsletterPlaceholder")}
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-[#E40714] transition-all duration-300"
              />
              <motion.button
                className="bg-[#E40714] text-white px-8 py-4 rounded-xl hover:bg-[#C00612] transition-all duration-300 font-bold shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("actualites.newsletterBtn")}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
    </>
  );
}
