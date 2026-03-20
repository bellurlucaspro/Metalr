import { jsPDF } from "jspdf";
import { loadHeroImage, loadWhiteLogo, createLayout } from "./pdfHelpers";

export async function generateOuvragesArtPDF(): Promise<void> {
  const doc = new jsPDF("p", "mm", "a4");
  const TOTAL = 3;

  const [hero, logo] = await Promise.all([
    loadHeroImage("/images/pexels-andres-villamizar-185552101-17392345.webp"),
    loadWhiteLogo("/images/MetalR_bonlogo.webp"),
  ]);

  const L = createLayout(doc, TOTAL, "Ouvrages d'art & Genie civil", logo);
  const { W, H, M, CW, drawCover, drawHeader, drawFooter, sectionTitle, statsRow, featureCard, ctaBlock } = L;

  // ── PAGE 1 — COVER ──────────────────────────────────────────────────────────
  drawCover(
    hero,
    "OUVRAGES D'ART & GENIE CIVIL",
    "Ouvrages d'Art",
    "& Genie Civil",
    "Ponts, passerelles, charpentes complexes et infrastructures metalliques d'exception. France & international.",
    [
      { value: "120+", label: "Ouvrages livres" },
      { value: "45 m", label: "Portee max" },
      { value: "EXC3", label: "Classe d'exec." },
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
    "Des structures metalliques d'exception pour les projets les plus exigeants : ponts, passerelles, charpentes complexes et infrastructures de genie civil. METALR concoit, fabrique et installe des ouvrages techniques en France et a l'international.",
    CW
  );
  doc.text(intro, M, y);
  y += intro.length * 5 + 8;

  // Stats
  y = statsRow([
    { value: "120+", label: "Ouvrages livres" },
    { value: "45 m", label: "Portee max" },
    { value: "EXC3", label: "Classe d'exec." },
    { value: "100%", label: "Eurocodes" },
  ], y);

  // Domaines
  y = sectionTitle("Nos domaines d'intervention", y);

  const typologies = [
    { title: "Passerelles pietonnes et cyclables", desc: "Conception et realisation de passerelles urbaines, franchissements de voies ferrees et ouvrages legers. Design contemporain et integration paysagere soignee." },
    { title: "Ponts et tabliers metalliques", desc: "Tabliers de ponts routiers, ponts-rails et ouvrages de franchissement. Assemblage boulonne ou soude selon les contraintes du site." },
    { title: "Charpentes complexes", desc: "Structures de grande portee pour equipements publics, gares et batiments emblematiques. Geometries courbes et assemblages sur mesure." },
    { title: "Structures de genie civil", desc: "Portiques autoroutiers, mats, pylones. Resistance aux charges dynamiques et conditions climatiques extremes." },
    { title: "Escaliers & garde-corps", desc: "Escaliers monumentaux, garde-corps architecturaux pour ouvrages publics. Finitions soignees, conformite normes PMR." },
    { title: "Rehabilitation d'ouvrages", desc: "Diagnostic, renforcement et remise en etat d'ouvrages metalliques existants. Prolongation de duree de vie et mise aux normes sismiques." },
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
    { step: "Calcul de structures complexes", desc: "Modelisation 3D par elements finis, analyse non-lineaire et verification aux etats limites (Robot Structural Analysis + Tekla Structures)." },
    { step: "Etudes sismiques & dynamiques", desc: "Calculs parasismiques, etudes de fatigue, analyse des vibrations. Conformite EN 1998." },
    { step: "Optimisation des materiaux", desc: "Choix des nuances d'acier (S235, S355, S460), dimensionnement optimise, reduction du poids propre." },
    { step: "Respect des eurocodes", desc: "Conformite totale EN 1993 (structures acier), EN 1090 (execution) et reglementations nationales." },
    { step: "Suivi de chantier dedie", desc: "Ingenieur referent du lancement a la reception, coordination avec les entreprises de genie civil et VRD." },
    { step: "Controle qualite EXC3", desc: "Controles a chaque etape : soudure (ressuage, magnetoscopie), geometrie, assemblage. Certification EN 1090 EXC3." },
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
    { title: "EN 1090 — Classe EXC3", desc: "Certification fabrication pour ouvrages metalliques les plus exigeants. Tracabilite complete, piece par piece." },
    { title: "Qualification de soudage", desc: "Soudeurs qualifies EN ISO 9606, QMOS selon EN ISO 15614. Controles non destructifs systematiques." },
    { title: "ISO 9001 & Marquage CE", desc: "Systeme qualite certifie, conformite directives europeennes. Declarations de performance fournies pour chaque ouvrage." },
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
    "Nos ingenieurs etudient la faisabilite de votre projet. Contactez-nous pour une etude technique gratuite.",
    y
  );

  drawFooter(3);

  doc.save("METALR-Ouvrages-Art-Genie-Civil.pdf");
}
