/*
 * 알고살자(algosalja.com) 자동 발행기
 * ------------------------------------------------------------------
 *  입력: article.json
 *    { slug, title, seoTitle?, description, keywords:[...], category:"food"|"info"|...,
 *      date:"YYYY-MM-DD", ogTitle?, ogDescription?, bodyMd, photos:[{file,alt,caption?}] }
 *  동작: posts/<slug>.html 생성 + js/posts.js POSTS 맨 위에 추가 + sitemap.xml 갱신
 *  사용: node scripts/factory-publish.js <article.json>
 * ------------------------------------------------------------------
 */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const BASE = "https://algosalja.com";
const BRAND = "알고살자";
const ADSENSE_CLIENT = "ca-pub-7143828779500885";

const CAT_NAMES = { food: "건강음식", info: "건강정보", exercise: "건강운동", diet: "다이어트", disease: "질환·병", life: "생활정보" };

const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const inlineMd = t => {
  let s = esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  s = s.replace(/\[([^\]]+)\]\((\/[^\s)]+)\)/g, '<a href="$2">$1</a>');
  return s;
};
function figureHtml(ph, idx) {
  const alt = esc(ph.alt || "");
  const cap = ph.caption ? `\n          <figcaption>${esc(ph.caption)}</figcaption>` : "";
  return `        <figure class="article__figure">\n          <img src="${esc(ph.file)}" alt="${alt}" loading="${idx === 0 ? "eager" : "lazy"}">${cap}\n        </figure>`;
}
function parseBlocks(md) {
  const lines = String(md || "").split(/\r?\n/);
  const blocks = []; let ul = null, ol = null, tbl = null;
  const flush = () => {
    if (ul) { blocks.push({ t: "ul", items: ul }); ul = null; }
    if (ol) { blocks.push({ t: "ol", items: ol }); ol = null; }
    if (tbl) { blocks.push({ t: "table", rows: tbl }); tbl = null; }
  };
  for (const ln of lines) {
    const s = ln.trim();
    if (!s) { flush(); continue; }
    let m;
    if ((m = s.match(/^##\s+(.*)/))) { flush(); blocks.push({ t: "h2", text: m[1] }); }
    else if ((m = s.match(/^###\s+(.*)/))) { flush(); blocks.push({ t: "h3", text: m[1] }); }
    else if (/^\|.*\|\s*$/.test(s)) { if (ul || ol) flush(); if (!tbl) tbl = []; tbl.push(s); }
    else if ((m = s.match(/^[-*]\s+(.*)/))) { if (ol || tbl) flush(); if (!ul) ul = []; ul.push(m[1]); }
    else if ((m = s.match(/^\d+[.)]\s+(.*)/))) { if (ul) flush(); if (!ol) ol = []; ol.push(m[1]); }
    else if (/^>\s?/.test(s)) { flush(); blocks.push({ t: "p", text: s.replace(/^>\s?/, "") }); }
    else { flush(); blocks.push({ t: "p", text: s }); }
  }
  flush();
  return blocks;
}
function buildBody(blocks, photos) {
  const out = [];
  const hero = photos[0], extra = photos.slice(1);
  if (hero) out.push(figureHtml(hero, 0));
  let leadDone = false;
  const h2Positions = blocks.map((b, i) => b.t === "h2" ? i : -1).filter(i => i >= 0);
  const place = {};
  if (extra.length && h2Positions.length) {
    const step = Math.max(1, Math.floor(h2Positions.length / (extra.length + 1)));
    let pi = 0;
    for (let k = 1; k <= h2Positions.length && pi < extra.length; k += step) place[h2Positions[k - 1]] = extra[pi++];
    let hp = h2Positions.length - 1;
    while (pi < extra.length && hp >= 0) { if (!place[h2Positions[hp]]) place[h2Positions[hp]] = extra[pi++]; hp--; }
  }
  blocks.forEach((b, i) => {
    if (b.t === "h2") { out.push(`        <h2>${inlineMd(b.text)}</h2>`); if (place[i]) out.push(figureHtml(place[i], 1)); }
    else if (b.t === "h3") out.push(`        <h3>${inlineMd(b.text)}</h3>`);
    else if (b.t === "ul") out.push("        <ul>" + b.items.map(x => `<li>${inlineMd(x)}</li>`).join("") + "</ul>");
    else if (b.t === "ol") out.push("        <ol>" + b.items.map(x => `<li>${inlineMd(x)}</li>`).join("") + "</ol>");
    else if (b.t === "table") {
      const cells = r => r.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map(c => c.trim());
      const rows = b.rows.filter(r => !/^\s*\|[\s:|-]+\|\s*$/.test(r));
      if (rows.length) {
        const head = cells(rows[0]), body = rows.slice(1).map(cells);
        let t = '<div class="table-scroll"><table class="md-table"><thead><tr>' + head.map(c => `<th>${inlineMd(c)}</th>`).join("") + "</tr></thead><tbody>";
        t += body.map(r => "<tr>" + r.map(c => `<td>${inlineMd(c)}</td>`).join("") + "</tr>").join("");
        t += "</tbody></table></div>";
        out.push("        " + t);
      }
    } else {
      const hasDisc = /정보\s*제공\s*목적|전문의|의사의 진단|진단이나 처방/.test(b.text);
      const discIdx = b.text.search(/※|이 글은|본 글은|이 정보는/);
      if (hasDisc && discIdx > 0) {
        const pre = b.text.slice(0, discIdx).trim(), disc = b.text.slice(discIdx).replace(/^※\s*/, "").trim();
        if (pre) out.push(`        <p>${inlineMd(pre)}</p>`);
        out.push(`        <p class="disclaimer">※ ${inlineMd(disc)}</p>`);
      } else if (hasDisc) out.push(`        <p class="disclaimer">※ ${inlineMd(b.text.replace(/^※\s*/, ""))}</p>`);
      else if (!leadDone) { out.push(`        <p class="article__lead">${inlineMd(b.text)}</p>`); leadDone = true; }
      else out.push(`        <p>${inlineMd(b.text)}</p>`);
    }
  });
  return out.join("\n");
}

function pageHtml(a) {
  const catName = CAT_NAMES[a.category] || "건강정보";
  const seoTitle = a.seoTitle || a.title;
  const hero = (a.photos || [])[0];
  const ogImage = hero ? BASE + hero.file : "";
  const kw = (a.keywords || []).join(", ");
  const body = buildBody(parseBlocks(a.bodyMd || a.body || ""), a.photos || []);
  const ld = {
    "@context": "https://schema.org", "@type": "Article",
    headline: a.title, image: ogImage || undefined, description: a.description,
    datePublished: a.date, dateModified: a.date,
    author: { "@type": "Organization", name: BRAND },
    publisher: { "@type": "Organization", name: BRAND, url: BASE + "/" },
    mainEntityOfPage: `${BASE}/posts/${a.slug}.html`
  };
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(seoTitle)} · ${BRAND}</title>
  <meta name="description" content="${esc(a.description)}">
  <meta name="keywords" content="${esc(kw)}">
  <link rel="canonical" href="${BASE}/posts/${a.slug}.html">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${esc(a.ogTitle || a.title)}">
  <meta property="og:description" content="${esc(a.ogDescription || a.description)}">
  <meta property="og:url" content="${BASE}/posts/${a.slug}.html">
  ${ogImage ? `<meta property="og:image" content="${ogImage}">` : ""}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
  </script>
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}"
          crossorigin="anonymous"></script>
  <script defer src="/js/analytics.js"></script>
</head>
<body data-cat="${esc(a.category)}">
  <header id="site-header"></header>

  <main class="wrap">
    <article class="article">
      <span class="article__cat">${esc(catName)}</span>
      <h1 class="article__title">${esc(a.title)}</h1>
      <div class="article__meta">${BRAND} · ${esc(a.date)}</div>

      <div class="article__body">
${body}
      </div>

      <div class="article__nav"><a class="btn" href="/">‹ 홈으로</a></div>
    </article>
  </main>

  <footer id="site-footer"></footer>

  <script src="/js/posts.js"></script>
  <script src="/js/site.js"></script>
</body>
</html>
`;
}

// js/posts.js POSTS 배열 맨 위에 추가(중복이면 교체)
function updatePostsJs(a) {
  const f = path.join(ROOT, "js", "posts.js");
  let src = fs.readFileSync(f, "utf8");
  const entry =
`  {
    id: ${JSON.stringify(a.slug)},
    title: ${JSON.stringify(a.title)},
    summary:
      ${JSON.stringify(a.summary || a.description || "")},
    category: ${JSON.stringify(a.category)},
    date: ${JSON.stringify(a.date)},
    url: ${JSON.stringify("/posts/" + a.slug + ".html")},
    image: ${JSON.stringify((a.photos && a.photos[0] && a.photos[0].file) || "")},
  },`;
  // 기존 같은 id 블록 제거(간단히: id 라인이 있는 { ... }, 블록)
  const idRe = new RegExp("\\n  \\{\\s*\\n\\s*id:\\s*[\"']" + a.slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[\"'][\\s\\S]*?\\n  \\},", "m");
  if (idRe.test(src)) src = src.replace(idRe, "");
  src = src.replace("const POSTS = [\n", "const POSTS = [\n" + entry + "\n");
  fs.writeFileSync(f, src);
}

// sitemap.xml 에 글 URL 추가(중복 무시)
function updateSitemap(a) {
  const f = path.join(ROOT, "sitemap.xml");
  let src = fs.readFileSync(f, "utf8");
  const loc = `${BASE}/posts/${a.slug}.html`;
  if (src.includes("<loc>" + loc + "</loc>")) return;
  const block = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${a.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  src = src.replace(/<\/urlset>\s*$/, block + "</urlset>\n");
  fs.writeFileSync(f, src);
}

function main() {
  const file = process.argv[2];
  if (!file) { console.error("usage: node scripts/factory-publish.js <article.json>"); process.exit(1); }
  const a = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!a.slug || !a.title) { console.error("slug/title 필수"); process.exit(1); }
  a.summary = a.summary || a.description || "";
  fs.writeFileSync(path.join(ROOT, "posts", a.slug + ".html"), pageHtml(a));
  updatePostsJs(a);
  updateSitemap(a);
  console.log(`발행 생성: posts/${a.slug}.html  (${a.category}, 사진 ${(a.photos || []).length}장)`);
  console.log(`URL: ${BASE}/posts/${a.slug}.html`);
}
if (require.main === module) main();
module.exports = { pageHtml, parseBlocks, buildBody, esc, BASE, ROOT };
