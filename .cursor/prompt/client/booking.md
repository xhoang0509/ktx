> **Tạo một trang đặt phòng trong dự án ReactJS (dùng Vite)**, với tên tiếng Anh là `Booking`. Trang này hiển thị thông tin chi tiết của một phòng ký túc xá và cho phép sinh viên gửi yêu cầu đặt phòng.
>
> Dựa theo layout chuẩn, trang bao gồm các phần sau:
>
> ### 1. Header:
>
> * Tiêu đề: **"Đặt phòng nội trú"** (Dormitory Room Booking)
> * Nút "Quay lại" (Back)
>
> ### 2. Thông tin phòng:
>
> **Gồm các box thông tin hiển thị:**
>
> #### 🔹 Thông tin chung:
>
> * Mã phòng: P101
> * Tòa nhà: KTX A
> * Loại phòng: 4 người
> * Giới tính: Nam
> * Tình trạng: Còn trống / Đã đầy
> * Ghi chú: Phòng gần cầu thang, có ban công
>
> #### 🔹 Danh sách thành viên hiện tại (nếu có):
>
> * Hiển thị danh sách sinh viên đã ở trong phòng (tên, mã SV, lớp)
> * Nếu chưa có ai, hiển thị dòng "Phòng chưa có sinh viên nào"
>
> ### 3. Gửi yêu cầu đặt phòng:
>
> * Form bao gồm:
>
>   * Thời gian đăng ký: chọn học kỳ (dropdown)
>   * Ghi chú của sinh viên: Textarea (VD: mong muốn ở cùng bạn, nhu cầu đặc biệt…)
>   * Nút **"Gửi yêu cầu"**
>
> ### 4. Cấu trúc thư mục và code:
>
> * Tạo folder mới: `src/features/RoomRegistration/`
> * Các file cần có:
>
>   * `Booking.tsx`: trang chính đặt phòng
>   * `components/RoomInfoBox.tsx`: hiển thị thông tin phòng
>   * `components/RoomMembers.tsx`: hiển thị danh sách sinh viên đã ở
>   * `components/BookingForm.tsx`: form gửi yêu cầu đặt phòng
>   * `types.ts`: định nghĩa kiểu dữ liệu RoomDetail, BookingPayload
>
> ### 5. Yêu cầu khác:
>
> * Không cần gọi API thật, có thể mock dữ liệu
> * Sử dụng Typescript, code rõ ràng
