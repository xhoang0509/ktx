import SysFetch from "@app/axios";

export const ContractService = {
    createContract: async (data: any) => {
        const response = await SysFetch.post('/contract', data);
        return response.data;
    }
}

