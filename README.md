# Học Trung ⇄ Việt • Text-Only • No-Binary

- SPA tĩnh: **HTML/CSS/JS/JSON** (không ảnh, không font, không âm thanh).
- Login chỉ user do Admin cấp (`/data/users.json`). Không có đăng ký public.
- Coin: **chỉ Admin add/set**; mua khung **trừ coin**; làm bài **không cộng coin**.
- Shop: **24+ khung** (CSS animation), có VIP `"vip_angel_gold"` không bán.
- Pinyin: toggle **plain ↔ tone**.
- Google Dịch: modal iframe (nếu bị chặn → mở tab).
- Dark/Light, tối ưu mobile, hỗ trợ **PWA offline**.

## Chạy
Chỉ cần phục vụ tĩnh (Netlify / Vercel / `npx serve`).

```
/
├─ index.html
├─ css/
├─ js/
├─ data/
├─ offline.html
└─ cheatsheet.html
```

## Lưu ý quan trọng
- **Không thêm file nhị phân** vào repo (ảnh, font, âm thanh). Nếu cần icon/hình → dùng emoji, SVG inline, hoặc **URL placeholder**.
- Mọi dữ liệu tiến trình lưu **localStorage** (tiền, inventory, stats, prefs). Có thể **Export/Import JSON** ở tab Tài khoản.
- Service worker chỉ cache các file text của repo; thêm file mới nhớ cập nhật `/service-worker.js`.
