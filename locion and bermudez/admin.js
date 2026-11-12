/* =====================================================================
   Lodezz.x — Admin page
   Only accounts with the "admin" role can open it (the page is #/admin).
   Everything here uses the helpers from script.js (orders, accounts, prices).
   ===================================================================== */
let adminTab = "dashboard";
let adminGame = "";
let adminOrderFilter = { status:"all", search:"" };
let adminCustomerSearch = "";
let adminNotice = "";          // e.g. a temporary password shown once
let adminResetArmed = false;   // "Reset all changes" asks for a second click

const ADMIN_TABS = [
  { id:"dashboard", label:"Dashboard" },
  { id:"orders",    label:"Orders" },
  { id:"customers", label:"Customers" },
  { id:"products",  label:"Packages" },
  { id:"promos",    label:"Promos & sale" },
  { id:"site",      label:"Site" },
  { id:"activity",  label:"Activity" },
];

/* ---------- data helpers ---------- */
function adminAllOrders(){
  const accounts = loadAccounts();
  const out = [];
  for(let i = 0; i < localStorage.length; i++){
    const key = localStorage.key(i);
    if(key && key.startsWith("owt_demo_orders_")){
      const id = key.slice("owt_demo_orders_".length);
      const list = readJson(localStorage, key);
      if(Array.isArray(list)) list.forEach(o => out.push({ o, id, name: accounts[id] ? accounts[id].name : id }));
    }
  }
  return out.sort((a, b) => new Date(b.o.at) - new Date(a.o.at));
}
function adminPatchOrder(identifier, number, patch){
  const key = `owt_demo_orders_${identifier}`;
  const list = readJson(localStorage, key);
  if(!Array.isArray(list)) return false;
  const found = list.find(o => o.number === number);
  if(!found) return false;
  Object.assign(found, patch);
  writeJson(localStorage, key, list);
  return true;
}
/* every admin action is written to the Activity tab */
function adminLog(text){
  const s = loadAdminSettings();
  s.log = s.log || [];
  s.log.unshift({ at:new Date().toISOString(), who: authUser ? authUser.name : "Admin", text });
  s.log = s.log.slice(0, 200);
  saveAdminSettings(s);
}
/* after a change: rebuild the product list and redraw everything that shows prices, colors or messages */
function adminRefreshShop(){
  applyAdminSettings();
  applyAccent();
  syncCartWithAccount();
  renderGameGrid(); renderProductGrid(); renderPromoLine(); renderAnnouncement(); updateCountdowns();
}

function renderAdmin(){
  const root = document.getElementById("admin-root");
  if(!root) return;
  root.innerHTML = `
    <div class="section-head">
      <h2>Admin</h2>
      <p>Manage orders, customers, packages, promo codes and the look of Lodezz.x.</p>
    </div>
    <div class="admin-tabs" role="tablist">
      ${ADMIN_TABS.map(t => `<button role="tab" aria-selected="${adminTab === t.id}" class="admin-tab ${adminTab === t.id ? "active" : ""}" data-ad="tab" data-tab="${t.id}">${t.label}</button>`).join("")}
    </div>
    <div id="admin-body"></div>`;
  renderAdminBody();
}
function renderAdminBody(){
  const body = document.getElementById("admin-body");
  if(!body) return;
  const views = { dashboard:adminDashboardHtml, orders:adminOrdersHtml, customers:adminCustomersHtml, products:adminProductsHtml,
                  promos:() => adminPromosHtml() + adminSaleHtml(), site:adminSiteHtml, activity:adminActivityHtml };
  body.innerHTML = (views[adminTab] || adminDashboardHtml)();
}

/* ---------- Dashboard ---------- */
function adminDashboardHtml(){
  const rows = adminAllOrders().map(r => ({ ...r, st: orderStatus(r.o) }));
  const live = rows.filter(r => !r.st.cancelled);
  const sum = list => list.reduce((t, r) => t + r.o.total, 0);
  const startToday = new Date(); startToday.setHours(0,0,0,0);
  const days = [];
  for(let i = 6; i >= 0; i--){
    const d0 = new Date(startToday); d0.setDate(d0.getDate() - i);
    const d1 = new Date(d0); d1.setDate(d1.getDate() + 1);
    const inDay = live.filter(r => { const t = new Date(r.o.at); return t >= d0 && t < d1; });
    days.push({ label: d0.toLocaleDateString("en-PH", { weekday:"short" }), total: sum(inDay), count: inDay.length });
  }
  const maxDay = Math.max(1, ...days.map(d => d.total));
  const today = days[6];
  const weekTotal = days.reduce((t, d) => t + d.total, 0);

  // sales by game and top packages (from items in orders that were not cancelled)
  const byGame = {}, byPkg = {};
  live.forEach(r => r.o.items.forEach(it => {
    byGame[it.gameName] = (byGame[it.gameName] || 0) + it.price * it.qty;
    const k = `${it.gameName} · ${it.amount}`;
    byPkg[k] = (byPkg[k] || 0) + it.qty;
  }));
  const gameRows = Object.entries(byGame).sort((a, b) => b[1] - a[1]);
  const maxGame = Math.max(1, ...gameRows.map(g => g[1]));
  const topPkgs = Object.entries(byPkg).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const accounts = loadAccounts();
  const customers = Object.values(accounts).filter(a => a.role !== "admin");
  const stockIssues = [];
  GAMES.forEach(g => g.packages.forEach(p => { if(!p.hidden && (p.stock === "low" || p.stock === "out")) stockIssues.push({ g, p }); }));
  const hidden = GAMES.reduce((n, g) => n + g.packages.filter(p => p.hidden).length, 0);

  return `
    <div class="admin-stats">
      <div class="stat"><span>Sales today</span><strong>${PESO(today.total)}</strong></div>
      <div class="stat"><span>Last 7 days</span><strong>${PESO(weekTotal)}</strong></div>
      <div class="stat"><span>All-time sales</span><strong>${PESO(sum(live))}</strong></div>
      <div class="stat"><span>Orders</span><strong>${rows.length}</strong></div>
      <div class="stat"><span>Processing now</span><strong>${rows.filter(r => r.st.step === 2).length}</strong></div>
      <div class="stat"><span>Customers</span><strong>${customers.length}</strong></div>
    </div>
    <div class="admin-grid">
      <section class="admin-card">
        <h4>Sales, last 7 days</h4>
        <div class="bars">${days.map(d => `
          <div class="bar-col"><span class="bar-val">${d.total ? PESO(d.total) : ""}</span>
            <div class="bar-area"><div class="bar" style="height:${Math.round(d.total / maxDay * 100)}%"></div></div>
            <span class="bar-label">${d.label}</span></div>`).join("")}</div>
      </section>
      <section class="admin-card">
        <h4>Sales by game</h4>
        ${gameRows.length ? gameRows.map(([name, total]) => {
          const g = GAMES.find(x => x.name === name);
          return `<div class="hbar"><span class="hbar-label">${esc(name)}</span><div class="hbar-track"><div class="hbar-fill" style="width:${Math.round(total / maxGame * 100)}%; background:${g ? GAME_COLORS[g.id] : "var(--eblue)"}"></div></div><span class="hbar-val">${PESO(total)}</span></div>`;
        }).join("") : `<p class="muted">No sales yet.</p>`}
      </section>
      <section class="admin-card">
        <h4>Top packages</h4>
        ${topPkgs.length ? `<ol class="top-list">${topPkgs.map(([k, q]) => `<li><span>${esc(k)}</span><strong>${q} sold</strong></li>`).join("")}</ol>` : `<p class="muted">Nothing sold yet.</p>`}
      </section>
      <section class="admin-card">
        <h4>Needs attention</h4>
        <ul class="attention">
          <li>${rows.filter(r => r.st.step === 2).length} order(s) still processing</li>
          <li>${customers.filter(a => a.suspended).length} suspended customer(s)</li>
          <li>${hidden} hidden package(s)</li>
          ${stockIssues.length ? stockIssues.slice(0, 6).map(x => `<li><span class="stock-row ${x.p.stock}"><span class="stock-dot"></span>${x.p.stock === "out" ? "Sold out" : "Low stock"}</span> ${esc(x.g.name)} · ${esc(x.p.amount)}</li>`).join("") : `<li>All packages are in stock</li>`}
        </ul>
      </section>
    </div>`;
}

/* ---------- Orders ---------- */
function adminOrdersHtml(){
  const rows = adminAllOrders().map(r => ({ ...r, st: orderStatus(r.o) }));
  const count = label => rows.filter(r => r.st.label === label).length;
  const revenue = rows.filter(r => !r.st.cancelled).reduce((sum, r) => sum + r.o.total, 0);
  const f = adminOrderFilter;
  const q = f.search.trim().toLowerCase();
  const shown = rows.filter(r =>
    (f.status === "all" || r.st.label.toLowerCase() === f.status) &&
    (!q || r.o.number.toLowerCase().includes(q) || r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)));
  return `
    <div class="admin-stats">
      <div class="stat"><span>Orders</span><strong>${rows.length}</strong></div>
      <div class="stat"><span>Processing</span><strong>${count("Processing")}</strong></div>
      <div class="stat"><span>Delivered</span><strong>${count("Delivered")}</strong></div>
      <div class="stat"><span>Cancelled</span><strong>${count("Cancelled")}</strong></div>
      <div class="stat"><span>Sales (not cancelled)</span><strong>${PESO(revenue)}</strong></div>
    </div>
    <div class="admin-filters">
      <input id="admin-order-search" type="text" placeholder="Search by order number or customer" aria-label="Search orders" value="${esc(f.search)}" />
      <select id="admin-order-status" aria-label="Filter by status">
        ${["all","processing","delivered","cancelled"].map(v => `<option value="${v}" ${f.status === v ? "selected" : ""}>${v === "all" ? "All statuses" : v[0].toUpperCase() + v.slice(1)}</option>`).join("")}
      </select>
      <button class="btn btn-ghost btn-sm" data-ad="refresh">Refresh</button>
      <button class="btn btn-ghost btn-sm" data-ad="export-csv">Export CSV</button>
    </div>
    ${shown.length ? `<div class="admin-table-wrap"><table class="admin-table">
      <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>${shown.map(r => `
        <tr>
          <td><strong class="mono">${esc(r.o.number)}</strong><br><span class="muted">${formatWhen(r.o.at)}</span></td>
          <td>${esc(r.name)}<br><span class="muted">${esc(r.id)}</span></td>
          <td>${r.o.items.map(it => `${esc(it.gameName)} · ${esc(it.amount)} × ${it.qty}${it.bonus ? ` <span class="bonus-line">(${esc(bonusText(it.bonus * it.qty, it.currency || ""))})</span>` : ""}<br><span class="muted">${esc(it.playerId)}${it.serverId ? " · " + esc(it.serverId) : ""}</span>`).join("<br>")}</td>
          <td>${PESO(r.o.total)}<br><span class="muted">${esc(paymentLabel(r.o.method))}</span></td>
          <td><span class="status-badge ${r.st.cancelled ? "cancelled" : r.st.step === 3 ? "done" : "pending"}">${r.st.label}</span></td>
          <td class="admin-actions">${r.st.step === 2
            ? `<button class="btn btn-ghost btn-sm" data-ad="deliver" data-id="${esc(r.id)}" data-number="${esc(r.o.number)}">Mark delivered</button>
               <button class="btn btn-ghost btn-sm" data-ad="cancel" data-id="${esc(r.id)}" data-number="${esc(r.o.number)}">Cancel</button>`
            : `<span class="muted">—</span>`}</td>
        </tr>`).join("")}</tbody></table></div>`
      : `<div class="empty-state"><p class="title">No orders to show</p><p class="sub">Orders placed by customers on this device appear here.</p></div>`}`;
}
function adminExportCsv(){
  const q = v => `"${String(v == null ? "" : v).replace(/"/g, '""')}"`;
  const lines = [["Order","Date","Customer","Account","Items","Subtotal","Discount","Promo","Service fee","Total","Payment","Reference","Status"].map(q).join(",")];
  adminAllOrders().forEach(r => {
    const t = orderTotals(r.o);
    const items = r.o.items.map(it => `${it.gameName} ${it.amount} x${it.qty}${it.bonus ? ` (+${it.bonus * it.qty} bonus)` : ""} [${it.playerId}${it.serverId ? "/" + it.serverId : ""}]`).join("; ");
    lines.push([r.o.number, r.o.at, r.name, r.id, items, t.subtotal, t.discount, r.o.promo || "", t.fee, r.o.total, paymentLabel(r.o.method), r.o.reference || "", orderStatus(r.o).label].map(q).join(","));
  });
  const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type:"text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `lodezz-orders-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  adminLog("Exported orders to CSV");
}

/* ---------- Customers ---------- */
function adminCustomerRows(){
  const accounts = loadAccounts(), orders = adminAllOrders(), history = loadHistory();
  return Object.entries(accounts).filter(([id, a]) => a.role !== "admin").map(([id, a]) => {
    const mine = orders.filter(r => r.id === id);
    const live = mine.filter(r => !orderStatus(r.o).cancelled);
    const last = history.find(h => h.identifier === id);
    return { id, name:a.name, method:a.paymentMethod, orders:mine.length, spent:live.reduce((t, r) => t + r.o.total, 0), last: last ? last.at : null, suspended:!!a.suspended };
  }).sort((a, b) => b.spent - a.spent);
}
function adminCustomersHtml(){
  const q = adminCustomerSearch.trim().toLowerCase();
  const rows = adminCustomerRows().filter(c => !q || c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q));
  return `
    ${adminNotice ? `<div class="admin-info" role="status">${adminNotice}</div>` : ""}
    <div class="admin-filters">
      <input id="admin-cust-search" type="text" placeholder="Search customers by name or email/username" aria-label="Search customers" value="${esc(adminCustomerSearch)}" />
    </div>
    ${rows.length ? `<div class="admin-table-wrap"><table class="admin-table">
      <thead><tr><th>Customer</th><th>Payment</th><th>Orders</th><th>Spent</th><th>Last login</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>${rows.map(c => `
        <tr>
          <td>${esc(c.name)}<br><span class="muted">${esc(c.id)}</span></td>
          <td>${esc(paymentLabel(c.method))}</td>
          <td>${c.orders}</td>
          <td>${PESO(c.spent)}</td>
          <td>${c.last ? formatWhen(c.last) : '<span class="muted">Never</span>'}</td>
          <td><span class="status-badge ${c.suspended ? "cancelled" : "done"}">${c.suspended ? "Suspended" : "Active"}</span></td>
          <td class="admin-actions">
            <button class="btn btn-ghost btn-sm" data-ad="view-orders" data-id="${esc(c.id)}">View orders</button>
            <button class="btn btn-ghost btn-sm" data-ad="toggle-suspend" data-id="${esc(c.id)}">${c.suspended ? "Unsuspend" : "Suspend"}</button>
            <button class="btn btn-ghost btn-sm" data-ad="reset-password" data-id="${esc(c.id)}">Reset password</button>
          </td>
        </tr>`).join("")}</tbody></table></div>`
      : `<div class="empty-state"><p class="title">No customers found</p><p class="sub">Customers who create an account appear here.</p></div>`}`;
}

/* ---------- Packages ---------- */
function adminProductsHtml(){
  if(!adminGame) adminGame = GAMES[0].id;
  const game = findGame(adminGame);
  const settings = loadAdminSettings();
  const edits = settings.products || {};
  const toLocalInput = ms => { const d = new Date(ms); const p = n => String(n).padStart(2, "0"); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`; };
  return `
    <div class="admin-filters">
      <label for="admin-game" class="muted">Game</label>
      <select id="admin-game">${GAMES.map(g => `<option value="${g.id}" ${g.id === adminGame ? "selected" : ""}>${esc(g.name)}</option>`).join("")}</select>
    </div>
    <p class="muted admin-note">Price is what customers pay. Original price is shown crossed out during the sale. Bonus is extra currency added to the package.
      A flash sale gives one package its own lower price until the end time. Untick <strong>Shown</strong> to hide a package from the shop.</p>
    <div class="admin-table-wrap"><table class="admin-table">
      <thead><tr><th>Package</th><th>Price (₱)</th><th>Original (₱)</th><th>Bonus</th><th>Tag</th><th>Stock</th><th>Flash price (₱)</th><th>Flash ends</th><th>Shown</th><th>Actions</th></tr></thead>
      <tbody>${game.packages.map(p => {
        const e = edits[p.id] || {};
        const flashActive = !!(e.flashPrice && e.flashEnd && e.flashEnd > Date.now());
        return `
        <tr data-pkg="${p.id}">
          <td>${esc(p.amount)}${p.custom ? ` <span class="muted">(added)</span>` : p.edited ? ` <span class="muted">(edited)</span>` : ""}${flashActive ? ` <span class="flash-chip">⚡ flash on</span>` : ""}</td>
          <td><input type="number" min="1" step="1" class="ad-price" value="${p.regularPrice != null ? p.regularPrice : p.price}" aria-label="Price for ${esc(p.amount)}" /></td>
          <td><input type="number" min="1" step="1" class="ad-was" value="${(flashActive ? (e.was != null ? e.was : p._base.was) : p.was) || ""}" aria-label="Original price for ${esc(p.amount)}" /></td>
          <td><input type="number" min="0" step="1" class="ad-bonus" value="${p.bonus || 0}" aria-label="Bonus for ${esc(p.amount)}" /></td>
          <td><select class="ad-tag" aria-label="Tag for ${esc(p.amount)}"><option value="">None</option>${Object.entries(PACKAGE_TAGS).map(([v, l]) => `<option value="${v}" ${p.tag === v ? "selected" : ""}>${l}</option>`).join("")}</select></td>
          <td><select class="ad-stock" aria-label="Stock for ${esc(p.amount)}">
            ${[["in","In stock"],["low","Low stock"],["out","Sold out"]].map(([v, l]) => `<option value="${v}" ${(p.stock || "in") === v ? "selected" : ""}>${l}</option>`).join("")}
          </select></td>
          <td><input type="number" min="1" step="1" class="ad-flash-price" value="${flashActive ? e.flashPrice : ""}" aria-label="Flash price for ${esc(p.amount)}" /></td>
          <td><input type="datetime-local" class="ad-flash-end" value="${flashActive ? toLocalInput(e.flashEnd) : ""}" aria-label="Flash sale end for ${esc(p.amount)}" /></td>
          <td><input type="checkbox" class="ad-shown" ${p.hidden ? "" : "checked"} aria-label="Show ${esc(p.amount)} in the shop" /></td>
          <td class="admin-actions"><button class="btn btn-glow btn-sm" data-ad="save-product" data-pkg="${p.id}">Save</button>
            ${p.custom ? `<button class="btn btn-ghost btn-sm" data-ad="delete-package" data-pkg="${p.id}">Delete</button>`
                       : `<button class="btn btn-ghost btn-sm" data-ad="reset-product" data-pkg="${p.id}">Reset</button>`}</td>
        </tr>`; }).join("")}</tbody></table></div>
    <div class="admin-add">
      <h4>Add a package to ${esc(game.name)}</h4>
      <div class="admin-filters">
        <input id="new-pkg-amount" type="number" min="1" step="1" placeholder="Amount (${esc(game.currency)})" aria-label="Amount of ${esc(game.currency)}" />
        <input id="new-pkg-price" type="number" min="1" step="1" placeholder="Price (₱)" aria-label="Price" />
        <input id="new-pkg-was" type="number" min="1" step="1" placeholder="Original (₱, optional)" aria-label="Original price" />
        <input id="new-pkg-bonus" type="number" min="0" step="1" placeholder="Bonus (optional)" aria-label="Bonus amount" />
        <select id="new-pkg-tag" aria-label="Tag"><option value="">No tag</option>${Object.entries(PACKAGE_TAGS).map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select>
        <button class="btn btn-glow btn-sm" data-ad="add-package">Add package</button>
      </div>
    </div>`;
}
function adminSaveProduct(pkgId){
  const row = document.querySelector(`tr[data-pkg="${pkgId}"]`);
  const num = sel => { const v = row.querySelector(sel).value.trim(); return v === "" ? null : Number(v); };
  const price = num(".ad-price"), was = num(".ad-was"), bonus = num(".ad-bonus") || 0;
  const flashPrice = num(".ad-flash-price"), flashRaw = row.querySelector(".ad-flash-end").value;
  const flashEnd = flashRaw ? new Date(flashRaw).getTime() : null;
  const tag = row.querySelector(".ad-tag").value, stock = row.querySelector(".ad-stock").value;
  const hidden = !row.querySelector(".ad-shown").checked;
  if(!(Number.isInteger(price) && price >= 1)) return pushToast("Enter a price of ₱1 or more.");
  if(was !== null && !(Number.isInteger(was) && was > price)) return pushToast("The original price must be higher than the price.");
  if(!(Number.isInteger(bonus) && bonus >= 0)) return pushToast("The bonus must be 0 or more.");
  if((flashPrice === null) !== (flashEnd === null)) return pushToast("A flash sale needs both a flash price and an end time.");
  if(flashPrice !== null){
    if(!(Number.isInteger(flashPrice) && flashPrice >= 1 && flashPrice < price)) return pushToast("The flash price must be lower than the price.");
    if(!(flashEnd > Date.now())) return pushToast("The flash sale must end in the future.");
  }
  const settings = loadAdminSettings();
  settings.products = settings.products || {};
  settings.products[pkgId] = { price, was, bonus, tag, stock, hidden, flashPrice, flashEnd };
  saveAdminSettings(settings);
  const p = GAMES.flatMap(g => g.packages).find(x => x.id === pkgId);
  adminLog(`Saved package ${p ? p.amount : pkgId}${flashPrice ? " (flash sale on)" : ""}${hidden ? " (hidden)" : ""}`);
  adminRefreshShop();
  renderAdminBody();
  pushToast("Package saved.");
}
function adminResetProduct(pkgId){
  const settings = loadAdminSettings();
  if(settings.products) delete settings.products[pkgId];
  saveAdminSettings(settings);
  adminLog(`Reset package ${pkgId} to its original values`);
  adminRefreshShop();
  renderAdminBody();
  pushToast("Package reset to its original values.");
}
function adminAddPackage(){
  const game = findGame(adminGame);
  const val = id => document.getElementById(id).value.trim();
  const amount = Number(val("new-pkg-amount")), price = Number(val("new-pkg-price"));
  const wasRaw = val("new-pkg-was"), was = wasRaw === "" ? null : Number(wasRaw);
  const bonus = val("new-pkg-bonus") === "" ? 0 : Number(val("new-pkg-bonus"));
  if(!(Number.isInteger(amount) && amount >= 1)) return pushToast(`Enter how much ${game.currency} the package gives.`);
  if(!(Number.isInteger(price) && price >= 1)) return pushToast("Enter a price of ₱1 or more.");
  if(was !== null && !(Number.isInteger(was) && was > price)) return pushToast("The original price must be higher than the price.");
  if(!(Number.isInteger(bonus) && bonus >= 0)) return pushToast("The bonus must be 0 or more.");
  const label = `${amount.toLocaleString("en-PH")} ${game.currency}`;
  if(game.packages.some(p => p.amount === label)) return pushToast("This game already has a package with that amount.");
  const settings = loadAdminSettings();
  settings.customPackages = settings.customPackages || [];
  settings.customPackages.push({ id:"cx-" + Date.now().toString(36), gameId:game.id, amount:label, price, was, stock:"in", bonus, tag:val("new-pkg-tag") });
  saveAdminSettings(settings);
  adminLog(`Added package ${label} to ${game.name}`);
  adminRefreshShop(); renderAdminBody();
  pushToast(`Package ${label} added.`);
}
function adminDeletePackage(pkgId){
  const settings = loadAdminSettings();
  settings.customPackages = (settings.customPackages || []).filter(p => p.id !== pkgId);
  if(settings.products) delete settings.products[pkgId];
  saveAdminSettings(settings);
  adminLog(`Deleted package ${pkgId}`);
  adminRefreshShop(); renderAdminBody();
  pushToast("Package deleted.");
}

/* ---------- Promo codes ---------- */
function adminPromosHtml(){
  const promos = getPromos();
  return `
    <h3 class="admin-h">Promo codes</h3>
    <p class="muted admin-note">Customers type a code in their cart. Only one code can be used per order.</p>
    <div class="admin-table-wrap"><table class="admin-table">
      <thead><tr><th>Code</th><th>Discount</th><th>Active</th><th>Actions</th></tr></thead>
      <tbody>${promos.length ? promos.map((p, i) => `
        <tr><td><strong class="mono">${esc(p.code)}</strong></td><td>${p.pct}% off</td>
          <td><label class="check-row"><input type="checkbox" data-ad="toggle-promo" data-i="${i}" ${p.active ? "checked" : ""} /> ${p.active ? "On" : "Off"}</label></td>
          <td class="admin-actions"><button class="btn btn-ghost btn-sm" data-ad="delete-promo" data-i="${i}">Delete</button></td></tr>`).join("")
        : `<tr><td colspan="4" class="muted">No promo codes yet.</td></tr>`}</tbody></table></div>
    <div class="admin-add">
      <h4>Add a promo code</h4>
      <div class="admin-filters">
        <input id="promo-new-code" type="text" maxlength="20" placeholder="CODE (letters and numbers)" aria-label="New promo code" />
        <input id="promo-new-pct" type="number" min="1" max="90" placeholder="% off" aria-label="Percent off" />
        <button class="btn btn-glow btn-sm" data-ad="add-promo">Add</button>
      </div>
    </div>`;
}
function adminSavePromos(list){
  const settings = loadAdminSettings();
  settings.promos = list;
  saveAdminSettings(settings);
  if(state.promo && !activePromo()) state.promo = null;
  renderPromoLine(); renderCartDrawer();
  renderAdminBody();
}

/* ---------- Sale ---------- */
function adminSaleHtml(){
  const custom = loadAdminSettings().saleEnd;
  const toLocalInput = ms => { const d = new Date(ms); const p = n => String(n).padStart(2, "0"); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`; };
  const status = !custom ? "Daily deals: discounts run until midnight and restart every day."
    : saleActive() ? `Sale ends on ${formatWhen(new Date(custom).toISOString())}.`
    : `The sale ended on ${formatWhen(new Date(custom).toISOString())}. Discounts are hidden until you set a new end date.`;
  return `
    <h3 class="admin-h">Sale</h3>
    <p class="admin-note">${status}</p>
    <div class="admin-add" style="margin-top:0;">
      <h4>Set a sale end date</h4>
      <div class="admin-filters">
        <input id="sale-end-input" type="datetime-local" aria-label="Sale end date and time" value="${custom ? toLocalInput(custom) : ""}" />
        <button class="btn btn-glow btn-sm" data-ad="save-sale">Save end date</button>
        <button class="btn btn-ghost btn-sm" data-ad="daily-sale">Use daily deals</button>
      </div>
      <p class="muted admin-note">When the end date passes, crossed-out prices and "You save" lines disappear from the shop until a new date is set. Package flash sales (Packages tab) have their own end times.</p>
    </div>`;
}

/* ---------- Site ---------- */
function adminSiteHtml(){
  const site = siteSettings();
  const a = site.announcement;
  return `
    <section class="admin-card admin-section">
      <h4>Site color</h4>
      <p class="muted admin-note">The color theme visitors see first. Customers can still pick their own in My Account.</p>
      <div class="swatches">${ACCENTS.map(x => `<button class="swatch ${site.accent === x.id ? "on" : ""}" data-ad="site-accent" data-accent="${x.id}" aria-label="${x.label} color theme" aria-pressed="${site.accent === x.id}" title="${x.label}" style="background:linear-gradient(135deg, ${x.colors[0]}, ${x.colors[1]})"></button>`).join("")}</div>
    </section>
    <section class="admin-card admin-section">
      <h4>Message bar</h4>
      <p class="muted admin-note">A colored message under the header on every page, for news, sales or notices.</p>
      <div class="admin-filters">
        <input id="ann-text" type="text" maxlength="140" placeholder="Message (up to 140 characters)" aria-label="Message text" value="${esc(a.text)}" />
        <select id="ann-style" aria-label="Message color">${Object.entries(ANNOUNCEMENT_STYLES).map(([v, l]) => `<option value="${v}" ${a.style === v ? "selected" : ""}>${l}</option>`).join("")}</select>
        <label class="check-row"><input type="checkbox" id="ann-active" ${a.active || !a.text ? "checked" : ""} /> Show it</label>
        <button class="btn btn-glow btn-sm" data-ad="save-announcement">Save message</button>
      </div>
    </section>
    <section class="admin-card admin-section">
      <h4>Orders</h4>
      <div class="admin-filters">
        <label class="muted" for="site-fee">Service fee (%)</label>
        <input id="site-fee" type="number" min="0" max="10" step="0.5" value="${site.feePct}" />
        <label class="muted" for="site-processing">Processing time (seconds)</label>
        <input id="site-processing" type="number" min="10" max="900" step="5" value="${site.processingSeconds}" />
        <button class="btn btn-glow btn-sm" data-ad="save-orders-settings">Save</button>
      </div>
      <p class="muted admin-note">Processing time is how long an order stays "Processing" (and can be cancelled) before it becomes "Delivered". Old orders keep the fee they were placed with.</p>
    </section>
    <section class="admin-card admin-section">
      <h4>Reset</h4>
      <p class="muted admin-note">Puts prices, stock, bonuses, added packages, promo codes, the sale date and site settings back to the original values. Orders and accounts are not touched.</p>
      <button class="btn btn-ghost btn-sm cancel-btn ${adminResetArmed ? "armed" : ""}" data-ad="reset-all">${adminResetArmed ? "Click again to confirm" : "Reset all admin changes"}</button>
    </section>`;
}

/* ---------- Activity ---------- */
function adminActivityHtml(){
  const log = loadAdminSettings().log || [];
  return log.length ? `<div class="admin-table-wrap"><table class="admin-table">
    <thead><tr><th>When</th><th>Who</th><th>What</th></tr></thead>
    <tbody>${log.slice(0, 100).map(l => `<tr><td class="muted" style="white-space:nowrap;">${formatWhen(l.at)}</td><td>${esc(l.who)}</td><td>${esc(l.text)}</td></tr>`).join("")}</tbody></table></div>`
    : `<div class="empty-state"><p class="title">No activity yet</p><p class="sub">Changes made on this page are listed here.</p></div>`;
}

/* ---------- clicks and typing on the admin page ---------- */
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-ad]");
  if(!el || !document.getElementById("admin-root").contains(el)) return;
  const act = el.dataset.ad;
  if(act === "tab"){ adminTab = el.dataset.tab; adminNotice = ""; adminResetArmed = false; renderAdmin(); }
  else if(act === "refresh"){ renderAdminBody(); }
  else if(act === "export-csv"){ adminExportCsv(); }
  else if(act === "deliver"){ adminPatchOrder(el.dataset.id, el.dataset.number, { status:"delivered" }); adminLog(`Marked order ${el.dataset.number} as delivered`); pushToast(`Order ${el.dataset.number} marked as delivered.`); renderAdminBody(); }
  else if(act === "cancel"){ adminPatchOrder(el.dataset.id, el.dataset.number, { status:"cancelled", cancelledAt:new Date().toISOString() }); adminLog(`Cancelled order ${el.dataset.number}`); pushToast(`Order ${el.dataset.number} was cancelled.`); renderAdminBody(); }
  else if(act === "view-orders"){ adminOrderFilter = { status:"all", search:el.dataset.id }; adminTab = "orders"; renderAdmin(); }
  else if(act === "toggle-suspend"){
    const accounts = loadAccounts(), a = accounts[el.dataset.id];
    if(a && a.role !== "admin"){ a.suspended = !a.suspended; saveAccounts(accounts); adminLog(`${a.suspended ? "Suspended" : "Unsuspended"} ${a.name} (${el.dataset.id})`); pushToast(`${a.name} is now ${a.suspended ? "suspended" : "active"}.`); renderAdminBody(); }
  }
  else if(act === "reset-password"){
    const accounts = loadAccounts(), a = accounts[el.dataset.id];
    if(a && a.role !== "admin"){
      const temp = "Tmp-" + randomSalt().slice(0, 6);
      Object.assign(a, makePasswordRecord(temp)); saveAccounts(accounts); clearFailedLogins(el.dataset.id);
      adminNotice = `Temporary password for <strong>${esc(a.name)}</strong> (${esc(el.dataset.id)}): <strong class="mono">${temp}</strong>. Give it to the customer and ask them to change it in My Account. It is only shown here once.`;
      adminLog(`Reset the password for ${a.name} (${el.dataset.id})`);
      renderAdminBody();
    }
  }
  else if(act === "save-product"){ adminSaveProduct(el.dataset.pkg); }
  else if(act === "reset-product"){ adminResetProduct(el.dataset.pkg); }
  else if(act === "add-package"){ adminAddPackage(); }
  else if(act === "delete-package"){ adminDeletePackage(el.dataset.pkg); }
  else if(act === "delete-promo"){ const list = getPromos().slice(); const gone = list.splice(parseInt(el.dataset.i, 10), 1)[0]; adminSavePromos(list); if(gone) adminLog(`Deleted promo code ${gone.code}`); }
  else if(act === "add-promo"){
    const code = document.getElementById("promo-new-code").value.trim().toUpperCase();
    const pct = parseInt(document.getElementById("promo-new-pct").value, 10);
    const list = getPromos().slice();
    if(!/^[A-Z0-9]{3,20}$/.test(code)) return pushToast("A code is 3–20 letters or numbers, with no spaces.");
    if(!(pct >= 1 && pct <= 90)) return pushToast("Enter a discount between 1% and 90%.");
    if(list.some(p => p.code === code)) return pushToast("That code already exists.");
    list.push({ code, pct, active:true });
    adminSavePromos(list);
    adminLog(`Added promo code ${code} (${pct}% off)`);
    pushToast(`Promo code ${code} added.`);
  }
  else if(act === "save-sale"){
    const v = document.getElementById("sale-end-input").value;
    if(!v) return pushToast("Choose an end date and time first.");
    const settings = loadAdminSettings(); settings.saleEnd = new Date(v).getTime(); saveAdminSettings(settings);
    adminLog(`Set the sale end date to ${v.replace("T", " ")}`);
    adminRefreshShop(); renderAdminBody(); pushToast("Sale end date saved.");
  }
  else if(act === "daily-sale"){
    const settings = loadAdminSettings(); delete settings.saleEnd; saveAdminSettings(settings);
    adminLog("Switched back to daily deals");
    adminRefreshShop(); renderAdminBody(); pushToast("Back to daily deals.");
  }
  else if(act === "site-accent"){
    const settings = loadAdminSettings(); settings.site = { ...(settings.site || {}), accent:el.dataset.accent }; saveAdminSettings(settings);
    adminLog(`Set the site color to ${el.dataset.accent}`);
    adminRefreshShop(); renderAdminBody(); pushToast("Site color saved.");
  }
  else if(act === "save-announcement"){
    const text = document.getElementById("ann-text").value.trim();
    const active = document.getElementById("ann-active").checked;
    if(active && !text) return pushToast("Type a message first, or untick Show it.");
    const settings = loadAdminSettings();
    settings.site = { ...(settings.site || {}), announcement:{ text, style:document.getElementById("ann-style").value, active } };
    saveAdminSettings(settings);
    adminLog(active ? `Showing the message bar: "${text}"` : "Turned the message bar off");
    adminRefreshShop(); renderAdminBody(); pushToast("Message saved.");
  }
  else if(act === "save-orders-settings"){
    const fee = Number(document.getElementById("site-fee").value), secs = parseInt(document.getElementById("site-processing").value, 10);
    if(!(fee >= 0 && fee <= 10)) return pushToast("The service fee must be between 0% and 10%.");
    if(!(secs >= 10 && secs <= 900)) return pushToast("Processing time must be between 10 and 900 seconds.");
    const settings = loadAdminSettings(); settings.site = { ...(settings.site || {}), feePct:fee, processingSeconds:secs }; saveAdminSettings(settings);
    adminLog(`Service fee ${fee}%, processing time ${secs} seconds`);
    adminRefreshShop(); renderAdminBody(); pushToast("Order settings saved.");
  }
  else if(act === "reset-all"){
    if(!adminResetArmed){ adminResetArmed = true; renderAdminBody(); setTimeout(() => { if(adminResetArmed){ adminResetArmed = false; if(adminTab === "site") renderAdminBody(); } }, 4000); return; }
    adminResetArmed = false;
    const settings = loadAdminSettings();
    saveAdminSettings({ log:settings.log || [] });
    adminLog("Reset all admin changes to the original values");
    adminRefreshShop(); renderAdminBody(); pushToast("Everything was reset to the original values.");
  }
});
document.addEventListener("change", (e) => {
  const root = document.getElementById("admin-root");
  if(!root || !root.contains(e.target)) return;
  if(e.target.id === "admin-game"){ adminGame = e.target.value; renderAdminBody(); }
  else if(e.target.id === "admin-order-status"){ adminOrderFilter.status = e.target.value; renderAdminBody(); }
  else if(e.target.dataset && e.target.dataset.ad === "toggle-promo"){
    const list = getPromos().map(p => ({ ...p }));
    const i = parseInt(e.target.dataset.i, 10);
    list[i].active = e.target.checked;
    adminSavePromos(list);
    adminLog(`${e.target.checked ? "Turned on" : "Turned off"} promo code ${list[i].code}`);
  }
});
document.addEventListener("input", (e) => {
  const keepFocus = (id, setter) => {
    setter(e.target.value);
    const pos = e.target.selectionStart;
    renderAdminBody();
    const box = document.getElementById(id); box.focus(); box.setSelectionRange(pos, pos);
  };
  if(e.target.id === "admin-order-search") keepFocus("admin-order-search", v => { adminOrderFilter.search = v; });
  else if(e.target.id === "admin-cust-search") keepFocus("admin-cust-search", v => { adminCustomerSearch = v; });
});
