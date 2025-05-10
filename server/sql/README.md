# Hướng dẫn cập nhật cấu trúc database

## Cập nhật bảng Room

Để sửa lỗi "Data too long for column 'images' at row 1", bạn cần chạy lệnh SQL sau để thay đổi kiểu dữ liệu của cột images:

```sql
ALTER TABLE room MODIFY COLUMN images JSON DEFAULT ('[]');
```

Nếu bạn gặp lỗi với ALTER COLUMN, hãy thử cách sau:

```sql
ALTER TABLE room DROP COLUMN images;
ALTER TABLE room ADD COLUMN images JSON DEFAULT ('[]');
```

Bạn có thể chạy lệnh SQL bằng một trong các cách sau:

1. Sử dụng MySQL CLI:
```bash
mysql -u username -p database_name < sql/update_room_table.sql
```

2. Sử dụng giao diện quản lý như phpMyAdmin, MySQL Workbench hoặc Adminer:
   - Mở giao diện quản lý
   - Chọn database của bạn
   - Mở tab "SQL" hoặc "Query"
   - Dán lệnh SQL vào và thực thi

## Lưu ý

Sau khi cập nhật cấu trúc database, khởi động lại server để đảm bảo TypeORM nhận được cấu trúc database mới. 