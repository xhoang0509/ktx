import SysFetch from "@app/axios";

export const ContractService = {
    createContract: async (data: any) => {
        const response = await SysFetch.post('/contract', data);
        return response;
    },
    getContracts: async () => {
        const response = await SysFetch.get('/contract/list');
        return response;
    },
    cancelContract: async (id: string) => {
        const response = await SysFetch.post(`/contract/${id}/cancel`);
        return response;
    }
}

