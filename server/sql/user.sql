INSERT INTO user (
    full_name, username, gender, password, phone, student_id, avatar, status, createdAt, updatedAt, roomId
) VALUES
('Nguyễn Văn A', 'nguyenvana', 'male', 'hashedpassword1', '0912345678', 'SV0001', 'avatar1.jpg', 'active', NOW(), NOW(), NULL),
('Trần Thị B', 'tranthib', 'female', 'hashedpassword2', '0912345679', 'SV0002', 'avatar2.jpg', 'active', NOW(), NOW(), NULL),
('Lê Văn C', 'levanc', 'male', 'hashedpassword3', '0912345680', 'SV0003', 'avatar3.jpg', 'active', NOW(), NOW(), NULL),
('Phạm Thị D', 'phamthid', 'female', 'hashedpassword4', '0912345681', 'SV0004', 'avatar4.jpg', 'active', NOW(), NOW(), NULL),
('Hoàng Văn E', 'hoangvane', 'male', 'hashedpassword5', '0912345682', 'SV0005', 'avatar5.jpg', 'inactive', NOW(), NOW(), NULL),
('Đỗ Thị F', 'dothif', 'female', 'hashedpassword6', '0912345683', 'SV0006', 'avatar6.jpg', 'active', NOW(), NOW(), NULL),
('Vũ Văn G', 'vuvang', 'male', 'hashedpassword7', '0912345684', 'SV0007', 'avatar7.jpg', 'graduated', NOW(), NOW(), NULL),
('Ngô Thị H', 'ngothih', 'female', 'hashedpassword8', '0912345685', 'SV0008', 'avatar8.jpg', 'active', NOW(), NOW(), NULL),
('Bùi Văn I', 'buivani', 'male', 'hashedpassword9', '0912345686', 'SV0009', 'avatar9.jpg', 'active', NOW(), NOW(), NULL),
('Đặng Thị J', 'dangthij', 'female', 'hashedpassword10', '0912345687', 'SV0010', 'avatar10.jpg', 'active', NOW(), NOW(), NULL),
('Lý Văn K', 'lyvank', 'male', 'hashedpassword11', '0912345688', 'SV0011', 'avatar11.jpg', 'deleted', NOW(), NOW(), NULL),
('Hà Thị L', 'hathil', 'female', 'hashedpassword12', '0912345689', 'SV0012', 'avatar12.jpg', 'active', NOW(), NOW(), NULL),
('Trịnh Văn M', 'trinhvanm', 'male', 'hashedpassword13', '0912345690', 'SV0013', 'avatar13.jpg', 'active', NOW(), NOW(), NULL),
('Cao Thị N', 'caothin', 'female', 'hashedpassword14', '0912345691', 'SV0014', 'avatar14.jpg', 'active', NOW(), NOW(), NULL),
('Lương Văn O', 'luongvano', 'male', 'hashedpassword15', '0912345692', 'SV0015', 'avatar15.jpg', 'graduated', NOW(), NOW(), NULL),
('Đinh Thị P', 'dinhthip', 'female', 'hashedpassword16', '0912345693', 'SV0016', 'avatar16.jpg', 'active', NOW(), NOW(), NULL),
('Phan Văn Q', 'phanvanq', 'male', 'hashedpassword17', '0912345694', 'SV0017', 'avatar17.jpg', 'inactive', NOW(), NOW(), NULL),
('Tô Thị R', 'tothir', 'female', 'hashedpassword18', '0912345695', 'SV0018', 'avatar18.jpg', 'active', NOW(), NOW(), NULL),
('Mai Văn S', 'maivans', 'male', 'hashedpassword19', '0912345696', 'SV0019', 'avatar19.jpg', 'active', NOW(), NOW(), NULL),
('Châu Thị T', 'chauthit', 'female', 'hashedpassword20', '0912345697', 'SV0020', 'avatar20.jpg', 'deleted', NOW(), NOW(), NULL);


-- update user password

use ktx;

UPDATE `user` SET password = '$argon2id$v=19$m=65536,t=3,p=4$nRIektd77bhpdCdsNWAffg$FUnTnwmms/LWzmhKPtPhvdfFYTGEAY8RVNLlpISrCbE'