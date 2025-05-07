export const generateSku = (text: string) => {
  return text
    .normalize("NFD") // Tách chữ và dấu
    .replace(/\p{Diacritic}/gu, "") // Xóa dấu
    .toLowerCase()
    .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu '-'
    .replace(/[^a-z0-9-]/g, ""); // Loại bỏ ký tự đặc biệt
};
