# 株式会社南越製作所 — Website Project Brief

## Tổng quan
Website giới thiệu công ty gia công cơ khí chính xác **株式会社南越製作所 (NANETSU CO.,Ltd.)**  
Ngôn ngữ: Tiếng Nhật | Domain: `nanetsuseisaku.co.jp` | Host: GitHub Pages  
Repo: `https://github.com/Sontis98/nanetsu-web.git` | Branch chính: `main`

## Thông tin công ty
| | |
|---|---|
| Tên | 株式会社南越製作所 / NANETSU CO.,Ltd. |
| Đại diện | デイン・バン・ファン (DINH VAN PHAN) |
| Thành lập | 2007 (平成19年) |
| Địa chỉ | 〒577-0824 大阪府東大阪市大蓮南5丁目10-8 |
| ĐT | 06-6727-7866 |
| FAX | 06-6727-7867 |
| Email | nanetsu.seisaku@gmail.com |
| Giờ làm | Bình日 8:00–17:00, nghỉ土・日・祝 |
| Vị trí GPS | 34.6791, 135.6083 |

## Cấu trúc trang
```
index.html      — Trang chủ (Hero, Stats, Services, Tech, Gallery, CTA, Contact)
about.html      — Giới thiệu công ty / 会社について
services.html   — Dịch vụ / 加工サービス
tech.html       — Thiết bị & công nghệ / 設備・技術一覧
  mc.html       — Machining Center / マシニングセンター
  nc.html       — NC Lathe / NC旋盤
  do.html       — Đo lường / 各種測定機器
gallery.html    — Thư viện sản phẩm / ギャラリー
company.html    — Hồ sơ công ty + bản đồ / 会社概要
privacy.html    — Chính sách bảo mật / プライバシーポリシー

header.html     — Header component (load động qua fetch)
footer.html     — Footer component + contact form (load động qua fetch)
```

## Stack kỹ thuật
- **Pure static HTML/CSS/JS** — không dùng framework nào
- Header/footer load động: `fetch("header.html")` / `fetch("footer.html")` trong `js/common.js`
- Pattern: `Promise.all([loadHeader(), loadFooter()]).then(() => { initHamburgerMenu(); ... })`
- `initHamburgerMenu()` **phải nằm trong .then()** — nếu không hamburger sẽ null
- Contact form gửi qua **Web3Forms** (AJAX POST, action URL trong footer.html)

## Design System

### Màu sắc
```css
--sky-800: #0e4373   /* Primary dark blue — background chính */
--sky-700: #125691
--sky-600: #176bb0
--sky-500: #2389d4
--sky-400: #4aa8ec
--sky-300: #7dc4f5   /* Accent blue — highlight text, border */
--sky-200: #b4ddfb
--sky-50:  #eff8ff
--ink:     #0d1b2a   /* Text tối */
--paper:   #fafcff   /* Background sáng */
--accent:  #ff6b35   /* Cam — dùng cho <span class="accent"> trong hero */
--teal:    #0d6e6e   /* do.html theme */
--nc-accent: #c0392b /* nc.html theme — đỏ */
```

### Typography
- **Headings:** `Shippori Mincho` (serif, wght 500–800) — chữ Nhật trang trọng
- **Body:** `Noto Sans JP` (wght 300/400/500/700)
- **Code/Spec:** `JetBrains Mono` (wght 400/500/700) — dùng cho class `.mono`, specs kỹ thuật

### Breakpoints responsive
| Breakpoint | Thay đổi chính |
|---|---|
| ≤1280px | Thu nhỏ padding, layout |
| ≤1024px | Ẩn nav links, hiện hamburger |
| ≤860px | Layout 1 cột một số section |
| ≤640px | Gallery → horizontal scroll (56vw/item), ẩn `.nav-cta`, `.tech-visual` |
| ≤480px | Gallery → horizontal scroll (72vw/item), ẩn `.hero-visual`, `.logo-en`, modal full-bottom-sheet |

### Favicon
`favicon.svg` — chữ 南 màu `#7dc4f5` trên nền `#0e4373`, border-radius 6px

## SEO
- Mỗi trang có: `<title>`, `<meta description>`, `<meta keywords>`, canonical, OGP, Twitter Card
- `robots.txt` — Allow all, trỏ về sitemap
- `sitemap.xml` — 10 URL, priority: index=1.0, services=0.9, tech/mc/nc=0.8, do/gallery=0.7, about/company=0.6, privacy=0.3
- `images/ogp.jpg` — 1200×630px, branded dark blue
- JSON-LD `LocalBusiness` schema trên `index.html`
- **Google Search Console:** domain `nanetsuseisaku.co.jp` đã xác minh qua Cloudflare DNS, sitemap đã submit (10 trang)

## Infrastructure
- **DNS:** Cloudflare (nameservers: eric.ns.cloudflare.com)
- **GitHub Pages:** A records trỏ về `185.199.108-111.153`, CNAME file = `nanetsuseisaku.co.jp`
- **Google Search Console:** Verified ✅, Sitemap submitted ✅
- **Google Business Profile:** Chưa đăng ký (TODO)

## Lịch sử thay đổi quan trọng
- `js/common.js` — Sửa bug hamburger menu: `initHamburgerMenu()` chuyển vào `.then()`
- `css/style.css` — Thêm toàn bộ mobile responsive styles
- `css/style.css` — Fix `.company .btn-outline` bị invisible trên nền sáng
- Gallery mobile: chuyển từ grid 1 cột sang **horizontal scroll + scroll-snap**
- SEO: thêm đầy đủ meta tags, OGP, JSON-LD cho tất cả trang
- Favicon: `favicon.svg` + thêm `<link rel="icon">` vào tất cả trang

## Những việc còn lại
- [ ] Đăng ký **Google Business Profile** (Google Maps) tại business.google.com
