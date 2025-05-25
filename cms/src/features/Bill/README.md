# Bill Feature - EditBillPage

## Tổng quan
Trang EditBillPage cho phép chỉnh sửa thông tin hóa đơn đã tồn tại trong hệ thống.

## Tính năng chính

### 1. Load dữ liệu hóa đơn
- Tự động load dữ liệu hóa đơn từ API khi vào trang
- Hiển thị loading state trong quá trình tải
- Populate form với dữ liệu đã load

### 2. Form validation
- Sử dụng Yup schema để validate dữ liệu
- Hiển thị lỗi validation real-time
- Kiểm tra tính hợp lệ của các trường bắt buộc

### 3. Tính toán tự động
- Tự động tính toán số tiền điện/nước dựa trên chỉ số và đơn giá
- Cập nhật tổng tiền khi có thay đổi
- Hiển thị preview tổng tiền ở sidebar

### 4. Error handling
- Hiển thị lỗi khi không thể load dữ liệu
- Cho phép retry khi có lỗi
- Toast notification khi cập nhật thành công/thất bại

### 5. UX improvements
- Loading states cho các action
- Disable form khi đang submit
- Nút quay lại để navigation
- Responsive design

## Cấu trúc components

### EditBillPage
- Component chính quản lý state và logic
- Sử dụng React Hook Form để quản lý form
- Dispatch actions đến Redux store

### LoadingSpinner
- Component tái sử dụng cho loading states
- Có thể customize message và size

### ErrorDisplay  
- Component tái sử dụng cho hiển thị lỗi
- Hỗ trợ retry functionality
- Customizable error message và retry text

### ServiceFeeInput
- Component cho nhập liệu tiền điện/nước
- Tự động tính toán amount dựa trên usage và unit price
- Validation cho các trường số

### TotalAmount
- Component hiển thị tổng tiền
- Breakdown chi tiết các khoản phí
- Sticky positioning ở sidebar

## Redux Integration

### Actions
- `getBillDetail`: Load chi tiết hóa đơn
- `editBill`: Cập nhật hóa đơn
- `clearCurrentBill`: Clear state khi unmount
- `clearError`: Clear error state

### Selectors
- `currentBill`: Dữ liệu hóa đơn hiện tại
- `loading`: Trạng thái loading
- `error`: Thông báo lỗi

### Saga
- Xử lý async operations
- Error handling và toast notifications
- API calls với proper error handling

## Usage

```typescript
// Navigate to edit page
navigate(`/bill/edit/${billId}`);

// Component sẽ tự động:
// 1. Load dữ liệu hóa đơn
// 2. Populate form
// 3. Enable editing
// 4. Handle submit và navigation
```

## API Endpoints

- `GET /payment/admin-bill/{id}` - Load chi tiết hóa đơn
- `PUT /payment/admin-bill/{id}` - Cập nhật hóa đơn
- `GET /booking-requests?status=active` - Load danh sách contracts

## Error Scenarios

1. **Invalid Bill ID**: Hiển thị error page với option quay lại
2. **Network Error**: Hiển thị error với retry option  
3. **Validation Error**: Hiển thị inline errors trên form
4. **Submit Error**: Toast notification và giữ nguyên form

## Testing

Mock data được cung cấp trong `mock/billData.ts` để test functionality. 