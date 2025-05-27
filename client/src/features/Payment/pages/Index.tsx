import BillService from "@services/bill.service";
import { useEffect, useState } from "react";
import BillCard from "../components/BillCard";
import { Bill, User } from "../types";

export default function PaymentPage() {
    const [bills, setBills] = useState<Bill[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getBills = async () => {
        setLoading(true);
        try {
            const response = await BillService.getBills();
            if (response.status === 200) {
                setBills(response.data.bills);
                setUser(response.data.user);
            }
        } catch (error) {
            setError("Đã có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBills();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Thanh toán hóa đơn
                    </h1>
                    <p className="mt-3 text-lg text-gray-600">
                        Quản lý và thanh toán các hóa đơn chưa thanh toán của bạn
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                            <p className="text-gray-600 text-lg">Đang tải dữ liệu...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-sm">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-lg font-medium text-red-800">Có lỗi xảy ra</h3>
                                <p className="text-sm text-red-700 mt-2">{error}</p>
                            </div>
                        </div>
                    </div>
                ) : bills.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="mx-auto h-24 w-24 text-gray-400">
                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-24 w-24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-medium text-gray-900 mt-4">
                            Không có hóa đơn nào
                        </h3>
                        <p className="text-gray-500 text-lg mt-2">
                            Hiện tại bạn không có hóa đơn nào cần thanh toán
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {bills.map((bill) => (
                            <BillCard key={bill.id} bill={bill} user={user} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
