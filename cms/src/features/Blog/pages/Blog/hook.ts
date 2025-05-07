import { defaultPagination } from "@features/Blog/services/const";
import { BlogActions, BlogSelectors } from "@features/Blog/services/slice";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export type ReceivedProps = Record<string, any>;

const useBlog = (props: ReceivedProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const blogs = useAppSelector(BlogSelectors.blogs);
  const [pagination, setPagination] = useState(defaultPagination);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(BlogActions.getBlogs({ pagination }));
  }, [dispatch, pagination.page]);

  const onSearch = useCallback(() => {
    dispatch(BlogActions.getBlogs({ pagination, search }));
  }, [search, pagination]);

  return {
    blogs,
    navigate,
    pagination,
    onSearch,
    setSearch,
    search,
    ...props,
  };
};

export type Props = ReturnType<typeof useBlog>;

export default useBlog;
