import { defaultPagination } from "@features/Order/services/const";
import { OrderActions, OrderSelectors } from "@features/Order/services/slice";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useEffect, useState } from "react";

export type ReceivedProps = Record<string, any>;

const useOrder = (props: ReceivedProps) => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(OrderSelectors.orders);
  const [pagination, setPagination] = useState(defaultPagination);

  useEffect(() => {
    dispatch(
      OrderActions.getOrders({
        pagination,
        onSuccess: (data: any) =>
          setPagination((prev) => ({
            ...prev,
            page: Number(data.page),
            limit: Number(data.limit),
            totalItems: Number(data.totalItems),
            totalPages: Number(data.totalPages),
          })),
      })
    );
  }, [pagination.page]);

  const onChangePagination = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  return {
    orders,
    pagination,
    onChangePagination,
    ...props,
  };
};

export type Props = ReturnType<typeof useOrder>;

export default useOrder;
