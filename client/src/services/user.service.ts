import SysFetch from "@app/axios";

export const UserService = {
    getUserInfo: async () => {
        return await SysFetch.get(`/user/detail`);
    },
};
