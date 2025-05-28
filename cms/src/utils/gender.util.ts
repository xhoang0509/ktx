export function convertGenderToVietnamese(gender: string): string {
    if (!gender) return 'Khác';
    switch (gender.toLowerCase()) {
        case 'male':
            return 'Nam';
        case 'female':
            return 'Nữ';
        default:
            return 'Khác';
    }
}