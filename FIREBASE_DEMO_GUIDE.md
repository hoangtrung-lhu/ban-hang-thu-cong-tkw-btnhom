# 🎥 HƯỚNG DẪN QUAY VIDEO DEMO YOUTUBE (FIREBASE FULL-STACK INTEGRATION)
## NOVA ATHLETIC CLUB — PRODUCTION-STYLE FIREBASE SHOWCASE

Tài liệu này được thiết kế để bạn thuyết trình hoặc quay video demo YouTube từng bước, minh họa đầy đủ sức mạnh của **Firebase Authentication**, **Cloud Firestore (CRUD & Real-time Listeners)**, **Security Rules**, và **Vercel Deployment**.

---

### PHẦN 1: CÁC BƯỚC THỰC HIỆN DEMO TRONG VIDEO (TỪNG BƯỚC)

#### 1. Đăng ký tài khoản mới (Firebase Auth + Firestore Profile Creation)
- **Hành động trong video**:
  1. Nhấp vào nút tài khoản (**User Icon**) trên thanh Navbar hoặc nút **"Đăng Check-in Mới"**.
  2. Chọn tab **"Đăng Ký Thành Viên"**.
  3. Nhập Họ và tên: `Alex Nguyen`, Email: `alex@novagym.com`, Mật khẩu: `demo123456`.
  4. Chọn mục tiêu thể lực: `Sức Mạnh & Thể Lực Bền Vững` hoặc `Tăng Cơ Nạc`.
  5. Bấm **"Hoàn Tất Đăng Ký"**.
- **Điểm nhấn giải thích trong video**:
  - Firebase Authentication lập tức tạo tài khoản người dùng (`UserCredential`).
  - Hệ thống tự động tạo đồng thời một bản ghi document trong Firestore tại collection `users/{uid}` với các trường: `userId`, `email`, `displayName`, `fitnessGoal`, `createdAt`, `updatedAt`.
  - Icon User trên Navbar lập tức cập nhật tên hội viên.

#### 2. Kiểm tra tính bền vững sau khi tải lại trang (Auth State Persistence)
- **Hành động**: Nhấn **F5 (Refresh)** trình duyệt.
- **Điểm nhấn giải thích**:
  - Nhờ `onAuthStateChanged`, phiên đăng nhập không hề bị mất.
  - Dữ liệu người dùng được nạp lại tự động từ Cloud Firestore.

#### 3. Cập nhật hồ sơ hội viên (Protected Member Dashboard & Firestore CRUD)
- **Hành động**:
  1. Nhấp vào tên/icon người dùng trên Navbar để mở **Bảng Điều Khiển Hội Viên (Member Dashboard)**.
  2. Giới thiệu màn hình: Xem `User UID`, Gói hội viên, Mục tiêu tập luyện, Khung giờ ưu tiên, Ghi chú HLV.
  3. Chỉnh sửa: Đổi gói thành `Gói Titan All-Access 24/7` và ghi chú: `Tập luyện 5 buổi/tuần, ưu tiên bài tập Squat & Bench Press`.
  4. Bấm **"Lưu Dữ Liệu Hồ Sơ"**.
  5. Mở Firebase Console trên màn hình để khán giả thấy document `users/{uid}` và `gymMembers/{uid}` cập nhật trường `updatedAt` và nội dung tức thì!

#### 4. Kỹ thuật đỉnh cao: Trình diễn đồng bộ Thời Gian Thực (Firestore `onSnapshot`)
- **Hành động**:
  1. Chia màn hình thành **2 cửa sổ trình duyệt (Tab A và Tab B)** song song.
  2. Ở **Tab A**: Cuộn xuống mục **"Bảng Tin & Check-in Trực Tiếp Tại CLB"**, bấm **"Đăng Check-in Mới"**.
  3. Nhập tiêu đề: `Vừa hoàn thành 5 hiệp Deadlift 160kg!`, chọn thể loại `Kỷ Lục Cá Nhân` và bấm **"Đăng Lên Firestore Ngay"**.
  4. **Quan sát Tab B**: Thẻ check-in mới xuất hiện ngay lập tức mà *hoàn toàn không cần bấm F5*!
- **Điểm nhấn giải thích**:
  - Sử dụng listener `onSnapshot` lắng nghe sự kiện từ Cloud Firestore.
  - Độ trễ dưới 200ms, tự động cập nhật UI qua WebSocket/gRPC streaming của Firebase Web SDK.

#### 5. Kiểm tra phân quyền & Đăng xuất (Security Rules & Logout)
- **Hành động**:
  1. Mở Member Dashboard và bấm **"Đăng Xuất"**.
  2. Thử truy cập lại hồ sơ: Bị khóa an toàn và yêu cầu đăng nhập.
  3. Trình chiếu file `firestore.rules`: Giải thích cách thức `request.auth.uid == userId` ngăn chặn triệt để việc người dùng sửa trộm dữ liệu của nhau.

---

### PHẦN 2: CẤU HÌNH BIẾN MÔI TRƯỜNG TRÊN VERCEL

Khi deploy dự án lên Vercel:
1. Vào **Vercel Project Dashboard** -> Chọn dự án của bạn.
2. Vào **Settings** -> **Environment Variables**.
3. Thêm các khóa sau (sử dụng tiền tố `VITE_` cho Vite React hoặc `NEXT_PUBLIC_` cho Next.js):

| Tên Biến | Ý Nghĩa | Nơi Lấy Giá Trị |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | Khóa API Web Firebase | Firebase Console -> Project Settings |
| `VITE_FIREBASE_AUTH_DOMAIN` | Tên miền xác thực Auth | Firebase Console -> Project Settings |
| `VITE_FIREBASE_PROJECT_ID` | Mã định danh Project | `nova-store--shop-do` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Tên miền Cloud Storage | Firebase Console -> Storage |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ID gửi thông báo Cloud Messaging | Firebase Console -> Cloud Messaging |
| `VITE_FIREBASE_APP_ID` | App ID ứng dụng Web | `1:101590312467:web:658f88760c8b16262cc1e6` |
| `VITE_FIREBASE_MEASUREMENT_ID` | Google Analytics ID | `G-GJCSMDNG7D` |
| `VITE_FIREBASE_RECAPTCHA_SITE_KEY` | Site Key reCAPTCHA v3 (App Check) | Google reCAPTCHA Admin Console |

> **Lưu ý quan trọng**: Sau khi thêm hoặc thay đổi biến môi trường trên Vercel, bạn cần bấm **Redeploy** (Triển khai lại) để bản build Vite nạp các biến môi trường mới nhất.

---

### PHẦN 3: TRIỂN KHAI FIRESTORE SECURITY RULES LÊN FIREBASE CONSOLE

1. Truy cập [Firebase Console](https://console.firebase.google.com/).
2. Chọn dự án: `nova-store--shop-do`.
3. Vào **Build** -> **Firestore Database** -> Chọn tab **Rules**.
4. Sao chép toàn bộ nội dung từ file `firestore.rules` trong dự án và dán vào.
5. Bấm **Publish** (Xuất bản) để kích hoạt tường lửa bảo mật.
