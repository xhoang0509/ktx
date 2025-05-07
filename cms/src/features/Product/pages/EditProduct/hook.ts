import {
  ProductActions,
  ProductSelectors,
} from "@features/Product/services/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { addProductSchema } from "../schemas/AddProductSchemas";
import {
  defaultAddProductForm,
  statusProduct,
} from "@features/Product/services/const";
import { useEffect } from "react";
import { generateSku } from "@utils/generate.util";
import { ROUTE_PATHS } from "@constants/route.const";

export type ReceivedProps = Record<string, any>;

const useEditProduct = (props: ReceivedProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultAddProductForm,
    resolver: yupResolver(addProductSchema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(ProductSelectors.categories);
  const { id } = useParams();

  const onSubmit = (data: any) => {
    dispatch(
      ProductActions.editProduct({
        id: id,
        body: data,
        onSuccess: () => {
          reset();
          navigate(`/${ROUTE_PATHS.PRODUCT}`);
        },
      })
    );
  };

  useEffect(() => {
    dispatch(ProductActions.getCategories({}));
    if (id) {
      dispatch(
        ProductActions.getDetailProduct({
          id,
          onSuccess: (data: any) => reset(data),
        })
      );
    }
  }, [dispatch]);

  const watchName = watch("name");
  useEffect(() => {
    setValue("sku", generateSku(watchName || ""));
  }, [setValue, watchName]);

  return {
    ...props,
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    navigate,
    categories,
    statusProduct,
  };
};

export type Props = ReturnType<typeof useEditProduct>;

export default useEditProduct;
