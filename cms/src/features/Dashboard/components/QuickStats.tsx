import { Card, CardBody, Progress, Avatar } from "@heroui/react";
import { motion } from "framer-motion";
import { 
    UsersIcon, 
    BuildingOfficeIcon, 
    WrenchScrewdriverIcon,
    CurrencyDollarIcon 
} from "@heroicons/react/24/outline";

interface QuickStatsProps {
    totalUsers: number;
    totalRooms: number;
    totalDevices: number;
    totalRevenue: number;
    occupancyRate: number;
    maintenanceCount: number;
}

const QuickStats = ({ 
    totalUsers, 
    totalRooms, 
    totalDevices, 
    totalRevenue, 
    occupancyRate, 
    maintenanceCount 
}: QuickStatsProps) => {
    const stats = [
        {
            title: "Tổng sinh viên",
            value: totalUsers,
            icon: UsersIcon,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            change: "+5.2%",
            changeType: "increase"
        },
        {
            title: "Tổng phòng",
            value: totalRooms,
            icon: BuildingOfficeIcon,
            color: "text-green-600",
            bgColor: "bg-green-100",
            change: "Ổn định",
            changeType: "stable"
        },
        {
            title: "Thiết bị",
            value: totalDevices,
            icon: WrenchScrewdriverIcon,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
            change: `${maintenanceCount} bảo trì`,
            changeType: "warning"
        },
        {
            title: "Doanh thu tháng",
            value: totalRevenue,
            icon: CurrencyDollarIcon,
            color: "text-emerald-600",
            bgColor: "bg-emerald-100",
            change: "+12.8%",
            changeType: "increase",
            isRevenue: true
        }
    ];

    const formatValue = (value: number, isRevenue: boolean = false) => {
        if (isRevenue) {
            return `${(value / 1000000).toFixed(1)}M VND`;
        }
        return value.toLocaleString();
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                >
                    <Card className="shadow-sm hover:shadow-lg transition-all duration-300">
                        <CardBody className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                                    stat.changeType === 'increase' ? 'bg-green-100 text-green-600' :
                                    stat.changeType === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                    'bg-gray-100 text-gray-600'
                                }`}>
                                    {stat.change}
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-600">
                                    {stat.title}
                                </h3>
                                <p className={`text-2xl font-bold ${stat.color}`}>
                                    {formatValue(stat.value, stat.isRevenue)}
                                </p>
                            </div>

                            {index === 0 && (
                                <div className="mt-4">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Tỷ lệ lấp đầy</span>
                                        <span>{occupancyRate}%</span>
                                    </div>
                                    <Progress
                                        value={occupancyRate}
                                        color={occupancyRate > 80 ? "success" : occupancyRate > 60 ? "warning" : "primary"}
                                        size="sm"
                                        className="max-w-md"
                                    />
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

export default QuickStats; 