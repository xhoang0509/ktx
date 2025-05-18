import { FC, useState } from "react";
import useOrder, { Props, ReceivedProps } from "./hook";
import AppHeader from "@components/AppHeader";
import OrderTable from "../component/DeviceTable";
import { useAppDispatch } from "@services/store";
import DeviceTable from "../component/DeviceTable";
import { defaultPagination } from "@features/Device/services/const";

export default function DevicePage(){
  const dispatch = useAppDispatch();
  const [devices, setDevices] = useState([])
  const [pagination, setPagination] = useState(defaultPagination);

  // useEffect(() => {
  //   dispatch(
  //     OrderActions.getOrders({
  //       pagination,
  //       onSuccess: (data: any) =>
  //         setPagination((prev) => ({
  //           ...prev,
  //           page: Number(data.page),
  //           limit: Number(data.limit),
  //           totalItems: Number(data.totalItems),
  //           totalPages: Number(data.totalPages),
  //         })),
  //     })
  //   );
  // }, [pagination.page]);

  const onChangePagination = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  return (
    <div>
      <AppHeader pageTitle="Quản lý thiết bị" />
      <div className="bg-white rounded-2xl p-4 shadow-md m-4">
        <DeviceTable
          devices={devices}
          pagination={pagination}
          onChangePagination={onChangePagination}
        />
      </div>
    </div>
  );
};
