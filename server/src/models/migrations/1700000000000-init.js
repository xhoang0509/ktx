/**
 * Migration file để tạo tất cả các bảng cho ứng dụng
 */
class InitMigration {
    async up(queryRunner) {
        // Tạo bảng Admin
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS admin (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('superadmin', 'staff') DEFAULT 'staff',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tạo bảng Room
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS room (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                gender ENUM('male', 'female', 'other') NOT NULL,
                max_capacity INT NOT NULL,
                current_capacity INT DEFAULT 0,
                base_price DECIMAL(10,2) NOT NULL,
                images JSON DEFAULT ('[]'),
                status VARCHAR(255) DEFAULT 'active',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tạo bảng Device
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS device (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                status ENUM('good', 'broken', 'deleted') DEFAULT 'good',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tạo bảng User
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                full_name VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL UNIQUE,
                gender ENUM('male', 'female', 'other') DEFAULT 'other',
                password VARCHAR(255) NOT NULL,
                phone VARCHAR(20),
                student_id VARCHAR(20) NOT NULL UNIQUE,
                avatar VARCHAR(255),
                status ENUM('active', 'inactive', 'graduated', 'deleted') DEFAULT 'active',
                room_id INT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE SET NULL
            )
        `);

        // Tạo bảng RoomDevice
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS room_device (
                id INT AUTO_INCREMENT PRIMARY KEY,
                quantity INT NOT NULL,
                condition ENUM('good', 'broken', 'under_maintenance') NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                room_id INT,
                device_id INT,
                FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE CASCADE,
                FOREIGN KEY (device_id) REFERENCES device(id) ON DELETE CASCADE
            )
        `);

        // Tạo bảng Contract
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS contract (
                id INT AUTO_INCREMENT PRIMARY KEY,
                start_date DATE NOT NULL,
                end_date DATE NOT NULL,
                duration INT NOT NULL,
                status ENUM('pending', 'active', 'terminated', 'expired') DEFAULT 'pending',
                user_id INT,
                room_id INT,
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
                FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE SET NULL
            )
        `);

        // Tạo bảng Payment
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS payment (
                id INT AUTO_INCREMENT PRIMARY KEY,
                rent_amount DECIMAL(10,2) NOT NULL,
                utility_amount DECIMAL(10,2) DEFAULT 0,
                total_amount DECIMAL(10,2) NOT NULL,
                payment_method ENUM('VNPay', 'cash', 'bank_transfer'),
                status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
                payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                month INT NOT NULL,
                year INT NOT NULL,
                is_settled BOOLEAN DEFAULT false,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                user_id INT,
                room_id INT,
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
                FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE SET NULL
            )
        `);

        // Tạo bảng Request
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS request (
                id INT AUTO_INCREMENT PRIMARY KEY,
                category ENUM('repair', 'complaint', 'suggestion', 'leave_dorm', 'guest_visit') NOT NULL,
                description TEXT NOT NULL,
                status ENUM('pending', 'in_progress', 'resolved', 'approved', 'rejected') DEFAULT 'pending',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                user_id INT,
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            )
        `);

        // Tạo bảng Violation
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS violation (
                id INT AUTO_INCREMENT PRIMARY KEY,
                type ENUM('reward', 'punishment') NOT NULL,
                description TEXT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                user_id INT,
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            )
        `);

        // Tạo bảng Notification
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS notification (
                id INT AUTO_INCREMENT PRIMARY KEY,
                type ENUM('all', 'personal') DEFAULT 'all',
                title VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                is_read BOOLEAN DEFAULT false,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                sender_id INT,
                receiver_id INT,
                FOREIGN KEY (sender_id) REFERENCES admin(id) ON DELETE SET NULL,
                FOREIGN KEY (receiver_id) REFERENCES user(id) ON DELETE CASCADE
            )
        `);

        // Tạo bảng MaintenanceRequest
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS maintenance_request (
                id INT AUTO_INCREMENT PRIMARY KEY,
                description VARCHAR(255) NOT NULL,
                status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                room_device_id INT,
                user_id INT,
                FOREIGN KEY (room_device_id) REFERENCES room_device(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            )
        `);
    }

    async down(queryRunner) {
        // Xóa bảng theo thứ tự ngược lại để tránh vi phạm ràng buộc khóa ngoại
        await queryRunner.query(`DROP TABLE IF EXISTS maintenance_request`);
        await queryRunner.query(`DROP TABLE IF EXISTS notification`);
        await queryRunner.query(`DROP TABLE IF EXISTS violation`);
        await queryRunner.query(`DROP TABLE IF EXISTS request`);
        await queryRunner.query(`DROP TABLE IF EXISTS payment`);
        await queryRunner.query(`DROP TABLE IF EXISTS contract`);
        await queryRunner.query(`DROP TABLE IF EXISTS room_device`);
        await queryRunner.query(`DROP TABLE IF EXISTS user`);
        await queryRunner.query(`DROP TABLE IF EXISTS device`);
        await queryRunner.query(`DROP TABLE IF EXISTS room`);
        await queryRunner.query(`DROP TABLE IF EXISTS admin`);
    }
}

module.exports = InitMigration; 