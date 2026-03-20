import { motion } from "motion/react";
import { ArrowLeft, MapPin, Calendar, Ruler, CheckCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRealisation } from "../../hooks/useRealisations";
import { tField, safe } from "../../lib/i18n-helpers";
import SEOHead from "../../components/SEOHead";

export default function RealisationDetailPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { slug } = useParams<{ slug: string }>();
  const { realisation, loading, error } = useRealisation(slug || "");

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center">
        <div className="w-10 h-10 border-3 border-[#E40714] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !realisation) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-[48px] font-rajdhani font-bold text-[#1B1B1B] mb-4">
          {t("realisations.notFound")}
        </h1>
        {error && <p className="text-[#1B1B1B]/50 text-[14px] mb-4">{error}</p>}
        <Link to="/realisations" className="text-[#E40714] font-bold hover:underline">
          {t("stabulation.backBtn")}
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead title={tField(realisation.title, lang)} description={tField(realisation.description, lang) || tField(realisation.title, lang)} path={`/realisations/${slug}`} image={realisation.main_image_url || undefined} />
      <div className="pt-32 pb-20 bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <Link to="/realisations">
          <motion.button
            className="flex items-center gap-2 text-[#1B1B1B] hover:text-[#E40714] transition-colors duration-300"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={20} />
            <span>{t("stabulation.backBtn")}</span>
          </motion.button>
        </Link>
      </div>

      {/* Hero Image */}
      {realisation.main_image_url && (
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[60vh] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={realisation.main_image_url}
              alt={tField(realisation.title, lang)}
              className="w-full h-full object-cover"
              width={1200}
              height={800}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/80 via-[#212121]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="inline-block px-4 py-2 bg-[#E40714] text-white text-[14px] rounded-xl mb-4 font-rajdhani font-bold uppercase tracking-wide">
                  {tField(realisation.category_label, lang)}
                </span>
                <h1 className="text-white text-[64px] mb-4 font-rajdhani font-bold uppercase leading-[1.1]">
                  {tField(realisation.title, lang)}
                </h1>
                <div className="flex flex-wrap gap-6 text-white/90 text-[16px]">
                  <div className="flex items-center gap-2">
                    <MapPin size={20} />
                    <span>{tField(realisation.location, lang)}</span>
                  </div>
                  {realisation.year && (
                    <div className="flex items-center gap-2">
                      <Calendar size={20} />
                      <span>{safe(realisation.year)}</span>
                    </div>
                  )}
                  {realisation.surface && (
                    <div className="flex items-center gap-2">
                      <Ruler size={20} />
                      <span>{safe(realisation.surface)}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Project Info Cards */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: t("stabulation.clientLabel"), value: safe(realisation.client, lang) },
            { label: t("stabulation.durationLabel"), value: safe(realisation.duration, lang) },
            { label: t("stabulation.budgetLabel"), value: safe(realisation.budget, lang) },
          ]
            .filter((item) => item.value)
            .map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-gradient-to-br from-[#C6C6C6]/10 to-white rounded-2xl p-8 border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg"
              >
                <p className="text-[#1B1B1B]/60 text-[14px] mb-2 uppercase tracking-wide">{item.label}</p>
                <p className="text-[#212121] text-[28px] font-rajdhani font-bold">{item.value}</p>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Description */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[48px] text-[#212121] mb-8 font-rajdhani font-bold uppercase relative inline-block">
            {t("stabulation.projectTitle")}
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#E40714] rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
          {tField(realisation.description, lang) && (
            <div
              className="article-content prose prose-lg max-w-4xl prose-headings:font-rajdhani prose-headings:font-bold prose-headings:uppercase prose-headings:text-[#212121] prose-p:text-[#1B1B1B] prose-p:text-[18px] prose-p:leading-relaxed prose-strong:text-[#E40714] prose-a:text-[#E40714] prose-li:text-[#1B1B1B]"
              dangerouslySetInnerHTML={{ __html: tField(realisation.description, lang) }}
            />
          )}
        </motion.div>
      </section>

      {/* Challenges & Solutions */}
      {(Array.isArray(realisation.challenges) && realisation.challenges.length > 0 || Array.isArray(realisation.solutions) && realisation.solutions.length > 0) && (
        <section className="bg-gradient-to-br from-[#F5F5F5] to-white py-20 mb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Challenges */}
              {Array.isArray(realisation.challenges) && realisation.challenges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-[36px] text-[#212121] mb-8 font-rajdhani font-bold uppercase">
                    {t("stabulation.challengesTitle")}
                  </h3>
                  <div className="space-y-4">
                    {realisation.challenges.map((challenge, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4 bg-white rounded-xl p-4 border-2 border-[#C6C6C6]/20 hover:border-[#E40714]/50 transition-all duration-300"
                      >
                        <div className="w-8 h-8 bg-[#E40714]/10 rounded-lg flex items-center justify-center shrink-0">
                          <span className="text-[#E40714] text-[18px]">⚡</span>
                        </div>
                        <p className="text-[#1B1B1B] text-[16px] leading-relaxed">
                          {tField(challenge, lang)}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Solutions */}
              {Array.isArray(realisation.solutions) && realisation.solutions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-[36px] text-[#212121] mb-8 font-rajdhani font-bold uppercase">
                    {t("stabulation.solutionsTitle")}
                  </h3>
                  <div className="space-y-4">
                    {realisation.solutions.map((solution, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4 bg-white rounded-xl p-4 border-2 border-[#C6C6C6]/20 hover:border-[#E40714]/50 transition-all duration-300"
                      >
                        <CheckCircle size={24} className="text-[#E40714] shrink-0 mt-1" />
                        <p className="text-[#1B1B1B] text-[16px] leading-relaxed">
                          {tField(solution, lang)}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {Array.isArray(realisation.gallery) && realisation.gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[48px] text-[#212121] mb-12 font-rajdhani font-bold uppercase text-center relative inline-block w-full"
          >
            <span className="relative">
              {t("stabulation.galleryTitle")}
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-[#E40714] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "200px" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {realisation.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                whileHover={{ y: -10 }}
              >
                <img
                  src={image}
                  alt={`${tField(realisation.title, lang)} - ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  width={400}
                  height={320}
                  decoding="async"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#212121]/0 group-hover:bg-[#212121]/30 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#E40714] to-[#C00612] rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
          <div className="relative z-10">
            <h3 className="text-[42px] mb-6 font-rajdhani font-bold uppercase">{t("stabulation.ctaTitle")}</h3>
            <p className="text-[18px] mb-8 max-w-2xl mx-auto leading-relaxed">
              {t("stabulation.ctaDesc")}
            </p>
            <Link to="/contact">
              <motion.button
                className="bg-white text-[#E40714] px-10 py-5 rounded-xl hover:bg-white/90 transition-all duration-300 font-bold text-[16px] shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("stabulation.ctaContactBtn")}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
    </>
  );
}
