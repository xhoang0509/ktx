import {
  StatisticActions,
  StatisticSelectors,
} from "@features/Dashboard/services/slice";
import { useAppDispatch, useAppSelector } from "@services/store";
import moment from "moment";
import { useEffect, useState } from "react";

export type ReceivedProps = Record<string, any>;

const useDashboard = (props: ReceivedProps) => {
  const dispatch = useAppDispatch();
  const [month, setMonth] = useState<{ month: number; year: number }>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const UserStatisticData = useAppSelector(StatisticSelectors.userStatistic);
  const ImportStatisticData = useAppSelector(
    StatisticSelectors.importStatistic
  );
  const OrderStatisticData = useAppSelector(StatisticSelectors.orderStatistic);
  const RevenueStatisticData = useAppSelector(
    StatisticSelectors.revenueStatistic
  );
  const ProductStatisticData = useAppSelector(
    StatisticSelectors.productStatistic
  );

  const BestSellerData = useAppSelector(StatisticSelectors.bestSeller);

  useEffect(() => {
    dispatch(StatisticActions.getUserStatistic({ query: month }));
    dispatch(StatisticActions.getImportStatistic({ query: month }));
    dispatch(StatisticActions.getOrderStatistic({ query: month }));
    dispatch(
      StatisticActions.getRevenueStatistic({
        query: { type: "month", date: moment().format("YYYY-MM-DD") },
      })
    );
    dispatch(StatisticActions.getProductStatistic({ query: month }));
    dispatch(StatisticActions.getBestSeller({}));
  }, [month]);

  return {
    UserStatisticData,
    ImportStatisticData,
    OrderStatisticData,
    RevenueStatisticData,
    ProductStatisticData,
    BestSellerData,
    month,
    setMonth,
  };
};

export type Props = ReturnType<typeof useDashboard>;

export default useDashboard;
