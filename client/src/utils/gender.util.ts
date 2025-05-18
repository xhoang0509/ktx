export const getGender = (gender: string) => {
    if (gender === "male") return "Nam";
    if (gender === "female") return "Nữ";
    return "Khác";
};

export const getGenderColor = (gender: string) => {
    if (gender === "male") return "bg-blue-500";
    if (gender === "female") return "bg-pink-500";
    return "bg-gray-500";
};

