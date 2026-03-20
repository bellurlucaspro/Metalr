import { jsPDF } from "jspdf";
import { loadHeroImage, loadWhiteLogo, createLayout } from "./pdfHelpers";

export async function generateOuvragesArtPDF(): Promise<void> {
  const doc = new jsPDF("p", "mm", "a4");
  const TOTAL = 3;

  const [hero, logo] = await Promise.all([
    loadHeroImage("/images/pontafriquesud.webp"),
    loadWhiteLogo("/images/metalr-logo-header.webp"),
  ]);

  const L = createLayout(doc, TOTAL, "Ouvrages d'art & Génie civil", logo);
  const { W, H, M, CW, drawCover, drawHeader, drawFooter, sectionTitle, statsRow, featureCard, ctaBlock } = L;

  // ── PAGE 1 — COVER ──────────────────────────────────────────────────────────
  drawCover(
    hero,
    "OUVRAGES D'ART & GENIE CIVIL",
    "Ouvrages d'Art",
    "& Génie Civil",
    "Ponts, passerelles, charpentes complexes et infrastructures métalliques d'exception. France & international.",
    [
      { value: "120+", label: "Ouvrages livrés" },
      { value: "45 m", label: "Portée max" },
      { value: "EXC3", label: "Classe d'exéc." },
      { value: "100%", label: "Eurocodes" },
    ]
  );

  // ── PAGE 2 — DOMAINES & EXPERTISE ───────────────────────────────────────────
  doc.addPage();
  drawHeader();

  let y = 24;

  // Intro
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  const intro = doc.splitTextToSize(
    "Des structures métalliques d'exception pour les projets les plus exigeants : ponts, passerelles, charpentes complexes et infrastructures de génie civil. METALR conçoit, fabrique et installe des ouvrages techniques en France et a l'international.",
    CW
  );
  doc.text(intro, M, y);
  y += intro.length * 5 + 8;

  // Stats
  y = statsRow([
    { value: "120+", label: "Ouvrages livrés" },
    { value: "45 m", label: "Portée max" },
    { value: "EXC3", label: "Classe d'exéc." },
    { value: "100%", label: "Eurocodes" },
  ], y);

  // Domaines
  y = sectionTitle("Nos domaines d'intervention", y);

  const typologies = [
    { title: "Passerelles piétonnes et cyclables", desc: "Conception et realisation de passerelles urbaines, franchissements de voies ferrées et ouvrages legers. Design contemporain et integration paysagère soignee." },
    { title: "Ponts et tabliers métalliques", desc: "Tabliers de ponts routiers, ponts-rails et ouvrages de franchissement. Assemblage boulonne ou soude selon les contraintes du site." },
    { title: "Charpentes complexes", desc: "Structures de grande portée pour équipements publics, gares et bâtiments emblematiques. Geometries courbes et assemblages sur mesure." },
    { title: "Structures de génie civil", desc: "Portiques autoroutiers, mats, pylones. Résistance aux charges dynamiques et conditions climatiques extrêmes." },
    { title: "Escaliers & garde-corps", desc: "Escaliers monumentaux, garde-corps architecturaux pour ouvrages publics. Finitions soignees, conformité normes PMR." },
    { title: "Réhabilitation d'ouvrages", desc: "Diagnostic, renforcement et remise en état d'ouvrages métalliques existants. Prolongation de durée de vie et mise aux normes sismiques." },
  ];

  typologies.forEach((t) => {
    y = featureCard(t.title, t.desc, y);
  });

  drawFooter(2);

  // ── PAGE 3 — EXPERTISE + CERTIFICATIONS + CTA ───────────────────────────────
  doc.addPage();
  drawHeader();

  y = 24;

  // Expertise bureau d'etudes
  y = sectionTitle("Expertise de notre bureau d'etudes", y);

  const expertise = [
    { step: "Calcul de structures complexes", desc: "Modélisation 3D par elements finis, analyse non-lineaire et verification aux états limites (Robot Structural Analysis + Tekla Structures)." },
    { step: "Etudes sismiques & dynamiques", desc: "Calculs parasismiques, etudes de fatigue, analyse des vibrations. Conformité EN 1998." },
    { step: "Optimisation des matériaux", desc: "Choix des nuances d'acier (S235, S355, S460), dimensionnement optimise, réduction du poids propre." },
    { step: "Respect des eurocodes", desc: "Conformité totale EN 1993 (structures acier), EN 1090 (exécution) et réglementations nationales." },
    { step: "Suivi de chantier dédié", desc: "Ingénieur référent du lancement a la reception, coordination avec les entreprises de génie civil et VRD." },
    { step: "Contrôle qualite EXC3", desc: "Contrôles a chaque étape : soudure (ressuage, magnétoscopie), géométrie, assemblage. Certification EN 1090 EXC3." },
  ];

  const colW = (CW - 6) / 2;
  let leftY = y, rightY = y;
  expertise.forEach((e, i) => {
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
    doc.text(e.step, x + 12, cy + 7);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const lines = doc.splitTextToSize(e.desc, colW - 14);
    doc.text(lines, x + 12, cy + 12);
    const h = Math.max(lines.length * 4.2 + 10, 20);
    if (col === 0) leftY += h;
    else rightY += h;
  });
  y = Math.max(leftY, rightY) + 8;

  // Certifications
  y = sectionTitle("Normes et certifications", y);

  const certs = [
    { title: "EN 1090 — Classe EXC3", desc: "Certification fabrication pour ouvrages métalliques les plus exigeants. Traçabilité complete, pièce par pièce." },
    { title: "Qualification de soudage", desc: "Soudeurs qualifiés EN ISO 9606, QMOS selon EN ISO 15614. Contrôles non destructifs systématiques." },
    { title: "ISO 9001 & Marquage CE", desc: "Systeme qualite certifie, conformité directives européennes. Déclarations de performance fournies pour chaque ouvrage." },
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
    "Un projet d'ouvrage d'art ?",
    "Nos ingénieurs etudient la faisabilité de votre projet. Contactez-nous pour une étude technique gratuite.",
    y
  );

  drawFooter(3);

  doc.save("METALR-Ouvrages-Art-Génie-Civil.pdf");
}
