"""
Lodezz.x end-to-end tests.

How to run (needs Python 3 and Playwright):
    pip install playwright
    playwright install chromium          # also: firefox, webkit
    python tests/e2e_test.py             # Chromium
    python tests/e2e_test.py firefox     # or: webkit

It opens index.html from this project in a real browser, clicks through the site
like a customer / the administrator, and prints PASS or FAIL for every check.
"""
import pathlib, re, sys, json
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
SHOTS = ROOT / "tests" / "screenshots"
SHOTS.mkdir(exist_ok=True)
URL = "file://" + str(ROOT / "index.html")
ENGINE = sys.argv[1] if len(sys.argv) > 1 else "chromium"
results = []

def check(name, cond, extra=""):
    results.append((name, bool(cond)))
    print(("PASS" if cond else "FAIL"), "-", name, ("  " + str(extra)) if (extra and not cond) else "")

def route(page):  return page.eval_on_selector(".page:not([hidden])", "el => el.dataset.page")
def hash_(page):  return page.evaluate("location.hash")
def badge(page):  return page.inner_text("#cart-count") if page.is_visible("#cart-count") else "0"
def toast(page):  return page.inner_text("#toast-stack")

VALID_IDS = {
    "roblox":("Juan_Gamer",None), "ml":("123456789","2201"), "valorant":("Juan#1234",None),
    "genshin":("800123456","Asia"), "codm":("6742013958271640",None), "lol":("Juan#1234",None),
    "freefire":("123456789",None), "pubg":("5123456789",None), "hsr":("800123456","Asia"),
    "wildrift":("Juan#1234",None), "coc":("2pp0lq8",None), "clashroyale":("2PP0LQ8",None),
}

def fill_ids(page, game):
    pid, sid = VALID_IDS[game]
    page.fill("#field-playerid", pid)
    if sid is not None:
        if page.eval_on_selector("#field-serverid", "e => e.tagName") == "SELECT": page.select_option("#field-serverid", sid)
        else: page.fill("#field-serverid", sid)

def login(page, ident, pw, method="gcash", remember=False, pick_all=True):
    page.fill("#auth-identifier", ident); page.fill("#auth-password", pw)
    page.select_option("#auth-payment", method)
    if remember: page.check("#auth-remember")
    else: page.uncheck("#auth-remember")
    page.click('button[data-action="auth-submit"]'); page.wait_for_timeout(350)
    if pick_all and route(page) == "prefs":
        page.click('button[data-action="prefs-all"]'); page.click("#prefs-save-btn"); page.wait_for_timeout(300)

def register(page, name, ident, pw, method="gcash", pick=("roblox","ml","valorant")):
    page.click('button[data-action="auth-toggle-mode"]')
    page.fill("#auth-name", name); page.fill("#auth-identifier", ident)
    page.fill("#auth-password", pw); page.fill("#auth-confirm", pw)
    page.select_option("#auth-payment", method)
    page.click('button[data-action="auth-submit"]'); page.wait_for_timeout(350)
    if route(page) == "prefs" and pick is not None:
        for g in pick: page.check(f'.pref-check[data-game="{g}"]')
        page.click("#prefs-save-btn"); page.wait_for_timeout(300)

def logout(page):
    if not page.is_visible("#account-modal"): page.click("#account-name")
    page.wait_for_timeout(150)
    page.click('#account-modal button[data-action="logout"]'); page.wait_for_timeout(300)

def go(page, target):
    page.click(f'button[data-action="goto"][data-target="{target}"]'); page.wait_for_timeout(250)

def show_game(page, game):
    go(page, "games")
    page.click(f'button[data-action="filter-game"][data-val="{game}"]'); page.wait_for_timeout(150)

def add_to_cart(page, game, nth=0, close=True):
    show_game(page, game)
    page.locator('button[data-action="add-cart"]').nth(nth).click(); page.wait_for_timeout(200)
    fill_ids(page, game)
    page.click('button[data-action="confirm-detail"]'); page.wait_for_timeout(350)
    if close:
        page.keyboard.press("Escape"); page.wait_for_timeout(250)

def checkout_to_payment(page):
    page.click("#cart-btn"); page.wait_for_timeout(200)
    page.click('button[data-action="go-checkout"]'); page.wait_for_timeout(200)
    page.click('button[data-action="checkout-next"]'); page.wait_for_timeout(200)

def pay(page, method="gcash", mobile="09171234567"):
    page.click(f'button[data-method="{method}"]'); page.wait_for_timeout(100)
    if page.locator("#pay-mobile").count(): page.fill("#pay-mobile", mobile)
    page.click('button[data-action="confirm-payment"]'); page.wait_for_timeout(1300)

def peso(n): return "₱{:,}".format(n)

def run(p):
    browser = getattr(p, ENGINE).launch()
    ctx = browser.new_context(viewport={"width":1300,"height":900}, accept_downloads=True)
    page = ctx.new_page()
    errors = []
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append(str(e)))

    # ---------------------------------------------------------------- 1. start
    page.goto(URL); page.wait_for_timeout(500)
    check("1. login is the first interface", route(page) == "login" and hash_(page) == "#/login")
    check("1. page has a description + social tags", page.locator('meta[name="description"]').count()==1 and page.locator('meta[property="og:title"]').count()==1)
    check("1. tab title names the page and the site", page.title() == "Log In | Lodezz.x", page.title())
    check("1. no demo/mock wording on screen", not re.search(r"demo|mock|sample|prototype|simulated", page.evaluate("document.body.textContent"), re.I))

    # ---------------------------------------------------------------- 2. public policy pages
    page.click('footer button[data-target="terms"]'); page.wait_for_timeout(250)
    check("2. Terms opens while logged out", route(page) == "legal" and "Terms & Conditions" in page.inner_text("#legal-content") and hash_(page) == "#/terms")
    check("2. policy text is real content (9 sections)", page.locator("#legal-content h3").count() == 9)
    page.click('button[data-action="legal-back"]'); page.wait_for_timeout(250)
    check("2. Back link returns to the login page", route(page) == "login")
    page.click('footer button[data-target="refund"]'); page.wait_for_timeout(200)
    page.reload(); page.wait_for_timeout(400)
    check("2. refreshing on a policy page keeps it", route(page) == "legal" and "Refund Policy" in page.inner_text("#legal-content"))
    page.click('footer button[data-target="privacy"]'); page.wait_for_timeout(200)
    check("2. Privacy Policy opens", "Privacy Policy" in page.inner_text("#legal-content"))
    page.click('footer button[data-target="faq"]'); page.wait_for_timeout(250)
    check("2. other pages stay blocked while logged out", route(page) == "login")
    page.evaluate("location.hash = '#/games'"); page.wait_for_timeout(300)
    check("2. typing a protected address does not bypass the login", route(page) == "login")

    # ---------------------------------------------------------------- 3. register + validation
    page.click('button[data-action="auth-toggle-mode"]')
    check("3. register shows the Terms / Privacy note", page.is_visible("#auth-terms"))
    page.fill("#auth-name","Ana Reyes"); page.fill("#auth-identifier","not an email@@"); page.fill("#auth-password","anapass1"); page.fill("#auth-confirm","anapass1")
    page.select_option("#auth-payment","maya"); page.click('button[data-action="auth-submit"]'); page.wait_for_timeout(200)
    check("3. an invalid email is rejected", page.is_visible("#err-identifier") and "valid email" in page.inner_text("#err-identifier"))
    check("3. errors are announced (role=alert + aria-invalid)", page.get_attribute("#err-identifier","role") == "alert" and page.get_attribute("#auth-identifier","aria-invalid") == "true")
    page.fill("#auth-identifier","ab"); page.click('button[data-action="auth-submit"]'); page.wait_for_timeout(200)
    check("3. a too-short username is rejected", "3–20" in page.inner_text("#err-identifier"))
    page.fill("#auth-identifier","ana@example.com"); page.click('button[data-action="auth-submit"]'); page.wait_for_timeout(350)
    check("3. valid registration goes to the liked-games step", route(page) == "prefs")
    check("3. liked-games page has its own address", hash_(page) == "#/preferences")
    go(page, "games")
    check("3. liked-games step cannot be skipped", route(page) == "prefs")
    for g in ["roblox","ml","valorant","freefire"]: page.check(f'.pref-check[data-game="{g}"]')
    page.click("#prefs-save-btn"); page.wait_for_timeout(300)
    check("3. then the website opens", route(page) == "home" and hash_(page) == "#/home")

    # ---------------------------------------------------------------- 4. routing
    go(page, "faq")
    check("4. each page has an address (#/faq) and a tab title", hash_(page) == "#/faq" and page.title() == "FAQ | Lodezz.x")
    page.reload(); page.wait_for_timeout(400)
    check("4. refresh stays on the same page", route(page) == "faq")
    go(page, "support"); go(page, "how")
    page.go_back(); page.wait_for_timeout(300)
    check("4. the browser Back button works", route(page) == "support")
    page.go_forward(); page.wait_for_timeout(300)
    check("4. the browser Forward button works", route(page) == "how")
    page.evaluate("location.hash = '#/nonsense'"); page.wait_for_timeout(300)
    check("4. an unknown address falls back to Home", route(page) == "home")

    # ---------------------------------------------------------------- 5. games, footer, search
    go(page, "games")
    check("5. twelve games listed", page.locator("#game-grid .game-card").count() == 12)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    footer_btns = page.locator("footer .footer-link")
    check("5. all 20 footer links are real controls (games, help, policies)", footer_btns.count() == 20, footer_btns.count())
    page.click('#footer-games button[data-game="pubg"]'); page.wait_for_timeout(350)
    check("5. footer game link opens that game in the shop", route(page) == "games" and "Showing 4 of 48" in page.inner_text("#result-count"))
    page.click('button[data-action="filter-game"][data-val="all"]')
    opts = page.eval_on_selector_all("#search-suggestions option", "els => els.map(e => e.value)")
    check("5. search suggests full names (games and currencies)", "Valorant Points" in opts and "Mobile Legends" in opts and "Unknown Cash" in opts)
    check("5. no shortened labels in suggestions", not any(o in ("ML","RB","GI","CODM","LOL","VAL","VP","CP","RP","UC") for o in opts))
    page.fill("#search-input", "Genesis"); page.wait_for_timeout(150)
    check("5. the clear (✕) button appears", page.is_visible("#search-clear"))
    page.click("#search-clear"); page.wait_for_timeout(150)
    check("5. clear empties the search and shows everything", page.input_value("#search-input") == "" and "Showing 48 of 48" in page.inner_text("#result-count"))
    page.select_option("#sort-select", "new"); page.wait_for_timeout(150)
    check("5. Newest sort puts the newest game first", page.locator("#product-grid-wrap .product-top .name").first.inner_text() == "Clash Royale")
    page.select_option("#sort-select", "popular")

    # ---------------------------------------------------------------- 6. Player ID validation + remembered IDs
    show_game(page, "freefire")
    page.locator('button[data-action="add-cart"]').first.click(); page.wait_for_timeout(250)
    check("6. product window shows the game's own ID label", "Free Fire Player ID" in page.inner_text("#detail-modal"))
    page.fill("#field-playerid", "abc"); page.click('button[data-action="confirm-detail"]'); page.wait_for_timeout(200)
    check("6. letters are rejected for a numeric ID", "8–12 digits" in page.inner_text("#detail-modal") and badge(page) == "0")
    check("6. the error is announced to screen readers", page.locator("#detail-modal .err-msg[role=alert]").count() == 1)
    page.fill("#field-playerid", "123456789"); page.click('button[data-action="confirm-detail"]'); page.wait_for_timeout(350)
    check("6. a valid ID is accepted", badge(page) == "1")
    page.keyboard.press("Escape"); page.wait_for_timeout(250)
    page.locator('button[data-action="add-cart"]').first.click(); page.wait_for_timeout(250)
    check("6. the last ID for that game is remembered", page.input_value("#field-playerid") == "123456789" and "Saved from your last order" in page.inner_text("#detail-modal"))
    page.click('button[data-action="close-detail"]'); page.wait_for_timeout(200)
    show_game(page, "roblox")
    page.locator('button[data-action="add-cart"]').first.click(); page.wait_for_timeout(250)
    check("6. another game does not inherit that ID", page.input_value("#field-playerid") == "")
    page.fill("#field-playerid", "ab"); page.click('button[data-action="confirm-detail"]'); page.wait_for_timeout(200)
    check("6. Roblox username rule enforced", "3–20" in page.inner_text("#detail-modal"))
    page.click('button[data-action="close-detail"]'); page.wait_for_timeout(200)
    show_game(page, "ml")
    page.locator('button[data-action="add-cart"]').first.click(); page.wait_for_timeout(250)
    page.fill("#field-playerid", "123456789"); page.fill("#field-serverid", "12")
    page.click('button[data-action="confirm-detail"]'); page.wait_for_timeout(200)
    check("6. Mobile Legends needs a valid Zone ID", "Zone ID is 3–5 digits" in page.inner_text("#detail-modal"))
    check("6. what was typed is kept while showing the error", page.input_value("#field-playerid") == "123456789")
    page.click('button[data-action="close-detail"]'); page.wait_for_timeout(200)
    # server dropdown games
    go(page, "games"); page.click('button[data-action="filter-game"][data-val="genshin"]'); page.wait_for_timeout(150)
    page.locator('button[data-action="add-cart"]').first.click(); page.wait_for_timeout(250)
    check("6. Genshin Impact uses a server dropdown", page.eval_on_selector("#field-serverid", "e => e.tagName") == "SELECT")
    page.fill("#field-playerid", "800123456"); page.click('button[data-action="confirm-detail"]'); page.wait_for_timeout(200)
    check("6. choosing a server is required", "choose your server" in page.inner_text("#detail-modal").lower())
    page.click('button[data-action="close-detail"]'); page.wait_for_timeout(200)
    show_game(page, "coc")
    page.locator('button[data-action="add-cart"]').first.click(); page.wait_for_timeout(250)
    page.fill("#field-playerid", "2pp0lq8"); page.click('button[data-action="confirm-detail"]'); page.wait_for_timeout(350)   # the cart opens by itself
    check("6. Player Tags are tidied up (#2PP0LQ8)", "#2PP0LQ8" in page.inner_text("#drawer-body"))
    page.keyboard.press("Escape"); page.wait_for_timeout(250)

    # ---------------------------------------------------------------- 7. merged cart lines + promo
    add_to_cart(page, "freefire")      # same package, same ID as before -> merges
    page.click("#cart-btn"); page.wait_for_timeout(250)
    lines = page.locator(".cart-item").count()
    check("7. same package + same ID is one cart line (not two)", lines == 2, f"{lines} lines")   # freefire x2 merged + coc
    check("7. quantity went up instead", "2" in page.inner_text(".cart-item >> nth=0"))
    sub = int(re.sub(r"[^\d]", "", page.inner_text("#drawer-footer-wrap .summary-row >> nth=0").split("₱")[1]))
    page.fill("#promo-input", "NOPE"); page.click('button[data-action="apply-promo"]'); page.wait_for_timeout(200)
    check("7. an invalid promo code is rejected", "not valid" in page.inner_text("#drawer-footer-wrap"))
    page.fill("#promo-input", "lodezz10"); page.press("#promo-input", "Enter"); page.wait_for_timeout(250)
    footer_text = page.inner_text("#drawer-footer-wrap")
    disc = round(sub * 10 / 100); fee = round((sub - disc) * 0.02); total = sub - disc + fee
    check("7. promo code (any capitalisation, Enter key) is applied", "LODEZZ10" in footer_text and "applied" in footer_text)
    check(f"7. discount, fee and total add up ({peso(sub)} - {peso(disc)} + {peso(fee)} = {peso(total)})", peso(disc) in footer_text and peso(total) in footer_text, footer_text.replace("\n"," | "))
    page.keyboard.press("Escape"); page.wait_for_timeout(250)
    page.reload(); page.wait_for_timeout(450)
    page.click("#cart-btn"); page.wait_for_timeout(250)
    check("7. cart and promo survive a refresh", badge(page) == "3" and "LODEZZ10" in page.inner_text("#drawer-footer-wrap"))

    # ---------------------------------------------------------------- 8. checkout + payment step
    page.click('button[data-action="go-checkout"]'); page.wait_for_timeout(250)
    check("8. checkout shows the promo line", "LODEZZ10" in page.inner_text("#checkout-modal"))
    page.click('button[data-action="checkout-next"]'); page.wait_for_timeout(250)
    check("8. pre-selected payment is the user's method (Maya)", "active" in page.get_attribute('button[data-method="maya"]', "class"))
    check("8. payment step explains what to do and has a reference code", "Pay with Maya" in page.inner_text("#checkout-modal") and re.search(r"LDX-REF-\d{8}", page.inner_text("#checkout-modal")))
    page.click('button[data-action="confirm-payment"]'); page.wait_for_timeout(250)
    check("8. e-wallet payment needs a mobile number", "11-digit" in page.inner_text("#checkout-modal") and page.locator(".order-line").count() == 0)
    page.fill("#pay-mobile", "12345"); page.click('button[data-action="confirm-payment"]'); page.wait_for_timeout(200)
    check("8. an invalid number is rejected", "11-digit" in page.inner_text("#checkout-modal"))
    page.click('button[data-method="bank"]'); page.wait_for_timeout(150)
    check("8. bank transfer shows steps but no number box", "Bank Transfer" in page.inner_text("#checkout-modal") and page.locator("#pay-mobile").count() == 0)
    page.click('button[data-method="gcash"]'); page.wait_for_timeout(150)
    page.fill("#pay-mobile", "+639171234567")
    ref = re.search(r"LDX-REF-\d{8}", page.inner_text("#checkout-modal")).group(0)
    page.click('button[data-action="confirm-payment"]'); page.wait_for_timeout(1400)
    conf = page.inner_text("#checkout-modal")
    order_no = re.search(r"LDX-2026-\d{6}", conf).group(0)
    check("8. order confirmed with number, reference and masked number", "Order Confirmed" in conf and ref in conf and "0917•••4567" in conf and "4567" in conf and "09171234567" not in conf)
    check("8. cart and promo are cleared after the order", badge(page) == "0")
    with page.expect_download() as dl:
        page.click('button[data-action="download-receipt"]')
    d = dl.value; txt = pathlib.Path(d.path()).read_text(encoding="utf-8")
    check("8. receipt downloads with the order details", d.suggested_filename == f"Lodezz.x-receipt-{order_no}.txt" and order_no in txt and "LODEZZ10" in txt and peso(total) in txt, d.suggested_filename)
    page.click('button[data-action="checkout-track"]'); page.wait_for_timeout(350)
    check("8. Track Order opens My Orders at #/orders", route(page) == "orders" and hash_(page) == "#/orders")
    card = page.inner_text(".order-card.highlight")
    check("8. the order shows promo, reference, Processing", "LODEZZ10" in card and ref in card and "Processing" in card)

    # ---------------------------------------------------------------- 9. cancel order
    page.click('.order-card.highlight button[data-action="cancel-order"]'); page.wait_for_timeout(200)
    check("9. cancelling asks for a second click", "Click again to confirm" in page.inner_text(".order-card.highlight"))
    page.click('.order-card.highlight button[data-action="cancel-order"]'); page.wait_for_timeout(300)
    card = page.inner_text(".order-card.highlight")
    check("9. order becomes Cancelled with a refund note", "Cancelled" in card and "refunded" in card and "Cancel order" not in card)
    check("9. cancelled orders cannot be cancelled again", page.locator('.order-card.highlight button[data-action="cancel-order"]').count() == 0)
    # a second order, left to become Delivered
    add_to_cart(page, "roblox"); checkout_to_payment(page); pay(page, "bank")
    page.click('button[data-action="checkout-track"]'); page.wait_for_timeout(300)
    page.evaluate("""() => { const k='owt_demo_orders_ana@example.com'; const o=JSON.parse(localStorage.getItem(k)); o[0].at=new Date(Date.now()-120000).toISOString(); localStorage.setItem(k, JSON.stringify(o)); }""")
    go(page, "home"); page.click('footer button[data-target="orders"]'); page.wait_for_timeout(300)
    first = page.inner_text(".order-card >> nth=0")
    check("9. an old order shows Delivered and cannot be cancelled", "Delivered" in first and "Cancel order" not in first)
    page.screenshot(path=str(SHOTS / "orders.png"))

    # ---------------------------------------------------------------- 10. accounts: edit, password, delete
    page.click("#account-name"); page.wait_for_timeout(200)
    check("10. account window lists orders and the edit links", "Edit profile" in page.inner_text("#account-modal") and "2 ·" in page.inner_text("#account-modal"))
    page.click('button[data-view="profile"]'); page.wait_for_timeout(150)
    page.fill("#acct-name", "Ana M. Reyes"); page.select_option("#acct-payment", "gcash"); page.click('button[data-action="acct-save-profile"]'); page.wait_for_timeout(250)
    check("10. editing the name updates the navigation", page.inner_text("#account-name") == "Ana M. Reyes")
    check("10. editing the payment method is saved", "GCash" in page.inner_text("#account-modal"))
    page.click('button[data-view="password"]'); page.wait_for_timeout(150)
    page.fill("#acct-cur-pw", "wrong"); page.fill("#acct-new-pw", "newpass99"); page.fill("#acct-conf-pw", "newpass99"); page.click('button[data-action="acct-save-password"]'); page.wait_for_timeout(200)
    check("10. wrong current password is refused", "not correct" in page.inner_text("#account-modal"))
    page.fill("#acct-cur-pw", "anapass1"); page.fill("#acct-new-pw", "newpass99"); page.fill("#acct-conf-pw", "newpass99"); page.click('button[data-action="acct-save-password"]'); page.wait_for_timeout(250)
    check("10. password change succeeds", "Your password was changed" in toast(page))
    raw = page.evaluate("localStorage.getItem('owt_demo_accounts')")
    acc = json.loads(raw)["ana@example.com"]
    check("10. passwords are stored scrambled, never as plain text", "password" not in acc and len(acc.get("hash","")) == 64 and acc.get("salt") and "newpass99" not in raw and "anapass1" not in raw)
    page.click('#account-modal button[data-action="logout"]'); page.wait_for_timeout(300)
    login(page, "ana@example.com", "anapass1", "maya"); 
    check("10. the old password no longer works", route(page) == "login")
    login(page, "ana@example.com", "newpass99", "maya")
    check("10. the new password works", route(page) == "home")

    # ---------------------------------------------------------------- 11. lockout
    logout(page)
    for i in range(5):
        page.fill("#auth-identifier", "ana@example.com"); page.fill("#auth-password", "badbad" + str(i)); page.select_option("#auth-payment", "maya")
        page.click('button[data-action="auth-submit"]'); page.wait_for_timeout(120)
    check("11. five wrong passwords lock the account for a moment", "Too many wrong attempts" in page.inner_text("#err-general"))
    page.fill("#auth-password", "newpass99"); page.click('button[data-action="auth-submit"]'); page.wait_for_timeout(250)
    check("11. even the right password is refused while locked", route(page) == "login" and "Too many wrong attempts" in page.inner_text("#err-general"))
    page.evaluate("""() => { const a=JSON.parse(localStorage.getItem('owt_demo_attempts')); Object.keys(a).forEach(k => a[k].until = 0); localStorage.setItem('owt_demo_attempts', JSON.stringify(a)); }""")
    page.click('button[data-action="auth-submit"]'); page.wait_for_timeout(350)
    check("11. after the wait the right password works again", route(page) == "home")

    # ---------------------------------------------------------------- 12. migration of old plain-text accounts
    logout(page)
    page.evaluate("""() => { const a=JSON.parse(localStorage.getItem('owt_demo_accounts')); a['legacy@example.com']={name:'Legacy User',password:'legacy123',paymentMethod:'maya',likedGames:['roblox']}; localStorage.setItem('owt_demo_accounts', JSON.stringify(a)); }""")
    page.reload(); page.wait_for_timeout(450)
    login(page, "legacy@example.com", "legacy123", "maya")
    check("12. an old plain-text account still logs in", route(page) == "home" and page.inner_text("#account-name") == "Legacy User")
    raw = page.evaluate("localStorage.getItem('owt_demo_accounts')")
    check("12. ...and its password was scrambled on the way", "legacy123" not in raw)
    logout(page)

    # ---------------------------------------------------------------- 13. delete account
    register(page, "Temp User", "temp.user", "temppass1", "card", pick=("roblox",))
    page.click("#account-name"); page.click('button[data-view="delete"]'); page.wait_for_timeout(150)
    page.fill("#acct-del-pw", "nope"); page.click('button[data-action="acct-delete"]'); page.wait_for_timeout(200)
    check("13. delete needs the right password", "not correct" in page.inner_text("#account-modal") and route(page) == "home")
    page.fill("#acct-del-pw", "temppass1"); page.click('button[data-action="acct-delete"]'); page.wait_for_timeout(400)
    check("13. deleting the account signs out and removes it", route(page) == "login" and "temp.user" not in page.evaluate("localStorage.getItem('owt_demo_accounts')"))
    login(page, "temp.user", "temppass1", "card")
    check("13. a deleted account cannot log in", route(page) == "login" and page.is_visible("#err-general"))

    # ---------------------------------------------------------------- 14. administrator
    login(page, "juan@example.com", "juan1234", "gcash")
    go(page, "home"); page.evaluate("location.hash = '#/admin'"); page.wait_for_timeout(350)
    check("14. customers cannot open the admin page", route(page) == "home" and "do not have access" in toast(page))
    check("14. customers see no Admin link", page.locator(".admin-link:visible").count() == 0)
    logout(page)
    login(page, "admin", "admin1234", "gcash")
    check("14. the administrator is not asked for liked games", route(page) == "home")
    check("14. the administrator sees an Admin link", page.locator("#account-chip .admin-link:visible").count() == 1)
    page.click("#account-chip .admin-link"); page.wait_for_timeout(350)
    check("14. admin page opens at #/admin", route(page) == "admin" and hash_(page) == "#/admin")
    check("14. the admin page opens on the Dashboard", page.get_attribute('button[data-tab="dashboard"]', "aria-selected") == "true")
    page.click('button[data-tab="orders"]'); page.wait_for_timeout(200)
    check("14. admin sees orders from other customers", "ana@example.com" in page.inner_text("#admin-body") and "Ana M. Reyes" in page.inner_text("#admin-body"))
    # prices & stock
    page.click('button[data-tab="products"]'); page.wait_for_timeout(250)
    page.select_option("#admin-game", "roblox"); page.wait_for_timeout(150)
    page.fill('tr[data-pkg="rb-80"] .ad-price', "59"); page.select_option('tr[data-pkg="rb-80"] .ad-stock', "low")
    page.click('button[data-ad="save-product"][data-pkg="rb-80"]'); page.wait_for_timeout(250)
    page.select_option('tr[data-pkg="rb-400"] .ad-stock', "out"); page.click('button[data-ad="save-product"][data-pkg="rb-400"]'); page.wait_for_timeout(250)
    page.fill('tr[data-pkg="rb-800"] .ad-was', "300"); page.click('button[data-ad="save-product"][data-pkg="rb-800"]'); page.wait_for_timeout(250)
    check("14. a bad original price is refused (must be higher)", "must be higher" in toast(page))
    show_game(page, "roblox")
    grid = page.inner_text("#product-grid-wrap")
    check("14. a price change appears in the shop", "₱59" in grid and "Low stock" in grid)
    check("14. sold-out packages show 'Sold out' and cannot be added", "Sold out" in grid and page.locator('button[data-action="add-cart"][data-product="rb-400"]').is_disabled())
    go(page, "admin"); page.click('button[data-tab="products"]'); page.wait_for_timeout(200)
    page.click('button[data-ad="reset-product"][data-pkg="rb-80"]'); page.click('button[data-ad="reset-product"][data-pkg="rb-400"]'); page.wait_for_timeout(300)
    show_game(page, "roblox")
    check("14. reset puts the original price and stock back", "₱49" in page.inner_text("#product-grid-wrap") and "Sold out" not in page.inner_text("#product-grid-wrap"))
    # promo codes
    go(page, "admin"); page.click('button[data-tab="promos"]'); page.wait_for_timeout(200)
    page.fill("#promo-new-code", "save5"); page.fill("#promo-new-pct", "5"); page.click('button[data-ad="add-promo"]'); page.wait_for_timeout(250)
    check("14. admin can add a promo code", "SAVE5" in page.inner_text("#admin-body"))
    page.fill("#promo-new-code", "SAVE5"); page.fill("#promo-new-pct", "5"); page.click('button[data-ad="add-promo"]'); page.wait_for_timeout(200)
    check("14. duplicate promo codes are refused", "already exists" in toast(page))
    page.uncheck('input[data-ad="toggle-promo"][data-i="0"]'); page.wait_for_timeout(250)
    go(page, "home")
    check("14. switching a code off removes it from the home banner", "LODEZZ10" not in page.inner_text("#promo-code-line") if page.is_visible("#promo-code-line") else True)
    go(page, "admin"); page.click('button[data-tab="promos"]'); page.check('input[data-ad="toggle-promo"][data-i="0"]'); page.wait_for_timeout(250)
    # sale end date
    go(page, "games")
    check("14. discounts show while the sale is on", page.locator("#product-grid-wrap .price-was").count() > 0)
    go(page, "admin"); page.click('button[data-tab="promos"]'); page.wait_for_timeout(200)
    page.fill("#sale-end-input", "2020-01-01T10:00"); page.click('button[data-ad="save-sale"]'); page.wait_for_timeout(350)
    go(page, "games")
    check("14. when the sale has ended, discounts disappear", page.locator("#product-grid-wrap .price-was").count() == 0 and "Sale ended" in page.inner_text(".deal-pill"))
    go(page, "admin"); page.click('button[data-tab="promos"]'); page.click('button[data-ad="daily-sale"]'); page.wait_for_timeout(350)
    go(page, "games")
    check("14. back to daily deals brings the discounts back", page.locator("#product-grid-wrap .price-was").count() > 0)
    # admin order actions
    logout(page); login(page, "ana@example.com", "newpass99", "maya")
    add_to_cart(page, "valorant"); checkout_to_payment(page); pay(page, "qr"); page.click('button[data-action="checkout-done"]'); page.wait_for_timeout(300)
    logout(page); login(page, "admin", "admin1234", "gcash")
    go(page, "admin"); page.wait_for_timeout(200)
    check("14. the admin page starts on the Dashboard after a new login", page.get_attribute('button[data-tab="dashboard"]', "aria-selected") == "true")
    page.click('button[data-tab="orders"]'); page.wait_for_timeout(200)
    page.click('button[data-ad="deliver"]'); page.wait_for_timeout(300)
    check("14. admin can mark an order as delivered", "marked as delivered" in toast(page))
    page.select_option("#admin-order-status", "cancelled"); page.wait_for_timeout(200)
    check("14. admin can filter orders by status", page.locator(".admin-table tbody tr").count() >= 1 and "Cancelled" in page.inner_text(".admin-table"))
    page.fill("#admin-order-search", "zzzz"); page.wait_for_timeout(200)
    check("14. admin can search orders", "No orders to show" in page.inner_text("#admin-body"))
    logout(page)

    # ---------------------------------------------------------------- 14b. NEW: admin dashboard, customers, packages, site
    login(page, "admin", "admin1234", "gcash")
    go(page, "admin"); page.wait_for_timeout(250)
    dash = page.inner_text("#admin-body")
    check("20. dashboard shows sales figures and charts", "Sales today" in dash and "Last 7 days" in dash and page.locator(".bar-col").count() == 7)
    check("20. dashboard shows sales by game in each game's color", page.locator(".hbar-fill").count() >= 1 and "Sales by game" in dash)
    check("20. dashboard lists top packages and what needs attention", "Top packages" in dash and "Needs attention" in dash)

    page.click('button[data-tab="orders"]'); page.wait_for_timeout(200)
    with page.expect_download() as dl:
        page.click('button[data-ad="export-csv"]')
    csv = pathlib.Path(dl.value.path()).read_text(encoding="utf-8-sig")
    check("20. orders export to CSV with a header and real orders", csv.splitlines()[0].startswith('"Order","Date","Customer"') and "LDX-2026-" in csv and dl.value.suggested_filename.startswith("lodezz-orders-"), csv[:80])

    # customers
    page.click('button[data-tab="customers"]'); page.wait_for_timeout(250)
    check("20. customers tab lists accounts with orders and spending", "ana@example.com" in page.inner_text("#admin-body") and "last login" in page.inner_text("#admin-body").lower())
    page.fill("#admin-cust-search", "ana"); page.wait_for_timeout(150)
    check("20. customers can be searched", page.locator(".admin-table tbody tr").count() == 1)
    page.click('button[data-ad="view-orders"]'); page.wait_for_timeout(250)
    check("20. 'View orders' jumps to that customer's orders", page.get_attribute('button[data-tab="orders"]', "aria-selected") == "true" and page.input_value("#admin-order-search") == "ana@example.com")
    page.click('button[data-tab="customers"]'); page.fill("#admin-cust-search", "ana"); page.wait_for_timeout(150)
    page.click('button[data-ad="toggle-suspend"]'); page.wait_for_timeout(250)
    check("20. admin can suspend a customer", "Suspended" in page.inner_text(".admin-table tbody"))
    logout(page)
    login(page, "ana@example.com", "newpass99", "maya")
    check("20. a suspended customer cannot log in", route(page) == "login" and "suspended" in page.inner_text("#err-general"))
    login(page, "admin", "admin1234", "gcash")
    go(page, "admin"); page.click('button[data-tab="customers"]'); page.fill("#admin-cust-search", "ana"); page.wait_for_timeout(150)
    page.click('button[data-ad="toggle-suspend"]'); page.wait_for_timeout(200)
    page.click('button[data-ad="reset-password"]'); page.wait_for_timeout(250)
    notice = page.inner_text(".admin-info")
    temp = re.search(r"Tmp-[0-9a-f]{6}", notice)
    check("20. admin can reset a password and sees a temporary one", bool(temp))
    logout(page)
    login(page, "ana@example.com", "newpass99", "maya")
    check("20. the old password stops working after a reset", route(page) == "login")
    login(page, "ana@example.com", temp.group(0), "maya")
    check("20. the temporary password works", route(page) == "home")
    # put things back for the rest of the run
    page.click("#account-name"); page.click('button[data-view="password"]'); page.wait_for_timeout(150)
    page.fill("#acct-cur-pw", temp.group(0)); page.fill("#acct-new-pw", "newpass99"); page.fill("#acct-conf-pw", "newpass99")
    page.click('button[data-action="acct-save-password"]'); page.wait_for_timeout(250)
    logout(page); login(page, "admin", "admin1234", "gcash")

    # ---------------------------------------------------------------- 21. NEW: bonus, tags, hidden + added packages
    go(page, "admin"); page.click('button[data-tab="products"]'); page.wait_for_timeout(200)
    page.select_option("#admin-game", "roblox"); page.wait_for_timeout(150)
    page.fill('tr[data-pkg="rb-800"] .ad-bonus', "80"); page.select_option('tr[data-pkg="rb-800"] .ad-tag', "hot")
    page.click('button[data-ad="save-product"][data-pkg="rb-800"]'); page.wait_for_timeout(250)
    page.fill('tr[data-pkg="rb-1700"] .ad-bonus', "-5"); page.click('button[data-ad="save-product"][data-pkg="rb-1700"]'); page.wait_for_timeout(200)
    check("21. a negative bonus is refused", "bonus must be 0 or more" in toast(page))
    page.uncheck('tr[data-pkg="rb-80"] .ad-shown'); page.click('button[data-ad="save-product"][data-pkg="rb-80"]'); page.wait_for_timeout(250)
    page.fill("#new-pkg-amount", "1500"); page.fill("#new-pkg-price", "699"); page.fill("#new-pkg-was", "799"); page.fill("#new-pkg-bonus", "100"); page.select_option("#new-pkg-tag", "best")
    page.click('button[data-ad="add-package"]'); page.wait_for_timeout(300)
    check("21. admin can add a package (named with the full currency)", "1,500 Robux" in page.inner_text("#admin-body") and "(added)" in page.inner_text("#admin-body"))
    page.fill("#new-pkg-amount", "1500"); page.fill("#new-pkg-price", "699"); page.click('button[data-ad="add-package"]'); page.wait_for_timeout(200)
    check("21. a duplicate package amount is refused", "already has a package" in toast(page))
    show_game(page, "roblox")
    grid = page.inner_text("#product-grid-wrap")
    check("21. the shop shows the bonus chip and the tag", "+80 bonus Robux" in grid and "Hot" in grid and "Best value" in grid)
    check("21. a hidden package is not in the shop", "80 Robux" not in page.locator("#product-grid-wrap .product-top .amount").all_inner_texts() and "1,500 Robux" in grid)
    check("21. the new package appears with its own price and bonus", "₱699" in grid and "+100 bonus Robux" in grid)
    logout(page)

    login(page, "ana@example.com", "newpass99", "maya")
    show_game(page, "roblox")
    page.locator('button[data-action="add-cart"][data-product="rb-800"]').click(); page.wait_for_timeout(250)
    check("21. the product window says the bonus is included", "+80 bonus Robux" in page.inner_text("#detail-modal"))
    fill_ids(page, "roblox"); page.click('button[data-action="confirm-detail"]'); page.wait_for_timeout(350)
    check("21. the cart shows the bonus", "+80 bonus Robux" in page.inner_text("#drawer-body"))
    page.click('button[data-action="go-checkout"]'); page.wait_for_timeout(250)
    check("21. checkout shows the bonus", "+80 bonus Robux" in page.inner_text("#checkout-modal"))
    page.click('button[data-action="checkout-next"]'); page.wait_for_timeout(200)
    pay(page, "bank")
    with page.expect_download() as dl:
        page.click('button[data-action="download-receipt"]')
    check("21. the receipt lists the bonus", "Bonus: +80 Robux" in pathlib.Path(dl.value.path()).read_text(encoding="utf-8"))
    page.click('button[data-action="checkout-track"]'); page.wait_for_timeout(300)
    check("21. My Orders shows the bonus", "+80 bonus Robux" in page.inner_text(".order-card.highlight"))

    # ---------------------------------------------------------------- 22. NEW: My Orders search, filter, buy again
    check("22. My Orders shows a summary (count and spending)", "orders" in page.inner_text("#orders-summary") and "spent" in page.inner_text("#orders-summary"))
    total_orders = page.locator(".order-card").count()
    page.fill("#orders-search", "Valorant"); page.wait_for_timeout(200)
    check("22. orders can be searched by game", 0 < page.locator(".order-card").count() < total_orders)
    page.fill("#orders-search", "zzzzz"); page.wait_for_timeout(200)
    check("22. no match shows a friendly message", "No orders match" in page.inner_text("#orders-list"))
    page.fill("#orders-search", ""); page.select_option("#orders-status", "cancelled"); page.wait_for_timeout(200)
    check("22. orders can be filtered by status", page.locator(".order-card").count() >= 1 and all("Cancelled" in c for c in page.locator(".order-card .status-badge").all_inner_texts()))
    page.select_option("#orders-status", "all"); page.wait_for_timeout(150)
    before = badge(page)
    page.locator('.order-card.highlight button[data-action="reorder"]').click(); page.wait_for_timeout(350)
    check("22. 'Buy again' puts the order's items back in the cart", badge(page) != before and "+80 bonus Robux" in page.inner_text("#drawer-body"))
    page.keyboard.press("Escape"); page.wait_for_timeout(250)
    page.evaluate("state.cart = []; saveCart(); renderCartBadge();")
    logout(page)

    # ---------------------------------------------------------------- 23. NEW: flash sale for one package
    login(page, "admin", "admin1234", "gcash")
    go(page, "admin"); page.click('button[data-tab="products"]'); page.select_option("#admin-game", "roblox"); page.wait_for_timeout(200)
    page.fill('tr[data-pkg="rb-400"] .ad-flash-price', "99")
    page.click('button[data-ad="save-product"][data-pkg="rb-400"]'); page.wait_for_timeout(200)
    check("23. a flash price needs an end time", "needs both" in toast(page))
    page.fill('tr[data-pkg="rb-400"] .ad-flash-price', "250"); page.fill('tr[data-pkg="rb-400"] .ad-flash-end', "2031-01-01T10:00")
    page.click('button[data-ad="save-product"][data-pkg="rb-400"]'); page.wait_for_timeout(200)
    check("23. a flash price must be lower than the price", "lower than the price" in toast(page))
    page.fill('tr[data-pkg="rb-400"] .ad-flash-price', "99"); page.fill('tr[data-pkg="rb-400"] .ad-flash-end', "2020-01-01T10:00")
    page.click('button[data-ad="save-product"][data-pkg="rb-400"]'); page.wait_for_timeout(200)
    check("23. a flash sale cannot end in the past", "end in the future" in toast(page))
    page.fill('tr[data-pkg="rb-400"] .ad-flash-end', "2031-01-01T10:00"); page.click('button[data-ad="save-product"][data-pkg="rb-400"]'); page.wait_for_timeout(300)
    show_game(page, "roblox")
    card = page.inner_text('.product-card:has(button[data-product="rb-400"])')
    check("23. the flash package shows its flash price, old price and a countdown", "₱99" in card and "₱199" in card and "Flash sale" in card)
    page.locator('button[data-action="add-cart"][data-product="rb-400"]').click(); page.wait_for_timeout(250)
    fill_ids(page, "roblox"); page.click('button[data-action="confirm-detail"]'); page.wait_for_timeout(350)
    check("23. the cart uses the flash price", "₱99" in page.inner_text("#drawer-body"))
    page.keyboard.press("Escape"); page.wait_for_timeout(250)
    # let a short flash sale run out on its own
    page.evaluate("""() => { const s = JSON.parse(localStorage.getItem('owt_admin_settings')); s.products['rb-400'].flashEnd = Date.now() + 2500; localStorage.setItem('owt_admin_settings', JSON.stringify(s)); applyAdminSettings(); syncCartWithAccount(); renderProductGrid(); }""")
    page.wait_for_timeout(4500)
    card = page.inner_text('.product-card:has(button[data-product="rb-400"])')
    check("23. when the flash sale ends the normal price returns by itself", "₱199" in card and "Flash sale" not in card and "₱99" not in card)
    page.evaluate("state.cart = []; saveCart(); renderCartBadge();")

    # ---------------------------------------------------------------- 24. NEW: message bar, fee, processing time
    go(page, "admin"); page.click('button[data-tab="site"]'); page.wait_for_timeout(200)
    page.fill("#ann-text", "Weekend sale: extra bonus on Robux!"); page.select_option("#ann-style", "sale")
    page.click('button[data-ad="save-announcement"]'); page.wait_for_timeout(300)
    check("24. a colored message bar appears under the header", page.is_visible("#announcement") and "Weekend sale" in page.inner_text("#announcement") and "sale" in page.get_attribute("#announcement", "class"))
    check("24. the page content makes room for it", page.evaluate("document.body.classList.contains('has-announcement')"))
    logout(page)
    check("24. the message is also on the login page", page.is_visible("#announcement") and route(page) == "login")
    page.click('#announcement button[data-action="dismiss-announcement"]'); page.wait_for_timeout(200)
    check("24. visitors can dismiss it", not page.is_visible("#announcement"))
    page.reload(); page.wait_for_timeout(450)
    check("24. it stays dismissed for the rest of the visit", not page.is_visible("#announcement"))
    login(page, "admin", "admin1234", "gcash")
    go(page, "admin"); page.click('button[data-tab="site"]'); page.wait_for_timeout(200)
    page.fill("#ann-text", "Maintenance tonight at 11 PM"); page.select_option("#ann-style", "warning"); page.click('button[data-ad="save-announcement"]'); page.wait_for_timeout(250)
    check("24. a changed message shows again", page.is_visible("#announcement") and "warning" in page.get_attribute("#announcement", "class"))
    page.uncheck("#ann-active"); page.click('button[data-ad="save-announcement"]'); page.wait_for_timeout(250)
    check("24. the message can be switched off", not page.is_visible("#announcement"))
    page.fill("#site-fee", "0"); page.fill("#site-processing", "10"); page.click('button[data-ad="save-orders-settings"]'); page.wait_for_timeout(250)
    page.fill("#site-fee", "50"); page.click('button[data-ad="save-orders-settings"]'); page.wait_for_timeout(200)
    check("24. an out-of-range fee is refused", "between 0% and 10%" in toast(page))
    add_to_cart(page, "freefire", close=False)
    check("24. the service fee follows the site setting (0%)", "Service fee (0%)" in page.inner_text("#drawer-footer-wrap"))
    page.keyboard.press("Escape"); page.wait_for_timeout(250)
    checkout_to_payment(page); pay(page, "card"); page.click('button[data-action="checkout-track"]'); page.wait_for_timeout(300)
    check("24. a new order starts as Processing", "Processing" in page.inner_text(".order-card.highlight .status-badge"))
    page.wait_for_timeout(11000)
    page.evaluate("renderOrders()"); page.wait_for_timeout(200)
    check("24. the processing time follows the site setting (10 seconds)", "Delivered" in page.inner_text(".order-card >> nth=0 >> .status-badge"))

    # ---------------------------------------------------------------- 25. NEW: color themes
    page.click("#account-name"); page.wait_for_timeout(200)
    before_color = page.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--blue').trim()")
    page.click('button[data-action="set-accent"][data-accent="emerald"]'); page.wait_for_timeout(250)
    check("25. choosing a color theme changes the site colors", page.evaluate("document.documentElement.getAttribute('data-accent')") == "emerald" and page.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--blue').trim()") != before_color)
    page.screenshot(path=str(SHOTS / "emerald-account.png"))
    page.keyboard.press("Escape"); page.wait_for_timeout(200)
    page.reload(); page.wait_for_timeout(450)
    check("25. the chosen color theme is remembered", page.evaluate("document.documentElement.getAttribute('data-accent')") == "emerald")
    go(page, "games")
    gc = page.evaluate("getComputedStyle(document.querySelector('#game-grid .game-card')).getPropertyValue('--game').trim()")
    check("25. every game card carries its own color", re.match(r"^#[0-9A-Fa-f]{6}$", gc) is not None, gc)
    colors = set(page.eval_on_selector_all("#game-grid .game-card", "els => els.map(e => e.style.getPropertyValue('--game').trim())"))
    check("25. the 12 games use 12 different colors", len(colors) == 12, len(colors))
    page.click("#theme-btn"); page.wait_for_timeout(200)
    check("25. color themes also work in light mode", page.evaluate("document.documentElement.getAttribute('data-theme')") == "light" and page.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--eblue').trim()").lower() == "#047857")
    page.click("#theme-btn"); page.wait_for_timeout(200)
    page.click("#account-name"); page.click('button[data-action="set-accent"][data-accent="default"]'); page.wait_for_timeout(250)
    check("25. 'Use the site color' removes the personal choice", page.evaluate("localStorage.getItem('owt_accent')") is None)
    page.keyboard.press("Escape"); page.wait_for_timeout(200)
    go(page, "admin"); page.click('button[data-tab="site"]'); page.click('button[data-ad="site-accent"][data-accent="rose"]'); page.wait_for_timeout(300)
    check("25. the administrator can set the site's default color", page.evaluate("document.documentElement.getAttribute('data-accent')") == "rose")

    # ---------------------------------------------------------------- 26. NEW: activity log + reset
    page.click('button[data-tab="activity"]'); page.wait_for_timeout(250)
    act = page.inner_text("#admin-body")
    check("26. the activity log records admin actions", "Saved package" in act and "Added package" in act and "Set the site color to rose" in act and "Site Administrator" in act)
    page.click('button[data-tab="site"]'); page.wait_for_timeout(150)
    page.click('button[data-ad="reset-all"]'); page.wait_for_timeout(200)
    check("26. resetting everything asks for a second click", "Click again to confirm" in page.inner_text("#admin-body"))
    page.click('button[data-ad="reset-all"]'); page.wait_for_timeout(350)
    check("26. reset puts the site color back", page.evaluate("document.documentElement.getAttribute('data-accent')") == "violet")
    show_game(page, "roblox")
    grid = page.inner_text("#product-grid-wrap")
    check("26. reset removes added packages, bonuses and hidden packages", "1,500 Robux" not in grid and "bonus" not in grid and "80 Robux" in page.locator("#product-grid-wrap .product-top .amount").all_inner_texts())
    go(page, "admin"); page.click('button[data-tab="activity"]'); page.wait_for_timeout(200)
    check("26. the log survives the reset and notes it", "Reset all admin changes" in page.inner_text("#admin-body"))

    # admin pages must not scroll the whole page sideways on a phone
    page.set_viewport_size({"width":360, "height":780}); page.wait_for_timeout(200)
    bad_tabs = []
    for tab in ["dashboard","orders","customers","products","promos","site","activity"]:
        page.click(f'button[data-tab="{tab}"]'); page.wait_for_timeout(150)
        if page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth"): bad_tabs.append(tab)
    check("26. every admin tab fits a 360px phone (tables scroll inside themselves)", not bad_tabs, bad_tabs)
    page.set_viewport_size({"width":1300, "height":900})
    logout(page)

    # ---------------------------------------------------------------- 15. keyboard + dialogs
    login(page, "ana@example.com", "newpass99", "maya")
    show_game(page, "roblox")
    opener = page.locator('button[data-action="add-cart"]').first
    opener.focus(); opener.click(); page.wait_for_timeout(250)
    check("15. opening a pop-up moves focus inside it", page.evaluate("document.getElementById('detail-modal').contains(document.activeElement)"))
    for _ in range(12): page.keyboard.press("Tab")
    check("15. Tab stays inside the pop-up", page.evaluate("document.getElementById('detail-modal').contains(document.activeElement)"))
    page.keyboard.press("Shift+Tab")
    check("15. Shift+Tab stays inside too", page.evaluate("document.getElementById('detail-modal').contains(document.activeElement)"))
    page.keyboard.press("Escape"); page.wait_for_timeout(250)
    check("15. Esc closes the product window", not page.is_visible("#detail-modal"))
    check("15. focus returns to the button that opened it", page.evaluate("document.activeElement && document.activeElement.dataset.action") == "add-cart")
    opener.click(); page.wait_for_timeout(250)
    page.mouse.click(8, 450); page.wait_for_timeout(250)
    check("15. clicking outside closes the product window", not page.is_visible("#detail-modal"))
    page.click("#cart-btn"); page.wait_for_timeout(250)
    page.keyboard.press("Escape"); page.wait_for_timeout(300)
    check("15. Esc closes the cart", "open" not in page.get_attribute("#cart-overlay", "class"))
    page.click("#account-name"); page.wait_for_timeout(200)
    page.keyboard.press("Escape"); page.wait_for_timeout(250)
    check("15. Esc closes the account window", not page.is_visible("#account-modal"))

    # ---------------------------------------------------------------- 16. theme
    page.click("#theme-btn"); page.wait_for_timeout(250)
    check("16. light theme switches on", page.evaluate("document.documentElement.getAttribute('data-theme')") == "light")
    check("16. the light theme has dark text on a light page", page.evaluate("getComputedStyle(document.body).backgroundColor") != "rgb(5, 5, 9)")
    page.screenshot(path=str(SHOTS / "light-theme.png"))
    page.reload(); page.wait_for_timeout(450)
    check("16. the chosen theme is remembered", page.evaluate("document.documentElement.getAttribute('data-theme')") == "light")
    page.click("#theme-btn"); page.wait_for_timeout(250)
    check("16. and it switches back to dark", page.evaluate("document.documentElement.getAttribute('data-theme')") == "dark")

    # ---------------------------------------------------------------- 17. reduced motion
    ctx2 = browser.new_context(viewport={"width":1300,"height":900}, reduced_motion="reduce")
    p2 = ctx2.new_page(); p2.goto(URL); p2.wait_for_timeout(400)
    login(p2, "juan@example.com", "juan1234", "gcash")
    show_game(p2, "roblox")
    p2.locator('button[data-action="add-cart"]').first.click(); p2.wait_for_timeout(250)
    fill_ids(p2, "roblox"); p2.click('button[data-action="confirm-detail"]'); p2.wait_for_timeout(500)
    check("17. no confetti when the device asks for reduced motion", p2.locator("#confetti-layer span").count() == 0)
    ctx2.close()

    # ---------------------------------------------------------------- 18. phone layout
    page.set_viewport_size({"width":360, "height":780}); page.wait_for_timeout(250)
    go(page, "home")
    check("18. phone: no sideways scrolling", not page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth"))
    check("18. phone: the menu button is on screen", page.evaluate("document.getElementById('hamburger-btn').getBoundingClientRect().right <= innerWidth"))
    page.click("#hamburger-btn"); page.wait_for_timeout(200)
    check("18. phone: theme switch and account are in the menu", page.is_visible("#theme-link-mobile") and page.is_visible("#account-name-mobile"))
    page.keyboard.press("Escape"); page.wait_for_timeout(200)
    check("18. phone: Esc closes the menu", not page.evaluate("document.getElementById('mobile-menu').classList.contains('open')"))
    for target in ["games","orders","faq","terms"]:
        if target == "terms": page.evaluate("location.hash = '#/terms'"); page.wait_for_timeout(250)
        else: page.evaluate(f"goTo('{target}')"); page.wait_for_timeout(250)
        ok = not page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
        check(f"18. phone: {target} page fits the screen", ok)

    # header must fit at every screen width, for a customer and for the administrator
    def header_fits():
        return page.evaluate("""() => {
          const vis = e => getComputedStyle(e).display !== 'none' && e.getClientRects().length > 0;
          const R = s => document.querySelector(s).getBoundingClientRect();
          const brand = R('.brand'), actions = R('.nav-actions'), linksEl = document.querySelector('.nav-links');
          const links = vis(linksEl) ? linksEl.getBoundingClientRect() : null;
          const hb = document.getElementById('hamburger-btn');
          const left = links ? links.right : brand.right;
          return actions.right <= innerWidth + 0.5 && actions.left >= left - 1 && (!links || links.left >= brand.right - 1) && (!vis(hb) || hb.getBoundingClientRect().right <= innerWidth);
        }""")
    widths = [320, 360, 390, 430, 540, 640, 700, 768, 800, 860, 900, 960, 1024, 1100, 1300]
    bad = []
    for w in widths:
        page.set_viewport_size({"width":w, "height":800}); page.wait_for_timeout(60)
        if not header_fits(): bad.append(("customer", w))
    page.set_viewport_size({"width":1300, "height":900}); logout(page); login(page, "admin", "admin1234", "gcash")
    for w in widths:
        page.set_viewport_size({"width":w, "height":800}); page.wait_for_timeout(60)
        if not header_fits(): bad.append(("admin", w))
    check("18. the header fits at 15 screen widths (customer and admin)", not bad, bad)
    page.set_viewport_size({"width":1300, "height":900}); logout(page); login(page, "ana@example.com", "newpass99", "maya")

    # ---------------------------------------------------------------- 19. idle sign-out
    page.set_viewport_size({"width":1300, "height":900}); go(page, "home")
    page.evaluate("lastActivity = Date.now() - 31*60*1000")
    page.wait_for_timeout(16500)
    check("19. signed out after 30 minutes of inactivity", route(page) == "login")

    check("no console errors in the whole run", not errors, errors[:3])
    browser.close()

with sync_playwright() as p:
    run(p)

failed = [n for n, ok in results if not ok]
print(f"\n{len(results) - len(failed)} of {len(results)} checks passed ({ENGINE})")
if failed:
    print("FAILED:"); [print("  -", n) for n in failed]
    sys.exit(1)
print("ALL PASS")
