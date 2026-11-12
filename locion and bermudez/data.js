/* =====================================================================
   Lodezz.x — site data
   Edit games, prices, FAQ answers, payment methods and policy text here.
   (Prices and stock can also be changed from the Admin page.)
   ===================================================================== */

/* ---------- games and packages ----------
   price = what the customer pays, was = the original price (shows a discount),
   popular = "Popular" tag, stock = "in" (default), "low" or "out"                  */
const GAMES = [
  { id:"roblox", name:"Roblox", currency:"Robux", grad:["#2563EB","#7C3AED"], needsServer:false,
    packages:[
      {id:"rb-80",amount:"80 Robux",price:49},
      {id:"rb-400",amount:"400 Robux",price:199,was:239},
      {id:"rb-800",amount:"800 Robux",price:399,was:469,popular:true},
      {id:"rb-1700",amount:"1,700 Robux",price:799},
    ]},
  { id:"ml", name:"Mobile Legends", currency:"Diamonds", grad:["#3B82F6","#8B5CF6"], needsServer:true, hot:true,
    packages:[
      {id:"ml-86",amount:"86 Diamonds",price:79},
      {id:"ml-172",amount:"172 Diamonds",price:149,was:179,popular:true},
      {id:"ml-257",amount:"257 Diamonds",price:219},
      {id:"ml-344",amount:"344 Diamonds",price:289,was:329},
    ]},
  { id:"valorant", name:"Valorant", currency:"Valorant Points", grad:["#2563EB","#8B5CF6"], needsServer:false, hot:true,
    packages:[
      {id:"val-475",amount:"475 Valorant Points",price:299},
      {id:"val-1000",amount:"1,000 Valorant Points",price:599,was:699,popular:true},
      {id:"val-2050",amount:"2,050 Valorant Points",price:1199},
      {id:"val-3650",amount:"3,650 Valorant Points",price:1999,was:2299},
    ]},
  { id:"genshin", name:"Genshin Impact", currency:"Genesis Crystals", grad:["#7C3AED","#3B82F6"], needsServer:true,
    packages:[
      {id:"gi-60",amount:"60 Crystals",price:79},
      {id:"gi-300",amount:"300 Crystals",price:399,was:459,popular:true},
      {id:"gi-980",amount:"980 Crystals",price:1199},
      {id:"gi-1980",amount:"1,980 Crystals",price:2399,was:2699},
    ]},
  { id:"codm", name:"Call of Duty Mobile", currency:"COD Points", grad:["#2563EB","#7C3AED"], needsServer:false,
    packages:[
      {id:"cod-80",amount:"80 COD Points",price:79},
      {id:"cod-420",amount:"420 COD Points",price:399,was:459,popular:true},
      {id:"cod-880",amount:"880 COD Points",price:799},
      {id:"cod-2400",amount:"2,400 COD Points",price:2099},
    ]},
  { id:"lol", name:"League of Legends", currency:"Riot Points", grad:["#3B82F6","#7C3AED"], needsServer:false,
    packages:[
      {id:"lol-575",amount:"575 Riot Points",price:399},
      {id:"lol-1380",amount:"1,380 Riot Points",price:899,was:999,popular:true},
      {id:"lol-2800",amount:"2,800 Riot Points",price:1699},
      {id:"lol-4750",amount:"4,750 Riot Points",price:2799,was:3199},
    ]},
  { id:"freefire", name:"Free Fire", currency:"Diamonds", grad:["#2563EB","#8B5CF6"], needsServer:false,
    packages:[
      {id:"ff-100",amount:"100 Diamonds",price:59},
      {id:"ff-310",amount:"310 Diamonds",price:179,was:199,popular:true},
      {id:"ff-520",amount:"520 Diamonds",price:299},
      {id:"ff-1060",amount:"1,060 Diamonds",price:599,was:679},
    ]},
  { id:"pubg", name:"PUBG Mobile", currency:"Unknown Cash", grad:["#3B82F6","#7C3AED"], needsServer:false,
    packages:[
      {id:"pubg-60",amount:"60 Unknown Cash",price:79},
      {id:"pubg-325",amount:"325 Unknown Cash",price:399,was:449,popular:true},
      {id:"pubg-660",amount:"660 Unknown Cash",price:799},
      {id:"pubg-1800",amount:"1,800 Unknown Cash",price:1899,was:2099},
    ]},
  { id:"hsr", name:"Honkai: Star Rail", currency:"Oneiric Shards", grad:["#7C3AED","#2563EB"], needsServer:true,
    packages:[
      {id:"hsr-60",amount:"60 Oneiric Shards",price:79},
      {id:"hsr-330",amount:"330 Oneiric Shards",price:399,was:459,popular:true},
      {id:"hsr-1090",amount:"1,090 Oneiric Shards",price:1199},
      {id:"hsr-2240",amount:"2,240 Oneiric Shards",price:2399,was:2699},
    ]},
  { id:"wildrift", name:"League of Legends: Wild Rift", currency:"Wild Cores", grad:["#2563EB","#7C3AED"], needsServer:false,
    packages:[
      {id:"wr-275",amount:"275 Wild Cores",price:199},
      {id:"wr-565",amount:"565 Wild Cores",price:399,was:449,popular:true},
      {id:"wr-1150",amount:"1,150 Wild Cores",price:799},
      {id:"wr-2375",amount:"2,375 Wild Cores",price:1599},
    ]},
  { id:"coc", name:"Clash of Clans", currency:"Gems", grad:["#3B82F6","#8B5CF6"], needsServer:false,
    packages:[
      {id:"coc-80",amount:"80 Gems",price:59},
      {id:"coc-500",amount:"500 Gems",price:319,was:369,popular:true},
      {id:"coc-1200",amount:"1,200 Gems",price:749},
      {id:"coc-2500",amount:"2,500 Gems",price:1549},
    ]},
  { id:"clashroyale", name:"Clash Royale", currency:"Gems", grad:["#7C3AED","#3B82F6"], needsServer:false,
    packages:[
      {id:"cr-80",amount:"80 Gems",price:65},
      {id:"cr-500",amount:"500 Gems",price:349,was:399,popular:true},
      {id:"cr-1200",amount:"1,200 Gems",price:799},
      {id:"cr-2500",amount:"2,500 Gems",price:1649},
    ]},
];

/* ---------- what the customer must enter for each game ---------- */
const SERVER_REGIONS = ["Asia", "America", "Europe", "Taiwan, Hong Kong, Macau"];
const RIOT_ID = { label:"Riot ID", placeholder:"e.g. Juan#1234", pattern:/^.{3,16}#[A-Za-z0-9]{3,5}$/, error:"Enter your full Riot ID with the tag, for example Juan#1234." };
const PLAYER_TAG = { label:"Player Tag", placeholder:"e.g. #2PP0LQ8", pattern:/^#?[0289PYLQGRJCUV]{3,12}$/i, error:"Enter your Player Tag, for example #2PP0LQ8." };
const PLAYER_ID_RULES = {
  roblox:      { label:"Roblox username", placeholder:"e.g. Juan_Gamer", pattern:/^[A-Za-z0-9_]{3,20}$/, error:"Enter your Roblox username (3–20 letters, numbers or underscores)." },
  ml:          { label:"Mobile Legends User ID", placeholder:"e.g. 123456789", pattern:/^\d{7,12}$/, error:"Your Mobile Legends User ID is 7–12 digits.",
                 server:{ type:"text", label:"Zone ID", placeholder:"e.g. 2201", pattern:/^\d{3,5}$/, error:"Your Zone ID is 3–5 digits." } },
  valorant:    RIOT_ID,
  genshin:     { label:"Genshin Impact UID", placeholder:"e.g. 800123456", pattern:/^\d{9,10}$/, error:"Your Genshin Impact UID is 9–10 digits.",
                 server:{ type:"select", label:"Server", options:SERVER_REGIONS, error:"Please choose your server." } },
  codm:        { label:"Call of Duty Mobile Open ID", placeholder:"e.g. 6742013958271640", pattern:/^\d{10,20}$/, error:"Your Open ID is 10–20 digits." },
  lol:         RIOT_ID,
  freefire:    { label:"Free Fire Player ID", placeholder:"e.g. 123456789", pattern:/^\d{8,12}$/, error:"Your Free Fire Player ID is 8–12 digits." },
  pubg:        { label:"PUBG Mobile Character ID", placeholder:"e.g. 5123456789", pattern:/^\d{8,12}$/, error:"Your Character ID is 8–12 digits." },
  hsr:         { label:"Honkai: Star Rail UID", placeholder:"e.g. 800123456", pattern:/^\d{9,10}$/, error:"Your Honkai: Star Rail UID is 9–10 digits.",
                 server:{ type:"select", label:"Server", options:SERVER_REGIONS, error:"Please choose your server." } },
  wildrift:    RIOT_ID,
  coc:         PLAYER_TAG,
  clashroyale: PLAYER_TAG,
};

/* ---------- payment ---------- */
const PAYMENT_METHODS = [
  { id:"gcash", label:"GCash", icon:"wallet" },
  { id:"maya", label:"Maya", icon:"wallet" },
  { id:"bank", label:"Bank Transfer", icon:"landmark" },
  { id:"card", label:"Card", icon:"card" },
  { id:"qr", label:"QR Payment", icon:"qr" },
];
/* wallet = asks for the mobile number the customer pays from; info = shows steps only */
const PAYMENT_HELP = {
  gcash: { wallet:true, title:"Pay with GCash", steps:["Enter the mobile number linked to your GCash account.", "Press Pay. A payment request is sent to your GCash app.", "Approve the request in the app, then come back here."] },
  maya:  { wallet:true, title:"Pay with Maya", steps:["Enter the mobile number linked to your Maya account.", "Press Pay. A payment request is sent to your Maya app.", "Approve the request in the app, then come back here."] },
  bank:  { wallet:false, title:"Pay by Bank Transfer", steps:["Press Pay to place your order.", "Transfer the exact total using your bank app.", "Keep the reference code below. We use it to match your transfer."] },
  card:  { wallet:false, title:"Pay by Card", steps:["Press Pay to place your order.", "Your bank may ask you to confirm the payment.", "You will see your order confirmation right after."] },
  qr:    { wallet:false, title:"Pay with QR", steps:["Press Pay to place your order.", "In your banking or e-wallet app, choose Scan to Pay.", "Keep the reference code below for your records."] },
};

/* ---------- promo codes (can be changed from the Admin page) ---------- */
const PROMO_DEFAULTS = [
  { code:"LODEZZ10", pct:10, active:true },
];

/* ---------- FAQ ---------- */
const FAQS = [
  { q:"How long does delivery take?", a:"Most orders are delivered within 5 to 30 minutes once payment is confirmed. Some packages may take longer during peak hours." },
  { q:"What information do I need to provide?", a:"You need the in-game ID for the game you are topping up (for example a User ID, UID, Riot ID or Player Tag). Some games also need a server or zone, such as Mobile Legends, Genshin Impact and Honkai: Star Rail. We check the format before you can add the item to your cart." },
  { q:"What payment methods do you accept?", a:"We accept GCash, Maya, bank transfer, card, and QR payment. Choose your preferred method at checkout." },
  { q:"Can I use a promo code?", a:"Yes. Enter your code in the cart before checking out. The discount is taken off your subtotal, and only one code can be used per order." },
  { q:"What are bonuses and flash sales?", a:"Some packages include extra bonus currency, shown on the package, and it is delivered together with your top-up. A flash sale is a short-time lower price on one package, shown with a countdown. When the timer ends, the price goes back to normal." },
  { q:"Can I cancel an order?", a:"Yes, while the order is still Processing. Open My Orders and press Cancel order. Once an order is marked Delivered it can no longer be cancelled." },
  { q:"What happens if my order is delayed?", a:"If your order takes longer than the estimated delivery window, contact the site administrator with your order number so it can be checked." },
  { q:"Can I get a refund?", a:"Cancelled orders and orders that fail to deliver are refunded to your original payment method. See our Refund Policy for the full details." },
  { q:"How can I contact support?", a:"Open the Support page for a short help message, or contact the site administrator directly for assistance." },
  { q:"Are the prices updated automatically?", a:"Prices are updated by our team whenever game publishers change their rates. The price you see at checkout is the price you pay." },
];

/* ---------- Terms, Privacy and Refund pages ---------- */
const LEGAL_PAGES = {
  terms: {
    title: "Terms & Conditions", updated: "November 2026",
    intro: "These terms explain how Lodezz.x works. By creating an account or placing an order you agree to them.",
    sections: [
      { h:"1. About Lodezz.x", p:["Lodezz.x is an independent online marketplace for game top-ups such as in-game currency and credits. We are not owned by, and are not affiliated with, any game publisher. Game names, logos and trademarks belong to their respective owners."] },
      { h:"2. Your account", p:["You need an account to browse and order. Keep your password private. You are responsible for activity on your account.", "You can edit your name, change your password or delete your account from My Account at any time."] },
      { h:"3. Orders and payment", p:["An order is placed when you press Pay at checkout. Prices are shown in Philippine pesos (₱) and include any promo code you applied. A small service fee is added to every order and is shown before you pay.", "You are responsible for entering the correct Player ID, server and game details. We deliver to exactly what you enter."] },
      { h:"4. Delivery", p:["Most top-ups are delivered within 5 to 30 minutes. Delivery times may be longer when a game publisher is slow or under maintenance. You can follow the status of every order in My Orders."] },
      { h:"5. Cancellations and refunds", p:["You can cancel an order while it is still Processing. Refunds follow our Refund Policy."] },
      { h:"6. Prices and promo codes", p:["We may change prices, packages and promo codes at any time. A change never affects an order that has already been placed. Only one promo code can be used per order."] },
      { h:"7. Fair use", p:["Do not use Lodezz.x to break the rules of a game, to place orders with accounts that are not yours, or to attempt to disrupt the site. We may close accounts that do."] },
      { h:"8. Changes to these terms", p:["We may update these terms. The date at the top of this page shows when they were last changed."] },
      { h:"9. Questions", p:["For help with an order or these terms, please contact the site administrator."] },
    ],
  },
  privacy: {
    title: "Privacy Policy", updated: "November 2026",
    intro: "This page explains what information Lodezz.x keeps and why.",
    sections: [
      { h:"What we keep", p:["Your name, your email or username, and your password (stored in scrambled form, not as plain text).", "Your preferred payment method, the games you like, your cart, and your order history, including the Player IDs you entered for each order.", "A short list of your recent logins on this device."] },
      { h:"What we do not collect", p:["We do not ask for card numbers, bank account numbers or e-wallet PINs on this site."] },
      { h:"Where it is stored", p:["Your information is stored in your browser on the device you are using. Clearing your browser data, or using a different device or browser, means that information will not be there."] },
      { h:"How we use it", p:["Only to run your account: signing you in, filling in your checkout details, showing your orders, and putting the games you like first. We do not sell your information."] },
      { h:"Your choices", p:["Choose Remember this account on the login page only on devices you trust. You can forget a remembered account, edit your details, or delete your account completely from My Account."] },
      { h:"Questions", p:["For privacy questions, please contact the site administrator."] },
    ],
  },
  refund: {
    title: "Refund Policy", updated: "November 2026",
    intro: "We want every top-up to arrive. This page explains when you can get your money back.",
    sections: [
      { h:"Cancelling an order", p:["While an order is Processing you can cancel it yourself from My Orders. A cancelled order is refunded in full to the payment method you used."] },
      { h:"Orders that do not arrive", p:["If an order is not delivered within 24 hours, contact the site administrator with your order number. If we cannot deliver it, you will receive a full refund."] },
      { h:"When we cannot refund", p:["An order that was delivered to the Player ID and server you entered is final, even if the ID belonged to a different account.", "Orders cannot be cancelled after they are marked Delivered."] },
      { h:"How refunds are paid", p:["Refunds go back to the original payment method. Please allow 3 to 5 working days for the amount to appear."] },
      { h:"How to ask for a refund", p:["Contact the site administrator and include your order number (it starts with LDX) and the email or username on your account."] },
    ],
  },
};


/* ---------- colors and labels ---------- */
/* each game has its own accent color (used on its cards and charts) */
const GAME_COLORS = { roblox:"#EF4444", ml:"#3B82F6", valorant:"#FB7185", genshin:"#FBBF24", codm:"#22C55E", lol:"#06B6D4",
                      freefire:"#F97316", pubg:"#EAB308", hsr:"#A78BFA", wildrift:"#38BDF8", coc:"#84CC16", clashroyale:"#E879F9" };
/* labels the administrator can put on a package */
const PACKAGE_TAGS = { best:"Best value", hot:"Hot", new:"New" };
/* site color themes (shown as swatches in My Account; the administrator picks the default) */
const ACCENTS = [
  { id:"violet",  label:"Violet",  colors:["#2563EB","#7C3AED"] },
  { id:"ocean",   label:"Ocean",   colors:["#0284C7","#06B6D4"] },
  { id:"emerald", label:"Emerald", colors:["#059669","#0D9488"] },
  { id:"rose",    label:"Rose",    colors:["#E11D48","#C026D3"] },
  { id:"sunset",  label:"Sunset",  colors:["#EA580C","#DB2777"] },
];
/* site settings the administrator can change (Admin, Site tab) */
const SITE_DEFAULTS = { accent:"violet", feePct:2, processingSeconds:45, announcement:{ text:"", style:"info", active:false } };
const ANNOUNCEMENT_STYLES = { info:"Info (accent color)", sale:"Sale (gold)", warning:"Notice (red)" };
