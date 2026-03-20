import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useInView } from "motion/react";
import { MapPin, Phone, Mail, Download, Send, ChevronDown, FileText, Check, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import SEOHead from "../components/SEOHead";

export default function ContactPage() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const subjectRef = useRef<HTMLDivElement>(null);

  const subjectOptions = [
    { value: "agricole", label:  t("contact.subjectAgricole") },
    { value: "photovoltaique", label: t("contact.subjectPhotovoltaique") },
    { value: "industriel", label: t("contact.subjectIndustriel") },
    { value: "ouvrage", label: t("contact.subjectOuvrage") },
    { value: "autre", label: t("contact.subjectOther") },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendStatus("sending");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          name: formData.name,
          from_email: formData.email,
          email: formData.email,
          company: formData.company || "Non renseigné",
          phone: formData.phone ? String(formData.phone) : "Non renseigné",
          subject: subjectOptions.find(o => o.value === formData.subject)?.label || formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setSendStatus("success");
      setFormData({ name: "", company: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSendStatus("idle"), 5000);
    } catch {
      setSendStatus("error");
      setTimeout(() => setSendStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t("contact.siegeTitle"),
      details: ["14 Rue Bernard Barot, ZAC Littes", "63111 Mur-sur-Allier, France"],
    },
    {
      icon: Phone,
      title: t("contact.phoneLabel"),
      details: ["04 73 59 11 81", t("contact.hours")],
    },
    {
      icon: Mail,
      title: t("contact.emailLabel"),
      details: ["contact@metalr.com"],
    },
  ];

  const implantations = [
    { country: t("map.locations.france.name"), phone: "+33 3 44 XX XX XX", email: "france@metalr.com" },
    { country: t("map.locations.romania.name"), phone: "+40 XXX XXX XXX", email: "romania@metalr.com" },
    { country: t("map.locations.kosovo.name"), phone: "+383 XX XXX XXXX", email: "kosovo@metalr.com" },
    { country: t("map.locations.tunisia.name"), phone: "+216 XX XXX XXX", email: "tunisie@metalr.com" },
    { country: t("map.locations.guinea.name"), phone: "+224 XXX XX XX XX", email: "guinee@metalr.com" },
    { country: t("map.locations.ivoryCoast.name"), phone: "+225 XX XX XX XX", email: "cotedivoire@metalr.com" },
    { country: t("map.locations.thailand.name"), phone: "+66 XX XXX XXXX", email: "thailand@metalr.com" },
    { country: t("map.locations.uae.name"), phone: "+971 XX XXX XXXX", email: "uae@metalr.com" },
  ];

  return (
    <>
      <SEOHead title={t("seo.contactTitle")} description={t("seo.contactDesc")} path="/contact" />
      <div className="pt-32 pb-20">
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginBottom: 64 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 24, transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />
          <h1 style={{ fontSize: 72, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 16, maxWidth: 700 }}>
            {t("contact.title")}
          </h1>
          <p style={{ color: "rgba(27,27,27,0.5)", fontSize: 15, lineHeight: 1.7, maxWidth: 600 }}>
            {t("contact.heroSubtitle")}
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 border-2 border-[#C6C6C6]/30 shadow-xl"
            >
              <h2 className="text-[32px] text-[#212121] mb-6">{t("contact.formTitle")}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1B1B1B] mb-2">{t("contact.nameLabel")} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-colors"
                      placeholder={t("contact.namePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-[#1B1B1B] mb-2">{t("contact.companyLabel")}</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-colors"
                      placeholder={t("contact.companyPlaceholder")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#1B1B1B] mb-2">{t("contact.emailLabel")} *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-colors"
                      placeholder={t("contact.emailPlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-[#1B1B1B] mb-2">{t("contact.phoneLabel")}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-colors"
                      placeholder={t("contact.phonePlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1B1B1B] mb-2">{t("contact.subjectPageLabel")} *</label>
                  <div ref={subjectRef} className="relative">
                    <input type="hidden" name="subject" value={formData.subject} required />
                    <button
                      type="button"
                      onClick={() => setIsSubjectOpen(!isSubjectOpen)}
                      className="w-full px-4 py-3 border-2 rounded-xl text-left flex items-center justify-between transition-all duration-300"
                      style={{
                        borderColor: isSubjectOpen ? "#E40714" : "rgba(198,198,198,0.3)",
                        boxShadow: isSubjectOpen ? "0 0 0 3px rgba(228, 7, 20, 0.1)" : "none",
                      }}
                    >
                      <span style={{ color: formData.subject ? "#1B1B1B" : "#9CA3AF" }}>
                        {formData.subject
                          ? subjectOptions.find(o => o.value === formData.subject)?.label
                          : t("contact.subjectPageDefault")}
                      </span>
                      <ChevronDown
                        size={18}
                        className="transition-transform duration-200"
                        style={{ transform: isSubjectOpen ? "rotate(180deg)" : "rotate(0)", color: "#9CA3AF" }}
                      />
                    </button>
                    {isSubjectOpen && (
                      <div
                        className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-[#C6C6C6] rounded-xl overflow-hidden z-20"
                        style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                      >
                        {subjectOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            className="w-full px-4 py-3 text-left text-[#1B1B1B] transition-colors duration-150"
                            style={{
                              backgroundColor: formData.subject === option.value ? "rgba(228, 7, 20, 0.05)" : "transparent",
                            }}
                            onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = "rgba(228, 7, 20, 0.08)"; }}
                            onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = formData.subject === option.value ? "rgba(228, 7, 20, 0.05)" : "transparent"; }}
                            onClick={() => {
                              setFormData({ ...formData, subject: option.value });
                              setIsSubjectOpen(false);
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[#1B1B1B] mb-2">{t("contact.messageLabel")} *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-colors resize-none"
                    placeholder={t("contact.pageMessagePlaceholder")}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sendStatus === "sending"}
                  className={`w-full px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 ${
                    sendStatus === "success"
                      ? "bg-green-600 text-white"
                      : sendStatus === "error"
                        ? "bg-red-800 text-white"
                        : "bg-[#E40714] text-white hover:bg-[#C00612]"
                  } ${sendStatus === "sending" ? "opacity-70 cursor-not-allowed" : ""}`}
                  whileHover={sendStatus === "sending" ? {} : { scale: 1.02 }}
                  whileTap={sendStatus === "sending" ? {} : { scale: 0.98 }}
                >
                  {sendStatus === "sending" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{t("contact.sending")}</span>
                    </>
                  ) : sendStatus === "success" ? (
                    <>
                      <Check size={20} />
                      <span>{t("contact.sendSuccess")}</span>
                    </>
                  ) : sendStatus === "error" ? (
                    <>
                      <AlertCircle size={20} />
                      <span>{t("contact.sendError")}</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>{t("contact.sendPageBtn")}</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Informations de contact */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-gradient-to-br from-[#C6C6C6]/10 to-white rounded-2xl p-6 border-2 border-[#C6C6C6]/30 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#E40714] rounded-xl flex items-center justify-center shrink-0">
                    <info.icon size={24} color="white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[18px] text-[#1B1B1B] mb-2">{info.title}</h3>
                    {index === 0 ? (
                      <a
                        href="https://www.google.com/maps/place/14+Rue+Bernard+Barot,+63111+Mur-sur-Allier"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#E40714] transition-colors duration-200"
                      >
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-[#1B1B1B]/70 text-[14px]">
                            {detail}
                          </p>
                        ))}
                      </a>
                    ) : index === 1 ? (
                      <>
                        <a
                          href={`tel:${info.details[0].replace(/\s/g, "")}`}
                          className="block text-[#1B1B1B]/70 text-[14px] hover:text-[#E40714] transition-colors duration-200"
                        >
                          {info.details[0]}
                        </a>
                        {info.details.slice(1).map((detail, idx) => (
                          <p key={idx} className="text-[#1B1B1B]/70 text-[14px]">{detail}</p>
                        ))}
                      </>
                    ) : index === 2 ? (
                      <>
                        <a
                          href={`mailto:${info.details[0]}`}
                          className="block text-[#1B1B1B]/70 text-[14px] hover:text-[#E40714] transition-colors duration-200"
                        >
                          {info.details[0]}
                        </a>
                        {info.details.slice(1).map((detail, idx) => (
                          <p key={idx} className="text-[#1B1B1B]/70 text-[14px]">{detail}</p>
                        ))}
                      </>
                    ) : (
                      info.details.map((detail, idx) => (
                        <p key={idx} className="text-[#1B1B1B]/70 text-[14px]">
                          {detail}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Download brochure */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="bg-[#1B1B1B] rounded-2xl p-6"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 bg-[#E40714] rounded-xl flex items-center justify-center shrink-0">
                  <FileText size={24} color="white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 style={{ color: "#ffffff", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{t("contact.brochureTitle")}</h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.5 }}>
                    {t("contact.brochureDesc")}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginTop: 4 }}>PDF · 2 Mo</p>
                </div>
              </div>

              <motion.a
                href="/brochure-metalr.pdf"
                download="Brochure-METALR.pdf"
                className="group flex items-center justify-center gap-3 w-full bg-[#E40714] text-white py-4 rounded-xl hover:bg-[#C00612] transition-all duration-300 text-[15px] font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={18} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                {t("contact.downloadBtn")}
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Map */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{
              background: "#1A1A1A",
              borderRadius: 24,
              padding: "40px 40px 0",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
              <div>
                <div style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 16 }} />
                <h3 style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{t("contact.findUsTitle")}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                  {t("contact.findUsDesc")}
                </p>
              </div>
              <a
                href="https://www.google.com/maps/place/14+Rue+Bernard+Barot,+63115+Mur-sur-Allier"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textAlign: "right", flexShrink: 0, textDecoration: "none" }}
              >
                <p style={{ fontSize: 14, color: "#E40714", margin: 0 }}>14 Rue Bernard Barot, ZAC Littes</p>
                <p style={{ fontSize: 14, color: "#E40714", margin: 0, marginTop: 4, opacity: 0.7 }}>63111 Mur-sur-Allier, France</p>
              </a>
            </div>
            <div style={{ borderRadius: "16px 16px 0 0", overflow: "hidden", height: 360 }}>
              <iframe
                title="METALR - Si\u00e8ge social"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2787.5!2d3.2461!3d45.7234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f71be8f0b6b0ed%3A0x0!2s14%20Rue%20Bernard%20Barot%2C%2063111%20Mur-sur-Allier!5e0!3m2!1sfr!2sfr!4v1"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(1) invert(0.85) contrast(1.2) hue-rotate(200deg) brightness(0.85) saturate(0.2)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </section>
      </div>
    </div>
    </>
  );
}
