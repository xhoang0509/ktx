
> Tạo một trang chi tiết yêu cầu đặt phòng trong dự án ReactJS (dùng Vite), với tên tiếng Anh là `BookingRequestDetailPage`. Trang này hiển thị chi tiết toàn bộ thông tin của một yêu cầu đặt phòng cụ thể.
>
> Dựa theo layout như trong ảnh, bao gồm các phần sau:
>
> ### 1. Header:
>
> * Tiêu đề: **"Chi tiết Yêu cầu"** (Booking Request Detail)
> * Nút "Quay lại" (Back)
> * Trạng thái hiện tại của yêu cầu: VD: "Chờ duyệt", "Đã duyệt", "Từ chối"
>
> ### 2. Thông tin yêu cầu:
>
> **Gồm các box thông tin hiển thị:**
>
> #### 🔹 Thông tin cơ bản:
>
> * Mã yêu cầu: YC001
> * Ngày tạo: 05/05/2025
> * Loại yêu cầu: Tham gia nội trú
> * Mã sinh viên: SV1234
> * Tên sinh viên: Nguyễn Văn A
> * Lớp: K66-CNTT
> * Email, Số điện thoại
>
> #### 🔹 Nội dung yêu cầu:
>
> * Thời gian đăng ký: Học kỳ 1 năm học 2025-2026
> * Tòa nhà: KTX A
> * Loại phòng: 4 người
> * Ghi chú: Sinh viên có nguyện vọng ở cùng bạn học cùng lớp
>
> #### 🔹 Tài liệu đính kèm:
>
> * Hiển thị danh sách file PDF (dưới dạng nút bấm tên file)
> * Ví dụ: `don_dang_ky.pdf`, `xac_nhan_sv.pdf`
>
> #### 🔹 Quyết định của Admin:
>
> * Textarea để nhập ghi chú xử lý
> * Hai nút: **"Duyệt"** và **"Từ chối"**
>
> ### 3. Cấu trúc thư mục và code:
>
> * Tạo folder mới: `src/features/bookingRequests/`
> * Các file cần có:
>
>   * `BookingRequestDetailPage.tsx`: trang chính chi tiết yêu cầu
>   * `components/BookingRequestInfo.tsx`: chứa các khối thông tin chính (thông tin cơ bản, nội dung, file đính kèm...)
>   * `components/AdminDecisionBox.tsx`: nơi admin nhập ghi chú và thực hiện duyệt/từ chối
>   * `types.ts`: định nghĩa kiểu dữ liệu BookingRequestDetail
>
> ### 4. Yêu cầu khác:
>
> * Không cần gọi API thật, có thể mock dữ liệu
> * Sử dụng Typescript, code rõ ràng
> * Thiết kế UI tương tự như các page trong `src/features/user/` đã có

---

Nếu bạn cần luôn mock data mẫu hoặc cấu trúc `interface BookingRequestDetail`, mình có thể cung cấp ngay. Bạn có muốn không?
