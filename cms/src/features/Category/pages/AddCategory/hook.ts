import {
  CategoryActions,
  CategorySelectors,
} from "@features/Category/services/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { addCategorySchema } from "../schemas/AddCategorySchemas";
import { defaultAddCategoryForm } from "@features/Category/services/const";
import { useEffect } from "react";
import { ROUTE_PATHS } from "@constants/route.const";

export type ReceivedProps = Record<string, any>;

const useAddCategory = (props: ReceivedProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultAddCategoryForm,
    resolver: yupResolver(addCategorySchema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(CategorySelectors.categories);

  const onSubmit = (data: any) => {
    dispatch(
      CategoryActions.addCategory({
        body: data,
        onSuccess: () => {
          reset();
          navigate(`/${ROUTE_PATHS.CATEGORY}`);
        },
      })
    );
  };

  useEffect(() => {
    dispatch(CategoryActions.getCategories({}));
  }, [dispatch]);

  return {
    ...props,
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    navigate,
    categories,
  };
};

export type Props = ReturnType<typeof useAddCategory>;

export default useAddCategory;
