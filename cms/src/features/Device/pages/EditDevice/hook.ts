import { useAppDispatch } from "@services/store";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { OrderActions } from "@features/Order/services/slice";

export type ReceivedProps = Record<string, any>;

const useEdit = (props: ReceivedProps) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [detailOrder, setDetailOrder] = useState<any>(null);

  useEffect(() => {
    if (id) {
      dispatch(
        OrderActions.getDetailOrder({
          orderId: id,
          onSuccess: (data: any) => setDetailOrder(data),
        })
      );
    }
  }, [dispatch]);

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

  return {
    updateOrderStatus,
    detailOrder,
    ...props,
  };
};

export type Props = ReturnType<typeof useEdit>;

export default useEdit;
