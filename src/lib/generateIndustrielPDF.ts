import { jsPDF } from "jspdf";
import { loadHeroImage, loadWhiteLogo, createLayout } from "./pdfHelpers";

export async function generateIndustrielPDF(): Promise<void> {
  const doc = new jsPDF("p", "mm", "a4");
  const TOTAL = 3;

  const [hero, logo] = await Promise.all([
    loadHeroImage("/images/IMG_0879.webp"),
    loadWhiteLogo("/images/MetalR_bonlogo.webp"),
  ]);

  const L = createLayout(doc, TOTAL, "Solutions Industrielles", logo);
  const { W, H, M, CW, drawCover, drawHeader, drawFooter, sectionTitle, statsRow, featureCard, ctaBlock } = L;

  // ── PAGE 1 — COVER ──────────────────────────────────────────────────────────
  drawCover(
    hero,
    "SOLUTIONS INDUSTRIELLES",
    "Batiments",
    "Industriels",
    "Halls de production, entrepots logistiques, mezzanines et structures sur mesure. Cle en main.",
    [
      { value: "5 sites", label: "Europe & Afrique" },
      { value: "50 000 T", label: "Capacite / an" },
      { value: "EN 1090", label: "Certification" },
      { value: "98%", label: "Delais respectes" },
    ]
  );

  // ── PAGE 2 — SOLUTIONS ───────────────────────────────────────────────────────
  doc.addPage();
  drawHeader();

  let y = 24;

  // Intro
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  const intro = doc.splitTextToSize(
    "METALR concoit, fabrique et installe des batiments industriels en charpente metallique. Halls de production, entrepots logistiques, mezzanines, batiments tertiaires — solutions cle en main de la conception a la livraison.",
    CW
  );
  doc.text(intro, M, y);
  y += intro.length * 5 + 8;

  // Stats
  y = statsRow([
    { value: "5 sites", label: "Europe & Afrique" },
    { value: "50 000 T", label: "Capacite / an" },
    { value: "EN 1090", label: "Certification" },
    { value: "98%", label: "Delais respectes" },
  ], y);

  // Solutions
  y = sectionTitle("Nos solutions industrielles", y);

  const solutions = [
    { title: "Halls industriels", desc: "Construction cle en main de halls de production, usines et ateliers. Grandes portees sans poteaux intermediaires pour une flexibilite maximale d'amenagement." },
    { title: "Entrepots & logistique", desc: "Plateformes logistiques, centres de stockage et entrepots frigorifiques. Optimises pour la circulation des engins et le chargement." },
    { title: "Renovation & extension", desc: "Modernisation de batiments existants, extensions de surface et mise aux normes. Intervention possible en site occupe." },
    { title: "Mezzanines & plateformes", desc: "Structures interieures sur mesure pour doubler vos surfaces exploitables. Calcul de charges adapte a votre activite." },
    { title: "Batiments tertiaires", desc: "Bureaux, showrooms et locaux commerciaux a ossature metallique. Rapidite de montage et liberte architecturale." },
    { title: "Structures sur mesure", desc: "Passerelles, auvents, couvertures techniques et ouvrages speciaux. Chaque solution est pensee pour vous." },
  ];

  solutions.forEach((s) => {
    y = featureCard(s.title, s.desc, y);
  });

  drawFooter(2);

  // ── PAGE 3 — METHODE + AVANTAGES + CTA ──────────────────────────────────────
  doc.addPage();
  drawHeader();

  y = 24;

  // Processus
  y = sectionTitle("Notre methode de travail", y);

  const process = [
    { step: "Etude de faisabilite", desc: "Analyse du terrain, contraintes reglementaires, besoins fonctionnels. Estimation budgetaire." },
    { step: "Conception sur mesure", desc: "Plans 3D Tekla Structures, calculs eurocodes (Robot Structural Analysis), optimisation des couts." },
    { step: "Fabrication", desc: "Usines certifiees EN 1090 : decoupe laser CNC, pliage robotise, soudage, galvanisation." },
    { step: "Livraison", desc: "Transport organise, logistique de chantier planifiee, conditionnement adapte." },
    { step: "Montage", desc: "Assemblage par nos equipes specialisees, coordination avec les autres corps de metier." },
    { step: "Reception", desc: "Controles finaux, PV de reception contradictoire, remise du dossier des ouvrages executes (DOE)." },
  ];

  const colW = (CW - 6) / 2;
  let leftY = y, rightY = y;
  process.forEach((p, i) => {
    const col = i % 2;
    const x = M + col * (colW + 6);
    const cy = col === 0 ? leftY : rightY;
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(228, 7, 20);
    doc.text(String(i + 1).padStart(2, "0"), x, cy + 7);
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 26, 26);
    doc.text(p.step, x + 12, cy + 7);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const lines = doc.splitTextToSize(p.desc, colW - 14);
    doc.text(lines, x + 12, cy + 12);
    const h = Math.max(lines.length * 4.2 + 10, 20);
    if (col === 0) leftY += h;
    else rightY += h;
  });
  y = Math.max(leftY, rightY) + 8;

  // Certifications
  y = sectionTitle("Normes et certifications", y);

  const certs = [
    { title: "EN 1090 — Classe EXC3", desc: "Certification de fabrication pour les structures les plus exigeantes. Tracabilite complete de chaque piece." },
    { title: "ISO 9001 — Management qualite", desc: "Systeme qualite certifie couvrant conception, fabrication, livraison et montage. Audits reguliers." },
    { title: "Marquage CE & Eurocodes", desc: "Conformite directives europeennes EN 1993 / EN 1991. Declarations de performance fournies." },
  ];

  certs.forEach((c) => {
    doc.setFillColor(228, 7, 20);
    doc.circle(M + 2, y - 1, 1.5, "F");
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 26, 26);
    doc.text(c.title, M + 8, y);
    y += 5;
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const lines = doc.splitTextToSize(c.desc, CW - 8);
    doc.text(lines, M + 8, y);
    y += lines.length * 4.3 + 6;
  });

  y += 4;
  ctaBlock(
    "Un projet industriel ?",
    "Discutons de votre construction ou renovation industrielle. Etude personnalisee et devis gratuit.",
    y
  );

  drawFooter(3);

  doc.save("METALR-Solutions-Industrielles.pdf");
}
