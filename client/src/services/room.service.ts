import SysFetch from "@app/axios";
import qs from "qs";

export const RoomService = {
    getRooms: async (data: any) => {
        const response = await SysFetch.get(`/room?${qs.stringify(data)}`);
        return response.data;
    },
    getRoomById: async (id: string) => {
        const response = await SysFetch.get(`/room/${id}`);
        return response.data;
    },
    
};
