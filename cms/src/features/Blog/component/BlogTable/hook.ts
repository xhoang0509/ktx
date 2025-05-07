import { ROUTE_PATHS } from "@constants/route.const";
import { BlogActions } from "@features/Blog/services/slice";
import { useAppDispatch } from "@services/store";
import { useNavigate } from "react-router";

export type ReceivedProps = {
  blogs: any[];
};

const useBlogTable = (props: ReceivedProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const columns = [
    { name: "STT", uid: "indexNumber", align: "center", width: "80px" },
    { name: "ID", uid: "_id" },
    { name: "title", uid: "title" },
    // { name: "content", uid: "content" },
    { name: "Ảnh", uid: "image" },
    { name: "Trạng thái", uid: "status", align: "center" },
    { name: "Tuỳ chọn", uid: "actions", align: "center" },
  ];

  const deleteBlog = (id: string) => {
    dispatch(BlogActions.deleteBlog({ id }));
  };

  const navigateEditBlog = (id: string) => {
    navigate(`/${ROUTE_PATHS.EDIT_BLOG_BASE}/${id}`);
  };

  return { navigate, columns, deleteBlog, navigateEditBlog, ...props };
};

export type Props = ReturnType<typeof useBlogTable>;

export default useBlogTable;
