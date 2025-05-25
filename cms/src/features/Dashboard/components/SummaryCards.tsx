import { Card, CardBody } from "@heroui/react";
import { SummaryData } from "../types";

interface SummaryCardsProps {
    data: SummaryData;
}

const SummaryCards = ({ data }: SummaryCardsProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN').format(amount);
    };

    const summaryItems = [
        {
            title: "Sinh viên đang ở",
            value: `${data.totalStudents}/${data.maxCapacity}`,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            icon: "👥"
        },
        {
            title: "Tổng hóa đơn điện",
            value: `${formatCurrency(data.totalElectricityBill)} VND`,
            color: "text-yellow-600",
            bgColor: "bg-yellow-50",
            icon: "⚡"
        },
        {
            title: "Tổng hóa đơn nước",
            value: `${formatCurrency(data.totalWaterBill)} VND`,
            color: "text-cyan-600",
            bgColor: "bg-cyan-50",
            icon: "💧"
        },
        {
            title: "Đã thanh toán",
            value: `${formatCurrency(data.totalPaidBills)} VND`,
            color: "text-green-600",
            bgColor: "bg-green-50",
            icon: "✅"
        },
        {
            title: "Chưa thanh toán",
            value: `${formatCurrency(data.totalUnpaidBills)} VND`,
            color: "text-red-600",
            bgColor: "bg-red-50",
            icon: "❌"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {summaryItems.map((item, index) => (
                <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardBody className="p-4">
                        <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center mb-3`}>
                            <span className="text-xl">{item.icon}</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">{item.title}</h3>
                        <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default SummaryCards; 