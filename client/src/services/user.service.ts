import SysFetch from "@app/axios";

export const UserService = {
    getUserInfo: async () => {
        return await SysFetch.get(`/user/detail`);
    },
    updateUserInfo: async (data: {
        full_name?: string;
        phone?: string;
        faculty_name?: string;
        class_code?: string;
    }) => {
        return await SysFetch.put(`/user/modify`, data);
    },
    uploadAvatar: async (file: File) => {
        const formData = new FormData();
        formData.append('avatar', file);
        return await SysFetch.post(`/user/upload-avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};
