import { motion } from "motion/react";
import { useState, useRef } from "react";
import {
  LayoutDashboard,
  Newspaper,
  FolderKanban,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Save,
  X,
  Image as ImageIcon,
  Calendar,
  TrendingUp,
  Users,
  FileText,
  Search,
  Link as LinkIcon,
  Clock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useArticles } from "../../hooks/useArticles";
import { useRealisations } from "../../hooks/useRealisations";
import { useImageUpload } from "../../hooks/useImageUpload";
import { supabase } from "../../lib/supabase";
import { tField, safe, emptyTranslated } from "../../lib/i18n-helpers";
import { pingSearchEngines } from "../../lib/seo-utils";
import {
  autoTranslateObject,
  ARTICLE_TRANSLATED_FIELDS,
  ARTICLE_HTML_FIELDS,
  REALISATION_TRANSLATED_FIELDS,
  REALISATION_HTML_FIELDS,
} from "../../lib/translate";
import type { Article, Realisation, TranslatedField } from "../../types/database";
import RichTextEditor from "../../components/admin/RichTextEditor";
import { useCategories } from "../../hooks/useCategories";

const LANGS = ["fr", "en", "zh", "ar"] as const;
const LANG_LABELS: Record<string, string> = { fr: "Francais", en: "English", zh: "中文", ar: "العربية" };

function LangTabs({ activeLang, setActiveLang }: { activeLang: string; setActiveLang: (l: string) => void }) {
  return (
    <div className="flex gap-1 bg-[#F5F5F5] rounded-xl p-1">
      {LANGS.map((l) => (
        <button
          key={l}
          className={`flex-1 px-4 py-2 rounded-lg text-[13px] font-bold transition-all duration-200 ${
            activeLang === l ? "bg-[#E40714] text-white shadow" : "text-[#1B1B1B]/60 hover:text-[#1B1B1B]"
          }`}
          onClick={() => setActiveLang(l)}
        >
          {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  );
}

function TranslatedInput({
  label,
  field,
  obj,
  setObj,
  activeLang,
  multiline = false,
}: {
  label: string;
  field: string;
  obj: any;
  setObj: (v: any) => void;
  activeLang: string;
  multiline?: boolean;
}) {
  const value = (obj[field] as TranslatedField)?.[activeLang as keyof TranslatedField] || "";
  const current = obj[field] || emptyTranslated();
  const Component = multiline ? "textarea" : "input";
  return (
    <div>
      <label className="block text-[13px] text-[#1B1B1B] font-bold mb-1.5">{label}</label>
      <Component
        value={value}
        onChange={(e: any) => setObj({ ...obj, [field]: { ...current, [activeLang]: e.target.value } })}
        className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] text-[14px] focus:outline-none focus:border-[#E40714] transition-colors"
        {...(multiline ? { rows: 4 } : {})}
      />
    </div>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function BulkTranslateSection({
  articles,
  realisations,
  refetchArticles,
  refetchRealisations,
}: {
  articles: Article[];
  realisations: Realisation[];
  refetchArticles: () => void;
  refetchRealisations: () => void;
}) {
  const [progress, setProgress] = useState("");
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const runBulkTranslate = async () => {
    setRunning(true);
    setLog([]);
    const addLog = (msg: string) => setLog((prev) => [...prev, msg]);

    // Translate articles
    for (let i = 0; i < articles.length; i++) {
      const a = articles[i];
      setProgress(`Article ${i + 1}/${articles.length}: ${tField(a.title, "fr").slice(0, 40)}...`);
      try {
        const translated = await autoTranslateObject(a, ARTICLE_TRANSLATED_FIELDS, ARTICLE_HTML_FIELDS);
        const { error } = await supabase
          .from("articles")
          .update({
            title: translated.title,
            excerpt: translated.excerpt,
            content: translated.content,
            category_label: translated.category_label,
            badge: translated.badge,
          })
          .eq("id", a.id);
        if (error) addLog(`Article "${tField(a.title, "fr")}" erreur: ${error.message}`);
        else addLog(`Article "${tField(a.title, "fr")}" traduit`);
      } catch (e: any) {
        addLog(`Article "${tField(a.title, "fr")}" erreur: ${e.message}`);
      }
    }

    // Translate realisations
    for (let i = 0; i < realisations.length; i++) {
      const r = realisations[i];
      setProgress(`Realisation ${i + 1}/${realisations.length}: ${tField(r.title, "fr").slice(0, 40)}...`);
      try {
        const translated = await autoTranslateObject(r, REALISATION_TRANSLATED_FIELDS, REALISATION_HTML_FIELDS);
        const { error } = await supabase
          .from("realisations")
          .update({
            title: translated.title,
            location: translated.location,
            description: translated.description,
            category_label: translated.category_label,
            client: translated.client,
            duration: translated.duration,
            budget: translated.budget,
            challenges: translated.challenges,
            solutions: translated.solutions,
          })
          .eq("id", r.id);
        if (error) addLog(`Realisation "${tField(r.title, "fr")}" erreur: ${error.message}`);
        else addLog(`Realisation "${tField(r.title, "fr")}" traduit`);
      } catch (e: any) {
        addLog(`Realisation "${tField(r.title, "fr")}" erreur: ${e.message}`);
      }
    }

    setProgress("Termine !");
    refetchArticles();
    refetchRealisations();
    setRunning(false);
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #EEF2FF, #fff)", border: "2px solid #C7D2FE", borderRadius: 16, padding: 24 }}>
      <h3 className="text-[24px] text-[#1B1B1B] font-rajdhani font-bold mb-2 flex items-center gap-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" />
          <path d="m22 22-5-10-5 10" /><path d="M14 18h6" />
        </svg>
        Traduction en masse
      </h3>
      <p className="text-[14px] text-[#1B1B1B]/60 mb-4">
        Traduit automatiquement tous les articles ({articles.length}) et realisations ({realisations.length}) du francais vers l'anglais, le chinois et l'arabe. Ne remplace pas les traductions existantes.
      </p>
      <motion.button
        className="flex items-center gap-2 px-6 py-3 text-white rounded-xl font-bold text-[14px] disabled:opacity-50"
        style={{ background: running ? "#9CA3AF" : "#4F46E5" }}
        whileHover={running ? {} : { scale: 1.02 }}
        whileTap={running ? {} : { scale: 0.98 }}
        disabled={running}
        onClick={runBulkTranslate}
      >
        {running ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Traduction en cours...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20" /></svg>
            Tout traduire maintenant
          </>
        )}
      </motion.button>
      {progress && (
        <p className="mt-3 text-[13px] text-indigo-600 font-bold">{progress}</p>
      )}
      {log.length > 0 && (
        <div className="mt-3 max-h-48 overflow-y-auto bg-white rounded-lg border p-3 text-[12px] font-mono text-[#1B1B1B]/70 space-y-0.5">
          {log.map((l, i) => <p key={i}>{l}</p>)}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { articles, loading: loadingArticles, refetch: refetchArticles } = useArticles({ includeUnpublished: true });
  const { realisations, loading: loadingRealisations, refetch: refetchRealisations } = useRealisations();
  const { upload, uploading } = useImageUpload();
  const { categories: articleCategories, addCategory: addArticleCat, deleteCategory: deleteArticleCat } = useCategories("article");
  const { categories: realisationCategories, addCategory: addRealisationCat, deleteCategory: deleteRealisationCat } = useCategories("realisation");

  const [activeTab, setActiveTab] = useState<"dashboard" | "news" | "realisations" | "settings">("dashboard");
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [editingRealisation, setEditingRealisation] = useState<Partial<Realisation> | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [activeLang, setActiveLang] = useState<string>("fr");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [newCatType, setNewCatType] = useState<"article" | "realisation">("article");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newCatLabel, setNewCatLabel] = useState<TranslatedField>(emptyTranslated());
  const [addingCategory, setAddingCategory] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceImageRef = useRef<HTMLInputElement>(null);
  const replaceArticleImageRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // ===== STATS =====
  const stats = [
    { label: "Articles publies", value: articles.filter((n) => n.status === "published").length, icon: Newspaper, bg: "#3B82F6" },
    { label: "Realisations", value: realisations.length, icon: FolderKanban, bg: "#22C55E" },
    { label: "Vues totales", value: (articles.reduce((acc, n) => acc + (n.views || 0), 0) + realisations.reduce((acc, r) => acc + (r.views || 0), 0)).toLocaleString(), icon: Eye, bg: "#A855F7" },
    { label: "Projets en cours", value: realisations.filter((r) => r.status === "ongoing").length, icon: Clock, bg: "#F97316" },
  ];

  // ===== FILTERS =====
  const filteredNews = articles.filter((article) => {
    const title = tField(article.title, "fr");
    const excerpt = tField(article.excerpt, "fr");
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === "all" || article.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const filteredRealisations = realisations.filter((r) => {
    const title = tField(r.title, "fr");
    const location = tField(r.location, "fr");
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === "all" || r.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  // ===== ARTICLE CRUD =====
  const openNewArticle = () => {
    setEditingArticle({
      title: emptyTranslated(),
      excerpt: emptyTranslated(),
      content: emptyTranslated(),
      category: articleCategories[0]?.slug || "",
      category_label: articleCategories[0]?.label || emptyTranslated(),
      badge: emptyTranslated(),
      date: new Date().toISOString().split("T")[0],
      image_url: null,
      featured: false,
      author: null,
      read_time: null,
      status: "draft",
    });
    setEditingRealisation(null);
    setActiveLang("fr");
    setIsEditing(true);
  };

  const openEditArticle = (article: Article) => {
    setEditingArticle({ ...article });
    setEditingRealisation(null);
    setActiveLang("fr");
    setIsEditing(true);
  };

  const saveArticle = async () => {
    if (!editingArticle) return;
    setSaving(true);
    setSaveError(null);

    // Auto-translate all fields from French before saving (force=true to regenerate)
    const translated = await autoTranslateObject(
      editingArticle,
      ARTICLE_TRANSLATED_FIELDS,
      ARTICLE_HTML_FIELDS,
      true
    );

    const slug = translated.slug || slugify(translated.title?.fr || "article");
    const payload = {
      slug,
      title: translated.title,
      excerpt: translated.excerpt,
      content: translated.content,
      category: translated.category,
      category_label: translated.category_label,
      badge: translated.badge,
      date: translated.date,
      image_url: translated.image_url,
      featured: translated.featured || false,
      author: translated.author,
      read_time: translated.read_time,
      status: translated.status || "draft",
    };

    let err;
    if (editingArticle.id) {
      ({ error: err } = await supabase.from("articles").update(payload).eq("id", editingArticle.id));
    } else {
      ({ error: err } = await supabase.from("articles").insert(payload));
    }

    if (err) {
      setSaveError(err.message);
    } else {
      setIsEditing(false);
      setEditingArticle(null);
      refetchArticles();
      // Ping search engines for indexation
      pingSearchEngines();
    }
    setSaving(false);
  };

  const deleteArticle = async (id: string) => {
    if (!window.confirm("Supprimer cet article ?")) return;
    await supabase.from("articles").delete().eq("id", id);
    refetchArticles();
  };

  // ===== REALISATION CRUD =====
  const openNewRealisation = () => {
    setEditingRealisation({
      title: emptyTranslated(),
      category: realisationCategories[0]?.slug || "",
      category_label: realisationCategories[0]?.label || emptyTranslated(),
      location: emptyTranslated(),
      description: emptyTranslated(),
      challenges: [],
      solutions: [],
      year: null,
      surface: null,
      client: emptyTranslated(),
      duration: emptyTranslated(),
      budget: emptyTranslated(),
      main_image_url: null,
      gallery: [],
      status: "completed",
    });
    setEditingArticle(null);
    setActiveLang("fr");
    setIsEditing(true);
  };

  const openEditRealisation = (r: Realisation) => {
    // Backward compat: wrap plain strings into TranslatedField
    const wrapField = (val: unknown): TranslatedField | null => {
      if (!val) return emptyTranslated();
      if (typeof val === "string") return { fr: val, en: "", zh: "", ar: "" };
      return val as TranslatedField;
    };
    setEditingRealisation({
      ...r,
      client: wrapField(r.client),
      duration: wrapField(r.duration),
      budget: wrapField(r.budget),
    });
    setEditingArticle(null);
    setActiveLang("fr");
    setIsEditing(true);
  };

  const saveRealisation = async () => {
    if (!editingRealisation) return;
    setSaving(true);
    setSaveError(null);

    // Auto-translate all fields from French before saving (force=true to regenerate)
    const translated = await autoTranslateObject(
      editingRealisation,
      REALISATION_TRANSLATED_FIELDS,
      REALISATION_HTML_FIELDS,
      true
    );

    const slug = translated.slug || slugify(translated.title?.fr || "realisation");
    const payload = {
      slug,
      title: translated.title,
      category: translated.category,
      category_label: translated.category_label,
      location: translated.location,
      description: translated.description,
      challenges: translated.challenges || [],
      solutions: translated.solutions || [],
      year: translated.year,
      surface: translated.surface,
      client: translated.client,
      duration: translated.duration,
      budget: translated.budget,
      main_image_url: translated.main_image_url,
      gallery: translated.gallery || [],
      status: translated.status || "completed",
    };

    let err;
    if (editingRealisation.id) {
      ({ error: err } = await supabase.from("realisations").update(payload).eq("id", editingRealisation.id));
    } else {
      ({ error: err } = await supabase.from("realisations").insert(payload));
    }

    if (err) {
      setSaveError(err.message);
    } else {
      setIsEditing(false);
      setEditingRealisation(null);
      refetchRealisations();
      // Ping search engines for indexation
      pingSearchEngines();
    }
    setSaving(false);
  };

  const deleteRealisation = async (id: string) => {
    if (!window.confirm("Supprimer cette realisation ?")) return;
    await supabase.from("realisations").delete().eq("id", id);
    refetchRealisations();
  };

  // ===== IMAGE UPLOAD =====
  const handleImageUpload = async (file: File, type: "article" | "realisation" | "gallery") => {
    const folder = type === "gallery" ? "realisations" : type === "article" ? "articles" : "realisations";
    const url = await upload(file, folder);
    if (!url) return;

    if (type === "article" && editingArticle) {
      setEditingArticle({ ...editingArticle, image_url: url });
    } else if (type === "realisation" && editingRealisation) {
      setEditingRealisation({ ...editingRealisation, main_image_url: url });
    } else if (type === "gallery" && editingRealisation) {
      setEditingRealisation({
        ...editingRealisation,
        gallery: [...(editingRealisation.gallery || []), url],
      });
    }
  };

  // ===== TRANSLATED FIELD HELPERS =====
  const updateTranslatedField = (
    obj: Partial<Article> | Partial<Realisation>,
    setObj: (v: any) => void,
    field: string,
    lang: string,
    value: string
  ) => {
    const current = (obj as any)[field] || emptyTranslated();
    setObj({ ...obj, [field]: { ...current, [lang]: value } });
  };

  // ===== CHALLENGES / SOLUTIONS =====
  const addChallenge = () => {
    if (!editingRealisation) return;
    setEditingRealisation({
      ...editingRealisation,
      challenges: [...(editingRealisation.challenges || []), emptyTranslated()],
    });
  };

  const updateChallenge = (index: number, lang: string, value: string) => {
    if (!editingRealisation) return;
    const challenges = [...(editingRealisation.challenges || [])];
    challenges[index] = { ...(challenges[index] || emptyTranslated()), [lang]: value };
    setEditingRealisation({ ...editingRealisation, challenges });
  };

  const removeChallenge = (index: number) => {
    if (!editingRealisation) return;
    const challenges = [...(editingRealisation.challenges || [])];
    challenges.splice(index, 1);
    setEditingRealisation({ ...editingRealisation, challenges });
  };

  const addSolution = () => {
    if (!editingRealisation) return;
    setEditingRealisation({
      ...editingRealisation,
      solutions: [...(editingRealisation.solutions || []), emptyTranslated()],
    });
  };

  const updateSolution = (index: number, lang: string, value: string) => {
    if (!editingRealisation) return;
    const solutions = [...(editingRealisation.solutions || [])];
    solutions[index] = { ...(solutions[index] || emptyTranslated()), [lang]: value };
    setEditingRealisation({ ...editingRealisation, solutions });
  };

  const removeSolution = (index: number) => {
    if (!editingRealisation) return;
    const solutions = [...(editingRealisation.solutions || [])];
    solutions.splice(index, 1);
    setEditingRealisation({ ...editingRealisation, solutions });
  };

  const removeGalleryImage = (index: number) => {
    if (!editingRealisation) return;
    const gallery = [...(editingRealisation.gallery || [])];
    gallery.splice(index, 1);
    setEditingRealisation({ ...editingRealisation, gallery });
  };

  // ===== STATUS BADGE =====
  const getStatusBadge = (status: unknown) => {
    const badges: Record<string, { label: string; color: string }> = {
      published: { label: "Publie", color: "bg-green-500/10 text-green-600" },
      draft: { label: "Brouillon", color: "bg-gray-500/10 text-gray-600" },
      scheduled: { label: "Programme", color: "bg-blue-500/10 text-blue-600" },
      completed: { label: "Termine", color: "bg-green-500/10 text-green-600" },
      ongoing: { label: "En cours", color: "bg-orange-500/10 text-orange-600" },
      planned: { label: "Planifie", color: "bg-purple-500/10 text-purple-600" },
    };
    const key = safe(status);
    const badge = badges[key] || badges.draft;
    return <span className={`px-3 py-1 ${badge.color} text-[12px] rounded-lg font-bold`}>{badge.label}</span>;
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  // LangTabs and TranslatedInput are defined outside the component to avoid re-creation on each render

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#E40714] to-[#C00612] rounded-2xl flex items-center justify-center shadow-lg">
                <LayoutDashboard className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-[48px] text-[#212121] font-rajdhani font-black uppercase leading-none">Dashboard Admin</h1>
                <p className="text-[#1B1B1B]/70 text-[16px]">Gerez l'ensemble de votre contenu METALR</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/">
                <motion.button
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#1B1B1B] border-2 border-[#C6C6C6]/30 rounded-xl hover:border-[#E40714] transition-all duration-300 shadow-lg font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye size={20} />
                  Voir le site
                </motion.button>
              </Link>
              <motion.button
                className="flex items-center gap-2 px-6 py-3 bg-[#E40714] text-white rounded-xl hover:bg-[#C00612] transition-all duration-300 shadow-lg font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
              >
                <LogOut size={20} />
                Deconnexion
              </motion.button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl p-6 text-white shadow-xl"
                style={{ background: `linear-gradient(135deg, ${stat.bg}, ${stat.bg}dd)` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <stat.icon size={24} />
                  </div>
                  <div className="text-[40px] font-rajdhani font-black leading-none">{stat.value}</div>
                </div>
                <p className="text-[14px] font-bold uppercase tracking-wide opacity-90">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 bg-white rounded-2xl p-2 shadow-lg border-2 border-[#C6C6C6]/20">
          {[
            { id: "dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
            { id: "news", label: "Actualites", icon: Newspaper },
            { id: "realisations", label: "Realisations", icon: FolderKanban },
            { id: "settings", label: "Parametres", icon: Settings },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all duration-300 font-bold ${
                activeTab === tab.id ? "bg-[#E40714] text-white shadow-lg" : "text-[#1B1B1B] hover:bg-[#C6C6C6]/10"
              }`}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSearchQuery("");
                setFilterCategory("all");
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon size={20} />
              <span className="hidden md:inline">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#C6C6C6]/20">
          {/* ===== DASHBOARD TAB ===== */}
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-[36px] text-[#212121] font-rajdhani font-black uppercase mb-8">Vue d'ensemble</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Recent Activity */}
                <div className="bg-gradient-to-br from-[#C6C6C6]/5 to-white rounded-2xl p-6 border-2 border-[#C6C6C6]/30">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[24px] text-[#1B1B1B] font-rajdhani font-bold">Derniers articles</h3>
                    <Clock className="text-[#E40714]" size={24} />
                  </div>
                  <div className="space-y-4">
                    {articles.slice(0, 4).map((article) => (
                      <div key={article.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#F5F5F5] transition-all">
                        <div className="w-10 h-10 bg-[#E40714]/10 rounded-xl flex items-center justify-center shrink-0">
                          <FileText className="text-[#E40714]" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-bold text-[#1B1B1B] truncate">{tField(article.title, "fr")}</p>
                          <p className="text-[12px] text-[#1B1B1B]/40">{safe(article.date)} - {safe(article.views) || 0} vues</p>
                        </div>
                        {getStatusBadge(article.status)}
                      </div>
                    ))}
                    {articles.length === 0 && <p className="text-[14px] text-[#1B1B1B]/40 text-center py-4">Aucun article</p>}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-[#E40714]/5 to-white rounded-2xl p-6 border-2 border-[#E40714]/20">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[24px] text-[#1B1B1B] font-rajdhani font-bold">Actions rapides</h3>
                    <Newspaper className="text-[#E40714]" size={24} />
                  </div>
                  <div className="space-y-3">
                    <motion.button
                      className="w-full flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#E40714] to-[#C00612] text-white rounded-xl font-bold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setActiveTab("news"); openNewArticle(); }}
                    >
                      <Plus size={20} />
                      Creer un nouvel article
                    </motion.button>
                    <motion.button
                      className="w-full flex items-center gap-3 px-6 py-4 bg-white text-[#1B1B1B] border-2 border-[#C6C6C6]/30 rounded-xl font-bold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setActiveTab("realisations"); openNewRealisation(); }}
                    >
                      <Plus size={20} />
                      Ajouter une realisation
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Stats Preview */}
              <div className="bg-gradient-to-br from-blue-500/5 to-white rounded-2xl p-6 border-2 border-blue-500/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[24px] text-[#1B1B1B] font-rajdhani font-bold">Contenu</h3>
                  <TrendingUp className="text-blue-600" size={24} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Articles publies", value: articles.filter((a) => a.status === "published").length },
                    { label: "Brouillons", value: articles.filter((a) => a.status === "draft").length },
                    { label: "Realisations terminees", value: realisations.filter((r) => r.status === "completed").length },
                    { label: "Projets en cours", value: realisations.filter((r) => r.status === "ongoing").length },
                  ].map((metric, index) => (
                    <div key={index} className="text-center p-4 bg-white rounded-xl border border-[#C6C6C6]/20">
                      <div className="text-[28px] font-rajdhani font-bold text-[#212121] mb-1">{metric.value}</div>
                      <div className="text-[12px] text-[#1B1B1B]/60">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== NEWS TAB ===== */}
          {activeTab === "news" && (
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-[36px] text-[#212121] font-rajdhani font-black uppercase">Gestion des actualites</h2>
                  <p className="text-[14px] text-[#1B1B1B]/60 mt-1">{filteredNews.length} article{filteredNews.length > 1 ? "s" : ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B1B1B]/40" size={20} />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all w-64"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none font-bold"
                  >
                    <option value="all">Toutes</option>
                    {articleCategories.map((c) => (
                      <option key={c.id} value={c.slug}>{tField(c.label, "fr")}</option>
                    ))}
                  </select>
                  <motion.button
                    className="flex items-center gap-2 px-6 py-3 bg-[#E40714] text-white rounded-xl font-bold shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openNewArticle}
                  >
                    <Plus size={20} />
                    Nouvel article
                  </motion.button>
                </div>
              </div>

              {loadingArticles ? (
                <div className="flex justify-center py-20">
                  <div className="w-8 h-8 border-3 border-[#E40714] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNews.map((article) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group flex items-center gap-6 p-6 bg-gradient-to-br from-[#C6C6C6]/5 to-white rounded-2xl border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300"
                    >
                      {article.image_url && (
                        <img src={article.image_url} alt="" className="w-32 h-32 object-cover rounded-xl shadow-md" loading="lazy" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-[#E40714]/10 text-[#E40714] text-[12px] rounded-lg font-bold">{typeof article.category === "string" ? article.category : tField(article.category as any, "fr")}</span>
                          {getStatusBadge(article.status)}
                          {article.featured && <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-[12px] rounded-lg font-bold">A la une</span>}
                        </div>
                        <h3 className="text-[22px] text-[#212121] font-rajdhani font-bold mb-2 group-hover:text-[#E40714] transition-colors truncate">
                          {tField(article.title, "fr")}
                        </h3>
                        <p className="text-[14px] text-[#1B1B1B]/60 mb-3 line-clamp-2">{tField(article.excerpt, "fr")}</p>
                        <div className="flex items-center gap-4 text-[13px] text-[#1B1B1B]/50">
                          <span className="flex items-center gap-1"><Calendar size={14} />{safe(article.date)}</span>
                          <span className="flex items-center gap-1"><Eye size={14} />{(Number(safe(article.views)) || 0).toLocaleString()} vues</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          className="p-3 bg-blue-500/10 text-blue-600 rounded-xl hover:bg-blue-500/20 transition-all"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openEditArticle(article)}
                        >
                          <Edit2 size={18} />
                        </motion.button>
                        <Link to={`/actualites/${article.slug}`}>
                          <motion.button className="p-3 bg-purple-500/10 text-purple-600 rounded-xl hover:bg-purple-500/20 transition-all" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Eye size={18} />
                          </motion.button>
                        </Link>
                        <motion.button
                          className="p-3 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500/20 transition-all"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteArticle(article.id)}
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                  {filteredNews.length === 0 && <p className="text-center py-12 text-[#1B1B1B]/40">Aucun article trouve.</p>}
                </div>
              )}
            </div>
          )}

          {/* ===== REALISATIONS TAB ===== */}
          {activeTab === "realisations" && (
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-[36px] text-[#212121] font-rajdhani font-black uppercase">Gestion des realisations</h2>
                  <p className="text-[14px] text-[#1B1B1B]/60 mt-1">{filteredRealisations.length} projet{filteredRealisations.length > 1 ? "s" : ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B1B1B]/40" size={20} />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all w-64"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none font-bold"
                  >
                    <option value="all">Toutes</option>
                    {realisationCategories.map((c) => (
                      <option key={c.id} value={c.slug}>{tField(c.label, "fr")}</option>
                    ))}
                  </select>
                  <motion.button
                    className="flex items-center gap-2 px-6 py-3 bg-[#E40714] text-white rounded-xl font-bold shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openNewRealisation}
                  >
                    <Plus size={20} />
                    Nouvelle realisation
                  </motion.button>
                </div>
              </div>

              {loadingRealisations ? (
                <div className="flex justify-center py-20">
                  <div className="w-8 h-8 border-3 border-[#E40714] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredRealisations.map((r) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group bg-white rounded-2xl overflow-hidden border-2 border-[#C6C6C6]/30 hover:border-[#E40714] transition-all duration-300 shadow-lg"
                    >
                      <div className="relative h-56 overflow-hidden">
                        {r.main_image_url ? (
                          <img src={r.main_image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                        ) : (
                          <div className="w-full h-full bg-[#F5F5F5] flex items-center justify-center">
                            <ImageIcon size={48} className="text-[#C6C6C6]" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/60 to-transparent" />
                        <div className="absolute top-4 right-4">{getStatusBadge(r.status)}</div>
                      </div>
                      <div className="p-6">
                        <span className="px-3 py-1 bg-[#E40714]/10 text-[#E40714] text-[12px] rounded-lg font-bold">{typeof r.category === "string" ? r.category : tField(r.category as any, "fr")}</span>
                        <h3 className="text-[24px] text-[#212121] font-rajdhani font-bold mt-3 mb-3 group-hover:text-[#E40714] transition-colors">
                          {tField(r.title, "fr")}
                        </h3>
                        <div className="space-y-1 mb-4 text-[14px] text-[#1B1B1B]/70">
                          <p>{tField(r.location, "fr")}</p>
                          <p>{safe(r.year)} {r.duration ? `- ${tField(r.duration, "fr")}` : ""} {r.surface ? `- ${safe(r.surface)}` : ""}</p>
                          {r.client && <p>{tField(r.client, "fr")}</p>}
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/10 text-blue-600 rounded-xl font-bold"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => openEditRealisation(r)}
                          >
                            <Edit2 size={16} />
                            Modifier
                          </motion.button>
                          <motion.button
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-600 rounded-xl font-bold"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => deleteRealisation(r.id)}
                          >
                            <Trash2 size={16} />
                            Supprimer
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {filteredRealisations.length === 0 && <p className="text-center py-12 text-[#1B1B1B]/40 col-span-2">Aucune realisation trouvee.</p>}
                </div>
              )}
            </div>
          )}

          {/* ===== SETTINGS TAB ===== */}
          {activeTab === "settings" && (
            <div>
              <h2 className="text-[36px] text-[#212121] font-rajdhani font-black uppercase mb-8">Parametres</h2>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#C6C6C6]/5 to-white rounded-2xl p-6 border-2 border-[#C6C6C6]/30">
                  <h3 className="text-[24px] text-[#1B1B1B] font-rajdhani font-bold mb-6 flex items-center gap-3">
                    <Settings className="text-[#E40714]" size={24} />
                    Parametres du site
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[14px] text-[#1B1B1B] font-bold mb-2">Nom du site</label>
                      <input type="text" defaultValue="METALR" className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[14px] text-[#1B1B1B] font-bold mb-2">Email de contact</label>
                      <input type="email" defaultValue="contact@metalr.com" className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/5 to-white rounded-2xl p-6 border-2 border-green-500/20">
                  <h3 className="text-[24px] text-[#1B1B1B] font-rajdhani font-bold mb-6 flex items-center gap-3">
                    <LinkIcon className="text-green-600" size={24} />
                    SEO
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[14px] text-[#1B1B1B] font-bold mb-2">Titre SEO</label>
                      <input type="text" defaultValue="METALR - Structures metalliques & Energies renouvelables" className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[14px] text-[#1B1B1B] font-bold mb-2">Description</label>
                      <textarea rows={3} defaultValue="Leader europeen en structures metalliques et solutions photovoltaiques innovantes" className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all resize-none" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/5 to-white rounded-2xl p-6 border-2 border-blue-500/20">
                  <h3 className="text-[24px] text-[#1B1B1B] font-rajdhani font-bold mb-6 flex items-center gap-3">
                    <Users className="text-blue-600" size={24} />
                    Reseaux sociaux
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["Facebook", "LinkedIn", "Instagram", "Twitter"].map((social, index) => (
                      <div key={index}>
                        <label className="block text-[14px] text-[#1B1B1B] font-bold mb-2">{social}</label>
                        <input type="url" placeholder={`URL ${social}`} className="w-full px-4 py-3 rounded-xl border-2 border-[#C6C6C6]/30 focus:border-[#E40714] outline-none transition-all" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category management */}
                <div className="bg-gradient-to-br from-orange-500/5 to-white rounded-2xl p-6 border-2 border-orange-500/20">
                  <h3 className="text-[24px] text-[#1B1B1B] font-rajdhani font-bold mb-6 flex items-center gap-3">
                    <FolderKanban className="text-orange-600" size={24} />
                    Categories
                  </h3>

                  {/* Existing categories */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-[14px] font-bold text-[#1B1B1B] mb-2">Articles</h4>
                      <div className="flex flex-wrap gap-2">
                        {articleCategories.map((c) => (
                          <div key={c.id} className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5">
                            <span className="text-[13px] font-bold text-blue-800">{tField(c.label, "fr")}</span>
                            <button
                              onClick={async () => { if (window.confirm(`Supprimer la categorie "${tField(c.label, "fr")}" ?`)) await deleteArticleCat(c.id); }}
                              className="text-red-400 hover:text-red-600 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#1B1B1B] mb-2">Realisations</h4>
                      <div className="flex flex-wrap gap-2">
                        {realisationCategories.map((c) => (
                          <div key={c.id} className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                            <span className="text-[13px] font-bold text-green-800">{tField(c.label, "fr")}</span>
                            <button
                              onClick={async () => { if (window.confirm(`Supprimer la categorie "${tField(c.label, "fr")}" ?`)) await deleteRealisationCat(c.id); }}
                              className="text-red-400 hover:text-red-600 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add new category */}
                  <div className="border-t border-[#C6C6C6]/30 pt-4">
                    <h4 className="text-[14px] font-bold text-[#1B1B1B] mb-3">Ajouter une categorie</h4>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-[12px] text-[#1B1B1B]/60 mb-1">Type</label>
                        <select
                          value={newCatType}
                          onChange={(e) => setNewCatType(e.target.value as "article" | "realisation")}
                          className="w-full px-3 py-2 rounded-lg border border-[#E0E0E0] text-[13px] focus:outline-none focus:border-[#E40714] font-bold"
                        >
                          <option value="article">Article</option>
                          <option value="realisation">Realisation</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#1B1B1B]/60 mb-1">Slug</label>
                        <input
                          type="text"
                          value={newCatSlug}
                          onChange={(e) => setNewCatSlug(slugify(e.target.value))}
                          placeholder="ex: transport"
                          className="w-full px-3 py-2 rounded-lg border border-[#E0E0E0] text-[13px] focus:outline-none focus:border-[#E40714]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {LANGS.map((lang) => (
                        <div key={lang}>
                          <label className="block text-[12px] text-[#1B1B1B]/60 mb-1">Label {lang.toUpperCase()}</label>
                          <input
                            type="text"
                            value={newCatLabel[lang]}
                            onChange={(e) => setNewCatLabel({ ...newCatLabel, [lang]: e.target.value })}
                            placeholder={`Nom en ${LANG_LABELS[lang]}`}
                            className="w-full px-3 py-2 rounded-lg border border-[#E0E0E0] text-[13px] focus:outline-none focus:border-[#E40714]"
                          />
                        </div>
                      ))}
                    </div>
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2 bg-[#E40714] text-white rounded-lg font-bold text-[13px]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={addingCategory || !newCatSlug || !newCatLabel.fr}
                      onClick={async () => {
                        setAddingCategory(true);
                        const addFn = newCatType === "article" ? addArticleCat : addRealisationCat;
                        const ok = await addFn(newCatSlug, newCatLabel);
                        if (ok) {
                          setNewCatSlug("");
                          setNewCatLabel(emptyTranslated());
                        }
                        setAddingCategory(false);
                      }}
                    >
                      <Plus size={16} />
                      {addingCategory ? "Ajout..." : "Ajouter"}
                    </motion.button>
                  </div>
                </div>

                {/* Bulk translation */}
                <BulkTranslateSection
                  articles={articles}
                  realisations={realisations}
                  refetchArticles={refetchArticles}
                  refetchRealisations={refetchRealisations}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== EDIT/CREATE MODAL ===== */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-[#212121]/60 backdrop-blur-md z-50 flex items-center justify-center p-6"
          onClick={() => setIsEditing(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#C6C6C6]/30"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[32px] text-[#212121] font-rajdhani font-black uppercase">
                {(editingArticle?.id || editingRealisation?.id) ? "Modifier" : "Creer"}{" "}
                {editingArticle ? "un article" : "une realisation"}
              </h3>
              <motion.button
                className="p-3 hover:bg-[#C6C6C6]/10 rounded-xl"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(false)}
              >
                <X size={28} />
              </motion.button>
            </div>

            {saveError && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-[13px]">{saveError}</div>
            )}

            {/* Language Tabs */}
            <div className="mb-6">
              <LangTabs activeLang={activeLang} setActiveLang={setActiveLang} />
              <p className="text-[12px] text-[#1B1B1B]/40 mt-2">Les champs vides seront automatiquement traduits depuis le francais lors de la sauvegarde.</p>
            </div>

            {/* ===== ARTICLE FORM ===== */}
            {editingArticle && (
              <div className="space-y-5">
                <TranslatedInput label="Titre" field="title" obj={editingArticle} setObj={setEditingArticle} activeLang={activeLang} />
                <TranslatedInput label="Extrait" field="excerpt" obj={editingArticle} setObj={setEditingArticle} activeLang={activeLang} multiline />
                <div>
                  <label className="block text-[13px] text-[#1B1B1B] font-bold mb-1.5">Contenu</label>
                  <RichTextEditor
                    value={(editingArticle.content as TranslatedField)?.[activeLang as keyof TranslatedField] || ""}
                    onChange={(html) => updateTranslatedField(editingArticle, setEditingArticle, "content", activeLang, html)}
                    placeholder="Redigez le contenu de l'article..."
                  />
                </div>
                <TranslatedInput label="Badge" field="badge" obj={editingArticle} setObj={setEditingArticle} activeLang={activeLang} />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] text-[#1B1B1B] font-bold mb-1.5">Categorie</label>
                    <select
                      value={editingArticle.category || ""}
                      onChange={(e) => {
                        const cat = articleCategories.find(c => c.slug === e.target.value);
                        setEditingArticle({ ...editingArticle, category: e.target.value, category_label: cat?.label || emptyTranslated() });
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] text-[14px] focus:outline-none focus:border-[#E40714] font-bold"
                    >
                      {articleCategories.map((c) => (
                        <option key={c.id} value={c.slug}>{tField(c.label, "fr")}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#1B1B1B] font-bold mb-1.5">Date</label>
                    <input
                      type="date"
                      value={editingArticle.date || ""}
                      onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] text-[14px] focus:outline-none focus:border-[#E40714]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#1B1B1B] font-bold mb-1.5">Auteur</label>
                    <input
                      type="text"
                      value={editingArticle.author || ""}
                      onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] text-[14px] focus:outline-none focus:border-[#E40714]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#1B1B1B] font-bold mb-1.5">Temps de lecture</label>
                    <input
                      type="text"
                      placeholder="5 min"
                      value={editingArticle.read_time || ""}
                      onChange={(e) => setEditingArticle({ ...editingArticle, read_time: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] text-[14px] focus:outline-none focus:border-[#E40714]"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-[13px] text-[#1B1B1B] font-bold mb-1.5">Image</label>
                  {editingArticle.image_url ? (
                    <div className="relative rounded-xl overflow-hidden h-48 group">
                      <img src={editingArticle.image_url} alt="" className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                        <button
                          type="button"
                          className="flex items-center gap-1.5 px-3 py-2 bg-white text-[#1B1B1B] text-[13px] font-semibold rounded-lg hover:bg-[#E40714] hover:text-white transition-colors"
                          onClick={() => replaceArticleImageRef.current?.click()}
                        >
                          <ImageIcon size={14} />
                          Remplacer
                        </button>
                        <button
                          type="button"
                          className="flex items-center gap-1.5 px-3 py-2 bg-red-500 text-white text-[13px] font-semibold rounded-lg hover:bg-red-600 transition-colors"
                          onClick={() => setEditingArticle({ ...editingArticle, image_url: null })}
                        >
                          <X size={14} />
                          Supprimer
                        </button>
                      </div>
                      <input
                        ref={replaceArticleImageRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0], "article"); }}
                      />
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed border-[#C6C6C6]/50 rounded-xl p-8 text-center hover:border-[#E40714] transition-all cursor-pointer bg-[#C6C6C6]/5"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="mx-auto mb-4 text-[#1B1B1B]/40" size={48} />
                      <p className="text-[14px] text-[#1B1B1B]/70">{uploading ? "Upload en cours..." : "Cliquez pour choisir une image"}</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0], "article"); }}
                      />
                    </div>
                  )}
                </div>

                {/* Featured + Status */}
                <div className="flex items-center gap-6 p-4 bg-[#C6C6C6]/5 rounded-xl">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded accent-[#E40714]"
                      checked={editingArticle.featured || false}
                      onChange={(e) => setEditingArticle({ ...editingArticle, featured: e.target.checked })}
                    />
                    <span className="text-[14px] font-bold text-[#1B1B1B]">A la une</span>
                  </label>
                  <select
                    value={editingArticle.status || "draft"}
                    onChange={(e) => setEditingArticle({ ...editingArticle, status: e.target.value as any })}
                    className="flex-1 px-4 py-3 rounded-xl border border-[#E0E0E0] font-bold text-[14px] focus:outline-none focus:border-[#E40714]"
                  >
                    <option value="published">Publier maintenant</option>
                    <option value="draft">Brouillon</option>
                    <option value="scheduled">Programme</option>
                  </select>
                </div>
              </div>
            )}

            {/* ===== REALISATION FORM ===== */}
            {editingRealisation && (
              <div className="space-y-5">
                <TranslatedInput label="Titre" field="title" obj={editingRealisation} setObj={setEditingRealisation} activeLang={activeLang} />
                <TranslatedInput label="Label categorie" field="category_label" obj={editingRealisation} setObj={setEditingRealisation} activeLang={activeLang} />
                <TranslatedInput label="Localisation" field="location" obj={editingRealisation} setObj={setEditingRealisation} activeLang={activeLang} />
                <div>
                  <label className="block text-[13px] text-[#1B1B1B] font-bold mb-1.5">Description</label>
                  <RichTextEditor
                    value={(editingRealisation.description as TranslatedField)?.[activeLang as keyof TranslatedField] || ""}
                    onChange={(html) => updateTranslatedField(editingRealisation, setEditingRealisation, "description", activeLang, html)}
                    placeholder="Decrivez la realisation..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] text-[#1B1B1B] font-bold mb-1.5">Categorie</label>
                    <select
                      value={editingRealisation.category || ""}
                      onChange={(e) => {
                        const cat = realisationCategories.find(c => c.slug === e.target.value);
                        setEditingRealisation({ ...editingRealisation, category: e.target.value, category_label: cat?.label || emptyTranslated() });
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] text-[14px] focus:outline-none focus:border-[#E40714] font-bold"
                    >
                      {realisationCategories.map((c) => (
                        <option key={c.id} value={c.slug}>{tField(c.label, "fr")}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#1B1B1B] font-bold mb-1.5">Annee</label>
                    <input
                      type="text"
                      value={editingRealisation.year || ""}
                      onChange={(e) => setEditingRealisation({ ...editingRealisation, year: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] text-[14px] focus:outline-none focus:border-[#E40714]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#1B1B1B] font-bold mb-1.5">Surface</label>
                    <input
                      type="text"
                      value={editingRealisation.surface || ""}
                      onChange={(e) => setEditingRealisation({ ...editingRealisation, surface: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] text-[14px] focus:outline-none focus:border-[#E40714]"
                    />
                  </div>
                  <TranslatedInput label="Client" field="client" obj={editingRealisation} setObj={setEditingRealisation} activeLang={activeLang} />
                  <TranslatedInput label="Duree" field="duration" obj={editingRealisation} setObj={setEditingRealisation} activeLang={activeLang} />
                  <TranslatedInput label="Budget" field="budget" obj={editingRealisation} setObj={setEditingRealisation} activeLang={activeLang} />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-[13px] text-[#1B1B1B] font-bold mb-1.5">Statut</label>
                  <select
                    value={editingRealisation.status || "completed"}
                    onChange={(e) => setEditingRealisation({ ...editingRealisation, status: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] text-[14px] focus:outline-none focus:border-[#E40714] font-bold"
                  >
                    <option value="completed">Termine</option>
                    <option value="ongoing">En cours</option>
                    <option value="planned">Planifie</option>
                  </select>
                </div>

                {/* Main Image */}
                <div>
                  <label className="block text-[13px] text-[#1B1B1B] font-bold mb-1.5">Image principale</label>
                  {editingRealisation.main_image_url ? (
                    <div className="relative rounded-xl overflow-hidden h-48 group">
                      <img src={editingRealisation.main_image_url} alt="" className="w-full h-full object-cover" loading="lazy" />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                        <button
                          type="button"
                          className="flex items-center gap-1.5 px-3 py-2 bg-white text-[#1B1B1B] text-[13px] font-semibold rounded-lg hover:bg-[#E40714] hover:text-white transition-colors"
                          onClick={() => replaceImageRef.current?.click()}
                        >
                          <ImageIcon size={14} />
                          Remplacer
                        </button>
                        <button
                          type="button"
                          className="flex items-center gap-1.5 px-3 py-2 bg-red-500 text-white text-[13px] font-semibold rounded-lg hover:bg-red-600 transition-colors"
                          onClick={() => setEditingRealisation({ ...editingRealisation, main_image_url: null })}
                        >
                          <X size={14} />
                          Supprimer
                        </button>
                      </div>
                      <input
                        ref={replaceImageRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0], "realisation"); }}
                      />
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed border-[#C6C6C6]/50 rounded-xl p-8 text-center hover:border-[#E40714] transition-all cursor-pointer bg-[#C6C6C6]/5"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="mx-auto mb-4 text-[#1B1B1B]/40" size={48} />
                      <p className="text-[14px] text-[#1B1B1B]/70">{uploading ? "Upload en cours..." : "Cliquez pour choisir une image"}</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0], "realisation"); }}
                      />
                    </div>
                  )}
                </div>

                {/* Gallery */}
                <div>
                  <label className="block text-[13px] text-[#1B1B1B] font-bold mb-1.5">Galerie</label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {(editingRealisation.gallery || []).map((url, index) => (
                      <div key={index} className="relative rounded-lg overflow-hidden h-24">
                        <img src={url} alt="" className="w-full h-full object-cover" loading="lazy" />
                        <button
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded"
                          onClick={() => removeGalleryImage(index)}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    <div
                      className="h-24 border-2 border-dashed border-[#C6C6C6]/50 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#E40714] transition-all"
                      onClick={() => galleryInputRef.current?.click()}
                    >
                      <Plus className="text-[#C6C6C6]" size={24} />
                      <input
                        ref={galleryInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0], "gallery"); }}
                      />
                    </div>
                  </div>
                </div>

                {/* Challenges */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[13px] text-[#1B1B1B] font-bold">Defis ({activeLang.toUpperCase()})</label>
                    <button className="text-[#E40714] text-[13px] font-bold flex items-center gap-1" onClick={addChallenge}>
                      <Plus size={14} /> Ajouter
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(editingRealisation.challenges || []).map((c, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={(c as TranslatedField)?.[activeLang as keyof TranslatedField] || ""}
                          onChange={(e) => updateChallenge(i, activeLang, e.target.value)}
                          className="flex-1 px-4 py-2 rounded-lg border border-[#E0E0E0] text-[14px] focus:outline-none focus:border-[#E40714]"
                          placeholder={`Defi ${i + 1}`}
                        />
                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg" onClick={() => removeChallenge(i)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solutions */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[13px] text-[#1B1B1B] font-bold">Solutions ({activeLang.toUpperCase()})</label>
                    <button className="text-[#E40714] text-[13px] font-bold flex items-center gap-1" onClick={addSolution}>
                      <Plus size={14} /> Ajouter
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(editingRealisation.solutions || []).map((s, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={(s as TranslatedField)?.[activeLang as keyof TranslatedField] || ""}
                          onChange={(e) => updateSolution(i, activeLang, e.target.value)}
                          className="flex-1 px-4 py-2 rounded-lg border border-[#E0E0E0] text-[14px] focus:outline-none focus:border-[#E40714]"
                          placeholder={`Solution ${i + 1}`}
                        />
                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg" onClick={() => removeSolution(i)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <motion.button
                className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-[#E40714] to-[#C00612] text-white rounded-2xl font-bold text-[18px] uppercase tracking-wide disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={editingArticle ? saveArticle : saveRealisation}
                disabled={saving}
              >
                <Save size={24} />
                {saving ? "Enregistrement..." : "Enregistrer"}
              </motion.button>
              <motion.button
                className="px-8 py-5 bg-[#C6C6C6]/20 text-[#1B1B1B] rounded-2xl font-bold text-[18px] uppercase tracking-wide"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
