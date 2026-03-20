import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useTranslation } from "react-i18next";
import { Preloader } from "./components/Preloader";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { QuoteBanner } from "./components/QuoteBarrier";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import { Breadcrumbs } from "./components/Breadcrumbs";

const SolutionsPage = lazy(() => import("./pages/SolutionsPage"));
const AgricolePage = lazy(() => import("./pages/AgricolePage"));
const PhotovoltaiquePage = lazy(() => import("./pages/PhotovoltaiquePage"));
const IndustrielPage = lazy(() => import("./pages/IndustrielPage"));
const OuvragesArtPage = lazy(() => import("./pages/OuvragesArtPage"));
const BureauProductionPage = lazy(() => import("./pages/BureauProductionPage"));
const RealisationsPage = lazy(() => import("./pages/RealisationsPage"));
const ImplantationsPage = lazy(() => import("./pages/ImplantationsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ActualitesPage = lazy(() => import("./pages/ActualitesPage"));
const ActualiteDetailPage = lazy(() => import("./pages/actualites/ActualiteDetailPage"));
const RealisationDetailPage = lazy(() => import("./pages/realisations/RealisationDetailPage"));
const DocumentationPage = lazy(() => import("./pages/DocumentationPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const MentionsLegalesPage = lazy(() => import("./pages/MentionsLegalesPage"));
const PolitiqueConfidentialitePage = lazy(() => import("./pages/PolitiqueConfidentialitePage"));
const CookiesPage = lazy(() => import("./pages/CookiesPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [i18n.language, isRTL]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      prevent: (node: HTMLElement) => node.closest('.fixed') !== null,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <div className={`min-h-screen bg-white pb-24${isRTL ? " rtl" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
          <ScrollToTop />
          <Navigation />
          <Breadcrumbs />
          <main>
            <ErrorBoundary>
            <Suspense fallback={<div className="pt-32 pb-20 flex justify-center"><div className="w-10 h-10 border-3 border-[#E40714] border-t-transparent rounded-full animate-spin" /></div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/solutions/agricole" element={<AgricolePage />} />
              <Route path="/solutions/photovoltaique" element={<PhotovoltaiquePage />} />
              <Route path="/solutions/industriel" element={<IndustrielPage />} />
              <Route path="/solutions/ouvrages-art" element={<OuvragesArtPage />} />
              <Route path="/bureau-production" element={<BureauProductionPage />} />
              <Route path="/realisations" element={<RealisationsPage />} />
              <Route path="/realisations/:slug" element={<RealisationDetailPage />} />
              <Route path="/implantations" element={<ImplantationsPage />} />
              <Route path="/a-propos" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/actualites" element={<ActualitesPage />} />
              <Route path="/actualites/:slug" element={<ActualiteDetailPage />} />
              <Route path="/documentation" element={<DocumentationPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
              <Route path="/politique-confidentialite" element={<PolitiqueConfidentialitePage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </Suspense>
            </ErrorBoundary>
          </main>
          <Footer />
          <QuoteBanner />
        </div>
      )}
    </Router>
  );
}