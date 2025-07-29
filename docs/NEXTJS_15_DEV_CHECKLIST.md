# NEXT.JS 15 DEVELOPMENT CHECKLIST

---

**Mục đích:** Checklist này được thiết kế để hướng dẫn phát triển dự án Next.js 15, tập trung vào các khía cạnh quan trọng và tuân thủ các nguyên tắc mã hóa đã định. Nó cũng đóng vai trò là ngữ cảnh toàn diện để GitHub Copilot đưa ra các gợi ý, tự động hoàn thành và tạo mã có liên quan, giúp tăng cường hiệu quả công việc của bạn.

---

## **Các Màu Chủ Đạo Của Dự Án**

* **Eggshell:** `#f4f1de` (Mặc định), `#463f17` (100), ..., `#fdfcf8` (900)
* **Burnt Sienna:** `#e07a5f` (Mặc định), `#36140a` (100), ..., `#f9e5df` (900)
* **Delft Blue:** `#3d405b` (Mặc định), `#0c0d12` (100), ..., `#d4d6e2` (900)
* **Cambridge Blue:** `#81b29a` (Mặc định), `#17261f` (100), ..., `#e6efeb` (900)
* **Sunset:** `#f2cc8f` (Mặc định), `#442d08` (100), ..., `#fcf5e8` (900)

---

## I. Thiết lập & Cấu hình Dự án

* **Next.js Version:**
    * [ ] Đảm bảo **`next@15.x.x`**, **`react@^18`**, và **`react-dom@^18`** đã được cài đặt.
    * [ ] Xác minh **`next.config.js`** được cấu hình chính xác cho bất kỳ tính năng cụ thể nào của Next.js 15 (ví dụ: cờ thử nghiệm, tối ưu hóa bản dựng).
    * *Copilot Hint:* "Thiết lập `next.config.js` để tối ưu hóa hình ảnh Next.js 15."
* **Quản lý gói (Yarn):**
    * [ ] Đảm bảo dự án sử dụng **`yarn`** làm trình quản lý gói chính.
    * [ ] Các lệnh cài đặt và chạy dự án được ghi lại với `yarn`.
    * *Copilot Hint:* "Cài đặt các phụ thuộc bằng yarn."
* **Cấu hình TypeScript (nếu áp dụng):**
    * [ ] **`tsconfig.json`** được thiết lập chính xác cho Next.js và React.
    * [ ] Các định nghĩa kiểu cho bất kỳ API Next.js 15 mới nào đều có mặt.
    * *Copilot Hint:* "Thêm kiểu cho các hành động máy chủ Next.js 15 mới."
* **ESLint & Prettier:**
    * [ ] Tích hợp và cấu hình để có kiểu mã nhất quán.
    * [ ] Các quy tắc linting cụ thể của Next.js 15 được áp dụng (ví dụ: `next/core-web-vitals`).
    * *Copilot Hint:* "Cấu hình ESLint cho các thực hành tốt nhất của Next.js 15."

---

## II. Nạp dữ liệu & Kết xuất

* **Server Components & Client Components:**
    * [ ] Phân tách hợp lý các thành phần thành ranh giới Máy chủ và Máy khách.
    * [ ] Hiểu và sử dụng đúng chỉ thị **`use client`**.
    * [ ] Tối ưu hóa việc nạp dữ liệu trong Server Components (ví dụ: truy cập cơ sở dữ liệu trực tiếp, API của bên thứ ba).
    * *Copilot Hint:* "Chuyển đổi thành phần này thành Server Component để có hiệu suất tốt hơn." hoặc "Làm thế nào để nạp dữ liệu trực tiếp trong Next.js 15 Server Component?"
* **`use server` (Server Actions):**
    * [ ] Triển khai các đột biến và cập nhật dữ liệu sử dụng **Server Actions**.
    * [ ] Xử lý lỗi và chiến lược xác thực lại cho Server Actions.
    * [ ] Bảo mật Server Actions chống lại truy cập trái phép.
    * *Copilot Hint:* "Tạo Next.js 15 Server Action để cập nhật hồ sơ người dùng." hoặc "Thêm xử lý lỗi vào hàm `use server` này."
* **Xác thực lại dữ liệu:**
    * [ ] Sử dụng **`revalidatePath`** và **`revalidateTag`** để xác thực lại theo yêu cầu.
    * [ ] Các chiến lược để lưu vào bộ nhớ đệm và vô hiệu hóa hiệu quả với App Router.
    * *Copilot Hint:* "Xác thực lại một thẻ dữ liệu cụ thể sau lệnh gọi API này."
* **Streaming & Suspense:**
    * [ ] Tận dụng **`Suspense`** cho các trạng thái tải trong Server Components.
    * [ ] Triển khai streaming để cải thiện hiệu suất cảm nhận.
    * [ ] *Copilot Hint:* "Bọc thành phần chậm này bằng React.Suspense."

---

## III. Định tuyến & Điều hướng (App Router)

* **Cấu trúc App Router:**
    * [ ] Hiểu và triển khai cấu trúc thư mục **`app`**.
    * [ ] Sử dụng đúng các tệp **`layout.js`**, **`page.js`**, **`loading.js`**, **`error.js`**, **`not-found.js`** và các quy ước khác.
    * *Copilot Hint:* "Tạo một tuyến đường mới trong App Router cho cài đặt người dùng."
* **Tuyến động:**
    * [ ] Triển khai các phân đoạn động **`[slug]`**, **`[...slug]`**.
    * [ ] Tạo các tham số tĩnh với **`generateStaticParams`**.
    * *Copilot Hint:* "Xác định một tuyến động cho chi tiết sản phẩm."
* **API `next/navigation`:**
    * [ ] Sử dụng **`useRouter`** (từ `next/navigation`), **`usePathname`**, **`useSearchParams`**.
    * [ ] Điều hướng chương trình với **`router.push()`**, **`router.replace()`**.
    * *Copilot Hint:* "Điều hướng chương trình đến bảng điều khiển sau khi đăng nhập."
* **Nhóm tuyến & Tuyến song song:**
    * [ ] Sắp xếp các tuyến bằng **nhóm tuyến `(group)`**.
    * [ ] Triển khai **tuyến song song `@slot`** cho các bố cục phức tạp.
    * *Copilot Hint:* "Thiết lập các tuyến song song cho bố cục bảng điều khiển với các tiện ích."

---

## IV. API Routes & Middleware (nếu áp dụng)

* **Route Handlers:**
    * [ ] Tạo các điểm cuối API bằng **`route.js`** trong thư mục `app`.
    * [ ] Xử lý các phương thức HTTP khác nhau (GET, POST, PUT, DELETE).
    * [ ] Áp dụng các thực hành tốt nhất cho các tuyến API an toàn.
    * *Copilot Hint:* "Tạo một GET route handler để nạp tất cả người dùng."
* **Middleware:**
    * [ ] Triển khai **`middleware.js`** cho xác thực, ghi nhật ký hoặc viết lại URL.
    * [ ] Hiểu thứ tự thực thi và các tác động đến hiệu suất.
    * *Copilot Hint:* "Viết một Next.js 15 middleware cho xác thực người dùng."

---

## V. Hiệu suất & Tối ưu hóa

* **Image Optimization (`next/image`):**
    * [ ] Sử dụng đúng thành phần **`Image`** cho hình ảnh đáp ứng.
    * [ ] Cấu hình các miền hình ảnh trong `next.config.js`.
    * *Copilot Hint:* "Tối ưu hóa hình ảnh này cho hiệu suất web bằng `next/image`."
* **Font Optimization (`next/font`):**
    * [ ] Sử dụng **`next/font`** để tự động lưu trữ và tối ưu hóa phông chữ.
    * *Copilot Hint:* "Tích hợp Google Fonts với `next/font`."
* **Tối ưu hóa kích thước gói:**
    * [ ] Code splitting và lazy loading các thành phần.
    * [ ] Phân tích kích thước gói để giảm thiểu tiềm năng.
    * *Copilot Hint:* "Nhập động thành phần này để giảm kích thước gói ban đầu."
* **SEO & Metadata:**
    * [ ] Thiết lập siêu dữ liệu tĩnh và động trong `layout.js` và `page.js`.
    * [ ] Tạo sitemap và nguồn cấp dữ liệu RSS.
    * *Copilot Hint:* "Thêm siêu dữ liệu SEO động vào trang sản phẩm này."

---

## VI. Đa ngôn ngữ (i18n)

* [ ] Cấu hình Next.js cho hỗ trợ đa ngôn ngữ (**tiếng Việt, tiếng Anh, tiếng Hàn, tiếng Nhật, tiếng Trung**).
* [ ] Triển khai các chiến lược dịch thuật (ví dụ: `next-i18next` hoặc giải pháp tùy chỉnh).
* [ ] Quản lý các tệp dịch thuật và khóa dịch hiệu quả.
* *Copilot Hint:* "Thêm hỗ trợ tiếng Hàn cho trang này." hoặc "Tạo khóa dịch cho thông báo này."

---

## VII. Hoạt hình (GSAP)

* [ ] Tích hợp **GSAP** vào dự án Next.js.
* [ ] Sử dụng GSAP cho các hoạt hình hiệu suất cao, đặc biệt là với các thành phần phía máy khách.
* [ ] Đảm bảo hoạt hình không gây tắc nghẽn luồng chính và được tối ưu.
* *Copilot Hint:* "Tạo một hoạt hình GSAP trượt vào cho thành phần này." hoặc "Sử dụng GSAP để tạo hoạt hình cho một phần tử khi nó xuất hiện trên màn hình."

---

## VIII. Nguyên tắc thiết kế & Mã hóa

* **Nguyên tắc SOLID:**
    * [ ] Đảm bảo **mỗi file code tuân thủ các nguyên tắc SOLID** (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion).
    * [ ] Thiết kế các module có tính gắn kết cao và khớp nối lỏng lẻo.
    * *Copilot Hint:* "Refactor thành phần này để tuân thủ nguyên tắc Single Responsibility." hoặc "Thiết kế một interface để tuân thủ Interface Segregation Principle."
* **Clean Code & Tránh Hardcode:**
    * [ ] **Mã nguồn rõ ràng, dễ đọc và dễ bảo trì.** Sử dụng tên biến, hàm, lớp có ý nghĩa.
    * [ ] **Hạn chế tối đa việc hardcode** các giá trị (chuỗi, số, URL, cấu hình). Ưu tiên sử dụng hằng số, biến môi trường, file cấu hình, hoặc fetch từ API.
    * [ ] Viết code theo nguyên tắc **DRY (Don't Repeat Yourself)**.
    * *Copilot Hint:* "Refactor để loại bỏ hardcode chuỗi này, đưa nó vào file hằng số." hoặc "Cấu trúc lại hàm này theo nguyên tắc Clean Code."
* **Kích thước file:**
    * [ ] **Không cho phép bất kỳ file code nào lớn hơn 200 dòng.** Nếu một file vượt quá giới hạn này, hãy refactor nó thành các module, component hoặc hàm nhỏ hơn, chuyên biệt hơn.
    * [ ] Ưu tiên chia nhỏ các component lớn thành các component con, các hàm phức tạp thành các hàm nhỏ hơn. Ngoài trừ node_modules và các file builds.
    * *Copilot Hint:* "File này quá 200 dòng, hãy refactor thành các sub-component." hoặc "Tách hàm helper này ra một file riêng."

---

## IX. Kiểm thử

* **Kiểm thử đơn vị & Tích hợp:**
    * [ ] Viết kiểm thử cho Server Components, Client Components và Server Actions.
    * [ ] Sử dụng Jest, React Testing Library hoặc Playwright.
    * *Copilot Hint:* "Viết kiểm thử đơn vị cho Next.js Server Action này."
* **Kiểm thử đầu cuối (End-to-End Tests):**
    * [ ] Thiết lập Playwright hoặc Cypress cho kiểm thử E2E.
    * [ ] Kiểm thử luồng người dùng và các đường dẫn quan trọng.

---

## X. Triển khai

* **Triển khai Vercel:**
    * [ ] Tối ưu hóa cho cơ sở hạ tầng của Vercel.
    * [ ] Hiểu các chức năng biên và triển khai không máy chủ.
* **Tự lưu trữ (nếu áp dụng):**
    * [ ] Cấu hình cho môi trường máy chủ tùy chỉnh.

---