import {
  CategoryActions,
  CategorySelectors,
} from "@features/Category/services/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { addCategorySchema } from "../schemas/AddCategorySchemas";
import { defaultAddCategoryForm } from "@features/Category/services/const";
import { useEffect } from "react";
import { ROUTE_PATHS } from "@constants/route.const";

export type ReceivedProps = Record<string, any>;

const useEditCategory = (props: ReceivedProps) => {
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
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(CategorySelectors.categories);

  const onSubmit = (data: any) => {
    dispatch(
      CategoryActions.editCategory({
        id,
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
    if (id) {
      dispatch(
        CategoryActions.getDetailCategory({
          id,
          onSuccess: ({ description, isActive, parentId, name }: any) =>
            reset({ description, isActive, parentId, name }),
        })
      );
    }
  }, [dispatch, id, reset]);

  return {
    ...props,
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    navigate,
    categories,
    id,
  };
};

export type Props = ReturnType<typeof useEditCategory>;

export default useEditCategory;
