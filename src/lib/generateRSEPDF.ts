import { jsPDF } from "jspdf";
import { loadWhiteLogo } from "./pdfHelpers";

export async function generateRSEPDF() {
  const whiteLogo = await loadWhiteLogo("/images/MetalR_bonlogo.webp");

  const doc = new jsPDF("p", "mm", "a4");
  const W = 210;
  const H = 297;
  const margin = 20;
  const contentW = W - margin * 2;

  function drawHeader(subtitle: string) {
    doc.setFillColor(228, 7, 20);
    doc.rect(0, 0, W, 40, "F");
    // Logo in header
    if (whiteLogo.base64) {
      const logoH = 14;
      const logoW = logoH * whiteLogo.ar;
      doc.addImage(whiteLogo.base64, "PNG", margin, 13, logoW, logoH);
    }
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(subtitle, W - margin, 23, { align: "right" });
  }

  function drawFooter(page: number, total: number) {
    const fy = H - 20;
    doc.setFillColor(26, 26, 26);
    doc.rect(0, fy - 5, W, 25, "F");
    // Logo in footer
    if (whiteLogo.base64) {
      const logoH = 8;
      const logoW = logoH * whiteLogo.ar;
      doc.addImage(whiteLogo.base64, "PNG", margin, fy - 1, logoW, logoH);
    }
    doc.setTextColor(180, 180, 180);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("www.metalr.fr  |  contact@metalr.fr", margin, fy + 11);
    doc.text(`${page} / ${total}`, W - margin, fy + 11, { align: "right" });
  }

  function sectionTitle(title: string, yPos: number): number {
    doc.setFillColor(228, 7, 20);
    doc.rect(margin, yPos, 40, 2, "F");
    yPos += 10;
    doc.setTextColor(26, 26, 26);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin, yPos);
    return yPos + 10;
  }

  function paragraph(text: string, yPos: number, size = 9.5): number {
    doc.setFontSize(size);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const lines = doc.splitTextToSize(text, contentW);
    const lineH = size * 0.45;
    doc.text(lines, margin, yPos, { lineHeightFactor: 1.4 });
    return yPos + lines.length * (lineH + 1.2) + 4;
  }

  function bulletItem(title: string, desc: string, yPos: number): number {
    doc.setFillColor(228, 7, 20);
    doc.circle(margin + 2, yPos - 1, 1.5, "F");
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 26, 26);
    doc.text(title, margin + 7, yPos);
    yPos += 6;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const lines = doc.splitTextToSize(desc, contentW - 7);
    doc.text(lines, margin + 7, yPos, { lineHeightFactor: 1.4 });
    return yPos + lines.length * 5 + 6;
  }

  function statBlock(value: string, label: string, x: number, yPos: number) {
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(228, 7, 20);
    doc.text(value, x, yPos);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(label, x, yPos + 7);
  }

  const footerY = H - 25;

  // Check if content would overflow into footer zone, if so add new page
  function ensureSpace(yPos: number, needed: number, pageNum: { v: number }): number {
    if (yPos + needed > footerY) {
      drawFooter(pageNum.v, totalPages);
      doc.addPage();
      pageNum.v++;
      drawHeader("Rapport RSE 2025");
      return 55;
    }
    return yPos;
  }

  const totalPages = 6;

  // =============================================
  // PAGE 1 — Couverture
  // =============================================
  doc.setFillColor(26, 26, 26);
  doc.rect(0, 0, W, H, "F");

  // Logo on cover — 70% width, centered
  if (whiteLogo.base64) {
    const coverLogoW = W * 0.7;
    const coverLogoH = coverLogoW / whiteLogo.ar;
    const coverLogoX = (W - coverLogoW) / 2;
    doc.addImage(whiteLogo.base64, "PNG", coverLogoX, 55, coverLogoW, coverLogoH);
  }

  // Red accent band
  doc.setFillColor(228, 7, 20);
  doc.rect(0, 90, W, 4, "F");

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(42);
  doc.setFont("helvetica", "bold");
  doc.text("Rapport RSE", margin, 130);
  doc.setFontSize(42);
  doc.text("2025", margin, 148);

  // Subtitle
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(180, 180, 180);
  doc.text("Responsabilite Sociale et Environnementale", margin, 168);

  // Red line
  doc.setFillColor(228, 7, 20);
  doc.rect(margin, 178, 60, 2, "F");

  // Company info
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(150, 150, 150);
  doc.text("Constructeur de structures metalliques", margin, 200);
  doc.text("depuis 2018", margin, 208);

  // Key stats on cover
  doc.setTextColor(228, 7, 20);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("7 pays  |  5 usines  |  +500 projets  |  250 MW installes", margin, 235);

  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Certifie ISO 9001 : 2015  -  EN 1090-2  -  Marquage CE", margin, 260);
  doc.text("Document confidentiel - METALR SAS", margin, 267);

  // =============================================
  // PAGE 2 — Mot des fondateurs + Chiffres cles
  // =============================================
  doc.addPage();
  drawHeader("Rapport RSE 2025");
  let y = 55;

  y = sectionTitle("Mot des fondateurs", y);
  y = paragraph(
    "Chez METALR, la responsabilite environnementale et sociale n'est pas un sujet annexe : c'est un pilier de notre strategie industrielle. Depuis la creation de l'entreprise en 2018, nous avons integre ces enjeux au coeur de nos decisions, de la conception de nos structures a leur installation sur site.",
    y
  );
  y = paragraph(
    "En tant que constructeur de structures metalliques pour l'agriculture, le photovoltaique, l'industrie et le genie civil, nous sommes conscients de notre impact sur les territoires et les ecosystemes. C'est pourquoi nous nous engageons concretement : materiaux recyclables, optimisation des procedes, reduction des dechets, et investissement massif dans les energies renouvelables.",
    y
  );
  y = paragraph(
    "Ce rapport presente nos actions, nos resultats et nos objectifs pour les annees a venir. Nous sommes fiers du chemin parcouru et determines a aller plus loin.",
    y
  );
  y += 2;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 26, 26);
  doc.text("Mickael et Charlotte Rochefort", margin, y);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text("Fondateurs de METALR", margin, y + 5);

  y += 20;
  y = sectionTitle("METALR en chiffres", y);

  const stats = [
    { value: "7", label: "Pays d'implantation" },
    { value: "5", label: "Sites de production" },
    { value: "+500", label: "Projets livres" },
    { value: "250 MW", label: "Puissance PV installee" },
  ];
  const statW = contentW / 4;
  stats.forEach((s, i) => {
    statBlock(s.value, s.label, margin + i * statW, y + 5);
  });

  y += 30;
  const stats2 = [
    { value: "95%", label: "Materiaux recyclables" },
    { value: "85%", label: "Reduction des dechets" },
    { value: "100%", label: "Energie verte en usine" },
    { value: "ISO 14001", label: "Management environnemental" },
  ];
  stats2.forEach((s, i) => {
    statBlock(s.value, s.label, margin + i * statW, y + 5);
  });

  drawFooter(2, totalPages);

  // =============================================
  // PAGE 3+ — Environnement
  // =============================================
  doc.addPage();
  drawHeader("Rapport RSE 2025");
  y = 55;
  const pg = { v: 3 };

  y = sectionTitle("Axe 1 : Environnement", y);
  y = paragraph(
    "L'acier est l'un des materiaux les plus recyclables au monde. Nous en faisons un levier central de notre demarche environnementale, a chaque etape de la chaine de valeur.",
    y
  );

  y += 2;
  y = ensureSpace(y, 30, pg);
  y = bulletItem(
    "Materiaux recyclables a 95%",
    "L'acier que nous utilisons est recyclable a l'infini sans perte de qualite. 95% de nos matieres premieres sont recyclables en fin de vie, contre 30 a 40% pour le beton. Nos chutes de production sont systematiquement recuperees et reintegrees dans le circuit de recyclage.",
    y
  );
  y = ensureSpace(y, 30, pg);
  y = bulletItem(
    "Reduction des dechets de production de 85%",
    "Grace a la decoupe laser CNC et a l'optimisation numerique des plans de decoupe (nesting), nous avons reduit nos dechets de fabrication de 85% depuis 2020. Les chutes residuelles sont triees, compactees et revendues a des acieries pour refonte.",
    y
  );
  y = ensureSpace(y, 30, pg);
  y = bulletItem(
    "100% d'energie renouvelable dans nos usines",
    "Nos 5 sites de production fonctionnent a 100% avec de l'electricite d'origine renouvelable (contrats PPA solaire et eolien). Des panneaux photovoltaiques en autoconsommation equipent nos toitures industrielles, couvrant 40% de nos besoins.",
    y
  );
  y = ensureSpace(y, 30, pg);
  y = bulletItem(
    "Optimisation du transport et de la logistique",
    "Planification groupee des livraisons, chargement optimise des camions et choix de transporteurs engages dans la reduction de leur empreinte carbone. Reduction de 30% des kilometres a vide depuis 2022.",
    y
  );
  y = ensureSpace(y, 30, pg);
  y = bulletItem(
    "Eco-conception des structures",
    "Nos ingenieurs optimisent le dimensionnement de chaque ouvrage pour reduire la quantite d'acier necessaire tout en garantissant la resistance et la durabilite. En moyenne, 12% d'acier economise par rapport aux standards du marche.",
    y
  );
  y = ensureSpace(y, 30, pg);
  y = bulletItem(
    "Bilan carbone et objectif Net Zero 2035",
    "Nous realisons un bilan carbone annuel (scopes 1, 2 et 3). Notre objectif : atteindre la neutralite carbone sur les scopes 1 et 2 d'ici 2030, et sur l'ensemble de la chaine de valeur d'ici 2035.",
    y
  );

  drawFooter(pg.v, totalPages);

  // =============================================
  // Social + Qualite
  // =============================================
  doc.addPage();
  drawHeader("Rapport RSE 2025");
  y = 55;
  pg.v++;

  y = sectionTitle("Axe 2 : Engagement social", y);
  y = paragraph(
    "METALR place l'humain au centre de son developpement. Nos collaborateurs sont notre premier atout, et nous investissons dans leur formation, leur securite et leur epanouissement.",
    y
  );

  y += 2;
  y = ensureSpace(y, 30, pg);
  y = bulletItem(
    "Formation continue",
    "Chaque collaborateur beneficie de 40 heures de formation par an minimum : soudure certifiee, securite en hauteur, conduite d'engins, modelisation 3D. Nous formons egalement des apprentis en partenariat avec les CFA locaux.",
    y
  );
  y = ensureSpace(y, 30, pg);
  y = bulletItem(
    "Securite au travail",
    "Taux de frequence des accidents divise par 3 depuis 2021. Politique zero accident : equipements individuels fournis, audits securite mensuels, referents securite sur chaque chantier. Certification MASE en cours.",
    y
  );
  y = ensureSpace(y, 30, pg);
  y = bulletItem(
    "Emploi local et insertion",
    "80% de nos recrutements se font dans un rayon de 50 km autour de nos sites. Partenariats avec les missions locales et Pole Emploi pour l'insertion de publics eloignes de l'emploi. 12 contrats d'insertion signes en 2024.",
    y
  );
  y = ensureSpace(y, 30, pg);
  y = bulletItem(
    "Diversite et egalite",
    "Politique d'egalite salariale femmes-hommes. Index egalite professionnelle : 89/100. Objectif de feminisation des postes techniques avec un programme de mentorat dedie.",
    y
  );

  y += 5;
  y = ensureSpace(y, 40, pg);
  y = sectionTitle("Axe 3 : Qualite et certifications", y);
  y = paragraph(
    "La qualite est le fondement de notre metier. Chaque structure que nous livrons engage notre responsabilite et la securite des utilisateurs.",
    y
  );

  y += 2;
  y = ensureSpace(y, 30, pg);
  y = bulletItem(
    "ISO 9001:2015",
    "Systeme de management de la qualite certifie, garantissant la tracabilite et l'amelioration continue de tous nos processus, de la commande a la livraison.",
    y
  );
  y = ensureSpace(y, 30, pg);
  y = bulletItem(
    "EN 1090-2 EXC3",
    "Classe d'execution la plus elevee pour les ouvrages metalliques structuraux. Chaque piece est tracee, chaque soudure est controlee par ressuage ou magnetoscopie.",
    y
  );
  y = ensureSpace(y, 30, pg);
  y = bulletItem(
    "Marquage CE",
    "Tous nos produits sont conformes aux directives europeennes de securite et de performance. Declarations de performance (DoP) delivrees pour chaque ouvrage.",
    y
  );
  y = ensureSpace(y, 30, pg);
  y = bulletItem(
    "Controle qualite a chaque etape",
    "Autocontrole en fabrication, controle dimensionnel par scanner 3D, essais mecaniques sur assemblages. Taux de non-conformite inferieur a 0.3%.",
    y
  );

  drawFooter(pg.v, totalPages);

  // =============================================
  // Contribution energetique + Objectifs
  // =============================================
  doc.addPage();
  drawHeader("Rapport RSE 2025");
  y = 55;
  pg.v++;

  y = sectionTitle("Axe 4 : Contribution a la transition energetique", y);
  y = paragraph(
    "En tant que constructeur de structures photovoltaiques, METALR contribue directement a la production d'energie renouvelable. Chaque ombriere, chaque centrale au sol, chaque carport solaire que nous fabriquons participe a la decarbonation du mix energetique.",
    y
  );

  y += 2;
  const energyStats = [
    { value: "250 MW", label: "Puissance PV installee" },
    { value: "+500", label: "Projets photovoltaiques" },
    { value: "350 000", label: "Tonnes de CO2 evitees/an" },
    { value: "25 ans", label: "Duree de vie garantie" },
  ];
  energyStats.forEach((s, i) => {
    statBlock(s.value, s.label, margin + i * statW, y + 5);
  });

  y += 30;
  y = paragraph(
    "Nos structures photovoltaiques produisent l'equivalent de la consommation electrique de 125 000 foyers. D'ici 2026, nous visons 500 MW installes, doublant ainsi notre contribution a la transition energetique.",
    y
  );

  y += 5;
  y = sectionTitle("Objectifs RSE 2025-2030", y);

  const objectives = [
    { num: "01", title: "Neutralite carbone scopes 1 & 2 d'ici 2030" },
    { num: "02", title: "500 MW de puissance photovoltaique installee d'ici 2026" },
    { num: "03", title: "Zero dechet en decharge sur tous nos sites d'ici 2027" },
    { num: "04", title: "100% de nos fournisseurs audites sur criteres RSE d'ici 2028" },
    { num: "05", title: "Certification MASE (securite) sur tous les sites d'ici 2026" },
    { num: "06", title: "Index egalite professionnelle superieur a 95/100 d'ici 2027" },
    { num: "07", title: "40% de reduction de l'intensite carbone par tonne d'acier transforme" },
    { num: "08", title: "Deploiement d'un programme de biodiversite sur chaque site" },
  ];

  const objColW = contentW / 2 - 4;
  objectives.forEach((obj, i) => {
    const col = i % 2;
    const x = margin + col * (objColW + 8);
    if (i > 0 && col === 0) y += 16;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(228, 7, 20);
    doc.text(obj.num, x, y);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    const lines = doc.splitTextToSize(obj.title, objColW - 14);
    doc.text(lines, x + 12, y - 1);
  });

  y += 25;
  // Final statement
  doc.setFillColor(26, 26, 26);
  doc.roundedRect(margin, y, contentW, 30, 4, 4, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Notre engagement", margin + 12, y + 12);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(180, 180, 180);
  doc.text(
    "Construire des structures durables, performantes et responsables pour les generations futures.",
    margin + 12,
    y + 20
  );

  drawFooter(pg.v, totalPages);

  doc.save("METALR-Rapport-RSE-2025.pdf");
}
