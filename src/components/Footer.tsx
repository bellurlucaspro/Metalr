import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    company: {
      title: t("footer.company"),
      links: [
        { label: t("footer.about"), href: "/a-propos" },
        { label: t("footer.locations"), href: "/implantations" },
        { label: t("footer.bureau"), href: "/bureau-production" },
        { label: t("footer.contact"), href: "/contact" },
      ],
    },
    services: {
      title: t("footer.solutions"),
      links: [
        { label: t("footer.agricultural"), href: "/solutions/agricole" },
        { label: t("footer.photovoltaic"), href: "/solutions/photovoltaique" },
        { label: t("footer.industrial"), href: "/solutions/industriel" },
        { label: t("footer.civilEngineering"), href: "/solutions/ouvrages-art" },
      ],
    },
    resources: {
      title: t("footer.resources"),
      links: [
        { label: t("footer.projects"), href: "/realisations" },
        { label: t("footer.news"), href: "/actualites" },
        { label: t("footer.documentation"), href: "/documentation" },
        { label: t("footer.faq"), href: "/faq" },
      ],
    },
    legal: {
      title: t("footer.legal"),
      links: [
        { label: t("footer.legalMentions"), href: "/mentions-legales" },
        { label: t("footer.privacy"), href: "/politique-confidentialite" },
        { label: t("footer.cookies"), href: "/cookies" },
      ],
    },
  };

  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/metalr/",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/metal__r?igsh=MWN1Z2lrajk0ejVvYg==",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
    },
    {
      label: "TikTok",
      href: "#",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#C6C6C6]/20 to-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <motion.div
              className="mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Logo className="h-12 mb-2" />
              <div className="text-[10px] tracking-[0.2em] text-[#1B1B1B] uppercase">
                {t("footer.tagline1")}
                <br />
                {t("footer.tagline2")}
              </div>
            </motion.div>
            <p className="text-[#1B1B1B] text-sm mb-4">
              {t("footer.description")}
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white border-2 border-[#C6C6C6] rounded-xl flex items-center justify-center text-[#1B1B1B] hover:border-[#E40714] hover:text-[#E40714] transition-all duration-300"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.svg}
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-[#212121] uppercase mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    {link.href.startsWith('#') ? (
                      <motion.a
                        href={link.href}
                        className="text-[#1B1B1B] hover:text-[#E40714] transition-colors duration-300 text-sm inline-block"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.label}
                      </motion.a>
                    ) : (
                      <Link to={link.href}>
                        <motion.span
                          className="text-[#1B1B1B] hover:text-[#E40714] transition-colors duration-300 text-sm inline-block"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#C6C6C6] to-transparent mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#1B1B1B] text-sm text-center md:text-left">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>

          <div className="flex items-center gap-6 text-sm">
            <motion.a
              href="#"
              className="text-[#1B1B1B] hover:text-[#E40714] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {t("footer.sitemap")}
            </motion.a>
            <motion.a
              href="#"
              className="text-[#1B1B1B] hover:text-[#E40714] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {t("footer.accessibility")}
            </motion.a>
            <Link to="/contact">
              <motion.span
                className="px-4 py-2 bg-[#E40714] text-white rounded-lg hover:bg-[#E40714]/90 transition-all duration-300 inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("footer.contact")}
              </motion.span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
