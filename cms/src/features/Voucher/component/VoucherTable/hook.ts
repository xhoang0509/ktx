import { ROUTE_PATHS } from "@constants/route.const";
import { VoucherActions } from "@features/Voucher/services/slice";
import { useAppDispatch } from "@services/store";
import { useNavigate } from "react-router";

export type ReceivedProps = {
  vouchers: any[];
};

const useVoucherTable = (props: ReceivedProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const columns = [
    { name: "STT", uid: "indexNumber", align: "center", width: "80px" },
    { name: "ID", uid: "_id" },
    { name: "Tên", uid: "name" },
    { name: "code", uid: "code" },
    { name: "Số lượng", uid: "quantity" },
    { name: "Giá trị giảm", uid: "discount" },
    { name: "Giá trị thoả mãn", uid: "minOrderValue" },
    { name: "Ngày hết hạn", uid: "expiryDate" },
    { name: "Trạng thái", uid: "status", align: "center" },
    { name: "Tuỳ chọn", uid: "actions", align: "center" },
  ];

  const deleteVoucher = (id: string) => {
    dispatch(VoucherActions.deleteVoucher({ id }));
  };

  const navigateEditVoucher = (id: string) => {
    navigate(`/${ROUTE_PATHS.EDIT_VOUCHER_BASE}/${id}`);
  };

  return { navigate, columns, deleteVoucher, navigateEditVoucher, ...props };
};

export type Props = ReturnType<typeof useVoucherTable>;

export default useVoucherTable;
