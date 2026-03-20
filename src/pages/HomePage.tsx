import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import SEOHead from "../components/SEOHead";
import { HeroSection } from "../components/HeroSection";
import { PartnersScroller } from "../components/PartnersScroller";

// Lazy-load below-fold sections for faster initial paint
const BureauSection = lazy(() => import("../components/BureauSection").then(m => ({ default: m.BureauSection })));
const KeyStatsSection = lazy(() => import("../components/KeyStatsSection").then(m => ({ default: m.KeyStatsSection })));
const RealisationsScroller = lazy(() => import("../components/RealisationsScroller").then(m => ({ default: m.RealisationsScroller })));
const GoogleReviewsSection = lazy(() => import("../components/GoogleReviewsSection").then(m => ({ default: m.GoogleReviewsSection })));
const ExpertiseSection = lazy(() => import("../components/ExpertiseSection").then(m => ({ default: m.ExpertiseSection })));
const ProcessSection = lazy(() => import("../components/ProcessSection").then(m => ({ default: m.ProcessSection })));
const CertificationsSection = lazy(() => import("../components/CertificationsSection").then(m => ({ default: m.CertificationsSection })));
const ProjectsSection = lazy(() => import("../components/ProjectsSection").then(m => ({ default: m.ProjectsSection })));
const MapSection = lazy(() => import("../components/MapSection").then(m => ({ default: m.MapSection })));
const NewsSection = lazy(() => import("../components/NewsSection").then(m => ({ default: m.NewsSection })));
const SustainabilitySection = lazy(() => import("../components/SustainabilitySection").then(m => ({ default: m.SustainabilitySection })));
const ContactSection = lazy(() => import("../components/ContactSection").then(m => ({ default: m.ContactSection })));

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      <SEOHead
        title={t("nav.home")}
        description={t("seo.homeDesc")}
        path="/"
      />
      <HeroSection />
      <PartnersScroller />
      <Suspense fallback={null}>
        <BureauSection />
        <MapSection />
        <KeyStatsSection />
        <RealisationsScroller />
        <GoogleReviewsSection />
        <ExpertiseSection />
        <ProcessSection />
        <CertificationsSection />
        <ProjectsSection />
        <NewsSection />
        <SustainabilitySection />
        <ContactSection />
      </Suspense>
    </>
  );
}
