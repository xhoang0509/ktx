import { ROUTE_PATHS } from "@constants/route.const";
import { OrderActions } from "@features/Order/services/slice";
import { useAppDispatch } from "@services/store";
import { useNavigate } from "react-router";

export type ReceivedProps = {
  orders: any[];
  pagination?: any;
  onChangePagination?: (page: any) => void;
};

const useOrderTable = (props: ReceivedProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const columns = [
    { name: "ID", uid: "_id", width: "50px" },
    { name: "userId", uid: "userId" },
    { name: "Tổng tiền", uid: "totalPrice" },
    { name: "Thời điểm tạo", uid: "createdAt" },
    { name: "Trạng thái", uid: "status", align: "center" },
    { name: "Tuỳ chọn", uid: "actions", align: "center" },
  ];

  const updateOrderStatus = (orderId: string, status: string) => {
    dispatch(
      OrderActions.updateStatusOrder({
        orderId,
        status,
        onSuccess: () =>
          dispatch(
            OrderActions.getOrders({
              pagination: props.pagination,
            })
          ),
      })
    );
  };

  const navigateEditOrder = (id: string) => {
    navigate(`/${ROUTE_PATHS.EDIT_ORDER_BASE}/${id}`);
  };

  return {
    navigate,
    columns,
    updateOrderStatus,
    navigateEditOrder,
    ...props,
  };
};

export type Props = ReturnType<typeof useOrderTable>;

export default useOrderTable;
