import { motion, useScroll } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";

/* ── Nav 3-bloc : variables ajustables ─────────────── */
const GAP = 3;
const BORDER = 1;
const NAV_BORDER = "#E0E0E0";
const NAV_H = 52;
const NAV_RADIUS = 14;

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#E40714] z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const solutionsCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSolutionsEnter = () => {
    if (solutionsCloseTimeout.current) clearTimeout(solutionsCloseTimeout.current);
    setIsSolutionsOpen(true);
  };

  const handleSolutionsLeave = () => {
    solutionsCloseTimeout.current = setTimeout(() => setIsSolutionsOpen(false), 150);
  };
  const [currentLang, setCurrentLang] = useState("FR");
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLangChange = (code: string) => {
    const lngCode = code.toLowerCase();
    i18n.changeLanguage(lngCode);
    setCurrentLang(code);
    document.documentElement.dir = lngCode === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lngCode;
  };

  const handleScrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: t("nav.home"), href: "/" },
    {
      label: t("nav.solutions"),
      href: "/solutions",
      submenu: [
        { label: t("nav.agricultural"), href: "/solutions/agricole" },
        { label: t("nav.photovoltaic"), href: "/solutions/photovoltaique" },
        { label: t("nav.industrial"), href: "/solutions/industriel" },
        { label: t("nav.civilEngineering"), href: "/solutions/ouvrages-art" },
      ],
    },
    { label: t("nav.projects"), href: "/realisations" },
    { label: t("nav.news"), href: "/actualites" },
    { label: t("nav.about"), href: "/a-propos" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const languages = [
    { code: "FR", label: "Français", flagUrl: "https://flagcdn.com/w80/fr.png" },
    { code: "EN", label: "English", flagUrl: "https://flagcdn.com/w80/gb.png" },
    { code: "ZH", label: "中文", flagUrl: "https://flagcdn.com/w80/cn.png" },
    { code: "AR", label: "العربية", flagUrl: "https://flagcdn.com/w80/sa.png" },
  ];

  return (
    <>
      <motion.nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-7xl">

        {/* ═══ Desktop : 3 blocs emboîtés ═══════════════ */}
        <div
          className="hidden lg:flex items-stretch"
          style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.10)) drop-shadow(0 1px 4px rgba(0,0,0,0.06))", gap: GAP, height: NAV_H }}
        >

          {/* ▸ nav3__left — Logo */}
          <motion.div
            className="relative z-20 bg-white backdrop-blur-xl"
            style={{ border: `${BORDER}px solid ${NAV_BORDER}`, borderRadius: NAV_RADIUS }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative flex items-center h-full px-6">
              <Link to="/" className="flex items-center leading-none">
                <Logo className="h-20 block" />
              </Link>
            </div>
          </motion.div>

          {/* ▸ nav3__center — Onglets */}
          <div
            className="relative z-10 flex-1 bg-white backdrop-blur-xl"
            style={{ border: `${BORDER}px solid ${NAV_BORDER}`, borderRadius: NAV_RADIUS }}
          >
            <div
              className="relative flex items-center justify-between h-full leading-none px-8"
            >
              {navItems.map((item, index) => (
                <React.Fragment key={item.href}>
                {index > 0 && (
                  <div style={{ width: 1, height: 18, backgroundColor: "#D0D0D0", flexShrink: 0 }} />
                )}
                <div className="relative" style={{ padding: "0 12px" }}>
                  {item.submenu ? (
                    <div
                      className="relative"
                      onMouseEnter={handleSolutionsEnter}
                      onMouseLeave={handleSolutionsLeave}
                    >
                      <motion.div
                        className={`flex items-center gap-1 hover:text-[#E40714] transition-colors duration-300 cursor-pointer text-[15px] relative ${
                          location.pathname.startsWith(item.href) ? 'text-[#E40714] font-bold' : 'text-[#1B1B1B]'
                        }`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Link to={item.href}>{item.label}</Link>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${isSolutionsOpen ? 'rotate-180' : ''}`}
                        />
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E40714] rounded-full"
                          initial={{ scaleX: location.pathname.startsWith(item.href) ? 1 : 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>

                      {isSolutionsOpen && (
                        <motion.div
                          className="absolute top-full mt-4 bg-white/95 backdrop-blur-xl rounded-xl border-2 border-[#1B1B1B]/10 shadow-xl overflow-hidden min-w-[200px] left-0"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {item.submenu.map((subItem) => (
                            <Link key={subItem.href} to={subItem.href}>
                              <motion.div
                                className="px-4 py-3 text-[#1B1B1B] hover:bg-[#E40714]/10 hover:text-[#E40714] transition-colors duration-200"
                                whileHover={{ x: 5 }}
                              >
                                {subItem.label}
                              </motion.div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link to={item.href}>
                      <motion.div
                        className={`hover:text-[#E40714] transition-colors duration-300 relative text-[15px] ${
                          (item.href === '/' ? location.pathname === '/' : location.pathname.startsWith(item.href)) ? 'text-[#E40714] font-bold' : 'text-[#1B1B1B]'
                        }`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {item.label}
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E40714] rounded-full"
                          initial={{ scaleX: (item.href === '/' ? location.pathname === '/' : location.pathname.startsWith(item.href)) ? 1 : 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </Link>
                  )}
                </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ▸ nav3__right — Langue (drapeaux alignés) */}
          <div
            className="relative z-20 bg-white backdrop-blur-xl"
            style={{ border: `${BORDER}px solid ${NAV_BORDER}`, borderRadius: NAV_RADIUS }}
          >
            <div className="relative flex items-center h-full px-3 gap-1">
              {languages.map((lang) => {
                const isSelected = currentLang === lang.code;
                return (
                  <motion.button
                    key={lang.code}
                    className={`relative flex items-center justify-center rounded-full transition-all duration-200 overflow-hidden ${
                      isSelected
                        ? "ring-2 ring-[#E40714] ring-offset-1"
                        : "ring-1 ring-black/10 hover:ring-black/25"
                    }`}
                    style={{ width: 30, height: 30 }}
                    onClick={() => handleLangChange(lang.code)}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    title={lang.label}
                  >
                    <img
                      src={lang.flagUrl}
                      alt={lang.label}
                      width={30}
                      height={30}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══ Mobile navbar (inchangée) ═════════════════ */}
        <div className="lg:hidden flex items-center justify-between bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl px-4 py-3 border border-[#C6C6C6]">
          <Link to="/" className="flex items-center">
            <Logo className="h-20" />
          </Link>
          <motion.button
            className="text-[#1B1B1B] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-30 bg-white/95 backdrop-blur-xl lg:hidden"
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? "0%" : "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <div key={item.href} className="text-center">
              <Link to={item.href} onClick={() => setIsMenuOpen(false)}>
                <motion.div
                  className="text-[#1B1B1B] hover:text-[#E40714] transition-colors duration-300 text-[20px]"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : 50 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.div>
              </Link>
              {item.submenu && (
                <div className="mt-2 space-y-2">
                  {item.submenu.map((subItem) => (
                    <Link key={subItem.href} to={subItem.href} onClick={() => setIsMenuOpen(false)}>
                      <motion.div
                        className="text-[#1B1B1B]/70 hover:text-[#E40714] transition-colors duration-300 text-[16px]"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : 50 }}
                        transition={{ delay: (index + 0.5) * 0.1 }}
                      >
                        {subItem.label}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex gap-3 mt-4">
            {languages.map((lang) => {
              const isSelected = currentLang === lang.code;
              return (
                <motion.button
                  key={lang.code}
                  className={`w-11 h-11 rounded-full flex items-center justify-center overflow-hidden transition-all ${
                    isSelected
                      ? "ring-2 ring-[#E40714] ring-offset-2"
                      : "ring-1 ring-black/10 hover:ring-black/30"
                  }`}
                  onClick={() => {
                    handleLangChange(lang.code);
                    setIsMenuOpen(false);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img src={lang.flagUrl} alt={lang.label} width={44} height={44} className="w-full h-full object-cover" loading="lazy" decoding="async" draggable={false} />
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Scroll Progress Indicator */}
      <ScrollProgressBar />
    </>
  );
}