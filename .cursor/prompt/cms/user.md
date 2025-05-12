Dưới đây là prompt tương tự, dành cho trang **chỉnh sửa User** (`EditUserPage`) với các trường thông tin như bạn yêu cầu:

---

> Tạo một trang chi tiết chỉnh sửa User trong dự án ReactJS (dùng Vite), với tên tiếng Anh là `EditUserPage`. Trang này hiển thị chi tiết toàn bộ thông tin của một User cụ thể để Admin có thể chỉnh sửa.

---

### 1. Header:

* Tiêu đề: **"Chỉnh sửa người dùng"** (Edit User Page)
* Nút "Quay lại" (Back)
* Hiển thị trạng thái của user: Ví dụ: `Đang hoạt động`, `Đã khóa`, `Chờ xác minh`

---

### 2. Thông tin người dùng:

**Gồm các box thông tin, có thể chỉnh sửa:**

#### 🔹 Thông tin cá nhân:

* Họ và tên (`full_name`)
* Tên đăng nhập (`username`)
* Giới tính (`gender`): Nam / Nữ / Khác (select box)
* Số điện thoại (`phone`)
* Ảnh đại diện (`avatar`): Cho phép upload ảnh mới, hiển thị ảnh hiện tại

#### 🔹 Trạng thái tài khoản:

* Trạng thái hiện tại (`status`): dropdown hoặc radio gồm các giá trị:
'active','inactive','graduated','deleted'

---

### 3. Hành động:

* Nút **"Lưu thay đổi"**
* Nút **"Hủy bỏ"** (quay lại trang trước mà không lưu)

---

### 4. Cấu trúc thư mục và code:

Tạo folder mới: `src/features/User/`

Các file cần có:

* `EditUserPage.tsx`: trang chính chỉnh sửa người dùng
* `components/UserInfoForm.tsx`: chứa form nhập thông tin cá nhân
* `components/UserStatusSection.tsx`: phần hiển thị và cập nhật trạng thái
* `types.ts`: định nghĩa kiểu dữ liệu `UserDetail`

---

### 5. Yêu cầu khác:

* Không cần gọi API thật, có thể mock dữ liệu
* Sử dụng TypeScript, code rõ ràng
* UI nên đồng bộ với các trang trong `src/features/User/` đã có
* Có thể sử dụng thư viện như `react-hook-form` để xử lý form nếu cần

---

Bạn có muốn mình **viết sẵn mock data** và interface `UserDetail` để bắt đầu nhanh không?
