import { defaultPagination } from "@features/Voucher/services/const";
import {
  VoucherActions,
  VoucherSelectors,
} from "@features/Voucher/services/slice";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export type ReceivedProps = Record<string, any>;

const useVoucher = (props: ReceivedProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const vouchers = useAppSelector(VoucherSelectors.vouchers);
  const [pagination, setPagination] = useState(defaultPagination);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(VoucherActions.getVouchers({ pagination }));
  }, [dispatch, pagination.page]);

  const onSearch = useCallback(() => {
    dispatch(VoucherActions.getVouchers({ pagination, search }));
  }, [search, pagination]);

  return {
    vouchers,
    navigate,
    pagination,
    onSearch,
    setSearch,
    search,
    ...props,
  };
};

export type Props = ReturnType<typeof useVoucher>;

export default useVoucher;
