# Sơ Tu Luyện Demo

Roguelite dạng visual novel với hệ thống sự kiện động, cơ chế lời thệ và thiên kiếp nhỏ gọn. Dự án sử dụng Vite + React + TypeScript + TailwindCSS + Framer Motion + Zustand.

## Quickstart

```bash
npm install
npm run dev
```

Ứng dụng chạy ở [http://localhost:5173](http://localhost:5173).

## Build & Preview

```bash
npm run build
npm run preview
```

## Test

```bash
npm run test
```

## Kiểm tra & Định dạng

```bash
npm run lint
npm run format
```

## Điều khiển

- **Chuột / chạm:** Chọn phương án trong thẻ sự kiện.
- **Bàn phím:** Dùng `↑` / `↓` để chuyển lựa chọn, `Enter` để xác nhận.
- **Thiên kiếp:** Khi modal xuất hiện, chọn chuỗi ngũ hành đúng để nhận pháp khí; thất bại tăng vết nứt.
- **Lời thệ:** Nhập cụm từ ngắn ở màn hình mở đầu (ví dụ *"bảo hộ chúng sinh"*) để nhận trait tương ứng.
- **Lưu & Meta:** Sau mỗi lần tử vong hoặc thăng thiên, 1 pháp khí và 1 thiên phú được giữ lại vào meta (lưu trong `localStorage`).
- **Đổi seed:** Thêm `?seed=tukhoa` vào cuối URL trước khi tải trang để cố định chuỗi sự kiện.
- **Xóa dữ liệu:** Xóa key `so-tu-luyen-save-v1` trong `localStorage` để bắt đầu mới.

## Bổ sung nội dung

- **Thêm sự kiện:** Chỉnh file [`src/data/events.ts`](src/data/events.ts). Mỗi sự kiện gồm `id`, `title`, `body`, `tags`, `choices` (với `effects`, `skillCheck`, `followups`).
- **Thêm pháp khí / thiên phú:** Cập nhật [`src/data/artifacts.ts`](src/data/artifacts.ts).
- **Thêm lời thệ:** Bổ sung mapping ở [`src/data/oath.ts`](src/data/oath.ts).

## Kiến trúc

- Trạng thái trung tâm (`stats`, `inventory`, `meta`, RNG...) quản lý bằng Zustand trong [`src/store/game.ts`](src/store/game.ts).
- RNG tuyến tính bảo đảm tính quyết định theo `seed` (`src/lib/rng.ts`).
- Lưu meta-progression vào `localStorage` thông qua util [`src/lib/storage.ts`](src/lib/storage.ts).
- UI component hóa tại `src/components/*`, dùng TailwindCSS và Framer Motion cho hoạt ảnh.

## Ghi chú

- Dự án bật sẵn ESLint + Prettier; tuân thủ `npm run lint` trước khi commit.
- Vitest + Testing Library cung cấp ví dụ kiểm thử cơ bản trong `src/tests/*`.
