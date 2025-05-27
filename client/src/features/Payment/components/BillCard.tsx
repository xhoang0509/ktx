import { Dialog, Transition } from "@headlessui/react";
import {
    BeakerIcon,
    BoltIcon,
    CalendarDaysIcon,
    CreditCardIcon,
    CurrencyDollarIcon,
    GlobeAltIcon,
    HomeIcon,
    SparklesIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import BillService from "@services/bill.service";
import { format } from "date-fns";
import { Fragment, useState } from "react";
import { Bill, User } from "../types";

interface BillCardProps {
    bill: Bill;
    user: User | any;
}

export default function BillCard({ bill, user }: BillCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    const currentCapacity =
        Number(bill?.room?.current_capacity) >= 1 ? Number(bill?.room?.current_capacity) : 1;
    const monthlyPaymentPerStudent = bill.totalAmount / currentCapacity;
    const roomBasePrice = parseFloat(bill.room.base_price);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };

    const formattedDate = (dateString: string) => {
        return format(new Date(dateString), "dd/MM/yyyy");
    };

    const handleConfirmPayment = async () => {
        try {
            const payload = {
                amount: monthlyPaymentPerStudent,
                bankCode: "",
                orderDescription: bill.code,
                orderType: "other",
                language: "vn",
            };
            const response = await BillService.createPaymentUrl(payload);
            if (response.status && response.data.vnpUrl) {
                window.location.href = response.data.vnpUrl;
            }
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "paid":
                return "success";
            case "pending":
                return "warning";
            case "overdue":
                return "danger";
            default:
                return "default";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "paid":
                return "Đã thanh toán";
            case "pending":
                return "Chưa thanh toán";
            case "overdue":
                return "Quá hạn";
            default:
                return "Không xác định";
        }
    };

    return (
        <>
            <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-0">
                    <div className="flex justify-between items-start w-full">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <CreditCardIcon className="w-5 h-5 text-blue-600" />
                                <h3 className="text-lg font-bold text-gray-900">{bill.code}</h3>
                            </div>
                            <Chip color={getStatusColor(bill.status)} variant="flat" size="sm">
                                {getStatusText(bill.status)}
                            </Chip>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Số tiền phải trả</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {formatCurrency(monthlyPaymentPerStudent)}
                            </p>
                            <p className="text-xs text-gray-400">
                                (Chia cho {currentCapacity} sinh viên)
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardBody className="pt-4">
                    {/* Room Information */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <HomeIcon className="w-6 h-6 text-blue-500 flex-shrink-0" />
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">
                                    Phòng {bill.room.name} - Tòa {bill.room.building}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Tầng {bill.room.floor} • {bill.room.type}
                                </p>
                            </div>
                        </div>

                        {/* Capacity Information */}
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                            <UserGroupIcon className="w-6 h-6 text-blue-500 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                    {bill.room.current_capacity}/{bill.room.max_capacity} sinh viên
                                </p>
                                <p className="text-sm text-gray-600">Sức chứa hiện tại</p>
                            </div>
                        </div>

                        {/* Bill Details */}
                        <Divider />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <HomeIcon className="w-4 h-4 text-green-500" />
                                    <span className="text-sm text-gray-600">Tiền phòng:</span>
                                    <span className="font-medium">
                                        {formatCurrency(roomBasePrice)}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <BoltIcon className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm text-gray-600">Điện:</span>
                                    <span className="font-medium">
                                        {formatCurrency(bill.electricity.amount)}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <BeakerIcon className="w-4 h-4 text-blue-500" />
                                    <span className="text-sm text-gray-600">Nước:</span>
                                    <span className="font-medium">
                                        {formatCurrency(bill.water.amount)}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <GlobeAltIcon className="w-4 h-4 text-purple-500" />
                                    <span className="text-sm text-gray-600">Internet:</span>
                                    <span className="font-medium">
                                        {formatCurrency(bill.internet)}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <SparklesIcon className="w-4 h-4 text-pink-500" />
                                    <span className="text-sm text-gray-600">Vệ sinh:</span>
                                    <span className="font-medium">
                                        {formatCurrency(bill.cleaning)}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <CalendarDaysIcon className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">Ngày tạo:</span>
                                    <span className="font-medium">
                                        {formattedDate(bill.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Divider />

                        {/* Total Amount */}
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
                                <span className="text-lg font-semibold text-gray-900">
                                    Tổng cộng:
                                </span>
                            </div>
                            <span className="text-lg font-bold text-blue-600">
                                {formatCurrency(bill.totalAmount)}
                            </span>
                        </div>

                        {/* Payment Button */}
                        <Button
                            onClick={openModal}
                            color={bill.status === "paid" ? "default" : "primary"}
                            disabled={bill.status === "paid"}
                            className="w-full"
                            size="lg"
                        >
                            {bill.status === "paid" ? "Đã thanh toán" : "Thanh toán ngay"}
                        </Button>
                    </div>
                </CardBody>
            </Card>

            {/* Payment Confirmation Modal */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 flex items-center gap-2"
                                    >
                                        <CreditCardIcon className="w-6 h-6 text-blue-600" />
                                        Xác nhận thanh toán
                                    </Dialog.Title>

                                    <div className="mt-4 space-y-3">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-600">Mã hóa đơn:</p>
                                            <p className="font-semibold">{bill.code}</p>
                                        </div>

                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-600">
                                                Số tiền cần thanh toán:
                                            </p>
                                            <p className="text-xl font-bold text-blue-600">
                                                {formatCurrency(monthlyPaymentPerStudent)}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                (Phần của bạn trong tổng số{" "}
                                                {formatCurrency(bill.totalAmount)})
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-600">Phòng:</p>
                                            <p className="font-semibold">
                                                {bill.room.name} - Tòa {bill.room.building}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end space-x-3">
                                        <Button color="default" variant="flat" onPress={closeModal}>
                                            Hủy
                                        </Button>
                                        <Button color="primary" onPress={handleConfirmPayment}>
                                            Xác nhận thanh toán
                                        </Button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
