import { motion } from "motion/react";
import { ArrowLeft, MapPin, Calendar, Ruler, CheckCircle, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function StabulationPage() {
  const { t } = useTranslation();

  const projectDetails = {
    title: t("stabulation.title"),
    category: t("stabulation.category"),
    location: t("stabulation.location"),
    year: "2024",
    surface: "1200 m²",
    client: t("stabulation.client"),
    duration: t("stabulation.duration"),
    budget: t("stabulation.budget"),
    mainImage: "https://images.unsplash.com/photo-1653233532156-327bf57aab82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3clMjBiYXJuJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzY4ODIwMDc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1675511029093-740b26a1c4ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc3RlZWwlMjBjb25zdHJ1Y3Rpb24lMjBkZXRhaWx8ZW58MXx8fHwxNzY4OTA4NDkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1745184778017-7b935ed2a4c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMHN0cnVjdHVyZSUyMHdlbGRpbmd8ZW58MXx8fHwxNzY4OTA4NDkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1653233532156-327bf57aab82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3clMjBiYXJuJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzY4ODIwMDc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  };

  const challenges = [
    t("stabulation.c1"),
    t("stabulation.c2"),
    t("stabulation.c3"),
    t("stabulation.c4"),
  ];

  const solutions = [
    t("stabulation.s1"),
    t("stabulation.s2"),
    t("stabulation.s3"),
    t("stabulation.s4"),
  ];

  return (
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
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[60vh] rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src={projectDetails.mainImage}
            alt={projectDetails.title}
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
                {projectDetails.category}
              </span>
              <h1 className="text-white text-[64px] mb-4 font-rajdhani font-bold uppercase leading-[1.1]">
                {projectDetails.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-white/90 text-[16px]">
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span>{projectDetails.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>{projectDetails.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler size={20} />
                  <span>{projectDetails.surface}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Project Info Cards */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: t("stabulation.clientLabel"), value: projectDetails.client },
            { label: t("stabulation.durationLabel"), value: projectDetails.duration },
            { label: t("stabulation.budgetLabel"), value: projectDetails.budget },
          ].map((item, index) => (
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
          <p className="text-[#1B1B1B] text-[18px] leading-relaxed max-w-4xl">
            {t("stabulation.projectDesc")}
          </p>
        </motion.div>
      </section>

      {/* Challenges & Solutions */}
      <section className="bg-gradient-to-br from-[#F5F5F5] to-white py-20 mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Challenges */}
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
                {challenges.map((challenge, index) => (
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
                    <p className="text-[#1B1B1B] text-[16px] leading-relaxed">{challenge}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Solutions */}
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
                {solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 bg-white rounded-xl p-4 border-2 border-[#C6C6C6]/20 hover:border-[#E40714]/50 transition-all duration-300"
                  >
                    <CheckCircle size={24} className="text-[#E40714] shrink-0 mt-1" />
                    <p className="text-[#1B1B1B] text-[16px] leading-relaxed">{solution}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
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
          {projectDetails.gallery.map((image, index) => (
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
                alt={`Gallery ${index + 1}`}
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  className="bg-white text-[#E40714] px-10 py-5 rounded-xl hover:bg-white/90 transition-all duration-300 font-bold text-[16px] shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("stabulation.ctaContactBtn")}
                </motion.button>
              </Link>
              <motion.button
                className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-xl border-2 border-white hover:bg-white/20 transition-all duration-300 font-bold text-[16px] flex items-center gap-2 justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={20} />
                {t("stabulation.ctaDownloadBtn")}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
