import { AppActions, AppSelectors } from "@app/slice";
import AppHeader from "@components/AppHeader";
import Container from "@features/Dashboard/components/Container";
import RecentActivities from "@features/Dashboard/components/RecentActivities";
import RoomStatusTable from "@features/Dashboard/components/RoomStatusTable";
import SummaryCards from "@features/Dashboard/components/SummaryCards";
import TopUsageRooms from "@features/Dashboard/components/TopUsageRooms";
import {
    mockActivities
} from "@features/Dashboard/mockData";
import { useAppDispatch, useAppSelector } from "@services/store";
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
        <div className="min-h-screen bg-gray-50">
            <AppHeader
                pageTitle="Hệ thống quản lý ký túc xá"
                rightMenu={<div className="text-sm text-gray-600"></div>}
            />

            <div className="p-6">
                <SummaryCards data={analytic} />

                <div className="grid grid-cols-12 gap-6">
                    {/* <Container col={6} label="">
                        <MonthlyChart data={mockMonthlyBillData} />
                    </Container>

                    <Container col={6} label="">
                        <GenderChart data={mockGenderData} />
                    </Container> */}

                    <Container col={4} label="">
                        <RoomStatusTable data={analytic.rooms} />
                    </Container>

                    <Container col={4} label="">
                        <TopUsageRooms data={analytic.bills} />
                    </Container>

                    <Container col={4} label="">
                        <RecentActivities data={mockActivities} />
                    </Container>
                </div>
            </div>
        </div>
    );
}
