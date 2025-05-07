import { FC } from "react";
import useOrder, { Props, ReceivedProps } from "./hook";
import AppHeader from "@components/AppHeader";
import OrderTable from "../component/OrderTable";

const OrderLayout: FC<Props> = ({ orders, pagination, onChangePagination }) => {
  return (
    <div>
      <AppHeader pageTitle="Quản lý thiết bị" />
      <div className="bg-white rounded-2xl p-4 shadow-md m-4">
        <OrderTable
          orders={orders}
          pagination={pagination}
          onChangePagination={onChangePagination}
        />
      </div>
    </div>
  );
};

const Order: FC<ReceivedProps> = (props) => (
  <OrderLayout {...useOrder(props)} />
);

export default Order;
