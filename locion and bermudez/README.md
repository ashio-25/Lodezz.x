# Lodezz.x

A game top-up store for the games Filipinos play: Robux, Mobile Legends Diamonds, Valorant Points,
Genshin Crystals and more, paid with GCash, Maya, bank transfer, card or QR.

It is plain HTML, CSS and JavaScript. There is nothing to install or build.

## Run it

Open `index.html` in a browser (double-click it). Keep all the files in the same folder.

## Accounts to try

| Who | Email / username | Password |
|---|---|---|
| Customer | `juan@example.com` | `juan1234` |
| Administrator | `admin` | `admin1234` |

You can also create your own customer account on the login page.
**Change the administrator password** from *My Account → Change password*.

A promo code to try in the cart: `LODEZZ10` (10% off).

## What is in the folder

| File | What it does |
|---|---|
| `index.html` | All the pages (home, games, how it works, FAQ, support, policies, orders, admin, login) |
| `styles.css` | Look and feel, including the dark and light themes |
| `data.js` | **Edit this to change content:** games, packages, prices, FAQ, payment methods, promo defaults, and the Terms / Privacy / Refund text |
| `script.js` | The shop: login, routing, search, cart, checkout, orders, account |
| `admin.js` | The admin page |
| `tests/e2e_test.py` | Automatic browser tests (see below) |

## What it does

**For customers**
- Login comes first. Customers pick the games they like before they see the shop; liked games are listed first.
- Every page has its own address (for example `index.html#/faq`), so refresh, Back and Forward work.
- Search with suggestions, filters and sorting; sale prices; stock labels (in stock, low stock, sold out).
- Package labels: **Hot / Best value / New** tags, **bonus currency** ("+80 bonus Robux") and **flash sales** with a countdown.
- Per-game ID checks (Riot ID, UID, User ID plus Zone, Player Tag, and so on) and remembered IDs.
- Cart saved per account, promo codes, and a payment step with instructions and a reference code.
- My Orders: search and filter, spending summary, **Buy again**, Cancel order (while Processing) and a downloadable receipt.
- My Account: edit profile, change password, delete account, login history, "Remember this account", and a **color theme** (Violet, Ocean, Emerald, Rose, Sunset).
- Every game has its own color. Dark and light modes. Terms, Privacy and Refund pages, reachable before logging in.
- Keyboard support (Esc closes pop-ups, Tab stays inside them) and reduced-motion support.

**For the administrator** (log in as `admin`, then open **Admin**)
- **Dashboard:** sales today / last 7 days / all time, a 7-day chart, sales by game, top packages and what needs attention.
- **Orders:** every customer's orders. Search, filter by status, mark delivered or cancel, and **Export CSV**.
- **Customers:** spending, last login, **suspend / unsuspend**, **reset password** (shows a temporary one), and "View orders".
- **Packages:** per game, edit price, original price, **bonus**, **tag**, stock, a **flash sale** (flash price + end time) and whether it is shown.
  You can also **add a package** (amount is named with the full currency) and delete the ones you added.
- **Promos & sale:** promo codes (add, switch on/off, delete) and the site-wide sale end date.
- **Site:** the default **site color**, a colored **message bar** under the header, the **service fee** and the **processing time**, and a two-click **reset**.
- **Activity:** a log of everything done on the admin page.

## Good to know (limits of this version)

- **There is no server.** Accounts, carts, orders, prices set in the admin page, and settings are all stored in the
  browser on the device you are using. Another browser or device starts empty, and clearing browser data deletes them.
- **The login check runs in the browser.** Passwords are stored scrambled (salted SHA-256), but anyone with access to the
  browser's developer tools can still change what is stored. Real security needs a server.
- **Payments are not connected to any payment provider.** Placing an order records it in My Orders; no money moves
  and nothing is delivered to a game. Do not put this online as a real shop without adding a real payment provider
  and a server that delivers the top-ups.
- **Order status is automatic:** Processing for 45 seconds, then Delivered, unless cancelled or set by the administrator.
- The site was tested in Chromium. It uses standard features, but Safari and Firefox have not been checked.

## Tests

```
pip install playwright
playwright install chromium
python tests/e2e_test.py
```

It opens the site in a real browser and checks about 185 things: login and registration, every page address,
search and sorting, ID checks, cart and promo codes, checkout, orders, cancelling, receipts, account editing,
the admin page, bonuses and flash sales, color themes, keyboard handling and phone layouts. Use `python tests/e2e_test.py firefox` (or `webkit`)
after running `playwright install firefox` (or `webkit`) to try other browsers.
