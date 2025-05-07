import { ROUTE_PATHS } from "@constants/route.const";
import { CategoryActions } from "@features/Category/services/slice";
import { useAppDispatch } from "@services/store";
import { useNavigate } from "react-router";

export type ReceivedProps = {
  categories: any[];
};

const useCategoryTable = (props: ReceivedProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const columns = [
    { name: "Số thứ tự", uid: "indexNumber", align: "center", width: "80px" },
    { name: "ID", uid: "_id" },
    { name: "Tên", uid: "name" },
    //   { name: "Mô tả", uid: "description" },
    { name: "ID danh mục cha", uid: "parentId" },
    { name: "Ngày tạo", uid: "createdAt" },
    { name: "Ngày cập nhật", uid: "updatedAt" },
    { name: "Trạng thái", uid: "isActive", align: "center" },
    { name: "Tuỳ chọn", uid: "actions", align: "center" },
  ];

  const deleteCategory = (id: string) => {
    dispatch(CategoryActions.deleteCategory({ id }));
  };

  const navigateEditCategory = (id: string) => {
    navigate(`/${ROUTE_PATHS.EDIT_CATEGORY_BASE}/${id}`);
  };

  return { navigate, columns, deleteCategory, navigateEditCategory, ...props };
};

export type Props = ReturnType<typeof useCategoryTable>;

export default useCategoryTable;
