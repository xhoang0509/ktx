Đây là prompt cho Cursor AI để thực hiện chức năng generate UI màn hình Booking Room
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


Dựa vào prompt mẫu ở trên, hãy cho tôi 1 prompt tương tự với cấu trúc như trên về trang ListContract, để xem thông tin danh sách các hợp đồng đã thuê ký túc xá của Sinh viên bao gồm:
Thời gian tạo hợp đồng (createdAt)
Thời gian bắt đầu thuê (start_date)
Thời gian hết hạn thuê (end_date)
Tổng thời gian thuê ( duration )
Trạng thái ( status) có kiểu enum : "pending", "active", "terminated", "expired"
Thông tin phòng: được query theo roomId
. code được code trong folder /features/Contract/index.tsx. Sử dụng package + icon UI có sẵn heroui và heroicon kết hợp với tailwindcss

==========

> **Tạo một trang hiển thị danh sách hợp đồng thuê Ký túc xá trong dự án ReactJS (dùng Vite)**, với tên tiếng Anh là `ListContract`. Trang này hiển thị các hợp đồng đã ký kết giữa sinh viên và ký túc xá, bao gồm thông tin thời gian, trạng thái và phòng thuê.
>
> Dựa theo layout chuẩn, trang bao gồm các phần sau:
>
> ### 1. Header:
>
> * Tiêu đề: **"Danh sách hợp đồng"** (Dormitory Rental Contracts)
> * Nút "Quay lại" (Back)
>
> ### 2. Danh sách hợp đồng:
>
> * Hiển thị danh sách các hợp đồng đã thuê ký túc xá của sinh viên
> * Mỗi hợp đồng hiển thị theo dạng card hoặc bảng, bao gồm các thông tin:
>
>   * **Ngày tạo hợp đồng**: `createdAt` (hiển thị dạng DD/MM/YYYY)
>   * **Thời gian bắt đầu**: `start_date`
>   * **Thời gian kết thúc**: `end_date`
>   * **Tổng thời gian thuê**: `duration` (số tháng hoặc số ngày)
>   * **Trạng thái**: `status`
>     Trạng thái là enum gồm các giá trị:
>
>     * `"pending"` (Đang chờ)
>     * `"active"` (Đang hiệu lực)
>     * `"terminated"` (Đã chấm dứt)
>     * `"expired"` (Đã hết hạn)
>       → Hiển thị bằng badge màu sắc tương ứng kèm icon từ **Heroicons**
>   * **Thông tin phòng** (roomId):
>
>     * Mã phòng
>     * Tòa nhà
>     * Loại phòng
> * Nếu không có hợp đồng nào, hiển thị dòng `"Chưa có hợp đồng nào"`
>
> ### 3. UI & Hiển thị:
>
> * Sử dụng component UI từ [**HeroUI**](https://headlessui.com) kết hợp [**Heroicons**](https://heroicons.com) và **TailwindCSS**
> * Responsive trên thiết bị mobile và desktop
> * Hiển thị đẹp, dễ đọc, dùng các icon phù hợp với trạng thái hợp đồng
>
> ### 4. Cấu trúc thư mục và code:
>
> * Tạo folder mới: `src/features/Contract/`
> * Các file cần có:
>
>   * `index.tsx`: trang chính hiển thị danh sách hợp đồng
>   * `components/ContractCard.tsx`: hiển thị chi tiết một hợp đồng
>   * `components/ContractStatusBadge.tsx`: hiển thị trạng thái hợp đồng (badge + icon)
>   * `types.ts`: định nghĩa kiểu dữ liệu `Contract`, `Room`
>
> ### 5. Yêu cầu khác:
>
> * Không cần gọi API thật, có thể mock dữ liệu hợp đồng và phòng
> * Sử dụng Typescript, code rõ ràng, component hóa
> * Dùng `createdAt`, `start_date`, `end_date` ở định dạng ngày dễ đọc
> * Có thể thêm định dạng ngày bằng thư viện như `dayjs` nếu cần
