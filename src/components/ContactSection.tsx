import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ContactSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const subjectRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t("contact.phoneLabel"),
      value: "04 73 59 11 81",
      link: "tel:+33473591181",
    },
    {
      icon: Mail,
      title: t("contact.emailLabel"),
      value: "contact@metalr.com",
      link: "mailto:contact@metalr.com",
    },
    {
      icon: MapPin,
      title: t("contact.addressLabel"),
      value: "14 Rue Bernard Barot, 63111 Mur-sur-Allier",
      link: "https://www.google.com/maps/search/?api=1&query=14+Rue+Bernard+Barot+63111+Mur-sur-Allier",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 px-6 bg-gradient-to-b from-white to-[#C6C6C6]/20"
    >
      <div className="max-w-7xl mx-auto">
        <div style={{ marginBottom: 64 }}>
          <motion.div
            style={{ width: 40, height: 3, backgroundColor: "#E40714", borderRadius: 2, marginBottom: 24, transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 42, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.1, marginBottom: 16 }}
          >
            {t("contact.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ color: "rgba(27,27,27,0.5)", fontSize: 15, lineHeight: 1.7, maxWidth: 520 }}
          >
            {t("contact.subtitle")}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={index}
                  href={info.link}
                  className="group flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-[#C6C6C6] hover:border-[#E40714] transition-all duration-300"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 30px rgba(228, 7, 20, 0.1)",
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C6C6C6]/30 to-[#C6C6C6]/10 rounded-xl flex items-center justify-center group-hover:from-[#E40714]/20 group-hover:to-[#E40714]/5 transition-all duration-300 shrink-0">
                    <Icon
                      className="text-[#1B1B1B] group-hover:text-[#E40714] transition-colors duration-300"
                      size={24}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <div className="text-[#1B1B1B] mb-1">
                      {info.title}
                    </div>
                    <div className="text-[#212121]">{info.value}</div>
                  </div>
                </motion.a>
              );
            })}

            {/* Additional info */}
            <motion.div
              className="p-6 bg-gradient-to-br from-[#E40714]/5 to-white rounded-2xl border-2 border-[#E40714]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4 className="text-[#212121] uppercase mb-3">
                {t("contact.hoursTitle")}
              </h4>
              <div className="space-y-2 text-[#1B1B1B]">
                <div className="flex justify-between">
                  <span>{t("contact.weekdays")}</span>
                  <span>{t("contact.weekdayHours")}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("contact.saturday")}</span>
                  <span>{t("contact.saturdayHours")}</span>
                </div>
                <div className="flex justify-between text-[#C6C6C6]">
                  <span>{t("contact.sunday")}</span>
                  <span>{t("contact.closed")}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 border-2 border-[#C6C6C6]"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[#1B1B1B] mb-2">
                    {t("contact.nameLabel")} *
                  </label>
                  <motion.input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#C6C6C6] rounded-xl focus:border-[#E40714] focus:outline-none transition-all duration-300"
                    placeholder={t("contact.namePlaceholder")}
                    whileFocus={{
                      scale: 1.01,
                      boxShadow: "0 0 0 3px rgba(228, 7, 20, 0.1)",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[#1B1B1B] mb-2">
                    {t("contact.emailLabel")} *
                  </label>
                  <motion.input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#C6C6C6] rounded-xl focus:border-[#E40714] focus:outline-none transition-all duration-300"
                    placeholder={t("contact.emailPlaceholder")}
                    whileFocus={{
                      scale: 1.01,
                      boxShadow: "0 0 0 3px rgba(228, 7, 20, 0.1)",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[#1B1B1B] mb-2">
                    {t("contact.phoneLabel2")}
                  </label>
                  <motion.input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#C6C6C6] rounded-xl focus:border-[#E40714] focus:outline-none transition-all duration-300"
                    placeholder="+33 1 23 45 67 89"
                    whileFocus={{
                      scale: 1.01,
                      boxShadow: "0 0 0 3px rgba(228, 7, 20, 0.1)",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[#1B1B1B] mb-2">
                    {t("contact.companyLabel")}
                  </label>
                  <motion.input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#C6C6C6] rounded-xl focus:border-[#E40714] focus:outline-none transition-all duration-300"
                    placeholder={t("contact.companyPlaceholder")}
                    whileFocus={{
                      scale: 1.01,
                      boxShadow: "0 0 0 3px rgba(228, 7, 20, 0.1)",
                    }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[#1B1B1B] mb-2">
                  {t("contact.subjectLabel")} *
                </label>
                <div ref={subjectRef} className="relative">
                  <input type="hidden" name="subject" value={formData.subject} required />
                  <button
                    type="button"
                    onClick={() => setIsSubjectOpen(!isSubjectOpen)}
                    className="w-full px-4 py-3 border-2 rounded-xl text-left flex items-center justify-between transition-all duration-300"
                    style={{
                      borderColor: isSubjectOpen ? "#E40714" : "#C6C6C6",
                      boxShadow: isSubjectOpen ? "0 0 0 3px rgba(228, 7, 20, 0.1)" : "none",
                    }}
                  >
                    <span style={{ color: formData.subject ? "#1B1B1B" : "#9CA3AF" }}>
                      {formData.subject
                        ? [
                            { value: "structure", label: t("contact.subjectStructures") },
                            { value: "energie", label: t("contact.subjectEnergy") },
                            { value: "devis", label: t("contact.subjectQuote") },
                            { value: "autre", label: t("contact.subjectOther") },
                          ].find(o => o.value === formData.subject)?.label
                        : t("contact.subjectDefault")}
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
                      {[
                        { value: "structure", label: t("contact.subjectStructures") },
                        { value: "energie", label: t("contact.subjectEnergy") },
                        { value: "devis", label: t("contact.subjectQuote") },
                        { value: "autre", label: t("contact.subjectOther") },
                      ].map((option) => (
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

              <div className="mb-6">
                <label className="block text-[#1B1B1B] mb-2">
                  {t("contact.messageLabel")} *
                </label>
                <motion.textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-[#C6C6C6] rounded-xl focus:border-[#E40714] focus:outline-none transition-all duration-300 resize-none"
                  placeholder={t("contact.messagePlaceholder")}
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 0 0 3px rgba(228, 7, 20, 0.1)",
                  }}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-8 py-4 bg-[#E40714] text-white rounded-full inline-flex items-center justify-center gap-3"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(228, 7, 20, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={20} />
                {t("contact.sendBtn")}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
