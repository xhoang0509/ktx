import {
  ProductActions,
  ProductSelectors,
} from "@features/Product/services/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { addProductSchema } from "../schemas/AddProductSchemas";
import {
  defaultAddProductForm,
  statusProduct,
} from "@features/Product/services/const";
import { useEffect } from "react";
import { generateSku } from "@utils/generate.util";
import { ROUTE_PATHS } from "@constants/route.const";

export type ReceivedProps = Record<string, any>;

const useAddProduct = (props: ReceivedProps) => {
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

  const onSubmit = (data: any) => {
    dispatch(
      ProductActions.addProduct({
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

export type Props = ReturnType<typeof useAddProduct>;

export default useAddProduct;
