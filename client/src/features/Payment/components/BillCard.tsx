import { Dialog, Transition } from "@headlessui/react";
import { format } from "date-fns";
import { Fragment, useState } from "react";
import { Bill, User } from "../types";
import BillBreakdown from "./BillBreakdown";
import BillService from "@services/bill.service";
import { Button } from "@heroui/button";

interface BillCardProps {
    bill: Bill;
    user: User | any;
}

export default function BillCard({ bill, user }: BillCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

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
                amount: bill.totalAmount,
                bankCode: "",
                orderDescription: bill.code,
                orderType: "other",
                language: "vn",
            };
            const response = await BillService.createPaymentUrl(payload);
            if (response.status && response.data.vnpUrl) {
                window.location.href = response.data.vnpUrl;
            }
        } catch (error) {}
    };
    const getBillStatus = () => {
        if (bill.status === "pending") {
            return "Chưa thanh toán";
        }
        if (bill.status === "paid") {
            return "Đã thanh toán";
        }
        if (bill.status === "overdue") {
            return "Quá hạn";
        }
        return "không xác định";
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-gray-900">{bill.code}</h3>
                        </div>
                        <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                                bill.status === "paid"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {getBillStatus()}
                        </span>
                        <div className="text-gray-500 text-sm mt-1">
                            Ngày tạo: {formattedDate(bill.createdAt)}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                            {formatCurrency(bill.totalAmount)}
                        </p>
                    </div>
                </div>

                <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-gray-700 font-medium">
                                {bill.room.name} - {bill.room.building}
                            </p>
                            <div className="mt-2 text-sm text-gray-600">
                                <p>{user.full_name}</p>
                                <p>MSSV: {user.student_id}</p>
                                <p>Email: {user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 mt-4">
                        <Button
                            onClick={openModal}
                            color={bill.status === "paid" ? "secondary" : "primary"}
                            disabled={bill.status === "paid"}
                        >
                            Thanh toán ngay
                        </Button>
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            {expanded ? "Ẩn chi tiết" : "Xem chi tiết"}
                        </button>
                    </div>
                </div>

                {expanded && <BillBreakdown bill={bill} />}
            </div>

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
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Xác nhận thanh toán
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Bạn có chắc chắn muốn thanh toán hóa đơn {bill.code} với
                                            số tiền {formatCurrency(bill.totalAmount)}?
                                        </p>
                                    </div>

                                    <div className="mt-4 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={handleConfirmPayment}
                                        >
                                            Xác nhận
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
