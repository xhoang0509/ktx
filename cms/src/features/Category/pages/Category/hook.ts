import {
  CategoryActions,
  CategorySelectors,
} from "@features/Category/services/slice";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export type ReceivedProps = Record<string, any>;

const useCategory = (props: ReceivedProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(CategorySelectors.categories);

  useEffect(() => {
    dispatch(CategoryActions.getCategories({}));
  }, [dispatch]);

  return {
    categories,
    navigate,
    ...props,
  };
};

export type Props = ReturnType<typeof useCategory>;

export default useCategory;
