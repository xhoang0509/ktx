import SysFetch from "./axios";
import qs from "qs";

export const ContractService = {
    getContracts: async (params: any) => {
        const response = await SysFetch.get(`/contract/list-admin?${qs.stringify(params)}`);
        return response
    }
}

