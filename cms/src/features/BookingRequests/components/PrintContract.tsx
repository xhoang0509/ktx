import AppHeader from "@components/AppHeader";
import ContractForm from "@features/Bill/components/ContractForm";
import ContractPreview from "@features/Bill/components/ContractPreview";
import DownloadPDFButton from "@features/Bill/components/DownloadPDFButton";
import { ContractData, defaultContractData } from "@features/Bill/types/contract";
import { useAppDispatch } from "@services/store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookingRequestActions } from "../services/slice";

export default function PrintContract() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [contractData, setContractData] = useState<ContractData>(defaultContractData);

    const handleDataChange = (data: ContractData) => {
        setContractData(data);
    };

    useEffect(() => {
        dispatch(
            BookingRequestActions.getBookingRequestDetail({
                id: id,
                onSuccess: (data: any) => {
                    console.log(data);
                    setContractData({
                        ...defaultContractData,
                        ...data,
                        student: data.student,
                        room: data.room,
                    });
                },
            })
        );
    }, [id]);

    return (
        <div className="h-full flex flex-col">
            <AppHeader
                pageTitle="Hợp đồng thuê chỗ ở nội trú"
                rightMenu={<DownloadPDFButton targetElementId="contract-preview" />}
            />
            <div className="p-4 flex-1 overflow-auto bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left side: Form */}
                        <div>
                            <h2 className="text-xl font-bold mb-4">Thông tin hợp đồng</h2>
                            <ContractForm onDataChange={handleDataChange} />
                        </div>

                        {/* Right side: Preview */}
                        <div className="lg:sticky lg:top-4 self-start">
                            <h2 className="text-xl font-bold mb-4">Xem trước hợp đồng</h2>
                            <ContractPreview data={contractData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
