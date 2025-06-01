import { AppActions, AppSelectors } from "@app/slice";
import RecentActivities from "@features/Dashboard/components/RecentActivities";
import RoomStatusTable from "@features/Dashboard/components/RoomStatusTable";
import SummaryCards from "@features/Dashboard/components/SummaryCards";
import TopUsageRooms from "@features/Dashboard/components/TopUsageRooms";
import { mockActivities } from "@features/Dashboard/mockData";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { useAppDispatch, useAppSelector } from "@services/store";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function DashboardLayout() {
    const dispatch = useAppDispatch();
    const analytic = useAppSelector(AppSelectors.analytic);

    useEffect(() => {
        dispatch(
            AppActions.getAnalytic({
                onSuccess: (data: any) => {
                    console.log(data);
                },
            })
        );
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="p-6 space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-600 mt-1">
                                Tổng quan hệ thống quản lý ký túc xá
                            </p>
                        </div>
                        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm">
                            Cập nhật lần cuối: {new Date().toLocaleString("vi-VN")}
                        </div>
                    </div>
                </motion.div>

                <SummaryCards data={analytic} />

                <div className="grid grid-cols-12 gap-6">
                    <motion.div
                        className="col-span-12 lg:col-span-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="h-full shadow-sm border-0">
                            <CardHeader className="pb-3">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Trạng thái phòng
                                </h3>
                            </CardHeader>
                            <CardBody className="pt-0">
                                <RoomStatusTable data={analytic.rooms} />
                            </CardBody>
                        </Card>
                    </motion.div>

                    <motion.div
                        className="col-span-12 lg:col-span-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="h-full shadow-sm border-0">
                            <CardHeader className="pb-3">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Top 10 phòng sử dụng điện nước nhiều nhất
                                </h3>
                            </CardHeader>
                            <CardBody className="pt-0">
                                <TopUsageRooms data={analytic.bills} />
                            </CardBody>
                        </Card>
                    </motion.div>

                    <motion.div
                        className="col-span-12 lg:col-span-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card className="h-full shadow-sm border-0">
                            <CardHeader className="pb-3">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Các hoạt động nội trú gần đây
                                </h3>
                            </CardHeader>
                            <CardBody className="pt-0">
                                <RecentActivities data={mockActivities} />
                            </CardBody>
                        </Card>
                    </motion.div>
                </div>

                <motion.div
                    className="grid grid-cols-12 gap-6 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="col-span-12">
                        <Card className="shadow-sm border-0">
                            <CardHeader className="pb-3">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Báo cáo tổng quan
                                </h3>
                            </CardHeader>
                            <CardBody className="pt-0">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {analytic.totalRoom || 0}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            Tổng số phòng
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {analytic.totalDevice || 0}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            Tổng thiết bị
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">
                                            {Math.round(
                                                (analytic.totalUserInRoom / analytic.totalUser) *
                                                    100
                                            ) || 0}
                                            %
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            Tỷ lệ lấp đầy
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
