# Hanzi Bridge UI v12

Ứng dụng web tĩnh giúp ôn luyện tiếng Trung ⇄ Việt với vibe Hanzii/Duolingo. Toàn bộ mã nguồn thuần HTML/CSS/JS, không backend, lưu dữ liệu bằng localStorage nên chạy được offline.

## Cấu trúc

- `index.html` – landing page + shell SPA.
- `css/` – reset, theme, landing, app, store.
- `js/` – module chức năng (router, auth, học, bài tập, ngân hàng, tài khoản, cửa hàng, audio, translate, ui…).
- `js/config.js` – cấu hình allowlist & mã truy cập mặc định cho deploy.
- `data/frames.json` – danh sách khung CSS.
- `data/ui_version.json` – thông tin version UI.

## Chạy cục bộ

1. Cài đặt [Netlify CLI](https://docs.netlify.com/cli/get-started/) hoặc dùng bất kỳ server tĩnh nào.
2. Trong thư mục dự án:

```bash
npm install -g netlify-cli
netlify dev
```

Netlify CLI sẽ phục vụ trang tại `http://localhost:8888` với hỗ trợ fetch file JSON.

Nếu không dùng Netlify CLI, có thể chạy:

```bash
npx http-server .
```

## Triển khai Netlify

1. Đăng nhập Netlify, tạo site mới.
2. Chọn repo này và cấu hình:
   - Build command: _None_
   - Publish directory: `/`
3. Deploy. Netlify sẽ host trang tĩnh với fetch JSON nội bộ.

## Dữ liệu & sao lưu

- Người dùng, stats, wrongPool, allowlist, coin và inventory được lưu trong localStorage.
- Tab “Tài khoản” cho phép xuất toàn bộ JSON và import lại.

## Phím tắt

- `Ctrl/⌘ + K` – mở modal Dịch nhanh.
- `Enter` – kiểm tra câu trả lời trong Ôn bài/Bài tập.
- `J/K` – điều hướng trong Ôn bài (được xử lý trong learn.js).

## Lưu ý

- Không có service worker, không có file nhị phân.
- Nếu deploy lên domain HTTPS, Google Translate iframe sẽ hoạt động tốt. Nếu iframe bị chặn, app hiển thị fallback và nút mở tab mới.

Chúc học vui!
## Phân quyền truy cập

- Mặc định chỉ các username trong `HB_ALLOW` (định nghĩa tại `js/config.js` hoặc localStorage `hb:allow`) mới đăng nhập/đăng ký được.
- Có thể đặt thêm mã truy cập thông qua `HB_ACCESS_CODE`; form đăng nhập sẽ yêu cầu mã nếu cấu hình khác rỗng.
- Chủ site có thể cập nhật allowlist trực tiếp trong tab Tài khoản (mục Allowlist) để ghi đè giá trị runtime.
