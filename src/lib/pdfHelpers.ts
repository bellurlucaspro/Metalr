import { jsPDF } from "jspdf";

// ─── Image loading ────────────────────────────────────────────────────────────

export async function loadHeroImage(url: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const TW = 1240; // ~210 mm @ 150 dpi
      const TH = 1754; // ~297 mm @ 150 dpi
      const canvas = document.createElement("canvas");
      canvas.width = TW;
      canvas.height = TH;
      const ctx = canvas.getContext("2d")!;

      // object-cover centre
      const ir = img.width / img.height;
      const cr = TW / TH;
      let sx: number, sy: number, sw: number, sh: number;
      if (ir > cr) {
        sh = img.height; sw = sh * cr; sx = (img.width - sw) / 2; sy = 0;
      } else {
        sw = img.width; sh = sw / cr; sx = 0; sy = (img.height - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, TW, TH);

      // Cinematic gradient overlay
      const g = ctx.createLinearGradient(0, 0, 0, TH);
      g.addColorStop(0,    "rgba(0,0,0,0.35)");
      g.addColorStop(0.28, "rgba(0,0,0,0.22)");
      g.addColorStop(0.58, "rgba(0,0,0,0.60)");
      g.addColorStop(1,    "rgba(0,0,0,0.93)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, TW, TH);

      resolve(canvas.toDataURL("image/jpeg", 0.88));
    };
    img.onerror = () => resolve("");
    img.src = url;
  });
}

export async function loadWhiteLogo(url: string): Promise<{ base64: string; ar: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.filter = "brightness(0) invert(1)";
      ctx.drawImage(img, 0, 0);
      resolve({ base64: canvas.toDataURL("image/png"), ar: img.width / img.height });
    };
    img.onerror = () => resolve({ base64: "", ar: 4 });
    img.src = url;
  });
}

// ─── Layout helpers factory ───────────────────────────────────────────────────

export function createLayout(
  doc: jsPDF,
  totalPages: number,
  solutionLabel: string,
  logoWhite: { base64: string; ar: number }
) {
  const W = 210, H = 297, M = 20, CW = W - M * 2;

  // Shared logo dimensions
  const LH_HDR  = 8;  // logo height in header/footer
  const LW_HDR  = LH_HDR * (logoWhite.base64 ? logoWhite.ar : 4);
  const LH_CVR  = 9;  // logo height on cover header
  const LW_CVR  = LH_CVR * (logoWhite.base64 ? logoWhite.ar : 4);

  /** Draw the dark header band (cover or content pages) */
  function _drawBand(y: number, h: number, logoH: number, logoW: number, rightLabel: string) {
    // Dark bg
    doc.setFillColor(12, 12, 12);
    doc.rect(0, y, W, h, "F");
    // Red left stripe
    doc.setFillColor(228, 7, 20);
    doc.rect(0, y, 5, h, "F");
    // Red bottom accent line
    doc.setFillColor(228, 7, 20);
    doc.rect(0, y + h - 1.5, W, 1.5, "F");
    // Logo
    if (logoWhite.base64) {
      doc.addImage(logoWhite.base64, "PNG", 12, y + (h - logoH) / 2, logoW, logoH);
    } else {
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("METALR", 12, y + h / 2 + 2);
    }
    // Separator + right label
    if (rightLabel) {
      doc.setDrawColor(55, 55, 55);
      doc.setLineWidth(0.4);
      doc.line(W - 68, y + 4, W - 68, y + h - 4);
      doc.setTextColor(190, 190, 190);
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.text(rightLabel, W - 11, y + h / 2 + 2.5, { align: "right" });
    }
  }

  // ── COVER PAGE ──────────────────────────────────────────────────────────────

  function drawCover(
    heroBase64: string,
    categoryLabel: string,
    titleLine1: string,
    titleLine2: string,
    tagline: string,
    stats: Array<{ value: string; label: string }>
  ) {
    // Full-bleed hero image
    if (heroBase64) {
      doc.addImage(heroBase64, "JPEG", 0, 0, W, H);
    } else {
      doc.setFillColor(20, 20, 20);
      doc.rect(0, 0, W, H, "F");
    }

    // Header band (20 mm)
    _drawBand(0, 20, LH_CVR, LW_CVR, categoryLabel);

    // ── Fixed-position text block ────────────────────────────────────────────
    // Red accent line
    doc.setFillColor(228, 7, 20);
    doc.rect(M, 183, 48, 3, "F");

    // Title line 1 (y=196)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(33);
    doc.setFont("helvetica", "bold");
    doc.text(titleLine1, M, 196);

    // Title line 2 (y=210, only if provided)
    if (titleLine2) {
      doc.text(titleLine2, M, 210);
    }

    // Tagline — starts at fixed y=222, max 2 lines, capped width
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(210, 210, 210);
    const tLines = doc.splitTextToSize(tagline, CW - 8);
    const tagLines = tLines.slice(0, 2); // never more than 2 lines
    doc.text(tagLines, M, 222);

    // ── Stats — anchored at fixed Y (no dynamic positioning) ────────────────
    // Red separator at fixed y=248
    doc.setFillColor(228, 7, 20);
    doc.rect(M, 248, W - M * 2, 1, "F");

    // 4 stat cells, evenly spaced
    const sW = CW / stats.length;
    stats.forEach((s, i) => {
      const cx = M + i * sW + sW / 2;
      // Value — WHITE (not red) on cover
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text(s.value, cx, 262, { align: "center" });
      // Label
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(170, 170, 170);
      doc.text(s.label, cx, 270, { align: "center" });
    });

    // ── Bottom strip — fixed at y=277, h=20 ─────────────────────────────────
    _drawBand(277, 20, LH_HDR, LW_HDR, "");
    // Contact centered
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(140, 140, 140);
    doc.text("www.metalr.fr  ·  contact@metalr.fr", W / 2, 289, { align: "center" });
  }

  // ── CONTENT PAGE HEADER ─────────────────────────────────────────────────────

  function drawHeader() {
    _drawBand(0, 18, LH_HDR, LW_HDR, solutionLabel);
  }

  // ── CONTENT PAGE FOOTER ─────────────────────────────────────────────────────

  function drawFooter(page: number) {
    const FH = 16; // footer height
    const fy = H - FH;
    _drawBand(fy, FH, LH_HDR, LW_HDR, "");
    // Contact center
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(130, 130, 130);
    doc.text("www.metalr.fr  ·  contact@metalr.fr", W / 2, fy + FH / 2 + 2.5, { align: "center" });
    // Page right
    doc.setFontSize(7.5);
    doc.setTextColor(200, 200, 200);
    doc.text(`${page} / ${totalPages}`, W - M, fy + FH / 2 + 2.5, { align: "right" });
  }

  // ── SECTION TITLE ───────────────────────────────────────────────────────────

  function sectionTitle(title: string, y: number): number {
    doc.setFillColor(228, 7, 20);
    doc.rect(M, y, 38, 2, "F");
    y += 9;
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 26, 26);
    doc.text(title, M, y);
    return y + 9;
  }

  // ── STATS ROW (content pages) ────────────────────────────────────────────────

  function statsRow(stats: Array<{ value: string; label: string }>, y: number): number {
    const gap = 3;
    const bW = (CW - gap * (stats.length - 1)) / stats.length;
    stats.forEach((s, i) => {
      const x = M + i * (bW + gap);
      doc.setFillColor(26, 26, 26);
      doc.roundedRect(x, y, bW, 22, 3, 3, "F");
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(228, 7, 20);
      doc.text(s.value, x + bW / 2, y + 11, { align: "center" });
      doc.setFontSize(6.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(155, 155, 155);
      doc.text(s.label, x + bW / 2, y + 18, { align: "center" });
    });
    return y + 27;
  }

  // ── FEATURE CARD ─────────────────────────────────────────────────────────────

  function featureCard(title: string, desc: string, y: number, colX = M, colW = CW): number {
    const lines = doc.splitTextToSize(desc, colW - 13);
    const cardH = Math.max(lines.length * 4.3 + 13, 20);
    doc.setFillColor(247, 247, 247);
    doc.roundedRect(colX, y, colW, cardH, 2, 2, "F");
    doc.setFillColor(228, 7, 20);
    doc.roundedRect(colX, y, 3, cardH, 1, 1, "F");
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 26, 26);
    doc.text(title, colX + 8, y + 7);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(lines, colX + 8, y + 12.5);
    return y + cardH + 3;
  }

  // ── CTA BLOCK ────────────────────────────────────────────────────────────────

  function ctaBlock(title: string, subtitle: string, y: number): void {
    const h = 50;
    doc.setFillColor(22, 22, 22);
    doc.roundedRect(M, y, CW, h, 4, 4, "F");
    doc.setFillColor(228, 7, 20);
    doc.roundedRect(M, y, 4, h, 2, 2, "F");

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(title, M + 12, y + 15);

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(165, 165, 165);
    const stLines = doc.splitTextToSize(subtitle, CW - 20).slice(0, 2);
    doc.text(stLines, M + 12, y + 23);

    // Red button
    doc.setFillColor(228, 7, 20);
    doc.roundedRect(M + 12, y + 34, 58, 9, 2, 2, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("contact@metalr.fr", M + 12 + 29, y + 40, { align: "center" });

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text("www.metalr.fr", M + CW - 12, y + 40, { align: "right" });
  }

  return {
    W, H, M, CW,
    drawCover, drawHeader, drawFooter,
    sectionTitle, statsRow, featureCard, ctaBlock,
  };
}
