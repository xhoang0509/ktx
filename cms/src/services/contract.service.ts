import SysFetch from "./axios";

export const ContractService = {
    getContracts: async () => {
        const response = await SysFetch.get(`/contract/list-admin`);
        return response
    }
}

