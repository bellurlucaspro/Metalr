import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Wheat, Sun, Factory, Landmark } from "lucide-react";
import SEOHead from "../components/SEOHead";

export default function SolutionsPage() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const solutions = [
    {
      title: t("solutions.s1Title"),
      icon: Wheat,
      description: t("solutions.s1Desc"),
      image: "/images/DEE59EC1-2254-49AC-9F23-A0A1BCB6D5A0.webp",
      link: "/solutions/agricole",
      features: [t("solutions.s1f1"), t("solutions.s1f2"), t("solutions.s1f3")],
    },
    {
      title: t("solutions.s2Title"),
      icon: Sun,
      description: t("solutions.s2Desc"),
      image: "/images/panneau3.webp",
      link: "/solutions/photovoltaique",
      features: [t("solutions.s2f1"), t("solutions.s2f2"), t("solutions.s2f3")],
    },
    {
      title: t("solutions.s3Title"),
      icon: Factory,
      description: t("solutions.s3Desc"),
      image: "https://images.unsplash.com/photo-1543847036-8e67e0c526f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWV0YWwlMjBidWlsZGluZ3xlbnwxfHx8fDE3Njg4MjAwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "/solutions/industriel",
      features: [t("solutions.s3f1"), t("solutions.s3f2"), t("solutions.s3f3")],
    },
    {
      title: t("solutions.s4Title"),
      icon: Landmark,
      description: t("solutions.s4Desc"),
      image: "/images/pexels-andres-villamizar-185552101-17392345.webp",
      link: "/solutions/ouvrages-art",
      features: [t("solutions.s4f1"), t("solutions.s4f2"), t("solutions.s4f3")],
    },
  ];

  const advantages = [
    t("solutions.adv1"),
    t("solutions.adv2"),
    t("solutions.adv3"),
    t("solutions.adv4"),
    t("solutions.adv5"),
    t("solutions.adv6"),
  ];

  return (
    <>
      <SEOHead title={t("seo.solutionsTitle")} description={t("seo.solutionsDesc")} path="/solutions" />
      <div className="pt-32 pb-20">
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
          {t("solutions.title")}
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
          {t("solutions.subtitle")}
        </motion.p>
      </section>

      {/* Solutions Grid */}
      <section ref={ref} className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link to={solution.link}>
                <div className="group relative bg-white rounded-3xl overflow-hidden border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-500 shadow-xl hover:shadow-2xl h-full">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/60 to-transparent" />

                    {/* Icon */}
                    <motion.div
                      className="absolute top-6 right-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <solution.icon size={32} color="#E40714" strokeWidth={1.5} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-[28px] text-[#212121] mb-4">
                      {solution.title}
                    </h3>
                    <p className="text-[#1B1B1B] text-[16px] mb-6 leading-relaxed">
                      {solution.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {solution.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#C6C6C6]/20 text-[#1B1B1B] text-[13px] rounded-lg border border-[#C6C6C6]/40"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                      className="flex items-center gap-2 text-[#E40714] group-hover:gap-4 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-[16px]">{t("solutions.discover")}</span>
                      <ArrowRight size={20} />
                    </motion.div>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#E40714]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pourquoi choisir MetalR */}
      <section style={{ backgroundColor: "#F7F7F8", padding: "96px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ marginBottom: 48 }}
          >
            <div
              style={{
                width: 40,
                height: 3,
                backgroundColor: "#E40714",
                borderRadius: 2,
                marginBottom: 24,
              }}
            />
            <h2
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: "#1A1A1A",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {t("solutions.whyTitle")}
            </h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "1fr 1fr",
              gap: 20,
            }}
          >
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  padding: "32px 28px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 160,
                }}
              >
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 700,
                    color: "#E40714",
                    lineHeight: 1,
                    fontFamily: "'Rajdhani', sans-serif",
                    marginBottom: 16,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p style={{ color: "#1A1A1A", fontSize: 15, lineHeight: 1.6, fontWeight: 500 }}>{advantage}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Contact */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: 20,
            padding: "48px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 32,
          }}
        >
          <div>
            <h3
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 8,
              }}
            >
              {t("solutions.ctaTitle")}
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 15,
                lineHeight: 1.6,
                maxWidth: 480,
              }}
            >
              {t("solutions.ctaDesc")}
            </p>
          </div>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#E40714",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "16px 28px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {t("solutions.ctaBtn")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8h14M8 1l7 7-7 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
    </>
  );
}
