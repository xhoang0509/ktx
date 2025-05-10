const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

/**
 * Lưu ảnh base64 vào hệ thống file
 * @param {string[]} base64Images - Mảng các chuỗi base64
 * @param {string} folder - Thư mục lưu ảnh (relative path from public/images)
 * @returns {string[]} Mảng các đường dẫn đến ảnh đã lưu
 */
const saveBase64Images = async (base64Images, folder = 'rooms') => {
    if (!base64Images || !Array.isArray(base64Images) || base64Images.length === 0) {
        return [];
    }

    const uploadDir = path.join(__dirname, '../public/images', folder);
    
    // Đảm bảo thư mục tồn tại
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const savedPaths = [];

    for (const base64String of base64Images) {
        try {
            // Kiểm tra base64 có hợp lệ không
            if (!base64String || typeof base64String !== 'string' || !base64String.includes('base64')) {
                continue;
            }

            // Tách metadata và dữ liệu
            const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (!matches || matches.length !== 3) {
                continue;
            }

            const type = matches[1];
            const data = Buffer.from(matches[2], 'base64');
            
            // Xác định phần mở rộng file
            const extension = type.split('/')[1];
            const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
            
            if (!allowedExtensions.includes(extension)) {
                continue;
            }

            // Tạo tên file ngẫu nhiên
            const fileName = `${uuidv4()}.${extension}`;
            const filePath = path.join(uploadDir, fileName);
            
            // Ghi file
            fs.writeFileSync(filePath, data);
            
            // Lưu đường dẫn tương đối
            savedPaths.push(`/images/${folder}/${fileName}`);
        } catch (error) {
            console.error('Error saving image:', error);
        }
    }

    return savedPaths;
};

module.exports = {
    saveBase64Images
}; 