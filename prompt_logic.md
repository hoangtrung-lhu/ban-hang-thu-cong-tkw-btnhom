# TÀI LIỆU PROMPT LOGIC & THIẾT KẾ KỸ THUẬT
## THE INTERACTIVE SHOWCASE | WEEK 5 FINAL CHALLENGE
### Dự án: NOVA STORE — Premium E-Commerce Interactive Showcase

---

### A. TỔNG QUAN
- **Mục tiêu cửa hàng**: Xây dựng nền tảng thương mại điện tử phong cách lifestyle cao cấp (NOVA STORE), mang đậm tinh thần thẩm mỹ tối giản Bắc Âu và nghệ thuật chế tác thủ công (Ý, Bồ Đào Nha, Kyoto). Tập trung vào các dòng sản phẩm thời trang dệt kim len virgin merino, phụ kiện da thuộc thảo mộc Tuscan, đồ gia dụng kiến trúc và đồng hồ titan nguyên khối.
- **Công nghệ thực tế**:
  - React 19 + TypeScript (strict typing, interfaces modular).
  - Vite 8.3 + Tailwind CSS v4 (@import "tailwindcss"; kết hợp biến CSS tokens).
  - Lucide React (bộ icon tối giản, semantic affordances).
  - AOS (Animate On Scroll) cho scroll revelation.
  - Canvas-confetti cho hiệu ứng celebration hoàn thành đơn hàng.
  - LocalStorage API cho việc lưu trữ giỏ hàng an toàn, không lưu thông tin thanh toán nhạy cảm.
- **Phạm vi chức năng**:
  - Duyệt danh mục đa chiều (Apparel, Leather Goods, Living Objects, Timepieces).
  - Tìm kiếm thời gian thực (real-time filter theo tên, chất liệu, tính năng) có nút xóa nhanh và đếm số lượng kết quả.
  - Bộ lọc kết hợp: Lọc theo khoảng giá (< $150, $150–$300, > $300), lọc trạng thái tồn kho (In Stock), sắp xếp theo giá, tên A-Z và độ phổ biến.
  - Thẻ sản phẩm tương tác: Hover micro-interactions (translateY, image zoom, shadow expansion), Quick View chi tiết, Quick Add to Bag tức thì.
  - Modal chi tiết sản phẩm (PDP): Trình diễn ảnh, chọn biến thể màu sắc (color swatches), chọn kích cỡ (sizing buttons), bộ điều chỉnh số lượng (stepper với validation min 1, max stock), các tab accordion về Chất liệu, Bảo hành và Logistics.
  - Giỏ hàng (Cart Slide-over Drawer): Đổi số lượng, xóa sản phẩm, thanh tiến độ miễn phí vận chuyển ($150 threshold), mã giảm giá khuyến mãi (demo `NOVA10`, `VIP15`), tính thuế/phí minh bạch.
  - Quy trình thanh toán (Checkout Modal Demo): Form kiểm tra tính hợp lệ (Full name, Email regex, Phone format, Address), phương thức giao hàng (Carbon-Neutral Standard / Express Courier), phương thức thanh toán giả lập (Credit Card, Cash on Delivery, Apple Pay), thông báo rõ ràng là mô phỏng frontend.
  - Biên lai đơn hàng hoàn tất (Order Confirmation Modal): Mã đơn hàng định dạng `NOV-XXXXX`, thời gian giao hàng dự kiến, tóm tắt các món hàng và nút in biên lai.

---

### B. PROMPT ĐÃ SỬ DỤNG
1. **Prompt 1 — Phân tích môi trường & cấu hình Dependencies**:
   - *Mục tiêu*: Xác định các thư viện có sẵn (React 19, Tailwind v4, Motion, Lucide-react) và cài đặt thêm `aos`, `canvas-confetti` cùng `@types` tương ứng.
   - *File thay đổi*: `package.json`.
   - *Quyết định*: Chấp nhận cài đặt `aos` và `canvas-confetti` chuẩn npm, không sử dụng CDN ngoài để tránh sandbox blocking.
2. **Prompt 2 — Tạo tài sản hình ảnh AI nguyên bản (generate_image batch)**:
   - *Mục tiêu*: Sinh 5 hình ảnh chất lượng cao 8k đúng tinh thần luxury lifestyle cho Hero, Danh mục (Apparel, Leather, Living) và Sản phẩm tâm điểm (Watch).
   - *File thay đổi*: Thư mục `/src/assets/images/`.
   - *Quyết định*: Thực hiện theo quy trình Batch generation trong 1 lượt duy nhất, loại bỏ hoàn toàn các link Unsplash/Picsum không bảo đảm để tránh lỗi broken image.
3. **Prompt 3 — Thiết lập Design Tokens & Hệ thống Typography**:
   - *Mục tiêu*: Xây dựng CSS Variables theo bảng màu 60-30-10, khai báo cubic-bezier curves và hỗ trợ `prefers-reduced-motion`.
   - *File thay đổi*: `/src/index.css`, `/index.html`.
   - *Quyết định*: Sử dụng font `Outfit` cho headings và `Plus Jakarta Sans` cho body text, kết hợp `tabular-nums` cho số liệu giá.
4. **Prompt 4 — Cấu trúc dữ liệu & Types**:
   - *Mục tiêu*: Định nghĩa interfaces rõ ràng (`Product`, `Category`, `CartItem`, `OrderDetails`) và dữ liệu mẫu thực tế.
   - *File thay đổi*: `/src/types/index.ts`, `/src/data/products.ts`, `/src/utils/formatters.ts`.
   - *Quyết định*: Dữ liệu có cấu trúc trung thực, giá cả hợp lý, không chèn review ảo hoặc số liệu lừa dối người dùng.
5. **Prompt 5 — Triển khai Components UI, Motion & Luồng mua hàng**:
   - *Mục tiêu*: Xây dựng Navbar, HeroSection, CategoryShowcase, ProductCard, ProductCatalog, ProductDetailModal, CartDrawer, CheckoutModal, EditorialStory, Footer.
   - *File thay đổi*: Toàn bộ components trong `/src/components/` và `/src/App.tsx`.
   - *Quyết định*: Đảm bảo quy tắc Zero-Pill (không dùng badge dạng thuốc con nhộng cho metadata tĩnh), 100% interactive handlers hoạt động, không có dead click.

---

### C. XỬ LÝ LỖI & TINH CHỈNH KỸ THUẬT
1. **Lỗi 1 — Đường dẫn file tuyệt đối trong môi trường công cụ**:
   - *Triệu chứng*: Khi gọi view_file `/app/applet/package.json`, hệ thống báo `file does not exist`.
   - *Nguyên nhân*: Hệ thống định danh root của workspace bắt đầu từ `/package.json`.
   - *Khắc phục*: Điều chỉnh tất cả các đường dẫn file sang định dạng bắt đầu bằng `/` tính từ workspace root.
2. **Lỗi 2 — Tailwind CSS v4 import quy chuẩn**:
   - *Triệu chứng*: Không sử dụng cú pháp cũ `@tailwind base;` của Tailwind v3.
   - *Nguyên nhân*: Dự án cài đặt `@tailwindcss/vite: ^4.3.3`.
   - *Khắc phục*: Giữ đúng chuẩn `@import "tailwindcss";` kết hợp `@import "aos/dist/aos.css";` và các biến tokens thuần CSS `:root`.
3. **Lỗi 3 — Xung đột biến cuộn AOS và Transition transform**:
   - *Triệu chứng*: Nếu áp dụng `data-aos` trực tiếp lên các card có `transition: transform` hover thì trạng thái kết thúc của AOS có thể làm mất hiệu ứng hover lift.
   - *Khắc phục*: Tách lớp wrapper nhận thuộc tính `data-aos="fade-up"` hoặc sử dụng transition nội tại của thẻ article với easing mượt mà, bảo đảm hover translateY(-4px) hoạt động chuẩn xác sau khi AOS đã kết thúc hiệu ứng entrance.

---

### D. TƯ DUY UX
- **Intro Animation (Header & Hero)**:
  - Header fade-in-down xuất hiện ngay trong 450ms đầu tiên, tạo cảm giác ổn định, xác nhận thương hiệu tức thì.
  - Hero title và subtitle staggered fade-in-up (100ms - 300ms) dẫn dắt mắt người đọc từ thông điệp chính đến nút hành động CTA "Explore Catalog".
  - Tuyệt đối không chặn hoặc che khuất thanh tìm kiếm và giỏ hàng.
- **Category & Editorial Cards**:
  - Tận dụng tỉ lệ vàng 4:3 và 16:9 với hình ảnh trực quan giúp người mua định hình nhanh phong cách sản phẩm mà không cần đọc văn bản dài.
- **Product Card Hover**:
  - Image scale 1.05 nhẹ nhàng và card lift -4px cho phản hồi vật lý trực quan.
  - Phím Quick Add và Quick View hiển thị rõ ràng với icon dễ nhận biết.
- **Micro-Interactions**:
  - Khi ấn "Add to Bag": Nút chuyển sang trạng thái "Added" màu xanh lá với dấu check trong 1.5 giây, đồng thời badge trên icon giỏ hàng ở Navbar cập nhật số lượng lập tức và thanh thông báo Toast xuất hiện ở góc dưới.
  - Thanh tiến độ miễn phí vận chuyển trong giỏ hàng kích thích động lực hoàn thành đơn hàng một cách tự nhiên.

---

### E. MOTION DESIGN & CUBIC-BEZIER (PROMPT ENGINEERING BẬC THẦY)

#### 1. Câu Prompt Bậc Thầy (Master Motion Prompt)
Dưới đây là câu Prompt kỹ thuật cao cấp được nhóm thiết kế để điều chỉnh các tham số cubic-bezier:

```text
"Đóng vai trò là chuyên gia Senior Motion Designer và Web Performance Engineer tại Apple Design Team. 
Hãy thiết kế hệ thống đường cong chuyển động (Physics-based Easing Curves) cho một ứng dụng thương mại điện tử cao cấp mang tinh thần tối giản và chế tác thủ công (Artisanal Luxury).

Yêu cầu chi tiết:
1. ĐẶC TẢ TÂM LÝ HỌC CHUYỂN ĐỘNG (MOTION PSYCHOLOGY):
   - Entrance Easing (Xuất hiện): Không dùng linear hoặc ease-in-out generic. Tính toán chính xác tọa độ cubic-bezier(0.22, 1, 0.36, 1) với gia tốc dồn mạnh trong 20% đầu tiên và hãm tốc từ tốn trong 80% thời gian còn lại (Deceleration Curve), tạo cảm giác ổn định, thanh lịch như một cánh cửa gỗ nặng tự động khép êm ái.
   - Routine Micro-interactions (Hover & Button Press): Đặt cubic-bezier(0.2, 0.8, 0.2, 1) trong biên độ 160ms–200ms để người dùng cảm nhận độ nảy xúc giác tức thì (Tactile feedback) mà không sinh ra bất kỳ độ trễ nào.
   - 3D Flip Card Transition: Áp dụng cubic-bezier(0.34, 1.56, 0.64, 1) cho hiệu ứng lật thẻ không gian 3D, tạo độ nảy đàn hồi tinh tế (Subtle Overshoot Spring) ở điểm kết thúc 180 độ.
   - Exit Easing (Đóng / Biến mất): Sử dụng cubic-bezier(0.4, 0, 1, 1) để phần tử rời khỏi khung nhìn nhanh gọn, dứt khoát.

2. RÀNG BUỘC KỸ THUẬT HIỆU NĂNG BẤT KHẢ XÂM PHẠM:
   - Tuyệt đối 100% chuyển động chỉ được can thiệp vào thuộc tính GPU Compositor: 'transform: translate()', 'transform: rotateY()', 'transform: scale()', và 'opacity'.
   - Cấm triệt để animate các thuộc tính gây Layout Reflow hoặc Paint như 'top', 'left', 'bottom', 'right', 'width', 'height', 'margin', 'padding'.
   - Đóng gói toàn bộ vào các Design Tokens CSS :root, khai báo will-change: transform, opacity và thiết lập fallback an toàn cho @media (prefers-reduced-motion: reduce)."
```

#### 2. Phân Tích Vật Lý & Tọa Độ Điểm Điều Khiển (Control Points):
- **`--ease-entrance: cubic-bezier(0.22, 1, 0.36, 1)`**:
  - $P_1 = (0.22, 1.0)$: Độ dốc ban đầu cực lớn ($dy/dx \approx 4.5$), đối tượng đạt vận tốc tối đa gần như ngay lập tức sau khi xuất hiện.
  - $P_2 = (0.36, 1.0)$: Đường cong tiếp tuyến nằm ngang ($y=1.0$) trong suốt $64\%$ thời lượng cuối, giúp mắt người dùng dễ dàng cố định tiêu điểm thị giác mà không bị chóng mặt.
- **`--ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1)`**:
  - Tối ưu cho phản hồi vi mô hàng ngày (hover, card lift, button press). Thời gian phản hồi $\le 160\text{ms}$ đạt chuẩn Perceptual Instantaneity của Nielsen Norman Group.
- **`--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`**:
  - Giá trị $y_1 = 1.56 > 1.0$ tạo hiệu ứng văng đàn hồi (elastic overshoot) tự nhiên cho hiệu ứng 3D Flip Card khi lật từ $0^\circ \to 180^\circ$.
- **`--ease-exit: cubic-bezier(0.4, 0, 1, 1)`**:
  - Gia tốc nhanh dần khi thoát (Acceleration curve), giải phóng tầm nhìn người dùng ngay lập tức.

#### 3. Bằng Chứng Tối Ưu Hiệu Năng Compositor (Zero Layout Reflow):
- **Không sử dụng thuộc tính kích hoạt Reflow**:
  - ❌ Tránh hoàn toàn: `top`, `left`, `margin-top`, `width`, `height`.
  - ✅ Sử dụng chuẩn: `transform: translateY(...)`, `transform: translateX(...)`, `transform: rotateY(180deg)`, `transform: scale(...)`, và `opacity`.
- **Hỗ trợ `prefers-reduced-motion`**:
  - Khai báo `@media (prefers-reduced-motion: reduce)` trong `index.css` ép thời gian chuyển động về `0.01ms` và tắt hiệu ứng AOS trên trình duyệt của người dùng có nhu cầu trợ năng.

---

### F. RESPONSIVE VÀ ACCESSIBILITY (A11Y)
- **Viewport Testing**:
  - **375px (Mobile Mini / iPhone SE)**: Layout 1 cột, khoảng cách đệm 16px, không phát sinh thanh cuộn ngang, chạm mở drawer mượt mà.
  - **390px / 414px (Mobile Standard)**: Product grid 1 cột, header cố định chiếm dưới 10% chiều cao màn hình (tuân thủ luật 15% sticky cap).
  - **768px (Tablet)**: Grid 2 cột cân đối, thanh toolbar lọc hiển thị đầy đủ các nút bấm.
  - **1024px & 1440px (Desktop Full)**: Grid 3–4 cột, Top Bar Contract 3 phân vùng với khoảng cách `gap-8` thanh thoát.
- **Accessibility Checklist**:
  - Tỉ lệ tương phản văn bản đạt chuẩn WCAG AA (chữ đen `#121417` trên nền giấy `#fbfaf8` đạt tỉ lệ > 14:1).
  - Các phần tử tương tác đều có `focus-visible:ring-2` với màu cam đất sang trọng `#c4823f`.
  - Hỗ trợ đóng Modal và Drawer bằng phím ESC.
  - Thẻ `<img>` luôn đi kèm `alt` mô tả đầy đủ và `referrerPolicy="no-referrer"`.
  - Không truyền tải trạng thái chỉ bằng màu sắc (luôn đi kèm nhãn chữ hoặc icon trợ năng).

---

### G. GIT WORKFLOW
- **Repository Setup**:
  - `git init` được khởi tạo chuẩn hóa.
  - Nhánh mặc định: `main`.
- **Commit History**:
  - `feat(storefront): initial release of NOVA STORE premium e-commerce showcase` (Cấu trúc đầy đủ các trang và components).
  - `docs: add comprehensive prompt_logic, showcase_script and README` (Tài liệu báo cáo chi tiết).

---

### H. KẾT QUẢ CUỐI CÙNG & TỰ ĐÁNH GIÁ
- **Chức năng đã hoàn thành**:
  - [x] Giao diện e-commerce hoàn chỉnh chuẩn nhận diện thương hiệu NOVA STORE.
  - [x] Duyệt, tìm kiếm từ khóa và lọc sản phẩm đa chiều theo giá, danh mục, tồn kho.
  - [x] Modal chi tiết sản phẩm chọn màu, kích cỡ, số lượng, tab thông tin.
  - [x] Giỏ hàng trượt Drawer, cập nhật số lượng, tính toán phí ship, áp dụng mã giảm giá, lưu trữ localStorage.
  - [x] Quy trình đặt hàng giả lập (Checkout simulation) với xác thực form, hiệu ứng pháo hoa confetti, tạo mã đơn hàng và in hóa đơn.
  - [x] Animation Intro, Scroll Revelation (AOS), Micro-interactions, Zero-Pill metadata.
  - [x] Responsive 100% từ 375px đến 1440px không bị lỗi tràn ngang.
  - [x] Tuân thủ `prefers-reduced-motion` và accessibility standards.
- **Giới hạn thực tế**:
  - Vì ứng dụng hoạt động độc lập ở tầng Frontend SPA, các giao dịch tài chính và hệ thống tồn kho là mô phỏng (được thông báo rõ ràng trong UI để đảm bảo tính minh bạch và trung thực với người dùng).
