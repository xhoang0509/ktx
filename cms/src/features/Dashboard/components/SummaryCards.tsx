import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";

export interface AnalyticData {
    totalRoom: number;
    totalUser: number;
    totalUserInRoom: number;
    totalDevice: number;
    totalPriceElectric: number;
    totalPriceWater: number;
    totalPaid: number;
    totalUnpaid: number;
}

interface SummaryCardsProps {
    data: AnalyticData;
}

const SummaryCards = ({ data }: SummaryCardsProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN").format(amount);
    };

    const summaryItems = [
        {
            title: "Sinh viên đang ở",
            value: `${data.totalUserInRoom}/${data.totalUser}`,
            color: "text-blue-600",
            bgGradient: "from-blue-500 to-blue-600",
            bgLight: "bg-blue-50",
            icon: "👥",
            trend: "+12%",
            trendColor: "text-green-500"
        },
        {
            title: "Tổng hóa đơn điện",
            value: `${formatCurrency(data.totalPriceElectric)} VND`,
            color: "text-yellow-600",
            bgGradient: "from-yellow-500 to-orange-500",
            bgLight: "bg-yellow-50",
            icon: "⚡",
            trend: "+8%",
            trendColor: "text-green-500"
        },
        {
            title: "Tổng hóa đơn nước",
            value: `${formatCurrency(data.totalPriceWater)} VND`,
            color: "text-cyan-600",
            bgGradient: "from-cyan-500 to-blue-500",
            bgLight: "bg-cyan-50",
            icon: "💧",
            trend: "+5%",
            trendColor: "text-green-500"
        },
        {
            title: "Đã thanh toán",
            value: `${formatCurrency(data.totalPaid)} VND`,
            color: "text-green-600",
            bgGradient: "from-green-500 to-emerald-500",
            bgLight: "bg-green-50",
            icon: "✅",
            trend: "+15%",
            trendColor: "text-green-500"
        },
        {
            title: "Chưa thanh toán",
            value: `${formatCurrency(data.totalUnpaid)} VND`,
            color: "text-red-600",
            bgGradient: "from-red-500 to-pink-500",
            bgLight: "bg-red-50",
            icon: "❌",
            trend: "-3%",
            trendColor: "text-red-500"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {summaryItems.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                >
                    <Card className="shadow-sm hover:shadow-lg transition-all duration-300 border-0 overflow-hidden">
                        <CardBody className="p-6 relative">
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.bgGradient} flex items-center justify-center shadow-sm`}
                                >
                                    <span className="text-2xl">{item.icon}</span>
                                </div>
                                <div className={`text-xs font-semibold px-2 py-1 rounded-full ${item.bgLight} ${item.trendColor}`}>
                                    {item.trend}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-600 leading-tight">
                                    {item.title}
                                </h3>
                                <p className={`text-xl font-bold ${item.color} leading-tight`}>
                                    {item.value}
                                </p>
                            </div>

                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl"></div>
                        </CardBody>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

export default SummaryCards;
