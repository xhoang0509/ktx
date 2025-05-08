export function convertGenderToVietnamese(gender: string): string {
    switch (gender.toLowerCase()) {
        case 'male':
            return 'Nam';
        case 'female':
            return 'Nữ';
        default:
            return 'Khác';
    }
}