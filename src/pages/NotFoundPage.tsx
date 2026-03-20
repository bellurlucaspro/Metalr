import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            style={{
              fontSize: 140,
              fontWeight: 800,
              lineHeight: 1,
              background: "linear-gradient(135deg, #E40714 0%, #1B1B1B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.04em",
            }}
          >
            404
          </div>
        </motion.div>

        <motion.h1
          className="text-[#212121] text-[28px] font-bold mt-4 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          {t("notFound.title")}
        </motion.h1>

        <motion.p
          className="text-[#1B1B1B]/50 text-[16px] mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          {t("notFound.description")}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <Link to="/">
            <motion.a
              className="px-8 py-4 bg-[#E40714] text-white rounded-full hover:bg-[#E40714]/90 transition-all duration-300 inline-flex items-center justify-center"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(228, 7, 20, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              {t("notFound.backHome")}
            </motion.a>
          </Link>
          <Link to="/contact">
            <motion.a
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-[#1B1B1B] rounded-full border-2 border-[#C6C6C6] hover:border-[#E40714] transition-all duration-300 inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("notFound.contact")}
            </motion.a>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
