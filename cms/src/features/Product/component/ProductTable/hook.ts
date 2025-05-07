import { ROUTE_PATHS } from "@constants/route.const";
import { ProductActions } from "@features/Product/services/slice";
import { useAppDispatch } from "@services/store";
import { useNavigate } from "react-router";

export type ReceivedProps = {
  products: any[];
  pagination?: any;
  onChangePagination?: (page: any) => void;
};

const useProductTable = (props: ReceivedProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const columns = [
    { name: "STT", uid: "indexNumber", align: "center", width: "80px" },
    { name: "ID", uid: "_id" },
    { name: "Ảnh", uid: "images" },
    { name: "Tên", uid: "name" },
    { name: "SKU", uid: "sku" },
    { name: "Giá", uid: "price" },
    { name: "Kích cỡ", uid: "size" },
    { name: "Trạng thái", uid: "status", align: "center" },
    { name: "Tuỳ chọn", uid: "actions", align: "center" },
  ];

  const deleteProduct = (id: string) => {
    dispatch(ProductActions.deleteProduct({ id }));
  };

  const navigateEditProduct = (id: string) => {
    navigate(`/${ROUTE_PATHS.EDIT_PRODUCT_BASE}/${id}`);
  };

  return { navigate, columns, deleteProduct, navigateEditProduct, ...props };
};

export type Props = ReturnType<typeof useProductTable>;

export default useProductTable;
