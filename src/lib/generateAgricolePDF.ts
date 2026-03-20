import { jsPDF } from "jspdf";
import { loadHeroImage, loadWhiteLogo, createLayout } from "./pdfHelpers";

export async function generateAgricolePDF(): Promise<void> {
  const doc = new jsPDF("p", "mm", "a4");
  const TOTAL = 3;

  const [hero, logo] = await Promise.all([
    loadHeroImage("/images/DEE59EC1-2254-49AC-9F23-A0A1BCB6D5A0.webp"),
    loadWhiteLogo("/images/MetalR_bonlogo.webp"),
  ]);

  const L = createLayout(doc, TOTAL, "Solutions Agricoles", logo);
  const { W, H, M, CW, drawCover, drawHeader, drawFooter, sectionTitle, statsRow, featureCard, ctaBlock } = L;

  // ── PAGE 1 — COVER ──────────────────────────────────────────────────────────
  drawCover(
    hero,
    "SOLUTIONS AGRICOLES",
    "Secteur",
    "Agricole",
    "Batiments metalliques sur mesure : stabulations, hangars de stockage, elevage et agrivoltaique.",
    [
      { value: "+300", label: "Batiments livres" },
      { value: "5", label: "Sites de prod." },
      { value: "25 ans", label: "Garantie struct." },
      { value: "280+", label: "Experts" },
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
    "Des structures metalliques robustes et adaptees aux exigences de l'agriculture moderne. MetalR concoit, fabrique et installe des batiments agricoles sur mesure — stabulations, hangars de stockage, batiments d'elevage et structures agrivoltaiques.",
    CW
  );
  doc.text(intro, M, y);
  y += intro.length * 5 + 8;

  // Stats boxes
  y = statsRow([
    { value: "+300", label: "Batiments livres" },
    { value: "5", label: "Sites de prod." },
    { value: "25 ans", label: "Garantie struct." },
    { value: "280+", label: "Experts" },
  ], y);

  // Types de bâtiments
  y = sectionTitle("Nos types de batiments", y);

  const buildings = [
    {
      title: "Batiments d'elevage",
      desc: "Stabulations libres, poulaillers, bergeries et structures adaptees a tous types d'elevage. Conception optimisee pour le bien-etre animal et la ventilation naturelle.",
    },
    {
      title: "Stockage agricole",
      desc: "Hangars de stockage pour cereales, materiel agricole et fourrage. Grandes portees sans poteaux intermediaires pour une utilisation maximale de l'espace.",
    },
    {
      title: "Structures polyvalentes",
      desc: "Batiments modulables et evolutifs selon vos besoins d'exploitation. Possibilite d'extension et d'adaptation dans le temps.",
    },
  ];

  buildings.forEach((b) => {
    y = featureCard(b.title, b.desc, y);
  });

  // AgriPV focus
  y = sectionTitle("Focus AgriPV", y);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  const agripvIntro = doc.splitTextToSize(
    "Combinez production agricole et energie solaire avec nos structures photovoltaiques adaptees au monde agricole.",
    CW
  );
  doc.text(agripvIntro, M, y);
  y += agripvIntro.length * 5 + 6;

  const agripvPoints = [
    "Protection des cultures et des animaux",
    "Revenu complementaire garanti",
    "Optimisation de l'espace disponible",
    "Solutions cle en main avec accompagnement",
  ];

  const colW2 = (CW - 6) / 2;
  agripvPoints.forEach((pt, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const px = M + col * (colW2 + 6);
    const py = y + row * 10;
    doc.setFillColor(228, 7, 20);
    doc.circle(px + 2, py - 1, 1.4, "F");
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.text(pt, px + 7, py);
  });

  drawFooter(2);

  // ── PAGE 3 — PROCESS + CERTIFICATIONS + CTA ─────────────────────────────────
  doc.addPage();
  drawHeader();

  y = 24;

  // Bénéfices
  y = sectionTitle("Benefices pour les exploitants", y);

  const benefits = [
    "Structures robustes et durables pour les conditions agricoles severes",
    "Ventilation optimale pour le bien-etre animal et la conservation",
    "Conception sur mesure adaptee a votre exploitation",
    "Respect des normes environnementales et sanitaires",
    "Installation rapide avec minimum d'interruption",
    "Maintenance reduite grace a la qualite des materiaux",
  ];

  const bHalf = (CW - 6) / 2;
  let leftY = y, rightY = y;
  benefits.forEach((b, i) => {
    const col = i % 2;
    const x = M + col * (bHalf + 6);
    const cy = col === 0 ? leftY : rightY;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(228, 7, 20);
    doc.text(String(i + 1).padStart(2, "0"), x, cy + 7);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    const lines = doc.splitTextToSize(b, bHalf - 14);
    doc.text(lines, x + 13, cy + 2);
    const h = Math.max(lines.length * 4.2 + 4, 14);
    if (col === 0) leftY += h;
    else rightY += h;
  });
  y = Math.max(leftY, rightY) + 10;

  // Certifications
  y = sectionTitle("Normes et certifications", y);

  const certs = [
    { title: "Marquage CE & Eurocodes", desc: "Conformite aux directives europeennes, calculs selon EN 1993 et EN 1991. Declarations de performance (DoP) fournies pour chaque ouvrage." },
    { title: "ISO 9001 & EN 1090", desc: "Management qualite certifie, classe d'execution EXC2/EXC3. Tracabilite complete de chaque piece, du laminoir au chantier." },
    { title: "Garantie structure 25 ans", desc: "Garantie decennale sur le gros oeuvre. Dimensionnement pour charges climatiques severes (neige, vent, seisme)." },
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
    "Un projet agricole ?",
    "Nos experts conçoivent votre batiment sur mesure. Contactez-nous pour une etude de faisabilite gratuite.",
    y
  );

  drawFooter(3);

  doc.save("METALR-Solutions-Agricoles.pdf");
}
