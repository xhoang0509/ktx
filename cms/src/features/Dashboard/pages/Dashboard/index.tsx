import { FC } from "react";
import useDashboard, { Props, ReceivedProps } from "./hook";
import AppHeader from "@components/AppHeader";
import UserStatistic from "@features/Dashboard/components/UserStatistic";
import Container from "@features/Dashboard/components/Container";
import ImportStatistic from "@features/Dashboard/components/ImportStatistic";
import OrderStatistic from "@features/Dashboard/components/OrderStatistic";
import ProductStatistic from "@features/Dashboard/components/ProductStatistic";
import RevenueStatistic from "@features/Dashboard/components/RevenueStatistic";
import ProductTable from "@features/Dashboard/components/ProductTable";
import MonthPicker from "@components/common/MonthPicker";

const DashboardLayout: FC<Props> = ({
  UserStatisticData,
  ImportStatisticData,
  OrderStatisticData,
  RevenueStatisticData,
  ProductStatisticData,
  BestSellerData,
  month,
  setMonth,
}) => {
  return (
    <div>
      <AppHeader
        pageTitle="Thống kê"
        rightMenu={
          <div className="w-[300px]">
            <MonthPicker value={month} onChange={setMonth} />
          </div>
        }
      />
      <div className="grid grid-cols-4 gap-4 p-4">
        <Container col={6} label="Thống kê sinh viên">
          <UserStatistic data={UserStatisticData} />
        </Container>
        <Container col={6} label="Thống kê nhập">
          <ImportStatistic data={ImportStatisticData} />
        </Container>
        <Container col={2} label="Thống kê thiết bị">
          <OrderStatistic data={OrderStatisticData} />
        </Container>
        <Container col={2} label="Thống kê phòng">
          <ProductStatistic data={ProductStatisticData} />
        </Container>
        <Container col={6} label="Thống kê doanh thu">
          <RevenueStatistic data={RevenueStatisticData} />
        </Container>
        <Container col={6} label="Thống kê phòng bán chạy">
          <ProductTable products={BestSellerData} />
        </Container>
      </div>
    </div>
  );
};

const Dashboard: FC<ReceivedProps> = (props) => (
  <DashboardLayout {...useDashboard(props)} />
);

export default Dashboard;
