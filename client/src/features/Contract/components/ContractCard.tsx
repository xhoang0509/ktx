import { BuildingOfficeIcon, CalendarIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import {
    Button,
    Chip,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@heroui/react";
import { ContractService } from "@services/contract.service";
import { getGender, getGenderColor } from "@utils/gender.util";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Contract } from "../types";
import ContractStatusBadge from "./ContractStatusBadge";

interface ContractCardProps {
    contract: Contract;
    setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContractCard: React.FC<ContractCardProps> = ({ contract, setIsRefetch }) => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const formatDate = (dateString: string) => {
        return moment(dateString).format("DD/MM/YYYY");
    };

    const handleCancelContract = () => {
        onOpen();
        console.log("cancel contract");
    };

    const handleConfirmCancelContract = async () => {
        const res = await ContractService.cancelContract(contract.id);
        if (res.status === 200) {
            toast.success("Hủy hợp đồng thành công");
            setTimeout(() => {
                onOpenChange();
                setIsRefetch((prev: boolean) => !prev);
            }, 1000);
        } else {
            toast.error("Hủy hợp đồng thất bại");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-semibold">Hợp đồng #{contract.id}</h3>
                        <p className="text-sm text-gray-500">
                            <span className="inline-flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-1" />
                                Ngày tạo: {formatDate(contract.createdAt)}
                            </span>
                        </p>
                    </div>
                    <ContractStatusBadge status={contract.status} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Thời gian bắt đầu</p>
                        <p className="font-medium">{formatDate(contract.start_date)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Thời gian kết thúc</p>
                        <p className="font-medium">{formatDate(contract.end_date)}</p>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Tổng thời gian thuê</p>
                    <p className="font-medium">{contract.duration} tháng</p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                    <h4 className="text-md font-medium mb-2">Thông tin phòng</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex items-center">
                            <BuildingOfficeIcon className="w-5 h-5 mr-2 text-gray-500" />
                            <span>{contract.room.building}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-medium mr-2">Phòng:</span>
                            <span>{contract.room.name}</span>
                        </div>
                        <div className="flex items-center">
                            <UserGroupIcon className="w-5 h-5 mr-2 text-gray-500" />
                            <Chip className={`${getGenderColor(contract.room.gender)} text-white`}>
                                {getGender(contract.room.gender)}
                            </Chip>
                        </div>
                    </div>
                </div>

                {["pending",].includes(contract.status) && (
                    <div className="border-t border-gray-100 pt-4">
                        <Button color="danger" onClick={handleCancelContract}>
                            Hủy hợp đồng
                        </Button>
                    </div>
                )}

                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Hủy hợp đồng
                                </ModalHeader>
                                <ModalBody>
                                    <div>
                                        <strong>Hành động này không thể hoàn tác!</strong> Bạn có
                                        chắc chắn muốn hủy hợp đồng này không?
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Hủy
                                    </Button>
                                    <Button color="primary" onPress={handleConfirmCancelContract}>
                                        Xác nhận
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
};

export default ContractCard;
