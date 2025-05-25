import AppHeader from "@components/AppHeader";
import Container from "@features/Dashboard/components/Container";
import GenderChart from "@features/Dashboard/components/GenderChart";
import MonthlyChart from "@features/Dashboard/components/MonthlyChart";
import RecentActivities from "@features/Dashboard/components/RecentActivities";
import RoomStatusTable from "@features/Dashboard/components/RoomStatusTable";
import SummaryCards from "@features/Dashboard/components/SummaryCards";
import TopUsageRooms from "@features/Dashboard/components/TopUsageRooms";
import {
  mockActivities,
  mockGenderData,
  mockMonthlyBillData,
  mockRooms,
  mockSummaryData,
  mockTopUsageRooms,
} from "@features/Dashboard/mockData";

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-gray-50">
            <AppHeader
                pageTitle="Hệ thống quản lý ký túc xá"
                rightMenu={<div className="text-sm text-gray-600"></div>}
            />

            <div className="p-6">
                <SummaryCards data={mockSummaryData} />

                <div className="grid grid-cols-12 gap-6">
                    <Container col={6} label="">
                        <MonthlyChart data={mockMonthlyBillData} />
                    </Container>

                    <Container col={6} label="">
                        <GenderChart data={mockGenderData} />
                    </Container>

                    <Container col={4} label="">
                        <RoomStatusTable data={mockRooms} />
                    </Container>

                    <Container col={4} label="">
                        <TopUsageRooms data={mockTopUsageRooms} />
                    </Container>

                    <Container col={4} label="">
                        <RecentActivities data={mockActivities} />
                    </Container>
                </div>
            </div>
        </div>
    );
}
