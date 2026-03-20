import { jsPDF } from "jspdf";
import { loadHeroImage, loadWhiteLogo, createLayout } from "./pdfHelpers";

export async function generatePhotovoltaiquePDF(): Promise<void> {
  const doc = new jsPDF("p", "mm", "a4");
  const TOTAL = 3;

  const [hero, logo] = await Promise.all([
    loadHeroImage("/images/panneau3.webp"),
    loadWhiteLogo("/images/metalr-logo-header.webp"),
  ]);

  const L = createLayout(doc, TOTAL, "Solutions Photovoltaïques", logo);
  const { W, H, M, CW, drawCover, drawHeader, drawFooter, sectionTitle, statsRow, featureCard, ctaBlock } = L;

  // ── PAGE 1 — COVER ──────────────────────────────────────────────────────────
  drawCover(
    hero,
    "SOLUTIONS PHOTOVOLTAIQUES",
    "Solutions",
    "Photovoltaïques",
    "Structures métalliques pour ombrières, centrales au sol, toitures PV et trackers solaires. Clé en main.",
    [
      { value: "250 MW", label: "Puissance installée" },
      { value: "+500", label: "Projets PV" },
      { value: "98%", label: "Délais respectés" },
      { value: "25 ans", label: "Garantie struct." },
    ]
  );

  // ── PAGE 2 — TYPES & CHIFFRES ────────────────────────────────────────────────
  doc.addPage();
  drawHeader();

  let y = 24;

  // Intro
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  const intro = doc.splitTextToSize(
    "METALR conçoit, fabrique et installe des structures métalliques pour installations photovoltaïques. Ombrières de parking, centrales au sol, toitures PV et trackers solaires — solutions clé en main de la conception a l'exploitation.",
    CW
  );
  doc.text(intro, M, y);
  y += intro.length * 5 + 8;

  // Stats
  y = statsRow([
    { value: "250 MW", label: "Puissance installée" },
    { value: "+500", label: "Projets PV" },
    { value: "98%", label: "Délais respectés" },
    { value: "25 ans", label: "Garantie struct." },
  ], y);

  // Types de projets
  y = sectionTitle("Types de projets", y);

  const projects = [
    {
      title: "Ombrières photovoltaïques",
      desc: "Parkings solaires pour collectivites et entreprises. Protection des vehicules et production d'énergie simultanee. Conformité loi Climat & Resilience pour parkings +1500 m2.",
    },
    {
      title: "Centrales au sol",
      desc: "Parcs solaires de grande envergure sur terrains dégradés ou non agricoles. Structures fixes ou a inclinaison variable. Puissances de 1 a 50 MWc.",
    },
    {
      title: "Toitures photovoltaïques",
      desc: "Équipement de bâtiments industriels, commerciaux et agricoles. Integration en surimposition ou en substitution de couverture. Étude de surcharge incluse.",
    },
    {
      title: "Trackers solaires",
      desc: "Structures orientables mono-axe ou bi-axe qui suivent la course du soleil. Gain de rendement de 20 a 35 % par rapport aux structures fixes.",
    },
  ];

  projects.forEach((p) => {
    y = featureCard(p.title, p.desc, y);
  });

  drawFooter(2);

  // ── PAGE 3 — PROCESSUS + AVANTAGES + CTA ────────────────────────────────────
  doc.addPage();
  drawHeader();

  y = 24;

  // Processus
  y = sectionTitle("Notre processus photovoltaïque", y);

  const process = [
    { step: "Étude de faisabilité", desc: "Analyse technique du site (ensoleillement, ombrage), étude financiere et verification réglementaire." },
    { step: "Conception & ingénierie", desc: "Dimensionnement selon charges climatiques locales, modélisation 3D, plans d'exécution." },
    { step: "Fabrication", desc: "Production EN 1090 : découpe laser CNC, pliage robotisé, galvanisation. Contrôle qualite a chaque étape." },
    { step: "Installation & raccordement", desc: "Montage par nos equipes qualifiées, câblage et raccordement au réseau ENEDIS." },
    { step: "Mise en service", desc: "Tests électriques, conformité Consuel, parametrage onduleur, formation de l'exploitant." },
    { step: "Maintenance", desc: "Contrats préventifs et curatifs, supervision a distance, interventions rapides." },
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
    { title: "Marquage CE & EN 1090", desc: "Conformité aux directives européennes. Déclarations de performance (DoP) fournies pour chaque ouvrage." },
    { title: "ISO 9001", desc: "Management qualite certifié couvrant conception, fabrication, livraison et montage." },
    { title: "Garantie structure 25 ans", desc: "Garantie décennale sur le gros oeuvre et performance énergétique sur 25 ans." },
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
    "Projet photovoltaïque ?",
    "Nos experts vous accompagnent dans votre transition énergétique. Étude de faisabilité gratuite.",
    y
  );

  drawFooter(3);

  doc.save("METALR-Solutions-Photovoltaïques.pdf");
}
