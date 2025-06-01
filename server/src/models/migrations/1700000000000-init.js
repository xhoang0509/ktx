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
                images JSON,
                status VARCHAR(255) DEFAULT 'active',
                building VARCHAR(255),
                floor INT,
                type VARCHAR(255),
                note VARCHAR(255),
                devices JSON,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tạo bảng Device
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS device (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                type VARCHAR(255) NOT NULL,
                year_of_manufacture INT NOT NULL,
                status ENUM('good', 'broken', 'under_maintenance', 'deleted') DEFAULT 'good',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tạo bảng User
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                full_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                gender ENUM('male', 'female', 'other') DEFAULT 'other',
                password VARCHAR(1000) NOT NULL,
                phone VARCHAR(20),
                student_id VARCHAR(20) NOT NULL UNIQUE,
                avatar VARCHAR(255) NOT NULL,
                status ENUM('active', 'inactive', 'graduated', 'deleted') DEFAULT 'active',
                faculty_name VARCHAR(255) NOT NULL,
                class_code VARCHAR(255) NOT NULL,
                birth_date VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                room_id INT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE SET NULL
            )
        `);

        // Tạo bảng Contract
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS contract (
                id INT AUTO_INCREMENT PRIMARY KEY,
                start_date DATE NOT NULL,
                end_date DATE NOT NULL,
                duration INT NOT NULL,
                status ENUM('pending', 'active', 'terminated', 'expired', 'cancelled') DEFAULT 'pending',
                user_id INT,
                room_id INT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
                FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE SET NULL
            )
        `);

        // Tạo bảng Bill
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS bill (
                id INT AUTO_INCREMENT PRIMARY KEY,
                code VARCHAR(255) NOT NULL,
                electricity JSON,
                water JSON,
                internet INT,
                cleaning INT,
                totalAmount INT,
                status ENUM('pending', 'paid', 'overdue') DEFAULT 'pending',
                room_id INT,
                contract_id INT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE SET NULL,
                FOREIGN KEY (contract_id) REFERENCES contract(id) ON DELETE SET NULL
            )
        `);
    }

    async down(queryRunner) {
        // Xóa bảng theo thứ tự ngược lại để tránh vi phạm ràng buộc khóa ngoại
        await queryRunner.query(`DROP TABLE IF EXISTS bill`);
        await queryRunner.query(`DROP TABLE IF EXISTS contract`);
        await queryRunner.query(`DROP TABLE IF EXISTS user`);
        await queryRunner.query(`DROP TABLE IF EXISTS device`);
        await queryRunner.query(`DROP TABLE IF EXISTS room`);
        await queryRunner.query(`DROP TABLE IF EXISTS admin`);
    }
}

module.exports = InitMigration; 