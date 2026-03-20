import { motion } from "motion/react";
import { ArrowLeft, Calendar, Share2, User, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useArticle, useArticles } from "../../hooks/useArticles";
import { tField, safe } from "../../lib/i18n-helpers";
import SEOHead from "../../components/SEOHead";
import ArticleContent from "../../components/ArticleContent";

export default function ActualiteDetailPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { slug } = useParams<{ slug: string }>();
  const { article, loading, error } = useArticle(slug || "");
  const { articles: relatedArticles } = useArticles({ limit: 3 });

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center">
        <div className="w-10 h-10 border-3 border-[#E40714] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-[48px] font-rajdhani font-bold text-[#1B1B1B] mb-4">{t("actualites.articleNotFound")}</h1>
        {error && <p className="text-[#1B1B1B]/50 text-[14px] mb-4">{error}</p>}
        <Link to="/actualites" className="text-[#E40714] font-bold hover:underline">
          {t("actualites.backToNews")}
        </Link>
      </div>
    );
  }

  const related = relatedArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <SEOHead title={tField(article.title, lang)} description={tField(article.excerpt, lang) || tField(article.title, lang)} path={`/actualites/${slug}`} type="article" image={article.image_url || undefined} />
      <div className="pt-32 pb-20 bg-white">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <Link to="/actualites">
          <motion.button
            className="flex items-center gap-2 text-[#1B1B1B] hover:text-[#E40714] transition-colors duration-300 font-bold"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={20} />
            <span>{t("actualites.backToNews")}</span>
          </motion.button>
        </Link>
      </div>

      {/* Article Header */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-2 bg-[#E40714]/10 text-[#E40714] text-[13px] rounded-xl font-bold uppercase tracking-wide">
              {tField(article.category_label, lang)}
            </span>
            <span className="px-4 py-2 bg-[#E40714] text-white text-[12px] rounded-xl font-bold uppercase tracking-wide">
              {tField(article.badge, lang)}
            </span>
          </div>

          <h1 className="text-[56px] lg:text-[64px] text-[#212121] mb-8 font-rajdhani font-bold uppercase leading-[1.1]">
            {tField(article.title, lang)}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-[#1B1B1B]/70 text-[15px] mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{safe(article.date)}</span>
            </div>
            {article.author && (
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{safe(article.author)}</span>
              </div>
            )}
            {article.read_time && (
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{safe(article.read_time)}</span>
              </div>
            )}
          </div>

          <motion.button
            className="flex items-center gap-2 text-[#E40714] hover:text-[#C00612] transition-colors duration-300 font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            <Share2 size={18} />
            <span>{t("actualites.shareArticle")}</span>
          </motion.button>
        </motion.div>
      </section>

      {/* Featured Image */}
      {article.image_url && (
        <section className="max-w-5xl mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[60vh] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={article.image_url}
              alt={tField(article.title, lang)}
              className="w-full h-full object-cover"
              width={1200}
              height={800}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/30 to-transparent" />
          </motion.div>
        </section>
      )}

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ArticleContent content={tField(article.content, lang)} className="article-content" />
        </motion.div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[42px] text-[#212121] mb-12 font-rajdhani font-bold uppercase text-center"
          >
            {t("actualites.similarArticles")}
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((item, index) => (
              <Link key={item.id} to={`/actualites/${item.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl overflow-hidden border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image_url || ""}
                      alt={tField(item.title, lang)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      width={400}
                      height={300}
                      decoding="async"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-[#E40714] text-white text-[11px] rounded-lg font-bold uppercase">
                        {tField(item.category_label, lang)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-[18px] text-[#212121] font-rajdhani font-bold uppercase leading-tight group-hover:text-[#E40714] transition-colors duration-300">
                      {tField(item.title, lang)}
                    </h4>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#E40714] to-[#C00612] rounded-3xl p-12 text-center text-white"
        >
          <h3 className="text-[36px] mb-6 font-rajdhani font-bold uppercase">
            {t("stabulation.ctaTitle")}
          </h3>
          <p className="text-[18px] mb-8 leading-relaxed">
            {t("stabulation.ctaDesc")}
          </p>
          <Link to="/contact">
            <motion.button
              className="bg-white text-[#E40714] px-10 py-5 rounded-xl hover:bg-white/90 transition-all duration-300 font-bold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("stabulation.ctaContactBtn")}
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
    </>
  );
}
