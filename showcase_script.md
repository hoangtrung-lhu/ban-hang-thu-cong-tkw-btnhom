# KỊCH BẢN QUAY VIDEO DEMO SHOWCASE (30–60 GIÂY)
## NOVA STORE — PREMIUM E-COMMERCE INTERACTIVE SHOWCASE

Tài liệu này hướng dẫn chi tiết từng giây cho video quay màn hình hoặc bài thuyết trình kiểm thử đáp ứng tiêu chí Tuần 5 Final Challenge.

---

### PHÂN CẢNH CHI TIẾT (TỔNG THỜI LƯỢNG: 45 GIÂY)

#### Giây 00 – 06: Header & Hero Intro Animation
- **Hành động**: Tải lại trang (F5 / Refresh).
- **Điểm nhấn thể hiện**:
  - Thanh Navbar trượt nhẹ từ trên xuống (`animate-fade-in-down`).
  - Tiêu đề Hero "Crafted for Considered Living & Timeless Function" cùng nút CTA "Explore Catalog" xuất hiện theo hiệu ứng Stagger (`animate-fade-in-up`).
  - Ảnh Hero Campaign hiển thị sắc nét, tỷ lệ cân đối với viền hairline tinh xảo.

#### Giây 07 – 13: Scroll Revelation (AOS) & Category Showcase
- **Hành động**: Cuộn chuột từ từ xuống khu vực "Explore by Discipline".
- **Điểm nhấn thể hiện**:
  - 3 thẻ danh mục (Apparel & Knitwear, Leather & Accessories, Living & Interior Objects) trượt lên mượt mà theo hiệu ứng AOS (`data-aos="fade-up"`).
  - Di chuột qua từng thẻ: Ảnh zoom nhẹ (scale 1.05), biểu tượng mũi tên chéo dịch chuyển tinh tế.

#### Giây 14 – 22: Tìm kiếm & Lọc sản phẩm tương tác (Product Catalog)
- **Hành động**:
  1. Gõ từ khóa `"wool"` hoặc `"tote"` vào ô tìm kiếm: Danh sách cập nhật tức thì theo thời gian thực. Bấm nút `X` để xóa tìm kiếm.
  2. Bấm chọn danh mục `"Leather Goods"`: Grid lọc mượt mà sang các sản phẩm da thuộc.
  3. Bấm bộ lọc giá `"$150 – $300"` hoặc sắp xếp `"Price: Low to High"`.

#### Giây 23 – 32: Product Card 3D Flip, Micro-Interactions & Quick View Modal
- **Hành động**:
  1. Di chuột lên thẻ sản phẩm "Atelier Chronograph 01": Thẻ nhấc nhẹ lên 4px (`translateY(-4px)`), xuất hiện 2 nút Quick View và Quick Add.
  2. Bấm nút **"Thông số (3D Flip)"** góc trên phải thẻ: Thẻ lật 180 độ trong không gian 3D (`rotateY(180deg)`) mở ra mặt sau hiển thị chi tiết xưởng chế tác, xuất xứ Thụy Sĩ/Kyoto, tiêu chuẩn ISO và bảo hành. Bấm "Thêm vào giỏ" ngay từ mặt sau hoặc "Trở lại".
  3. Bấm nút Quick View (biểu tượng mắt): Modal chi tiết sản phẩm mở ra với animation scale êm ái.
  4. Bấm "Add to Shopping Bag": Nút phản hồi tức thì với trạng thái "Đã thêm" màu xanh lá, Toast thông báo xuất hiện góc màn hình.

#### Giây 33 – 40: Master Artisans Portfolio (Thẻ Thành Viên 3D Flip) & Motion Inspector
- **Hành động**:
  1. Cuộn xuống phần "Đội Ngũ Nghệ Nhân & Giám Tuyển": Hiệu ứng AOS fade-up trượt các thẻ thành viên lên mượt mà.
  2. Bấm vào nút "Triết lý" trên thẻ của nghệ nhân Matteo Bellini (Florence, Ý): Thẻ lật 3D 180 độ hiển thị triết lý da thuộc thảo mộc và nút liên kết bộ sưu tập phụ trách.
  3. Bấm nút nổi **"Motion & AI Prompt"** ở góc dưới bên trái màn hình: Modal Inspector xuất hiện, phô diễn câu Prompt Bậc Thầy điều chỉnh cubic-bezier, chỉ số 60 FPS GPU Compositor-Only và cho phép test trực quan đường cong vật lý!

#### Giây 41 – 48: Giỏ hàng (Cart Drawer) & Khuyến mãi
- **Hành động**:
  1. Bấm vào icon Giỏ hàng ở góc phải Navbar: Drawer trượt ra từ cạnh phải.
  2. Tăng số lượng sản phẩm, quan sát tổng tiền và thanh tiến độ Free Shipping cập nhật tức thời.
  3. Nhập mã giảm giá `NOVA10` và ấn "Apply": Thông báo giảm giá 10% xuất hiện, tổng tiền tự động trừ đi chiết khấu.
  4. Bấm "Proceed to Checkout".

#### Giây 49 – 55: Quy trình Đặt hàng Demo (Checkout Modal & Confetti)
- **Hành động**:
  1. Modal thanh toán mở ra với lời giải thích rõ ràng đây là mô phỏng frontend.
  2. Điền thông tin nhanh (Name, Email, Phone, Address).
  3. Chọn phương thức giao hàng và bấm "Confirm & Place Demo Order".
  4. Hiệu ứng pháo hoa Confetti bắn lên ăn mừng!
  5. Màn hình hóa đơn (Order Confirmation) xuất hiện với mã đơn hàng `NOV-XXXXX`, ước tính ngày giao hàng và nút "Print Receipt".

---

### GỢI Ý CÔNG CỤ QUAY MÀN HÌNH
- **Chrome Screen Recorder / OBS Studio / Loom**:
  - Độ phân giải khuyến nghị: 1920x1080 (16:9) hoặc 1440x900.
  - Tốc độ khung hình: 60 FPS để ghi nhận trung thực chuyển động cubic-bezier và AOS.
  - Tắt con trỏ chuột rung lắc, di chuột dứt khoát theo kịch bản trên.
