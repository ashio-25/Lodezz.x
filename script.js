/* ============================== ICONS ============================== */
function ic(name, size=18, color="currentColor", stroke=1.8){
  const s = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"`;
  const paths = {
    search: `<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`,
    cart: `<circle cx="9" cy="20" r="1.4" fill="${color}" stroke="none"/><circle cx="18" cy="20" r="1.4" fill="${color}" stroke="none"/><path d="M2 3h2l2.6 12.6a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L22 7H6"/>`,
    menu: `<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>`,
    x: `<line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/>`,
    check: `<polyline points="4,12 9,17 20,6"/>`,
    zap: `<polygon points="13,2 4,14 11,14 10,22 20,10 13,10" fill="${color}" stroke="none"/>`,
    lock: `<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>`,
    message: `<path d="M4 5h16v11H8l-4 4V5z"/>`,
    card: `<rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/>`,
    chevronDown: `<polyline points="6,9 12,15 18,9"/>`,
    chevronLeft: `<polyline points="15,6 9,12 15,18"/>`,
    plus: `<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
    minus: `<line x1="5" y1="12" x2="19" y2="12"/>`,
    trash: `<line x1="4" y1="6" x2="20" y2="6"/><path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><path d="M6 6l1 15a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-15"/>`,
    arrowRight: `<line x1="4" y1="12" x2="18" y2="12"/><polyline points="12,6 18,12 12,18"/>`,
    clock: `<circle cx="12" cy="12" r="9"/><polyline points="12,7 12,12 15,14"/>`,
    wallet: `<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 12h3"/>`,
    qr: `<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="15" y1="15" x2="15" y2="21"/><line x1="18" y1="15" x2="21" y2="15"/><line x1="18" y1="18" x2="21" y2="18"/><line x1="18" y1="21" x2="21" y2="21"/>`,
    landmark: `<line x1="3" y1="21" x2="21" y2="21"/><line x1="5" y1="21" x2="5" y2="10"/><line x1="10" y1="21" x2="10" y2="10"/><line x1="14" y1="21" x2="14" y2="10"/><line x1="19" y1="21" x2="19" y2="10"/><polygon points="12,3 21,9 3,9"/>`,
    gamepad: `<rect x="2" y="7" width="20" height="11" rx="5"/><line x1="7" y1="10" x2="7" y2="14"/><line x1="5" y1="12" x2="9" y2="12"/><circle cx="16" cy="10.5" r="1" fill="${color}" stroke="none"/><circle cx="18" cy="13.5" r="1" fill="${color}" stroke="none"/>`,
    packageCheck: `<path d="M21 8v8a1 1 0 0 1-.5.87l-8 4.6a1 1 0 0 1-1 0l-8-4.6A1 1 0 0 1 3 16V8"/><path d="M3.3 7.3 12 12l8.7-4.7"/><path d="M12 12v9"/><path d="m17 3-9.5 5.2"/><polyline points="16,15 18,17 22,13"/>`,
    alertCircle: `<circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16" r="0.6" fill="${color}" stroke="none"/>`,
    help: `<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.6 2.2c-.9.5-1.1 1-1.1 1.8"/><circle cx="12" cy="17" r="0.6" fill="${color}" stroke="none"/>`,
    sparkle: `<path d="M12 2l1.8 5.6L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.4z" fill="${color}" stroke="none"/>`,
    sun: `<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.9" y1="4.9" x2="7" y2="7"/><line x1="17" y1="17" x2="19.1" y2="19.1"/><line x1="4.9" y1="19.1" x2="7" y2="17"/><line x1="17" y1="7" x2="19.1" y2="4.9"/>`,
    moon: `<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>`,
    eye: `<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`,
    eyeOff: `<path d="M3 3l18 18"/><path d="M10.6 5.1A10 10 0 0 1 12 5c6 0 10 7 10 7a17.9 17.9 0 0 1-3.2 4.1M6.3 6.3A17.7 17.7 0 0 0 2 12s4 7 10 7a10 10 0 0 0 4.2-.9"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>`,
  };
  return `<svg ${s} aria-hidden="true">${paths[name]||""}</svg>`;
}
function gameMark(id, color, size){
  const s = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"`;
  const marks = {
    roblox: `<rect x="3" y="3" width="8" height="8" rx="1.5" transform="rotate(-8 7 7)" fill="${color}" opacity="0.95"/><rect x="13" y="4" width="7" height="7" rx="1.5" transform="rotate(10 16.5 7.5)" fill="${color}" opacity="0.6"/><rect x="9" y="13" width="8" height="8" rx="1.5" transform="rotate(6 13 17)" fill="${color}" opacity="0.8"/>`,
    ml: `<polygon points="12,2 20,9 12,22 4,9" fill="${color}" opacity="0.9"/><polygon points="12,2 20,9 12,13 4,9" fill="${color}" opacity="0.55"/>`,
    valorant: `<polygon points="2,6 12,6 22,18 14,18" fill="${color}" opacity="0.95"/><polygon points="2,18 8,18 13,12 9,6 2,6" fill="${color}" opacity="0.4"/>`,
    genshin: `<circle cx="12" cy="12" r="9" stroke="${color}" stroke-opacity="0.5" stroke-width="1.3" fill="none"/><polygon points="12,5 14.5,10 20,10 15.6,13.2 17.2,19 12,15.6 6.8,19 8.4,13.2 4,10 9.5,10" fill="${color}" opacity="0.95"/>`,
    codm: `<circle cx="12" cy="12" r="9" stroke="${color}" stroke-width="1.4" fill="none" opacity="0.9"/><line x1="12" y1="2" x2="12" y2="7" stroke="${color}" stroke-width="1.6"/><line x1="12" y1="17" x2="12" y2="22" stroke="${color}" stroke-width="1.6"/><line x1="2" y1="12" x2="7" y2="12" stroke="${color}" stroke-width="1.6"/><line x1="17" y1="12" x2="22" y2="12" stroke="${color}" stroke-width="1.6"/><circle cx="12" cy="12" r="2.4" fill="${color}"/>`,
    lol: `<path d="M12 2 L20 6 V13 C20 18 16.5 21 12 22 C7.5 21 4 18 4 13 V6 Z" fill="${color}" opacity="0.9"/><polygon points="12,7 13.6,10.6 17.4,10.9 14.5,13.3 15.4,17 12,15 8.6,17 9.5,13.3 6.6,10.9 10.4,10.6" fill="#000" fill-opacity="0.18"/>`,
    freefire: `<path d="M12 2c1 4 6 6 6 11a6 6 0 0 1-12 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5 2-9.5z" fill="${color}" opacity="0.92"/>`,
    pubg: `<polygon points="12,2 20,7 20,17 12,22 4,17 4,7" fill="none" stroke="${color}" stroke-width="1.6"/><circle cx="12" cy="12" r="3.2" fill="${color}"/><line x1="12" y1="2" x2="12" y2="6" stroke="${color}" stroke-width="1.6"/>`,
    hsr: `<polygon points="12,2 14,10 22,12 14,14 12,22 10,14 2,12 10,10" fill="${color}" opacity="0.95"/><circle cx="12" cy="12" r="9" stroke="${color}" stroke-opacity="0.35" stroke-width="1" fill="none"/>`,
    wildrift: `<polygon points="12,3 20,12 12,21 4,12" fill="none" stroke="${color}" stroke-width="1.8"/><polygon points="12,8 16,12 12,16 8,12" fill="${color}" opacity="0.9"/>`,
    coc: `<path d="M4 20V9l3 2V6l3 2 2-3 2 3 3-2v5l3-2v11z" fill="${color}" opacity="0.9"/><rect x="10" y="14" width="4" height="6" fill="#000" fill-opacity="0.22"/>`,
    clashroyale: `<path d="M3 8l4 3 5-6 5 6 4-3-2 11H5z" fill="${color}" opacity="0.92"/><rect x="5" y="19" width="14" height="2" rx="1" fill="${color}" opacity="0.6"/>`,
  };
  return `<svg ${s} aria-hidden="true">${marks[id]||""}</svg>`;
}

/* ============================== DATA ============================== */
/* game list, FAQ, payment methods and policy text live in data.js */
function buildProducts(){
  return GAMES.flatMap((g, gameOrder) => g.packages.filter(p => !p.hidden).map(p => ({...p, gameOrder, gameId:g.id, gameName:g.name, currency:g.currency, needsServer:g.needsServer, grad:g.grad})));
}
let ALL_PRODUCTS = buildProducts();

const PESO = n => "₱" + n.toLocaleString("en-PH");
/* site settings: the administrator can change these (Admin, Site tab) */
function siteSettings(){
  const s = loadAdminSettings().site || {};
  return { ...SITE_DEFAULTS, ...s, announcement: { ...SITE_DEFAULTS.announcement, ...(s.announcement || {}) } };
}
function feeRate(){ return siteSettings().feePct / 100; }
const ACCENT_KEY = "owt_accent";
function activeAccent(){
  let personal = null; try{ personal = localStorage.getItem(ACCENT_KEY); } catch(e){}
  return ACCENTS.some(a => a.id === personal) ? personal : siteSettings().accent;
}
function applyAccent(){ document.documentElement.setAttribute("data-accent", activeAccent()); }
function setAccent(id){
  try{ if(id === "default") localStorage.removeItem(ACCENT_KEY); else localStorage.setItem(ACCENT_KEY, id); } catch(e){}
  applyAccent();
  if(authUser) renderAccountModal();
}
function hexToRgba(hex, a){ const n = parseInt(hex.slice(1), 16); return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`; }
function gameStyle(id){ const c = GAME_COLORS[id] || "#3B82F6"; return `--game:${c}; --game-soft:${hexToRgba(c, 0.35)};`; }
function bonusText(n, currency){ return `+${Number(n).toLocaleString("en-PH")} bonus ${currency}`; }
function discountPct(price, was){ if(!was || was<=price) return 0; return Math.round((was-price)/was*100); }
function esc(s){ return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }

/* ============================== STATE ============================== */
const state = {
  cart: [],
  search: "", gameFilter: "all", priceFilter: "all", sortBy: "popular",
  detail: null,          // { product, mode }
  checkout: null,        // { step, method, order, processing, reference, mobile, mobileError }
  promo: null,           // promo code applied to the cart
  promoError: "",
  detailDraft: { playerId:"", serverId:"", saved:false },   // what is typed in the product window
};

/* ============================== HELPERS ============================== */
function findGame(id){ return GAMES.find(g => g.id === id); }
function findProduct(id){ return ALL_PRODUCTS.find(p => p.id === id); }
function cartSubtotal(){ return state.cart.reduce((s,it) => s + it.product.price*it.qty, 0); }
function cartDiscount(){ const promo = activePromo(); return promo ? Math.round(cartSubtotal() * promo.pct / 100) : 0; }
function cartFee(){ return Math.round((cartSubtotal() - cartDiscount()) * feeRate()); }
function cartTotal(){ return cartSubtotal() - cartDiscount() + cartFee(); }
function cartCount(){ return state.cart.reduce((s,it) => s + it.qty, 0); }
function cartSavings(){ return state.cart.reduce((s,it) => s + (wasPrice(it.product) ? (wasPrice(it.product)-it.product.price)*it.qty : 0), 0); }

/* ---------- admin settings: prices, stock, sale end and promo codes ---------- */
const ADMIN_KEY = "owt_admin_settings";
function loadAdminSettings(){ return readJson(localStorage, ADMIN_KEY) || {}; }
function saveAdminSettings(settings){ writeJson(localStorage, ADMIN_KEY, settings); }

/* put any price / stock changes made by the administrator onto the game list */
function applyAdminSettings(){
  const settings = loadAdminSettings();
  const edits = settings.products || {};
  // packages the administrator added are rebuilt each time from the saved list
  GAMES.forEach(g => { g.packages = g.packages.filter(p => !p.custom); });
  (settings.customPackages || []).forEach(cp => { const g = findGame(cp.gameId); if(g) g.packages.push({ ...cp, custom:true }); });
  const now = Date.now();
  GAMES.forEach(g => g.packages.forEach(p => {
    if(!p._base) p._base = { price:p.price, was:p.was, stock:p.stock || "in", bonus:p.bonus || 0, tag:p.tag || "" };   // remember the original values
    const e = edits[p.id] || {};
    const regular = typeof e.price === "number" ? e.price : p._base.price;
    p.was   = "was" in e ? e.was : p._base.was;
    p.stock = e.stock || p._base.stock;
    p.bonus = typeof e.bonus === "number" ? e.bonus : p._base.bonus;
    p.tag   = "tag" in e ? e.tag : p._base.tag;
    p.hidden = !!e.hidden;
    p.regularPrice = regular;
    const flashOn = !!(e.flashPrice && e.flashEnd && e.flashEnd > now);   // a flash sale for this package only
    p.flashEnd = flashOn ? e.flashEnd : 0;
    p.price = flashOn ? e.flashPrice : regular;
    if(flashOn) p.was = regular;
    p.edited = !!edits[p.id];
  }));
  ALL_PRODUCTS = buildProducts();
}

/* the sale ("deals") runs until midnight each day, unless the administrator sets an end date */
function saleEndMs(){
  const custom = loadAdminSettings().saleEnd;
  if(custom) return custom;
  const end = new Date(); end.setHours(23,59,59,999);
  return end.getTime();
}
function saleActive(){ return Date.now() < saleEndMs(); }
function wasPrice(p){
  if(!(p.was && p.was > p.price)) return 0;
  if(p.flashEnd && Date.now() < p.flashEnd) return p.was;   // a package flash sale always shows its discount
  return saleActive() ? p.was : 0;
}

function getPromos(){
  const list = loadAdminSettings().promos;
  return Array.isArray(list) ? list : PROMO_DEFAULTS;
}
function activePromo(){
  if(!state.promo) return null;
  return getPromos().find(p => p.active && p.code.toUpperCase() === state.promo.toUpperCase()) || null;
}
function applyPromo(code){
  const typed = String(code || "").trim().toUpperCase();
  if(!typed){ state.promoError = "Enter a promo code."; }
  else {
    const found = getPromos().find(p => p.active && p.code.toUpperCase() === typed);
    if(found){ state.promo = found.code; state.promoError = ""; saveCart(); pushToast(`Promo code ${found.code} applied (${found.pct}% off)`, "cart"); }
    else { state.promoError = "That promo code is not valid."; }
  }
  renderCartDrawer();
}
function removePromo(){ state.promo = null; state.promoError = ""; saveCart(); renderCartDrawer(); }

/* ---------- saved Player IDs (per account, per game) ---------- */
function idsKey(){ return authUser ? `owt_demo_ids_${authUser.identifier}` : null; }
function getSavedIds(gameId){ const all = authUser ? readJson(localStorage, idsKey()) : null; return (all && all[gameId]) || null; }
function saveIds(gameId, playerId, serverId){
  if(!authUser) return;
  const all = readJson(localStorage, idsKey()) || {};
  all[gameId] = { playerId, serverId };
  writeJson(localStorage, idsKey(), all);
}

/* ============================== RENDER: STATIC-ISH ============================== */
/* Lodezz.x logo: a chunky "L" with a gold sparkle that doubles as the "x" */
let logoCount = 0;
function logoMark(size){
  const id = "lodezz-grad-" + (++logoCount);   // unique id so every copy of the logo can use its own gradient
  return `<svg width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3B82F6"/><stop offset="1" stop-color="#7C3AED"/></linearGradient></defs>
    <rect width="32" height="32" rx="9" fill="url(#${id})"/>
    <path d="M10 7h4.2v13.6h8.3V25H10z" fill="#0B0B12" opacity=".35" transform="translate(1.3 1.3)"/>
    <path d="M10 7h4.2v13.6h8.3V25H10z" fill="#fff"/>
    <path d="M23.5 5l1.2 3.3 3.3 1.2-3.3 1.2-1.2 3.3-1.2-3.3-3.3-1.2 3.3-1.2z" fill="#FBBF24"/>
  </svg>`;
}
function renderBrandMarks(){
  document.querySelectorAll(".brand-mark").forEach(el => { el.innerHTML = logoMark(32); });
}
function renderNavIcons(){
  document.getElementById("cart-icon").innerHTML = ic("cart", 17, "var(--sub)");
  document.getElementById("search-icon").innerHTML = ic("search", 17, "var(--sub)");
  document.getElementById("navsearch-icon").innerHTML = ic("search", 17, "var(--sub)");
  document.getElementById("hamburger-btn").innerHTML = ic("menu", 18, "var(--text)");
  document.getElementById("arrow-icon").innerHTML = ic("arrowRight", 16, "#fff");
  document.getElementById("drawer-cart-icon").innerHTML = ic("cart", 17, "var(--text)");
  document.getElementById("close-cart-icon").innerHTML = ic("x", 16, "var(--sub)");
  document.getElementById("help-icon").innerHTML = ic("help", 26, "var(--eblue)");
}
function renderTrust(){
  const items = [
    ["zap","Fast Delivery"], ["lock","Secure Checkout"], ["message","Customer Support"], ["card","Easy Payments"],
  ];
  document.getElementById("trust-grid").innerHTML = items.map(([icon,label]) =>
    `<div class="trust-item">${ic(icon,15,"var(--eblue)")}<span>${label}</span></div>`).join("");
}
function renderHeroVisual(){
  const eb="var(--eblue)", bv="var(--bviolet)", vi="var(--violet)";
  let dots="", i=0;
  for(i=0;i<24;i++){
    const x=30+(i*37)%420, y=20+((i*71)%380), r=1.5+(i%3);
    dots += `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${0.15+(i%4)*0.08}"/>`;
  }
  let grid="";
  for(i=0;i<6;i++){ grid += `<line x1="40" y1="${60+i*60}" x2="440" y2="${60+i*60}" style="stroke:${eb}" stroke-width="0.5"/>`; }
  for(i=0;i<6;i++){ grid += `<line x1="${80+i*65}" y1="20" x2="${80+i*65}" y2="400" style="stroke:${vi}" stroke-width="0.5"/>`; }
  document.getElementById("hero-visual").innerHTML = `
  <svg viewBox="0 0 480 420" style="width:100%; height:auto;" aria-hidden="true">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" style="stop-color:${eb}" stop-opacity="0.9"/><stop offset="100%" style="stop-color:${bv}" stop-opacity="0.9"/></linearGradient>
      <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" style="stop-color:${vi}" stop-opacity="0.5"/><stop offset="100%" style="stop-color:${eb}" stop-opacity="0.5"/></linearGradient>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:${bv}" stop-opacity="0.35"/><stop offset="100%" style="stop-color:${bv}" stop-opacity="0"/></radialGradient>
    </defs>
    <circle cx="240" cy="210" r="190" fill="url(#glow)"/>
    ${dots}
    <g opacity="0.35">${grid}</g>
    <rect x="150" y="130" width="140" height="90" rx="16" fill="url(#g1)" opacity="0.9" transform="rotate(-8 220 175)"/>
    <rect x="230" y="190" width="120" height="80" rx="16" fill="#11111A" stroke="url(#g2)" stroke-width="1.5" transform="rotate(6 290 230)"/>
    <circle cx="150" cy="290" r="34" fill="url(#g1)" opacity="0.85"/>
    <circle cx="150" cy="290" r="34" fill="none" stroke="#fff" stroke-opacity="0.2" stroke-width="1"/>
    <text x="150" y="297" text-anchor="middle" font-size="22" font-weight="700" fill="#fff">₱</text>
    <polygon points="330,90 350,110 330,130 310,110" fill="none" style="stroke:${bv}" stroke-width="2"/>
    <polygon points="330,90 350,110 330,130 310,110" style="fill:${bv}" opacity="0.15"/>
    <rect x="60" y="230" width="16" height="16" rx="4" style="fill:${eb}" opacity="0.7"/>
    <rect x="90" y="250" width="10" height="10" rx="3" style="fill:${bv}" opacity="0.6"/>
  </svg>`;
}

/* ============================== RENDER: GAMES ============================== */
function renderGameGrid(){
  const liked = new Set(getLikedGames());
  const ordered = [...GAMES].sort((a,b) => (liked.has(b.id)?1:0) - (liked.has(a.id)?1:0));   // liked games first
  document.getElementById("game-grid").innerHTML = ordered.map(g => {
    const visible = g.packages.filter(p => !p.hidden);
    const min = visible.length ? Math.min(...visible.map(p => p.price)) : 0;
    return `
    <div class="game-card" style="${gameStyle(g.id)}">
      ${g.hot ? `<span class="trending-ribbon">🔥 Trending</span>` : ""}
      <div class="game-top">
        <div class="game-icon" style="background:linear-gradient(135deg, ${g.grad[0]}, ${g.grad[1]})">${gameMark(g.id,"#fff",22)}</div>
        <div><div class="game-name">${g.name}</div><div class="game-currency">${g.currency}</div></div>
      </div>
      ${liked.has(g.id) ? `<div class="liked-line">♥ You like this game</div>` : ""}
      <div class="game-price-row"><span class="label">${visible.length ? "Starting at" : "Packages"}</span><span class="amount">${visible.length ? PESO(min) : "Coming soon"}</span></div>
      <button class="view-btn" data-action="view-game" data-game="${g.id}" ${visible.length ? "" : "disabled"}>View Packages</button>
    </div>`;
  }).join("");
}

/* ============================== RENDER: SHOP ============================== */
const PRICE_FILTERS = [
  {id:"all", label:"All Prices"}, {id:"u100", label:"Under ₱100"},
  {id:"100-500", label:"₱100–₱500"}, {id:"500-1000", label:"₱500–₱1,000"}, {id:"1000+", label:"₱1,000+"},
];
function renderFilterRows(){
  document.getElementById("game-filter-row").innerHTML =
    `<button class="pill game ${state.gameFilter==='all'?'active':''}" data-action="filter-game" data-val="all">All Games</button>` +
    (getLikedGames().length ? `<button class="pill game ${state.gameFilter==='liked'?'active':''}" data-action="filter-game" data-val="liked">My Liked Games</button>` : "") +
    GAMES.map(g => `<button class="pill game ${state.gameFilter===g.id?'active':''}" data-action="filter-game" data-val="${g.id}">${g.name}</button>`).join("");
  document.getElementById("price-filter-row").innerHTML =
    PRICE_FILTERS.map(f => `<button class="pill price ${state.priceFilter===f.id?'active':''}" data-action="filter-price" data-val="${f.id}">${f.label}</button>`).join("");
}
function filteredProducts(){
  let list = [...ALL_PRODUCTS];
  if(state.gameFilter==="liked"){ const liked = getLikedGames(); list = list.filter(p=>liked.includes(p.gameId)); }
  else if(state.gameFilter!=="all") list = list.filter(p=>p.gameId===state.gameFilter);
  if(state.priceFilter!=="all"){
    list = list.filter(p=>{
      if(state.priceFilter==="u100") return p.price<100;
      if(state.priceFilter==="100-500") return p.price>=100 && p.price<=500;
      if(state.priceFilter==="500-1000") return p.price>500 && p.price<=1000;
      if(state.priceFilter==="1000+") return p.price>1000;
      return true;
    });
  }
  if(state.search.trim()){
    const q = state.search.trim().toLowerCase();
    list = list.filter(p => p.gameName.toLowerCase().includes(q) || p.currency.toLowerCase().includes(q) || p.amount.toLowerCase().includes(q));
  }
  if(state.sortBy==="low") list.sort((a,b)=>a.price-b.price);
  else if(state.sortBy==="high") list.sort((a,b)=>b.price-a.price);
  else if(state.sortBy==="popular") list.sort((a,b)=>(b.popular?1:0)-(a.popular?1:0));
  else if(state.sortBy==="new") list.sort((a,b)=>b.gameOrder-a.gameOrder);   // most recently added games first
  return list;
}
function renderProductGrid(){
  const list = filteredProducts();
  document.getElementById("result-count").textContent = `Showing ${list.length} of ${ALL_PRODUCTS.length} packages`;
  const wrap = document.getElementById("product-grid-wrap");
  if(list.length===0){
    wrap.innerHTML = `<div class="empty-state">${ic("alertCircle",28,"var(--sub)")}<p class="title">No packages match your search.</p><p class="sub">Try a different game, keyword, or price range.</p></div>`;
    return;
  }
  wrap.innerHTML = `<div class="product-grid">${list.map(productCardHtml).join("")}</div>`;
}
function productCardHtml(p){
  const was = wasPrice(p);
  const pct = discountPct(p.price, was);
  const g = findGame(p.gameId);
  const stock = p.stock || "in";
  const stockHtml = stock === "out" ? `<div class="stock-row out"><span class="stock-dot"></span>Sold out</div>`
                  : stock === "low" ? `<div class="stock-row low"><span class="stock-dot"></span>Low stock</div>`
                  : `<div class="stock-row"><span class="stock-dot"></span>In stock</div>`;
  const flashOn = p.flashEnd && Date.now() < p.flashEnd;
  const chips = [
    flashOn ? `<span class="flash-chip" data-flash-end="${p.flashEnd}">⚡ Flash sale</span>` : "",
    p.tag && PACKAGE_TAGS[p.tag] ? `<span class="tag-chip tag-${p.tag}">${PACKAGE_TAGS[p.tag]}</span>` : "",
    p.bonus > 0 ? `<span class="bonus-chip">${esc(bonusText(p.bonus, p.currency))}</span>` : "",
  ].join("");
  return `
  <div class="product-card" style="${gameStyle(p.gameId)}">
    ${pct>0 ? `<span class="discount-badge">-${pct}%</span>` : ""}
    <div class="product-top">
      <div class="game-icon sm" style="background:linear-gradient(135deg, ${g.grad[0]}, ${g.grad[1]})">${gameMark(g.id,"#fff",16)}</div>
      <div style="min-width:0;"><div class="name">${p.gameName}</div><div class="amount">${p.amount}</div></div>
    </div>
    ${chips ? `<div class="chips">${chips}</div>` : ""}
    <button class="price-btn" data-action="open-detail" data-product="${p.id}" aria-label="View details for ${p.gameName} ${p.amount}">
      <div class="price-row">
        <div><span class="price-now">${PESO(p.price)}</span>${was ? `<span class="price-was">${PESO(was)}</span>`:""}</div>
        ${p.popular ? `<span class="badge-popular">Popular</span>` : ""}
      </div>
      ${was ? `<p class="save-line">You save ${PESO(was-p.price)}</p>` : ""}
    </button>
    ${stockHtml}
    <div class="card-actions">
      <button class="add-btn" data-action="add-cart" data-product="${p.id}" ${stock==="out" ? "disabled" : ""}>Add to Cart</button>
      <button class="buy-btn" data-action="buy-now" data-product="${p.id}" ${stock==="out" ? "disabled" : ""}>Buy Now</button>
    </div>
  </div>`;
}

/* ============================== RENDER: HOW / WHY ============================== */
function renderSteps(){
  const steps = [
    ["01","Choose Your Game","Select the game and currency you want."],
    ["02","Select Your Package","Choose the amount that fits your needs."],
    ["03","Complete Payment","Pay using your preferred payment method."],
    ["04","Receive Your Credits","Your game currency will be delivered according to the selected product's delivery method."],
  ];
  document.getElementById("steps-grid").innerHTML = steps.map(([n,t,d]) =>
    `<div class="step-card"><span class="num">${n}</span><h3>${t}</h3><p>${d}</p></div>`).join("");
}
function renderFeatures(){
  const feats = [
    ["zap","Fast Delivery","Get your digital currency quickly."],
    ["lock","Secure Checkout","Your transaction information is handled securely."],
    ["wallet","Fair Pricing","Competitive prices for your favorite games."],
    ["help","Reliable Support","Get help when you need it."],
    ["card","Multiple Payment Options","Convenient payment methods for Filipino gamers."],
    ["sparkle","Simple Experience","No unnecessary steps. Choose, pay, play."],
  ];
  document.getElementById("feat-grid").innerHTML = feats.map(([icon,t,d]) =>
    `<div class="feat-card"><div class="feat-icon">${ic(icon,18,"var(--eblue)")}</div><div><h3>${t}</h3><p>${d}</p></div></div>`).join("");
}

/* ============================== RENDER: FAQ ============================== */
let faqOpen = 0;
function renderFaq(){
  document.getElementById("faq-list").innerHTML = FAQS.map((f,i) => `
    <div class="faq-item ${faqOpen===i?'open':''}">
      <button class="faq-q" data-action="toggle-faq" data-idx="${i}" aria-expanded="${faqOpen===i}">
        <span>${f.q}</span>${ic("chevronDown",16)}
      </button>
      <div class="faq-a"><p>${f.a}</p></div>
    </div>`).join("");
}

/* ============================== RENDER: PRODUCT DETAIL MODAL ============================== */
let detailQty = 1;
function openDetail(product, mode){
  state.detail = { product, mode };
  detailQty = 1;
  const saved = getSavedIds(product.gameId);
  state.detailDraft = { playerId: saved ? saved.playerId : "", serverId: saved ? saved.serverId : "", saved: !!saved };
  renderDetailModal();
  document.getElementById("detail-overlay").classList.remove("hidden");
  focusDialog("detail-modal");
}
function closeDetail(){
  state.detail = null;
  document.getElementById("detail-overlay").classList.add("hidden");
  restoreFocus();
}
/* keepInputs = true re-draws the window (to show errors) without losing what was typed */
function renderDetailModal(errors={}, keepInputs=false){
  if(!state.detail) return;
  const { product, mode } = state.detail;
  const g = findGame(product.gameId);
  const rule = PLAYER_ID_RULES[product.gameId];
  const serverRule = rule.server;
  if(keepInputs){
    const pidEl = document.getElementById("field-playerid"), sidEl = document.getElementById("field-serverid");
    state.detailDraft.playerId = pidEl ? pidEl.value : "";
    state.detailDraft.serverId = sidEl ? sidEl.value : "";
    state.detailDraft.saved = false;
  }
  const { playerId, serverId, saved } = state.detailDraft;
  const soldOut = product.stock === "out";
  const wasP = wasPrice(product);
  let serverField = "";
  if(product.needsServer && serverRule){
    serverField = serverRule.type === "select"
      ? `<select id="field-serverid" class="${errors.serverId?'err':''}" aria-invalid="${!!errors.serverId}">
           <option value="">Choose your server</option>
           ${serverRule.options.map(o => `<option value="${esc(o)}" ${o===serverId?"selected":""}>${esc(o)}</option>`).join("")}
         </select>`
      : `<input id="field-serverid" type="text" autocomplete="off" placeholder="${serverRule.placeholder}" value="${esc(serverId)}" class="${errors.serverId?'err':''}" aria-invalid="${!!errors.serverId}" />`;
  }
  document.getElementById("detail-modal").innerHTML = `
    <div class="modal-head"><h3>Package Details</h3><button class="icon-btn" style="width:32px;height:32px;" data-action="close-detail" aria-label="Close">${ic("x",16,"var(--sub)")}</button></div>
    <div class="modal-body">
      <div class="modal-product">
        <div class="game-icon" style="background:linear-gradient(135deg, ${g.grad[0]}, ${g.grad[1]})">${gameMark(g.id,"#fff",22)}</div>
        <div><div class="name">${product.gameName}</div><div class="sub">${product.currency} · ${product.amount}</div>${product.bonus > 0 ? `<div class="bonus-line">${esc(bonusText(product.bonus, product.currency))} included</div>` : ""}</div>
      </div>
      <p class="modal-note">Your top-up is delivered to the account details you enter below.</p>
      <div class="info-grid">
        <div class="info-box"><div class="k">Delivery estimate</div><div class="v">${ic("clock",13)} 5–30 minutes</div></div>
        <div class="info-box"><div class="k">Requirements</div><div class="v">${product.needsServer && serverRule ? `${rule.label} + ${serverRule.label}` : rule.label}</div></div>
      </div>
      ${soldOut ? `<p class="err-msg" role="alert">This package is sold out right now. Please choose another one.</p>` : ""}
      <div class="field">
        <label for="field-playerid">${rule.label}</label>
        <input id="field-playerid" type="text" autocomplete="off" placeholder="${rule.placeholder}" value="${esc(playerId)}" class="${errors.playerId?'err':''}" aria-invalid="${!!errors.playerId}" />
        ${errors.playerId ? `<p class="err-msg" role="alert">${errors.playerId}</p>` : (saved ? `<p class="field-note">Saved from your last order. Change it if you are topping up a different account.</p>` : "")}
      </div>
      ${product.needsServer && serverRule ? `
      <div class="field">
        <label for="field-serverid">${serverRule.label}</label>
        ${serverField}
        ${errors.serverId ? `<p class="err-msg" role="alert">${errors.serverId}</p>` : ""}
      </div>` : ""}
      <div class="field">
        <label>Quantity</label>
        <div class="qty-row">
          <button class="qty-btn" data-action="detail-qty" data-delta="-1" aria-label="Decrease quantity">${ic("minus",14)}</button>
          <span class="qty-val" id="detail-qty-val">${detailQty}</span>
          <button class="qty-btn" data-action="detail-qty" data-delta="1" aria-label="Increase quantity">${ic("plus",14)}</button>
        </div>
      </div>
      <div class="modal-total"><span class="label">Total</span><span class="val" id="detail-total">${PESO(product.price*detailQty)}</span></div>
      <button class="btn btn-glow btn-block" data-action="confirm-detail" ${soldOut ? "disabled" : ""}>${soldOut ? "Sold out" : (mode==="buy" ? "Buy Now" : "Add to Cart")}</button>
    </div>`;
}
function updateDetailQty(delta){
  detailQty = Math.max(1, Math.min(10, detailQty+delta));
  document.getElementById("detail-qty-val").textContent = detailQty;
  document.getElementById("detail-total").textContent = PESO(state.detail.product.price*detailQty);
}
function confirmDetail(){
  const { product, mode } = state.detail;
  if(product.stock === "out") return;
  const rule = PLAYER_ID_RULES[product.gameId];
  let playerId = document.getElementById("field-playerid").value.trim();
  const serverEl = document.getElementById("field-serverid");
  const serverId = serverEl ? serverEl.value.trim() : "";
  const errors = {};

  if(!playerId) errors.playerId = `Please enter your ${rule.label}.`;
  else if(!rule.pattern.test(playerId)) errors.playerId = rule.error;
  if(product.needsServer && rule.server){
    if(!serverId) errors.serverId = rule.server.type === "select" ? rule.server.error : `Please enter your ${rule.server.label}.`;
    else if(rule.server.pattern && !rule.server.pattern.test(serverId)) errors.serverId = rule.server.error;
  }
  if(Object.keys(errors).length){ renderDetailModal(errors, true); return; }

  if(rule === PLAYER_TAG) playerId = "#" + playerId.replace(/^#/, "").toUpperCase();

  // the same package for the same account is one cart line, not two
  const existing = state.cart.find(it => it.product.id === product.id && it.playerId === playerId && it.serverId === serverId);
  if(existing) existing.qty = Math.min(10, existing.qty + detailQty);
  else state.cart.push({ key:`${product.id}-${playerId}-${serverId}-${Date.now()}`, product, qty: detailQty, playerId, serverId });
  saveCart();
  saveIds(product.gameId, playerId, serverId);
  closeDetail();
  renderCartBadge();
  if(mode==="buy"){
    closeCartDrawer();
    openCheckout();
  } else {
    pushToast(`Added ${product.gameName} ${product.amount} to cart`, "cart");
    openCartDrawer();
    fireConfetti();
    bumpCart();
  }
}

/* ============================== RENDER: CART DRAWER ============================== */
function openCartDrawer(){ document.getElementById("cart-overlay").classList.add("open"); renderCartDrawer(); focusDialog("cart-drawer"); }
function closeCartDrawer(){
  const overlay = document.getElementById("cart-overlay");
  if(overlay.classList.contains("open")){ overlay.classList.remove("open"); restoreFocus(); }
}
function renderCartBadge(){
  const n = cartCount();
  const badge = document.getElementById("cart-count");
  const btn = document.getElementById("cart-btn");
  badge.textContent = n;
  badge.style.display = n>0 ? "flex" : "none";
  btn.classList.toggle("has-items", n>0);
}
function renderCartDrawer(){
  const body = document.getElementById("drawer-body");
  const footerWrap = document.getElementById("drawer-footer-wrap");
  if(state.cart.length===0){
    body.innerHTML = `<div class="cart-empty"><div class="icon-circle">${ic("cart",22,"var(--sub)")}</div><p class="title">Your cart is empty</p><p class="sub">Browse popular games and add a package to get started.</p></div>`;
    footerWrap.innerHTML = "";
    return;
  }
  body.innerHTML = state.cart.map(it => {
    const g = findGame(it.product.gameId);
    return `
    <div class="cart-item">
      <div class="game-icon sm" style="background:linear-gradient(135deg, ${g.grad[0]}, ${g.grad[1]})">${gameMark(g.id,"#fff",16)}</div>
      <div class="info">
        <div class="row1">
          <div style="min-width:0;">
            <div class="name">${it.product.gameName}</div>
            <div class="amount">${it.product.amount}</div>
            ${it.product.bonus > 0 ? `<div class="bonus-line">${esc(bonusText(it.product.bonus * it.qty, it.product.currency))}</div>` : ""}
            <div class="idline">ID: ${esc(it.playerId)}${it.serverId ? ` · Server ${esc(it.serverId)}` : ""}</div>
          </div>
          <button class="remove-btn" data-action="remove-item" data-key="${it.key}" aria-label="Remove item">${ic("trash",14,"var(--red)")}</button>
        </div>
        <div class="row2">
          <div class="mini-qty">
            <button data-action="cart-qty" data-key="${it.key}" data-delta="-1" aria-label="Decrease quantity">${ic("minus",11)}</button>
            <span>${it.qty}</span>
            <button data-action="cart-qty" data-key="${it.key}" data-delta="1" aria-label="Increase quantity">${ic("plus",11)}</button>
          </div>
          <span class="line-total">${PESO(it.product.price*it.qty)}</span>
        </div>
      </div>
    </div>`;
  }).join("");

  const savings = cartSavings();
  const promo = activePromo();
  const discount = cartDiscount();
  footerWrap.innerHTML = `
    <div class="drawer-footer">
      ${savings>0 ? `<div class="savings-banner"><span>🎉 Deal savings</span><span>-${PESO(savings)}</span></div>` : ""}
      ${promo
        ? `<div class="promo-applied"><span>${ic("sparkle",14,"var(--goldLight)")} Code <strong>${esc(promo.code)}</strong> applied (${promo.pct}% off)</span><button class="link-btn" data-action="remove-promo">Remove</button></div>`
        : `<div class="promo-row"><input id="promo-input" type="text" autocomplete="off" placeholder="Promo code" aria-label="Promo code" /><button class="btn btn-ghost btn-sm" data-action="apply-promo">Apply</button></div>
           ${state.promoError ? `<p class="err-msg" role="alert">${state.promoError}</p>` : ""}`}
      <div class="summary-row"><span>Subtotal</span><span>${PESO(cartSubtotal())}</span></div>
      ${discount>0 ? `<div class="summary-row discount"><span>Promo discount</span><span>-${PESO(discount)}</span></div>` : ""}
      <div class="summary-row"><span>Service fee (${siteSettings().feePct}%)</span><span>${PESO(cartFee())}</span></div>
      <div class="summary-row total"><span>Total</span><span>${PESO(cartTotal())}</span></div>
      <div class="drawer-actions">
        <button class="btn btn-ghost btn-flex btn-sm" data-action="close-cart">Continue Shopping</button>
        <button class="btn btn-glow btn-flex btn-sm" data-action="go-checkout">Checkout</button>
      </div>
    </div>`;
}
function updateCartQty(key, delta){
  const it = state.cart.find(x=>x.key===key);
  if(!it) return;
  it.qty = Math.max(1, Math.min(10, it.qty+delta));
  saveCart();
  renderCartDrawer(); renderCartBadge();
}
function removeCartItem(key){
  state.cart = state.cart.filter(x=>x.key!==key);
  saveCart();
  renderCartDrawer(); renderCartBadge();
  pushToast("Item removed from cart");
}

/* ============================== RENDER: CHECKOUT ============================== */
function makeReference(){ return "LDX-REF-" + Math.floor(10000000 + Math.random()*89999999); }
function normalizeMobile(v){
  const d = String(v).replace(/[\s-]/g, "");
  return /^\+639\d{9}$/.test(d) ? "0" + d.slice(3) : d;
}
function validWalletNumber(v){ return /^09\d{9}$/.test(normalizeMobile(v)); }
function maskMobile(v){ const d = normalizeMobile(v); return d.slice(0,4) + "•••" + d.slice(-4); }

function openCheckout(){
  const acct = getAccount();
  state.checkout = { step:1, method:(acct && acct.paymentMethod) || "gcash", order:null, processing:false,
                     reference: makeReference(), mobile:"", mobileError:"" };
  document.getElementById("checkout-overlay").classList.remove("hidden");
  renderCheckout();
  focusDialog("checkout-modal");
}
function closeCheckout(){
  state.checkout = null;
  document.getElementById("checkout-overlay").classList.add("hidden");
  restoreFocus();
}
function renderCheckout(){
  if(!state.checkout) return;
  const { step, method, order, processing } = state.checkout;
  const modal = document.getElementById("checkout-modal");
  const headTitle = step===1 ? "Order Details" : step===2 ? "Payment" : "Order Confirmed";
  let body = "";
  if(step===1){
    const discount = cartDiscount(), promo = activePromo();
    body = `
      ${state.cart.map(it => `
        <div class="order-line">
          <div class="left">
            <div class="game-icon sm" style="background:linear-gradient(135deg, ${findGame(it.product.gameId).grad[0]}, ${findGame(it.product.gameId).grad[1]})">${gameMark(it.product.gameId,"#fff",16)}</div>
            <div style="min-width:0;">
              <div class="name">${it.product.gameName} · ${it.product.amount}</div>
              <div class="meta">Qty ${it.qty} · ${esc(it.playerId)}${it.serverId ? ` · ${esc(it.serverId)}`:""}${it.product.bonus > 0 ? ` · ${esc(bonusText(it.product.bonus * it.qty, it.product.currency))}` : ""}</div>
            </div>
          </div>
          <span class="amt">${PESO(it.product.price*it.qty)}</span>
        </div>`).join("")}
      <div class="totals-box">
        <div class="row"><span>Subtotal</span><span>${PESO(cartSubtotal())}</span></div>
        ${discount>0 ? `<div class="row discount"><span>Promo ${esc(promo.code)}</span><span>-${PESO(discount)}</span></div>` : ""}
        <div class="row"><span>Service fee</span><span>${PESO(cartFee())}</span></div>
        <div class="row final"><span>Total</span><span>${PESO(cartTotal())}</span></div>
      </div>
      <button class="btn btn-glow btn-block" data-action="checkout-next">Continue to Payment</button>`;
  } else if(step===2){
    const help = PAYMENT_HELP[method];
    const label = paymentLabel(method);
    body = `
      <p class="pay-note">Choose how you would like to pay for this order.</p>
      <div class="pay-grid" role="radiogroup" aria-label="Payment method">
        ${PAYMENT_METHODS.map(m => `
          <button class="pay-method ${method===m.id?'active':''}" data-action="select-payment" data-method="${m.id}" role="radio" aria-checked="${method===m.id}">
            ${ic(m.icon,16, method===m.id ? "var(--eblue)" : "var(--sub)")} ${m.label}
          </button>`).join("")}
      </div>
      <div class="pay-help">
        <h4>${help.title}</h4>
        <ol>${help.steps.map(st => `<li>${st}</li>`).join("")}</ol>
        ${help.wallet ? `
        <div class="field">
          <label for="pay-mobile">${label} mobile number</label>
          <input id="pay-mobile" type="tel" inputmode="numeric" autocomplete="off" placeholder="09XX XXX XXXX" value="${esc(state.checkout.mobile)}" class="${state.checkout.mobileError?'err':''}" aria-invalid="${!!state.checkout.mobileError}" />
          ${state.checkout.mobileError ? `<p class="err-msg" role="alert">${state.checkout.mobileError}</p>` : ""}
        </div>` : ""}
        <div class="ref-line"><span>Reference code</span><strong>${state.checkout.reference}</strong></div>
      </div>
      <div class="pay-amount"><span style="color:var(--sub)">Amount to pay</span><span class="val">${PESO(cartTotal())}</span></div>
      <button class="btn btn-gold btn-block" data-action="confirm-payment" ${processing?"disabled":""}>${processing ? "Processing…" : `Pay ${PESO(cartTotal())}`}</button>`;
  } else if(step===3 && order){
    body = `
      <div class="confirm-wrap">
        <div class="confirm-icon">${ic("check",26,"#1a1002")}</div>
        <div><h4>Order Confirmed! 🎉</h4><p class="ordno-label">Order number</p><p class="ordno">${order.number}</p></div>
        <div class="confirm-box">
          ${order.items.map(it => `<div class="row"><span>${it.product.gameName} · ${it.product.amount} × ${it.qty}</span><span style="color:var(--text)">${PESO(it.product.price*it.qty)}</span></div>`).join("")}
          ${order.discount>0 ? `<div class="row"><span>Promo ${esc(order.promo)}</span><span>-${PESO(order.discount)}</span></div>` : ""}
          <div class="row final"><span>Total</span><span>${PESO(order.total)}</span></div>
          <div class="row"><span>Paid with</span><span style="color:var(--text)">${esc(paymentLabel(order.method))}${order.payer ? " · " + esc(order.payer) : ""}</span></div>
          <div class="row"><span>Reference</span><span style="color:var(--text)">${esc(order.reference)}</span></div>
          <div class="row status"><span>Delivery status</span><span>${ic("clock",12)} Processing</span></div>
        </div>
        <div class="confirm-actions">
          <button class="btn btn-ghost btn-flex" data-action="checkout-track">${ic("packageCheck",15)} Track Order</button>
          <button class="btn btn-glow btn-flex" data-action="checkout-done">Done</button>
        </div>
        <button class="link-btn" data-action="download-receipt" data-number="${order.number}">Download receipt</button>
      </div>`;
  }
  modal.innerHTML = `
    <div class="checkout-head">
      <div class="left">
        ${(step>1 && step<3) ? `<button class="back-btn" data-action="checkout-back" aria-label="Back">${ic("chevronLeft",15,"var(--sub)")}</button>` : ""}
        <h3>${headTitle}</h3>
      </div>
      ${step<3 ? `<button class="icon-btn" style="width:32px;height:32px;" data-action="close-checkout" aria-label="Close checkout">${ic("x",16,"var(--sub)")}</button>` : ""}
    </div>
    <div class="progress-row">
      ${[1,2,3].map(n => `<div class="progress-seg ${n<=step?'active':''}"></div>`).join("")}
    </div>
    <div class="checkout-body">${body}</div>`;
}
function confirmPayment(){
  const co = state.checkout;
  const help = PAYMENT_HELP[co.method];
  if(help.wallet && !validWalletNumber(co.mobile)){
    co.mobileError = `Enter the 11-digit mobile number of your ${paymentLabel(co.method)} account (for example 09171234567).`;
    renderCheckout();
    const el = document.getElementById("pay-mobile"); if(el) el.focus();
    return;
  }
  co.mobileError = "";
  co.processing = true;
  renderCheckout();
  setTimeout(() => {
    const promo = activePromo();
    const num = `LDX-2026-${Math.floor(100000+Math.random()*899999)}`;
    co.order = {
      number:num, items:[...state.cart], method:co.method, date:new Date(),
      subtotal:cartSubtotal(), discount:cartDiscount(), promo: promo ? promo.code : "", fee:cartFee(), total:cartTotal(),
      reference:co.reference, payer: help.wallet ? maskMobile(co.mobile) : "",
    };
    saveOrder(co.order);
    state.cart = [];
    state.promo = null;
    saveCart();
    renderCartBadge(); renderCartDrawer();
    co.processing = false;
    co.step = 3;
    renderCheckout();
    fireConfetti();
  }, 900);
}
function checkoutDone(openOrders){
  const order = state.checkout.order;
  closeCheckout();
  if(openOrders){ ordersHighlight = order.number; goTo("orders"); }
  else pushToast(`Order ${order.number} was saved to My Orders`);
}

/* ============================== TOASTS ============================== */
function pushToast(message, kind="default"){
  const id = Math.random().toString(36).slice(2);
  const stack = document.getElementById("toast-stack");
  const el = document.createElement("div");
  el.className = `toast ${kind==="cart"?"cart":""}`;
  el.setAttribute("role","status");
  el.innerHTML = `<span class="icon-dot">${ic("check",14,"#fff")}</span>${esc(message)}`;
  stack.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

/* ============================== CONFETTI ============================== */
function fireConfetti(){
  if(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const layer = document.getElementById("confetti-layer");
  const colors = ["var(--gold)","var(--orange)","var(--amber)","var(--eblue)","var(--bviolet)"];
  for(let i=0;i<26;i++){
    const el = document.createElement("span");
    const left = 45 + Math.random()*10;
    const dx = (Math.random()-0.5)*220;
    const dy = -(120+Math.random()*140);
    const rot = Math.random()*480-240;
    const delay = Math.random()*0.08;
    const size = 5+Math.random()*5;
    const shape = i%3===0 ? "50%" : "2px";
    el.className = "confetti-piece";
    el.style.cssText = `left:${left}%; width:${size}px; height:${size}px; background:${colors[i%colors.length]}; border-radius:${shape};
      animation-delay:${delay}s; --dx:${dx}px; --dy:${dy}px; --rot:${rot}deg;`;
    layer.appendChild(el);
    setTimeout(() => el.remove(), 1100);
  }
}
function bumpCart(){
  const btn = document.getElementById("cart-btn");
  btn.classList.add("bump");
  setTimeout(() => btn.classList.remove("bump"), 400);
}

/* ============================== COUNTDOWN ============================== */
let saleWasActive = true;
function updateCountdowns(){
  const remaining = Math.max(0, saleEndMs() - Date.now());
  const ended = remaining === 0;
  const h = String(Math.floor(remaining/3600000)).padStart(2,"0");
  const m = String(Math.floor((remaining%3600000)/60000)).padStart(2,"0");
  const sec = String(Math.floor((remaining%60000)/1000)).padStart(2,"0");
  document.querySelectorAll("[data-countdown]").forEach(el => {
    el.innerHTML = ended
      ? `<span class="seg">Sale ended</span>`
      : `<span class="seg">${h}</span><span class="colon">:</span><span class="seg">${m}</span><span class="colon">:</span><span class="seg">${sec}</span>`;
    el.setAttribute("aria-label", ended ? "The sale has ended" : `Sale ends in ${h} hours ${m} minutes ${sec} seconds`);
    const pill = el.closest(".deal-pill"); if(pill) pill.classList.toggle("ended", ended);
  });
  document.querySelectorAll("[data-flash-end]").forEach(el => {
    const left = Math.max(0, parseInt(el.dataset.flashEnd, 10) - Date.now());
    const hh = String(Math.floor(left/3600000)).padStart(2,"0"), mm = String(Math.floor((left%3600000)/60000)).padStart(2,"0"), ss = String(Math.floor((left%60000)/1000)).padStart(2,"0");
    const days = Math.floor(left / 86400000);
    el.textContent = days >= 2 ? `⚡ Flash sale · ${days} days left` : `⚡ Flash sale ${hh}:${mm}:${ss}`;
  });
  if(ALL_PRODUCTS.some(p => p.flashEnd && Date.now() >= p.flashEnd)){
    applyAdminSettings(); syncCartWithAccount(); renderGameGrid(); renderProductGrid();
  }
  // when the sale ends, discounts disappear from the prices
  if(saleActive() !== saleWasActive){
    saleWasActive = saleActive();
    renderGameGrid(); renderProductGrid(); renderCartDrawer();
  }
}
/* the colored message bar under the header (set by the administrator) */
function renderAnnouncement(){
  const el = document.getElementById("announcement");
  const a = siteSettings().announcement;
  let dismissed = false; try{ dismissed = sessionStorage.getItem("owt_ann_dismissed") === a.text; } catch(e){}
  const show = !!(a.active && a.text.trim() && !dismissed);
  el.hidden = !show;
  document.body.classList.toggle("has-announcement", show);
  if(show){
    el.className = "announcement " + (ANNOUNCEMENT_STYLES[a.style] ? a.style : "info");
    el.innerHTML = `<span>${esc(a.text)}</span><button type="button" data-action="dismiss-announcement" aria-label="Dismiss message">✕</button>`;
  }
}
/* the home banner shows the first promo code that is switched on */
function renderPromoLine(){
  const el = document.getElementById("promo-code-line");
  if(!el) return;
  const promo = getPromos().find(p => p.active);
  el.hidden = !promo;
  if(promo) el.innerHTML = `New here? Use code <strong>${esc(promo.code)}</strong> for ${promo.pct}% off your order.`;
}
setInterval(updateCountdowns, 1000);

/* ============================== AUTH (accounts are stored in this browser) ============================== */
const AUTH_SESSION_KEY  = "owt_demo_session";        // current login (localStorage if "remember", else sessionStorage)
const AUTH_ACCOUNTS_KEY = "owt_demo_accounts";       // account store
const AUTH_HISTORY_KEY  = "owt_demo_login_history";  // list of past logins on this device
const AUTH_REMEMBER_KEY = "owt_demo_remembered";     // the account chosen with "Remember this account"
let authUser = null;      // { name, identifier } for the signed-in user, or null
let authMode = "login";   // "login" | "register"
let prefsEditing = false; // true when changing liked games from the account window
let prefsDraft = new Set();

function readJson(store, key){
  try{ const raw = store.getItem(key); return raw ? JSON.parse(raw) : null; } catch(e){ return null; }
}
function writeJson(store, key, value){
  try{ store.setItem(key, JSON.stringify(value)); } catch(e){}
}

/* ---------- passwords are stored scrambled (salted SHA-256), never as plain text ---------- */
function rotr(v, n){ return (v >>> n) | (v << (32 - n)); }
const SHA_K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
function sha256(text){
  const bytes = Array.from(new TextEncoder().encode(text));
  const bitLen = bytes.length * 8;
  bytes.push(0x80);
  while(bytes.length % 64 !== 56) bytes.push(0);
  const hi = Math.floor(bitLen / 4294967296), lo = bitLen >>> 0;
  bytes.push((hi>>>24)&255,(hi>>>16)&255,(hi>>>8)&255,hi&255,(lo>>>24)&255,(lo>>>16)&255,(lo>>>8)&255,lo&255);
  let H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
  const w = new Array(64);
  for(let i = 0; i < bytes.length; i += 64){
    for(let t = 0; t < 16; t++) w[t] = (bytes[i+4*t]<<24) | (bytes[i+4*t+1]<<16) | (bytes[i+4*t+2]<<8) | bytes[i+4*t+3];
    for(let t = 16; t < 64; t++){
      const s0 = rotr(w[t-15],7) ^ rotr(w[t-15],18) ^ (w[t-15]>>>3);
      const s1 = rotr(w[t-2],17) ^ rotr(w[t-2],19) ^ (w[t-2]>>>10);
      w[t] = (w[t-16] + s0 + w[t-7] + s1) | 0;
    }
    let [a,b,c,d,e,f,g,h] = H;
    for(let t = 0; t < 64; t++){
      const S1 = rotr(e,6) ^ rotr(e,11) ^ rotr(e,25);
      const ch = (e & f) ^ (~e & g);
      const t1 = (h + S1 + ch + SHA_K[t] + w[t]) | 0;
      const S0 = rotr(a,2) ^ rotr(a,13) ^ rotr(a,22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + maj) | 0;
      h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    H = [(H[0]+a)|0,(H[1]+b)|0,(H[2]+c)|0,(H[3]+d)|0,(H[4]+e)|0,(H[5]+f)|0,(H[6]+g)|0,(H[7]+h)|0];
  }
  return H.map(x => (x >>> 0).toString(16).padStart(8, "0")).join("");
}
function randomSalt(){
  const a = new Uint8Array(12);
  if(window.crypto && crypto.getRandomValues) crypto.getRandomValues(a); else a.forEach((_, i) => { a[i] = Math.floor(Math.random()*256); });
  return Array.from(a).map(b => b.toString(16).padStart(2, "0")).join("");
}
function hashPassword(password, salt){
  let h = sha256(salt + ":" + password);
  for(let i = 0; i < 1000; i++) h = sha256(h + salt);
  return h;
}
function makePasswordRecord(password){ const salt = randomSalt(); return { salt, hash: hashPassword(password, salt) }; }
function passwordMatches(account, password){ return !!(account && account.hash && hashPassword(password, account.salt) === account.hash); }

function loadAccounts(){
  let accounts = readJson(localStorage, AUTH_ACCOUNTS_KEY);
  if(!accounts || typeof accounts !== "object") accounts = {};
  let changed = false;
  // accounts saved by older versions kept the password as plain text: scramble it
  Object.keys(accounts).forEach(k => {
    const a = accounts[k];
    if(typeof a.password === "string"){ Object.assign(a, makePasswordRecord(a.password)); delete a.password; changed = true; }
  });
  // one ready-made customer account so the login form can be tried straight away
  if(!accounts["juan@example.com"]){
    accounts["juan@example.com"] = { name:"Juan Dela Cruz", ...makePasswordRecord("juan1234") };
    changed = true;
  }
  // the administrator account (username "admin"). Change its password from My Account.
  if(!accounts["admin"]){
    accounts["admin"] = { name:"Site Administrator", role:"admin", paymentMethod:"gcash", ...makePasswordRecord("admin1234") };
    changed = true;
  }
  // older saved copies used a different display name for the ready-made account
  const older = accounts["demo@owtindahan.com"];
  if(older && older.name === "Demo User"){ older.name = "Juan Dela Cruz"; changed = true; }
  if(changed) saveAccounts(accounts);
  return accounts;
}
function saveAccounts(accounts){ writeJson(localStorage, AUTH_ACCOUNTS_KEY, accounts); }

/* session: "remember" keeps it after the browser closes; otherwise it ends with the tab */
function loadSession(){ return readJson(sessionStorage, AUTH_SESSION_KEY) || readJson(localStorage, AUTH_SESSION_KEY); }
function clearSession(){
  try{ sessionStorage.removeItem(AUTH_SESSION_KEY); localStorage.removeItem(AUTH_SESSION_KEY); } catch(e){}
}
function saveSession(user, remember){
  clearSession();
  writeJson(remember ? localStorage : sessionStorage, AUTH_SESSION_KEY, user);
}

/* login history (this device) */
function loadHistory(){
  const h = readJson(localStorage, AUTH_HISTORY_KEY);
  return Array.isArray(h) ? h : [];
}
function recordLogin(user, remembered){
  const history = loadHistory();
  history.unshift({ identifier:user.identifier, name:user.name, at:new Date().toISOString(), remembered:!!remembered });
  writeJson(localStorage, AUTH_HISTORY_KEY, history.slice(0, 30));
}
function formatWhen(iso){
  try{ return new Date(iso).toLocaleString("en-PH", { dateStyle:"medium", timeStyle:"short" }); } catch(e){ return iso; }
}

/* "Remember this account" */
function loadRemembered(){ return readJson(localStorage, AUTH_REMEMBER_KEY); }
function setRemembered(user, paymentMethod){
  writeJson(localStorage, AUTH_REMEMBER_KEY, { identifier:user.identifier, name:user.name, paymentMethod });
}
function clearRemembered(){ try{ localStorage.removeItem(AUTH_REMEMBER_KEY); } catch(e){} }

/* account helpers */
function getAccount(){ return authUser ? (loadAccounts()[authUser.identifier] || null) : null; }
function updateAccount(patch){
  if(!authUser) return;
  const accounts = loadAccounts();
  if(accounts[authUser.identifier]){ Object.assign(accounts[authUser.identifier], patch); saveAccounts(accounts); }
}
function getLikedGames(){
  const a = getAccount();
  return a && Array.isArray(a.likedGames) ? a.likedGames : [];
}
function paymentLabel(id){ const m = PAYMENT_METHODS.find(x => x.id === id); return m ? m.label : "Not set"; }

function setFieldError(errId, message){
  const errEl = document.getElementById(errId);
  if(!errEl) return;
  const inputEl = document.getElementById(errId.replace("err-", "auth-"));
  if(message){
    errEl.textContent = message; errEl.hidden = false;
    if(inputEl){ inputEl.classList.add("err"); inputEl.setAttribute("aria-invalid", "true"); }
  } else {
    errEl.hidden = true;
    if(inputEl){ inputEl.classList.remove("err"); inputEl.removeAttribute("aria-invalid"); }
  }
}
function clearAuthErrors(){
  ["err-name","err-identifier","err-password","err-confirm","err-payment","err-general"].forEach(id => setFieldError(id, ""));
}

function fillPaymentSelect(){
  const sel = document.getElementById("auth-payment");
  sel.innerHTML = `<option value="">Select a payment method</option>` +
    PAYMENT_METHODS.map(m => `<option value="${m.id}">${m.label}</option>`).join("");
}

/* pre-fill the login form from the last remembered account + show the last login */
function prefillLoginForm(){
  const idEl = document.getElementById("auth-identifier");
  const payEl = document.getElementById("auth-payment");
  const remEl = document.getElementById("auth-remember");
  const remembered = loadRemembered();
  if(authMode === "login" && remembered && !idEl.value){
    idEl.value = remembered.identifier;
    if(remembered.paymentMethod) payEl.value = remembered.paymentMethod;
    remEl.checked = true;
  }
  const last = loadHistory()[0];
  const lastEl = document.getElementById("auth-last");
  if(last && authMode === "login"){
    lastEl.textContent = `Last login on this device: ${last.name} · ${formatWhen(last.at)}`;
    lastEl.hidden = false;
  } else {
    lastEl.hidden = true;
  }
}
function resetAuthForm(){
  ["auth-name","auth-identifier","auth-password","auth-confirm"].forEach(id => { document.getElementById(id).value = ""; });
  document.getElementById("auth-payment").value = "";
  document.getElementById("auth-remember").checked = false;
}

function renderAuthMode(){
  const isRegister = authMode === "register";
  document.getElementById("auth-title").textContent = isRegister ? "Create Account" : "Log In";
  document.getElementById("auth-sub").textContent = isRegister
    ? "Fill in your details to get started."
    : "Welcome back! Enter your details to continue.";
  document.getElementById("field-name").hidden = !isRegister;
  document.getElementById("field-confirm").hidden = !isRegister;
  document.getElementById("auth-submit-btn").textContent = isRegister ? "Create Account" : "Log In";
  document.getElementById("forgot-btn").hidden = isRegister;
  document.getElementById("auth-terms").hidden = !isRegister;
  document.querySelector('.auth-switch').firstChild.textContent = isRegister ? "Already have an account? " : "Don't have an account? ";
  document.querySelector('[data-action="auth-toggle-mode"]').textContent = isRegister ? "Log in" : "Create one";
  clearAuthErrors();
  prefillLoginForm();
}

function togglePasswordField(inputId, btn){
  const input = document.getElementById(inputId);
  if(!input) return;
  const show = input.type === "password";
  input.type = show ? "text" : "password";
  btn.innerHTML = ic(show ? "eyeOff" : "eye", 16, "var(--sub)");
  btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
}

/* ---------- too many wrong passwords: wait 30 seconds ---------- */
const ATTEMPTS_KEY = "owt_demo_attempts";
const MAX_ATTEMPTS = 5, LOCK_SECONDS = 30;
function lockSecondsLeft(id){
  const all = readJson(localStorage, ATTEMPTS_KEY) || {};
  return all[id] ? Math.max(0, Math.ceil((all[id].until - Date.now()) / 1000)) : 0;
}
function recordFailedLogin(id){
  const all = readJson(localStorage, ATTEMPTS_KEY) || {};
  const info = all[id] || { count:0, until:0 };
  info.count += 1;
  if(info.count >= MAX_ATTEMPTS){ info.count = 0; info.until = Date.now() + LOCK_SECONDS*1000; }
  all[id] = info;
  writeJson(localStorage, ATTEMPTS_KEY, all);
}
function clearFailedLogins(id){
  const all = readJson(localStorage, ATTEMPTS_KEY) || {};
  if(all[id]){ delete all[id]; writeJson(localStorage, ATTEMPTS_KEY, all); }
}
function validateIdentifier(id){
  if(id.includes("@")) return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(id) ? "" : "Enter a valid email address, for example name@example.com.";
  return /^[A-Za-z0-9._-]{3,20}$/.test(id) ? "" : "A username is 3–20 characters: letters, numbers, dots, dashes or underscores.";
}
function isAdmin(){ const a = getAccount(); return !!(a && a.role === "admin"); }

function handleAuthSubmit(){
  clearAuthErrors();
  const isRegister = authMode === "register";
  const identifier = document.getElementById("auth-identifier").value.trim();
  const password = document.getElementById("auth-password").value;
  const paymentMethod = document.getElementById("auth-payment").value;
  const remember = document.getElementById("auth-remember").checked;
  let hasError = false;

  if(!identifier){ setFieldError("err-identifier","Please enter your email or username."); hasError = true; }
  else if(isRegister){
    const idProblem = validateIdentifier(identifier);
    if(idProblem){ setFieldError("err-identifier", idProblem); hasError = true; }
  }
  if(!password){ setFieldError("err-password","Please enter your password."); hasError = true; }
  else if(password.length < 6){ setFieldError("err-password","Password must be at least 6 characters."); hasError = true; }
  if(!paymentMethod){ setFieldError("err-payment","Please choose your payment method before continuing."); hasError = true; }

  let name = "";
  if(isRegister){
    name = document.getElementById("auth-name").value.trim();
    const confirm = document.getElementById("auth-confirm").value;
    if(!name){ setFieldError("err-name","Please enter your full name."); hasError = true; }
    if(password && confirm !== password){ setFieldError("err-confirm","Passwords do not match."); hasError = true; }
  }
  if(hasError) return;

  const accounts = loadAccounts();
  const key = identifier.toLowerCase();

  if(isRegister){
    if(accounts[key]){
      setFieldError("err-identifier","An account with that email or username already exists.");
      return;
    }
    accounts[key] = { name, ...makePasswordRecord(password), paymentMethod, likedGames:[] };
    saveAccounts(accounts);
    authUser = { name, identifier: key };
  } else {
    const wait = lockSecondsLeft(key);
    if(wait > 0){
      setFieldError("err-general", `Too many wrong attempts. Please try again in ${wait} second${wait === 1 ? "" : "s"}.`);
      return;
    }
    const account = accounts[key];
    if(!account || !passwordMatches(account, password)){
      recordFailedLogin(key);
      const nowWait = lockSecondsLeft(key);
      setFieldError("err-general", nowWait > 0
        ? `Too many wrong attempts. Please try again in ${nowWait} seconds.`
        : "Incorrect email/username or password.");
      return;
    }
    clearFailedLogins(key);
    if(account.suspended){
      setFieldError("err-general", "This account has been suspended. Please contact the site administrator.");
      return;
    }
    account.paymentMethod = paymentMethod;   // save the method they picked for this login
    saveAccounts(accounts);
    authUser = { name: account.name, identifier: key };
  }

  saveSession(authUser, remember);
  recordLogin(authUser, remember);
  if(remember) setRemembered(authUser, paymentMethod); else clearRemembered();
  lastActivity = Date.now();
  updateAuthUI();
  resetAuthForm();
  goTo("home", { replace:true });   // goes to the liked-games step first if this account has not picked any yet
  pushToast(`Welcome, ${authUser.name}!`);
}

/* signed out automatically after 30 minutes without activity (not for "Remember this account" sessions) */
const IDLE_LIMIT_MS = 30 * 60 * 1000;
let lastActivity = Date.now();
["click","keydown","touchstart","mousemove"].forEach(ev => document.addEventListener(ev, () => { lastActivity = Date.now(); }, { passive:true }));
setInterval(() => {
  const remembered = !!readJson(localStorage, AUTH_SESSION_KEY);
  const acct = authUser ? getAccount() : null;
  if(authUser && acct && acct.suspended){
    logout();
    pushToast("Your account has been suspended. Please contact the site administrator.");
    return;
  }
  if(authUser && !remembered && Date.now() - lastActivity > IDLE_LIMIT_MS){
    logout();
    pushToast("You were signed out because you were away for a while.");
  }
}, 15000);

function logout(){
  if(typeof adminTab !== "undefined") adminTab = "dashboard";   // the admin page starts on the Dashboard next time
  closeAccount();
  closeCartDrawer();
  authUser = null;
  clearSession();
  updateAuthUI();
  authMode = "login";
  resetAuthForm();
  renderAuthMode();
  goTo("login", { replace:true });
}

function updateAuthUI(){
  const loggedIn = !!authUser;
  document.querySelectorAll(".login-btn").forEach(el => { el.hidden = loggedIn; });
  const chip = document.getElementById("account-chip");
  if(chip) chip.hidden = !loggedIn;
  const nameEl = document.getElementById("account-name");
  if(nameEl) nameEl.textContent = loggedIn ? authUser.name : "";

  const guestRow = document.getElementById("mobile-guest-row");
  const userRow = document.getElementById("mobile-user-row");
  if(guestRow) guestRow.hidden = loggedIn;
  if(userRow) userRow.hidden = !loggedIn;
  const nameMobile = document.getElementById("account-name-mobile");
  if(nameMobile) nameMobile.textContent = loggedIn ? authUser.name : "";
  document.querySelectorAll(".admin-link").forEach(el => { el.hidden = !(loggedIn && isAdmin()); });
  syncCartWithAccount();
  refreshPersonalized();
}

/* things that change depending on which games the signed-in user likes */
function refreshPersonalized(){
  if(state.gameFilter === "liked" && getLikedGames().length === 0) state.gameFilter = "all";
  renderGameGrid();
  renderFilterRows();
  renderProductGrid();
}

/* ============================== LIKED GAMES (shown before the website) ============================== */
function renderPrefsGrid(){
  document.getElementById("prefs-grid").innerHTML = GAMES.map(g => {
    const checked = prefsDraft.has(g.id);
    return `
    <label class="pref-card ${checked ? "checked" : ""}" style="${gameStyle(g.id)}">
      <span class="pref-top">
        <span class="game-icon sm" style="background:linear-gradient(135deg, ${g.grad[0]}, ${g.grad[1]})">${gameMark(g.id,"#fff",16)}</span>
        <span><span class="pref-name">${g.name}</span><span class="pref-cur">${g.currency}</span></span>
      </span>
      <span class="pref-like"><input type="checkbox" class="pref-check" data-game="${g.id}" ${checked ? "checked" : ""} /> I like this game</span>
    </label>`;
  }).join("");
  updatePrefsCount();
}
function updatePrefsCount(){
  document.getElementById("prefs-count").textContent = `${prefsDraft.size} of ${GAMES.length} selected`;
}
function openPrefs(editing, replace){
  prefsEditing = !!editing;
  prefsDraft = new Set(getLikedGames());
  renderPrefsGrid();
  setFieldError("err-prefs", "");
  document.getElementById("prefs-title").textContent = prefsEditing ? "Change your liked games" : "Which of these games do you like?";
  document.getElementById("prefs-save-btn").textContent = prefsEditing ? "Save Changes" : "Continue to the Website";
  document.getElementById("prefs-cancel-btn").hidden = !prefsEditing;
  document.getElementById("mobile-menu").classList.remove("open");
  setActivePage("prefs");
  commitRoute("preferences", !!replace);
}
function savePrefs(){
  if(prefsDraft.size === 0){
    setFieldError("err-prefs", "Please tick at least one game you like before continuing.");
    return;
  }
  updateAccount({ likedGames:[...prefsDraft] });
  refreshPersonalized();
  pushToast("Your liked games were saved.");
  goTo("home");
}

/* ============================== ACCOUNT WINDOW (name in the navigation) ============================== */
let accountView = "main";   // main | profile | password | delete
let accountError = "";
function openAccount(){
  accountView = "main"; accountError = "";
  renderAccountModal();
  document.getElementById("account-overlay").classList.remove("hidden");
  document.getElementById("mobile-menu").classList.remove("open");
  focusDialog("account-modal");
}
function closeAccount(){
  const overlay = document.getElementById("account-overlay");
  if(!overlay.classList.contains("hidden")){ overlay.classList.add("hidden"); restoreFocus(); }
}
function setAccountView(view){ accountView = view; accountError = ""; renderAccountModal(); }

/* keep the saved login in the same place (browser storage) it was already in */
function persistSessionUser(){
  const remembered = !!readJson(localStorage, AUTH_SESSION_KEY);
  saveSession(authUser, remembered);
}
function saveProfile(){
  const name = document.getElementById("acct-name").value.trim();
  const method = document.getElementById("acct-payment").value;
  if(!name){ accountError = "Please enter your name."; return renderAccountModal(); }
  if(!method){ accountError = "Please choose a payment method."; return renderAccountModal(); }
  updateAccount({ name, paymentMethod:method });
  authUser.name = name;
  persistSessionUser();
  const rem = loadRemembered();
  if(rem && rem.identifier === authUser.identifier) setRemembered(authUser, method);
  updateAuthUI();
  accountView = "main"; accountError = "";
  renderAccountModal();
  pushToast("Your profile was updated.");
}
function changePassword(){
  const cur = document.getElementById("acct-cur-pw").value;
  const nw = document.getElementById("acct-new-pw").value;
  const cf = document.getElementById("acct-conf-pw").value;
  const account = getAccount();
  if(!passwordMatches(account, cur)) accountError = "Your current password is not correct.";
  else if(nw.length < 6) accountError = "The new password must be at least 6 characters.";
  else if(nw !== cf) accountError = "The new passwords do not match.";
  else {
    updateAccount(makePasswordRecord(nw));
    accountView = "main"; accountError = "";
    renderAccountModal();
    pushToast("Your password was changed.");
    return;
  }
  renderAccountModal();
  const el = document.getElementById("acct-cur-pw"); if(el) el.focus();
}
function deleteAccount(){
  const pw = document.getElementById("acct-del-pw").value;
  const account = getAccount();
  if(account && account.role === "admin"){ accountError = "The administrator account cannot be deleted."; return renderAccountModal(); }
  if(!passwordMatches(account, pw)){ accountError = "Your password is not correct."; return renderAccountModal(); }
  const id = authUser.identifier;
  logout();
  const accounts = loadAccounts(); delete accounts[id]; saveAccounts(accounts);
  [`owt_demo_cart_${id}`, `owt_demo_orders_${id}`, `owt_demo_ids_${id}`].forEach(k => { try{ localStorage.removeItem(k); } catch(e){} });
  writeJson(localStorage, AUTH_HISTORY_KEY, loadHistory().filter(h => h.identifier !== id));
  const rem = loadRemembered(); if(rem && rem.identifier === id) clearRemembered();
  renderAuthMode();
  pushToast("Your account was deleted.");
}

function renderAccountModal(){
  if(!authUser) return;
  const account = getAccount() || {};
  const head = (title) => `<div class="modal-head"><h3>${title}</h3><button class="icon-btn" style="width:32px;height:32px;" data-action="close-account" aria-label="Close">${ic("x",16,"var(--sub)")}</button></div>`;
  const err = accountError ? `<p class="err-msg" role="alert">${esc(accountError)}</p>` : "";
  let body = "";

  if(accountView === "profile"){
    body = head("Edit profile") + `
    <div class="modal-body">
      <div class="field"><label for="acct-name">Name</label><input id="acct-name" type="text" value="${esc(authUser.name)}" /></div>
      <div class="field"><label for="acct-payment">Payment method</label>
        <select id="acct-payment">${PAYMENT_METHODS.map(m => `<option value="${m.id}" ${m.id === account.paymentMethod ? "selected" : ""}>${m.label}</option>`).join("")}</select>
        <p class="field-note">Your email or username (${esc(authUser.identifier)}) cannot be changed.</p></div>
      ${err}
      <div class="acct-actions"><button class="btn btn-ghost btn-flex" data-action="acct-view" data-view="main">Cancel</button><button class="btn btn-glow btn-flex" data-action="acct-save-profile">Save</button></div>
    </div>`;
  } else if(accountView === "password"){
    body = head("Change password") + `
    <div class="modal-body">
      <div class="field"><label for="acct-cur-pw">Current password</label><input id="acct-cur-pw" type="password" autocomplete="current-password" /></div>
      <div class="field"><label for="acct-new-pw">New password</label><input id="acct-new-pw" type="password" autocomplete="new-password" /></div>
      <div class="field"><label for="acct-conf-pw">Confirm new password</label><input id="acct-conf-pw" type="password" autocomplete="new-password" /></div>
      ${err}
      <div class="acct-actions"><button class="btn btn-ghost btn-flex" data-action="acct-view" data-view="main">Cancel</button><button class="btn btn-glow btn-flex" data-action="acct-save-password">Change password</button></div>
    </div>`;
  } else if(accountView === "delete"){
    body = head("Delete account") + `
    <div class="modal-body">
      <p class="acct-liked">This permanently deletes your account, cart, orders and saved IDs. It cannot be undone. Enter your password to confirm.</p>
      <div class="field"><label for="acct-del-pw">Password</label><input id="acct-del-pw" type="password" autocomplete="current-password" /></div>
      ${err}
      <div class="acct-actions"><button class="btn btn-ghost btn-flex" data-action="acct-view" data-view="main">Cancel</button><button class="btn btn-danger btn-flex" data-action="acct-delete">Delete my account</button></div>
    </div>`;
  } else {
    const liked = getLikedGames().map(id => { const g = findGame(id); return g ? g.name : null; }).filter(Boolean);
    const remembered = loadRemembered();
    const isRemembered = !!(remembered && remembered.identifier === authUser.identifier);
    const history = loadHistory().filter(h => h.identifier === authUser.identifier).slice(0, 5);
    body = head("My Account") + `
    <div class="modal-body">
      <div>
        <div class="acct-row"><span class="k">Name</span><span>${esc(authUser.name)}</span></div>
        <div class="acct-row"><span class="k">Email / Username</span><span>${esc(authUser.identifier)}</span></div>
        <div class="acct-row"><span class="k">Payment method</span><span>${esc(paymentLabel(account.paymentMethod))}</span></div>
        <div class="acct-row"><span class="k">Orders</span><span>${loadOrders().length} · <button class="link-btn" data-action="open-orders">View my orders</button></span></div>
        <div class="acct-row"><span class="k">Remembered on this device</span>
          <span>${isRemembered ? `Yes · <button class="link-btn" data-action="forget-remembered">Forget</button>` : "No"}</span></div>
      </div>
      ${account.role === "admin" ? "" : `<div>
        <div class="acct-title">Games you like <button class="link-btn" data-action="edit-liked">Change</button></div>
        <p class="acct-liked">${liked.length ? liked.map(esc).join(", ") : "None selected yet."}</p>
      </div>`}
      <div>
        <div class="acct-title">Recent logins</div>
        ${history.length
          ? history.map(h => `<div class="hist-item"><span>${formatWhen(h.at)}</span><span>${h.remembered ? "Remembered" : "Not remembered"}</span></div>`).join("")
          : `<p class="acct-liked">No login history yet.</p>`}
      </div>
      <div>
        <div class="acct-title">Color theme</div>
        <div class="swatches">${ACCENTS.map(a => `<button class="swatch ${activeAccent() === a.id ? "on" : ""}" data-action="set-accent" data-accent="${a.id}" aria-label="${a.label} color theme" aria-pressed="${activeAccent() === a.id}" title="${a.label}" style="background:linear-gradient(135deg, ${a.colors[0]}, ${a.colors[1]})"></button>`).join("")}</div>
        <p class="field-note">${esc((ACCENTS.find(a => a.id === activeAccent()) || ACCENTS[0]).label)}${localStorage.getItem(ACCENT_KEY) ? ` · <button class="link-btn" data-action="set-accent" data-accent="default">Use the site color</button>` : " (site color)"}</p>
      </div>
      <div class="acct-links">
        <button class="link-btn" data-action="acct-view" data-view="profile">Edit profile</button>
        <button class="link-btn" data-action="acct-view" data-view="password">Change password</button>
        <button class="link-btn danger" data-action="acct-view" data-view="delete">Delete account</button>
      </div>
      ${account.role === "admin" ? `<button class="btn btn-glow btn-block" data-action="open-admin">Open admin page</button>` : ""}
      <button class="btn btn-ghost btn-block" data-action="logout">Log Out</button>
    </div>`;
  }
  document.getElementById("account-modal").innerHTML = body;
}

/* ============================== SAVED CART + ORDER HISTORY (per account, this device) ============================== */
function cartKey(){ return authUser ? `owt_demo_cart_${authUser.identifier}` : null; }
function ordersKey(){ return authUser ? `owt_demo_orders_${authUser.identifier}` : null; }

function saveCart(){
  const key = cartKey();
  if(!key) return;
  writeJson(localStorage, key, {
    promo: state.promo,
    items: state.cart.map(it => ({ key:it.key, productId:it.product.id, qty:it.qty, playerId:it.playerId, serverId:it.serverId })),
  });
}
/* load the signed-in account's saved cart (or an empty cart when nobody is signed in) */
function syncCartWithAccount(){
  const saved = authUser ? readJson(localStorage, cartKey()) : null;
  const items = Array.isArray(saved) ? saved : (saved && Array.isArray(saved.items) ? saved.items : []);   // older saves were a plain list
  state.cart = items.map(s => { const product = findProduct(s.productId); return product ? { key:s.key, product, qty:s.qty, playerId:s.playerId, serverId:s.serverId } : null; }).filter(Boolean);
  state.promo = saved && !Array.isArray(saved) ? (saved.promo || null) : null;
  state.promoError = "";
  renderCartBadge();
  renderCartDrawer();
}

function loadOrders(){
  const list = authUser ? readJson(localStorage, ordersKey()) : null;
  return Array.isArray(list) ? list : [];
}
function saveOrder(order){
  const orders = loadOrders();
  orders.unshift({
    number: order.number, at: new Date().toISOString(), method: order.method, status: null,
    subtotal: order.subtotal, discount: order.discount, promo: order.promo, fee: order.fee, total: order.total,
    reference: order.reference, payer: order.payer,
    items: order.items.map(it => ({ productId:it.product.id, gameName:it.product.gameName, amount:it.product.amount, currency:it.product.currency, bonus:it.product.bonus || 0, qty:it.qty, price:it.product.price, playerId:it.playerId, serverId:it.serverId })),
  });
  writeJson(localStorage, ordersKey(), orders.slice(0, 50));
}
function updateOrder(number, patch){
  const orders = loadOrders();
  const found = orders.find(o => o.number === number);
  if(!found) return false;
  Object.assign(found, patch);
  writeJson(localStorage, ordersKey(), orders);
  return true;
}
/* Processing for the first 45 seconds, then Delivered, unless it was cancelled (or the administrator set a status) */
function orderStatus(order){
  if(order.status === "cancelled") return { step:0, label:"Cancelled", cancelled:true };
  if(order.status === "delivered") return { step:3, label:"Delivered" };
  const seconds = (Date.now() - new Date(order.at).getTime()) / 1000;
  return seconds < siteSettings().processingSeconds ? { step:2, label:"Processing" } : { step:3, label:"Delivered" };
}
function orderTotals(o){   // older saved orders do not have these fields
  const subtotal = o.subtotal != null ? o.subtotal : o.items.reduce((sum,it) => sum + it.price*it.qty, 0);
  const discount = o.discount || 0;
  const fee = o.fee != null ? o.fee : Math.max(0, o.total - subtotal + discount);
  return { subtotal, discount, fee };
}
function receiptText(o, customerName, customerId){
  const t = orderTotals(o);
  const st = orderStatus(o);
  const line = (a, b) => (a + " ").padEnd(46, ".") + " " + b;
  const rows = [];
  o.items.forEach(it => {
    rows.push(line(`${it.gameName} - ${it.amount} x ${it.qty}`, PESO(it.price*it.qty)));
    rows.push(`   ID: ${it.playerId}${it.serverId ? " / " + it.serverId : ""}`);
    if(it.bonus) rows.push(`   Bonus: +${(it.bonus * it.qty).toLocaleString("en-PH")} ${it.currency || ""}`.trimEnd());
  });
  return [
    "LODEZZ.X - ORDER RECEIPT", "========================",
    `Order number : ${o.number}`,
    `Date         : ${formatWhen(o.at)}`,
    `Customer     : ${customerName} (${customerId})`,
    `Paid with    : ${paymentLabel(o.method)}${o.payer ? " " + o.payer : ""}`,
    o.reference ? `Reference    : ${o.reference}` : null,
    `Status       : ${st.label}`,
    "", ...rows, "",
    line("Subtotal", PESO(t.subtotal)),
    t.discount > 0 ? line(`Promo ${o.promo || ""}`.trim(), "-" + PESO(t.discount)) : null,
    line("Service fee", PESO(t.fee)),
    line("TOTAL", PESO(o.total)),
    "", "Thank you for shopping with Lodezz.x!",
  ].filter(x => x !== null).join("\r\n");
}
function downloadReceipt(number){
  const order = loadOrders().find(o => o.number === number);
  if(!order || !authUser) return;
  const blob = new Blob([receiptText(order, authUser.name, authUser.identifier)], { type:"text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `Lodezz.x-receipt-${order.number}.txt`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
let ordersHighlight = null;
let cancelArmed = null;   // order number waiting for a second click to confirm
function cancelOrder(number){
  if(cancelArmed !== number){
    cancelArmed = number;
    renderOrders();
    setTimeout(() => { if(cancelArmed === number){ cancelArmed = null; renderOrders(); } }, 4000);
    return;
  }
  cancelArmed = null;
  const order = loadOrders().find(o => o.number === number);
  if(order && orderStatus(order).step === 2){
    updateOrder(number, { status:"cancelled", cancelledAt:new Date().toISOString() });
    pushToast(`Order ${number} was cancelled. Your refund is on its way.`);
  } else {
    pushToast("This order can no longer be cancelled.");
  }
  renderOrders();
}
let ordersFilter = { search:"", status:"all" };
function renderOrders(){
  const wrap = document.getElementById("orders-list");
  const tools = document.getElementById("orders-tools");
  const summary = document.getElementById("orders-summary");
  const all = loadOrders();
  tools.hidden = all.length === 0;
  if(!all.length){
    summary.textContent = "";
    wrap.innerHTML = `<div class="empty-state">${ic("packageCheck",28,"var(--sub)")}<p class="title">No orders yet</p><p class="sub">Orders you place will show up here.</p>
      <button class="btn btn-glow btn-sm" style="margin-top:16px;" data-action="goto" data-target="games">Browse Games</button></div>`;
    return;
  }
  const q = ordersFilter.search.trim().toLowerCase();
  const orders = all.filter(o => {
    if(ordersFilter.status !== "all" && orderStatus(o).label.toLowerCase() !== ordersFilter.status) return false;
    if(!q) return true;
    return o.number.toLowerCase().includes(q) || (o.reference || "").toLowerCase().includes(q) ||
      o.items.some(it => `${it.gameName} ${it.amount} ${it.playerId} ${it.serverId || ""}`.toLowerCase().includes(q));
  });
  const spent = all.filter(o => !orderStatus(o).cancelled).reduce((sum, o) => sum + o.total, 0);
  summary.textContent = `${all.length} order${all.length === 1 ? "" : "s"} · ${PESO(spent)} spent (cancelled orders not counted)` + (orders.length !== all.length ? ` · showing ${orders.length}` : "");
  if(!orders.length){
    wrap.innerHTML = `<div class="empty-state"><p class="title">No orders match your search</p><p class="sub">Try a different word or status.</p></div>`;
    return;
  }
  const stepNames = ["Order placed", "Processing", "Delivered"];
  wrap.innerHTML = orders.map(o => {
    const st = orderStatus(o);
    const t = orderTotals(o);
    return `
    <div class="order-card ${o.number === ordersHighlight ? "highlight" : ""}">
      <div class="order-head">
        <div><div class="order-no">${esc(o.number)}</div><div class="order-date">${formatWhen(o.at)} · ${esc(paymentLabel(o.method))}${o.reference ? " · " + esc(o.reference) : ""}</div></div>
        <span class="status-badge ${st.cancelled ? "cancelled" : st.step === 3 ? "done" : "pending"}">${st.label}</span>
      </div>
      ${st.cancelled
        ? `<p class="order-note">This order was cancelled. ${PESO(o.total)} will be refunded to your ${esc(paymentLabel(o.method))}.</p>`
        : `<div class="order-steps">${stepNames.map((name, i) => `<div class="order-step ${i + 1 <= st.step ? "on" : ""}"><span></span>${name}</div>`).join("")}</div>`}
      <div class="order-items">${o.items.map(it => `
        <div class="order-item"><span>${esc(it.gameName)} · ${esc(it.amount)} × ${it.qty}</span><span>${PESO(it.price * it.qty)}</span></div>
        ${it.bonus ? `<div class="bonus-line">${esc(bonusText(it.bonus * it.qty, it.currency || ""))}</div>` : ""}
        <div class="order-id">${esc(it.playerId)}${it.serverId ? ` · ${esc(it.serverId)}` : ""}</div>`).join("")}</div>
      ${t.discount > 0 ? `<div class="order-item"><span>Promo ${esc(o.promo || "")}</span><span>-${PESO(t.discount)}</span></div>` : ""}
      <div class="order-total"><span>${st.cancelled ? "Total" : "Total paid"}</span><span>${PESO(o.total)}</span></div>
      <div class="order-actions">
        <button class="btn btn-ghost btn-sm" data-action="reorder" data-number="${esc(o.number)}">Buy again</button>
        <button class="btn btn-ghost btn-sm" data-action="download-receipt" data-number="${esc(o.number)}">Download receipt</button>
        ${st.step === 2 ? `<button class="btn btn-ghost btn-sm cancel-btn ${cancelArmed === o.number ? "armed" : ""}" data-action="cancel-order" data-number="${esc(o.number)}">${cancelArmed === o.number ? "Click again to confirm" : "Cancel order"}</button>` : ""}
      </div>
    </div>`;
  }).join("");
}
/* put the same items from an earlier order back in the cart */
function reorder(number){
  const order = loadOrders().find(o => o.number === number);
  if(!order) return;
  let added = 0, skipped = 0;
  order.items.forEach((it, i) => {
    const product = ALL_PRODUCTS.find(p => it.productId ? p.id === it.productId : (p.gameName === it.gameName && p.amount === it.amount));
    if(!product || product.stock === "out"){ skipped++; return; }
    const serverId = it.serverId || "";
    const existing = state.cart.find(c => c.product.id === product.id && c.playerId === it.playerId && c.serverId === serverId);
    if(existing) existing.qty = Math.min(10, existing.qty + it.qty);
    else state.cart.push({ key:`${product.id}-${it.playerId}-${serverId}-${Date.now()}${i}`, product, qty:it.qty, playerId:it.playerId, serverId });
    added++;
  });
  saveCart(); renderCartBadge();
  if(added){ pushToast(`${added} item${added === 1 ? "" : "s"} added to your cart`, "cart"); openCartDrawer(); }
  if(skipped) pushToast(`${skipped} item${skipped === 1 ? " is" : "s are"} not available right now.`);
}
/* keep an open "My Orders" page up to date while an order is still processing */
setInterval(() => {
  const page = document.querySelector('.page[data-page="orders"]');
  if(page && !page.hidden && loadOrders().some(o => orderStatus(o).step === 2)) renderOrders();
}, 5000);

/* ============================== THEME (dark is the default, light is optional) ============================== */
const THEME_KEY = "owt_theme";
function currentTheme(){ return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark"; }
function applyTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  const toLight = theme === "dark";   // the button offers the other mode
  const btn = document.getElementById("theme-btn");
  if(btn){ btn.innerHTML = ic(toLight ? "sun" : "moon", 17, "var(--sub)"); btn.setAttribute("aria-label", toLight ? "Switch to light mode" : "Switch to dark mode"); }
  const link = document.getElementById("theme-link-mobile");
  if(link) link.textContent = toLight ? "Switch to light mode" : "Switch to dark mode";
  const meta = document.querySelector('meta[name="theme-color"]');
  if(meta) meta.setAttribute("content", theme === "light" ? "#F4F6FB" : "#050509");
}
function toggleTheme(){
  const next = currentTheme() === "light" ? "dark" : "light";
  try{ localStorage.setItem(THEME_KEY, next); } catch(e){}
  applyTheme(next);
}

/* ============================== PAGE ROUTING (every page has its own address, like #/faq) ============================== */
const PAGE_MAP = { home:"home", games:"games", shop:"games", how:"how", faq:"faq", support:"support", terms:"legal", privacy:"legal", refund:"legal" };
const PUBLIC_TARGETS = ["login", "terms", "privacy", "refund"];   // can be opened without signing in
const KNOWN_TARGETS = ["home","games","shop","how","faq","support","orders","prefs","login","terms","privacy","refund","admin"];
const ROUTE_TITLES = { home:"Home", games:"Games", shop:"Shop", how:"How It Works", faq:"FAQ", support:"Support", orders:"My Orders", preferences:"Your Games", login:"Log In", terms:"Terms & Conditions", privacy:"Privacy Policy", refund:"Refund Policy", admin:"Admin" };
let currentRoute = "", previousRoute = "";

function setActivePage(pageName){
  document.querySelectorAll(".page").forEach(el => { el.hidden = el.dataset.page !== pageName; });
  document.querySelectorAll(".nav-links button, .mobile-menu button.link").forEach(btn => {
    const resolved = PAGE_MAP[btn.dataset.target] || btn.dataset.target;
    btn.classList.toggle("active", resolved === pageName);
  });
  window.scrollTo({ top:0, behavior:"auto" });
}
/* write the page address (#/faq) and the tab title; "replace" does not add a Back-button step */
function commitRoute(route, replace){
  if(route !== currentRoute) previousRoute = currentRoute;
  currentRoute = route;
  const hash = "#/" + route;
  if(location.hash !== hash){
    try{ if(replace) history.replaceState(null, "", hash); else history.pushState(null, "", hash); }
    catch(e){ location.hash = hash; }
  }
  document.title = (ROUTE_TITLES[route] ? ROUTE_TITLES[route] + " | " : "") + "Lodezz.x";
}
function routeFromLocation(){
  return (location.hash.replace(/^#\/?/, "").split(/[/?]/)[0] || "").toLowerCase();
}
function goTo(target, opts = {}){
  let replace = !!(opts.replace || opts.fromHistory);
  const closeMenu = () => document.getElementById("mobile-menu").classList.remove("open");
  if(target === "preferences") target = "prefs";
  if(!KNOWN_TARGETS.includes(target)){ target = authUser ? "home" : "login"; replace = true; }
  // not signed in: only the login page and the policy pages can be opened
  if(!authUser && !PUBLIC_TARGETS.includes(target)){ target = "login"; replace = true; }
  if(authUser && target === "login"){ target = "home"; replace = true; }
  if(target === "admin" && !(authUser && isAdmin())){
    if(authUser) pushToast("You do not have access to that page.");
    target = authUser ? "home" : "login"; replace = true;
  }
  // before browsing the website, a customer must tick the games they like
  if(authUser && !isAdmin() && getLikedGames().length === 0 && !PUBLIC_TARGETS.includes(target)){
    if(document.querySelector('.page[data-page="prefs"]').hidden) openPrefs(false, replace);
    closeMenu();
    return;
  }
  if(target === "prefs"){ openPrefs(getLikedGames().length > 0, replace); return; }
  const page = PAGE_MAP[target] || target;
  setActivePage(page);
  commitRoute(target, replace);
  if(target === "orders") renderOrders(); else ordersHighlight = null;
  if(page === "legal") renderLegal(target);
  if(target === "admin" && typeof renderAdmin === "function") renderAdmin();
  closeMenu();
  if(target === "shop"){
    setTimeout(() => document.getElementById("shop")?.scrollIntoView({behavior:"smooth"}), 60);
  }
}
window.addEventListener("popstate", () => {
  goTo(routeFromLocation() || (authUser ? "home" : "login"), { fromHistory:true });
});

function renderLegal(key){
  const doc = LEGAL_PAGES[key];
  if(!doc) return;
  const others = ["terms","privacy","refund"].filter(k => k !== key);
  document.getElementById("legal-content").innerHTML = `
    <button class="link-btn back-link" data-action="legal-back">← Back</button>
    <h2 class="legal-title">${doc.title}</h2>
    <p class="legal-updated">Last updated: ${doc.updated}</p>
    <p class="legal-intro">${doc.intro}</p>
    ${doc.sections.map(sec => `<h3>${sec.h}</h3>${sec.p.map(p => `<p>${p}</p>`).join("")}`).join("")}
    <p class="legal-more">Also see: ${others.map(k => `<button class="link-btn" data-action="goto" data-target="${k}">${LEGAL_PAGES[k].title}</button>`).join(" · ")}</p>`;
}
function renderFooterGames(){
  document.getElementById("footer-games").innerHTML =
    `<li><button class="footer-link" data-action="goto" data-target="games">All Games</button></li>` +
    GAMES.map(g => `<li><button class="footer-link" data-action="view-game" data-game="${g.id}">${g.name}</button></li>`).join("");
}

/* ============================== DIALOGS: Esc closes, Tab stays inside, focus goes back ============================== */
let focusReturn = null;
function focusDialog(id){
  focusReturn = document.activeElement;
  const d = document.getElementById(id);
  if(!d) return;
  d.setAttribute("tabindex", "-1");
  setTimeout(() => {
    const first = d.querySelector("input:not([type=hidden]), select, textarea") || d.querySelector("button, [href]");
    (first || d).focus();
  }, 0);
}
function restoreFocus(){
  if(focusReturn && document.contains(focusReturn)){ try{ focusReturn.focus(); } catch(e){} }
  focusReturn = null;
}
/* the dialog that is on top right now, if any */
function topDialog(){
  const open = id => { const el = document.getElementById(id); return el && !el.classList.contains("hidden"); };
  if(open("checkout-overlay")) return { id:"checkout-modal", close:() => { if(state.checkout && state.checkout.step < 3) closeCheckout(); } };
  if(open("account-overlay")) return { id:"account-modal", close:closeAccount };
  if(open("detail-overlay")) return { id:"detail-modal", close:closeDetail };
  if(document.getElementById("cart-overlay").classList.contains("open")) return { id:"cart-drawer", close:closeCartDrawer };
  return null;
}
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape"){
    const top = topDialog();
    const menu = document.getElementById("mobile-menu");
    if(top){ top.close(); e.preventDefault(); }
    else if(menu.classList.contains("open")){ menu.classList.remove("open"); }
    return;
  }
  if(e.key === "Tab"){
    const top = topDialog();
    if(!top) return;
    const d = document.getElementById(top.id);
    const items = [...d.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]):not([type=hidden]), select:not([disabled]), textarea:not([disabled])")]
      .filter(el => el.getClientRects().length > 0);
    if(!items.length){ e.preventDefault(); return; }
    const first = items[0], last = items[items.length - 1];
    if(!d.contains(document.activeElement)){ e.preventDefault(); first.focus(); }
    else if(e.shiftKey && (document.activeElement === first || document.activeElement === d)){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }
});

/* ============================== EVENT DELEGATION ============================== */
document.addEventListener("click", (e) => {
  if(e.target.id === "detail-overlay"){ closeDetail(); return; }
  if(e.target.id === "account-overlay"){ closeAccount(); return; }
  const t = e.target.closest("[data-action]");
  if(!t) return;
  const action = t.dataset.action;

  if(action==="goto"){
    goTo(t.dataset.target || "home");
  }
  else if(action==="toggle-mobile"){
    document.getElementById("mobile-menu").classList.toggle("open");
  }
  else if(action==="focus-search"){
    goTo("shop");
    setTimeout(() => document.getElementById("search-input").focus(), 350);
  }
  else if(action==="open-cart"){ openCartDrawer(); }
  else if(action==="close-cart"){ closeCartDrawer(); }
  else if(action==="go-checkout"){ closeCartDrawer(); openCheckout(); }
  else if(action==="view-game"){
    state.gameFilter = t.dataset.game;
    renderFilterRows(); renderProductGrid();
    goTo("shop");
  }
  else if(action==="filter-game"){ state.gameFilter = t.dataset.val; renderFilterRows(); renderProductGrid(); }
  else if(action==="filter-price"){ state.priceFilter = t.dataset.val; renderFilterRows(); renderProductGrid(); }
  else if(action==="open-detail"){ openDetail(findProduct(t.dataset.product), "cart"); }
  else if(action==="add-cart"){
    const btnEl = t; const original = btnEl.textContent;
    btnEl.classList.add("added"); btnEl.textContent = "Added ✓";
    setTimeout(() => { btnEl.classList.remove("added"); btnEl.textContent = original; }, 600);
    openDetail(findProduct(t.dataset.product), "cart");
  }
  else if(action==="buy-now"){ openDetail(findProduct(t.dataset.product), "buy"); }
  else if(action==="close-detail"){ closeDetail(); }
  else if(action==="detail-qty"){ updateDetailQty(parseInt(t.dataset.delta,10)); }
  else if(action==="confirm-detail"){ confirmDetail(); }
  else if(action==="remove-item"){ removeCartItem(t.dataset.key); }
  else if(action==="cart-qty"){ updateCartQty(t.dataset.key, parseInt(t.dataset.delta,10)); }
  else if(action==="toggle-faq"){
    const idx = parseInt(t.dataset.idx,10);
    faqOpen = faqOpen===idx ? -1 : idx;
    renderFaq();
  }
  else if(action==="toggle-password"){ togglePasswordField(t.dataset.target, t); }
  else if(action==="auth-toggle-mode"){ authMode = authMode==="login" ? "register" : "login"; renderAuthMode(); }
  else if(action==="auth-submit"){ handleAuthSubmit(); }
  else if(action==="forgot-password"){ pushToast("To reset your password, please contact the site administrator for assistance."); }
  else if(action==="logout"){ logout(); }
  else if(action==="open-account"){ openAccount(); }
  else if(action==="close-account"){ closeAccount(); }
  else if(action==="edit-liked"){ closeAccount(); openPrefs(true); }
  else if(action==="forget-remembered"){ clearRemembered(); renderAccountModal(); pushToast("This account will no longer be remembered."); }
  else if(action==="prefs-save"){ savePrefs(); }
  else if(action==="prefs-cancel"){ goTo("home"); }
  else if(action==="prefs-all"){ prefsDraft = new Set(GAMES.map(g=>g.id)); renderPrefsGrid(); setFieldError("err-prefs",""); }
  else if(action==="prefs-none"){ prefsDraft = new Set(); renderPrefsGrid(); }
  else if(action==="close-checkout"){ closeCheckout(); }
  else if(action==="checkout-next"){ state.checkout.step = 2; renderCheckout(); }
  else if(action==="checkout-back"){ state.checkout.step = Math.max(1,state.checkout.step-1); renderCheckout(); }
  else if(action==="select-payment"){ state.checkout.method = t.dataset.method; renderCheckout(); }
  else if(action==="confirm-payment"){ confirmPayment(); }
  else if(action==="checkout-done"){ checkoutDone(false); }
  else if(action==="checkout-track"){ checkoutDone(true); }
  else if(action==="open-orders"){ closeAccount(); goTo("orders"); }
  else if(action==="toggle-theme"){ toggleTheme(); }
  else if(action==="set-accent"){ setAccent(t.dataset.accent); }
  else if(action==="dismiss-announcement"){ try{ sessionStorage.setItem("owt_ann_dismissed", siteSettings().announcement.text); } catch(e){} renderAnnouncement(); }
  else if(action==="reorder"){ reorder(t.dataset.number); }
  else if(action==="legal-back"){
    const dest = previousRoute && !["terms","privacy","refund"].includes(previousRoute) ? previousRoute : (authUser ? "home" : "login");
    goTo(dest);
  }
  else if(action==="clear-search"){
    state.search = ""; const box = document.getElementById("search-input"); box.value = "";
    document.getElementById("search-clear").hidden = true; renderProductGrid(); box.focus();
  }
  else if(action==="open-admin"){ closeAccount(); goTo("admin"); }
  else if(action==="acct-view"){ setAccountView(t.dataset.view); }
  else if(action==="acct-save-profile"){ saveProfile(); }
  else if(action==="acct-save-password"){ changePassword(); }
  else if(action==="acct-delete"){ deleteAccount(); }
  else if(action==="apply-promo"){ applyPromo(document.getElementById("promo-input").value); }
  else if(action==="remove-promo"){ removePromo(); }
  else if(action==="cancel-order"){ cancelOrder(t.dataset.number); }
  else if(action==="download-receipt"){ downloadReceipt(t.dataset.number); }
});

document.getElementById("search-input").addEventListener("input", (e) => {
  state.search = e.target.value;
  document.getElementById("search-clear").hidden = !e.target.value;
  renderProductGrid();
});
document.getElementById("orders-search").addEventListener("input", (e) => { ordersFilter.search = e.target.value; renderOrders(); });
document.getElementById("orders-status").addEventListener("change", (e) => { ordersFilter.status = e.target.value; renderOrders(); });
document.getElementById("sort-select").addEventListener("change", (e) => {
  state.sortBy = e.target.value;
  renderProductGrid();
});
document.addEventListener("change", (e) => {
  if(e.target.classList && e.target.classList.contains("pref-check")){
    const id = e.target.dataset.game;
    if(e.target.checked) prefsDraft.add(id); else prefsDraft.delete(id);
    e.target.closest(".pref-card").classList.toggle("checked", e.target.checked);
    updatePrefsCount();
    if(prefsDraft.size) setFieldError("err-prefs", "");
  }
});
document.addEventListener("input", (e) => {
  if(e.target.id === "pay-mobile" && state.checkout){ state.checkout.mobile = e.target.value; }
});
document.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    const a = document.activeElement;
    if(a && a.id === "promo-input"){ e.preventDefault(); applyPromo(a.value); return; }
    if(a && ["auth-identifier","auth-password","auth-name","auth-confirm"].includes(a.id)){
      e.preventDefault();
      handleAuthSubmit();
    }
  }
});

window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY>12);
});

/* ============================== INIT ============================== */
function init(){
  renderBrandMarks();
  renderNavIcons();
  renderTrust();
  renderHeroVisual();
  renderGameGrid();
  renderFilterRows();
  renderProductGrid();
  renderSteps();
  renderFeatures();
  renderFaq();
  renderCartBadge();
  updateCountdowns();
  renderFooterGames();
  applyTheme(currentTheme());
  document.getElementById("search-suggestions").innerHTML =
    [...new Set([...GAMES.map(g => g.name), ...GAMES.map(g => g.currency)])].sort().map(n => `<option value="${n}"></option>`).join("");

  applyAdminSettings();   // prices / stock set by the administrator
  applyAccent();
  renderAnnouncement();
  renderPromoLine();
  saleWasActive = saleActive();
  authUser = loadSession();
  if(authUser && (!getAccount() || getAccount().suspended)){ clearSession(); authUser = null; }   // saved session points to an account that no longer exists
  document.querySelectorAll(".toggle-pw").forEach(btn => { btn.innerHTML = ic("eye", 16, "var(--sub)"); });
  fillPaymentSelect();
  renderAuthMode();
  updateAuthUI();
  renderGameGrid(); renderProductGrid();
  goTo(routeFromLocation() || (authUser ? "home" : "login"), { replace:true });
}
document.addEventListener("DOMContentLoaded", init);
