import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/react";
import { ContractService } from "@services/contract.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ContractCard from "./components/ContractCard";
import { Contract } from "./types";

export default function ListContract() {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetch, setIsRefetch] = useState(false);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const fetchContracts = async () => {
        setIsLoading(true);
        try {
            const res = await ContractService.getContracts();
            if (res.status === 200 && res?.data?.length > 0) {
                setContracts(res.data);
            }
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchContracts();
    }, [isRefetch]);

    return (
        <div className="container mx-auto px-4 py-6 max-w-5xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Danh sách hợp đồng</h1>
                <Button color="primary" variant="light" onClick={handleGoBack}>
                    <ArrowLeftIcon className="size-4" />
                    Quay lại
                </Button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Spinner />
                </div>
            ) : (
                <div>
                    {contracts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            {contracts.map((contract) => (
                                <ContractCard key={contract.id} contract={contract} setIsRefetch={setIsRefetch} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <p className="text-gray-500 text-lg">Chưa có hợp đồng nào</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
