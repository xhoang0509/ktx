import { defaultPagination } from "@features/Product/services/const";
import {
  ProductActions,
  ProductSelectors,
} from "@features/Product/services/slice";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export type ReceivedProps = Record<string, any>;

const useProduct = (props: ReceivedProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector(ProductSelectors.products);
  const [pagination, setPagination] = useState(defaultPagination);
  const [search, setSearch] = useState("");

  const getProducts = (pagination?: any, search?: string) => {
    dispatch(
      ProductActions.getProducts({
        pagination,
        search,
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
  };
  useEffect(() => {
    getProducts(pagination, search);
  }, [pagination.page]);

  const onSearch = useCallback(() => {
    getProducts(defaultPagination, search);
  }, [search, pagination.page]);

  const onChangePagination = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  return {
    products,
    navigate,
    onSearch,
    setSearch,
    search,
    onChangePagination,
    pagination,
    ...props,
  };
};

export type Props = ReturnType<typeof useProduct>;

export default useProduct;
