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

    console.log(user);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Thanh toán hóa đơn</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Hiển thị các hóa đơn chưa thanh toán của bạn
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            ) : bills.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">Không có hóa đơn nào cần thanh toán</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {bills.map((bill) => (
                        <BillCard key={bill.id} bill={bill} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
}
