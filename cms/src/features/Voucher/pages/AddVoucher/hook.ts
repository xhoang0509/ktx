import { VoucherActions } from "@features/Voucher/services/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@services/store";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { addVoucherSchema } from "../schemas/AddVoucherSchemas";
import { defaultAddVoucherForm } from "@features/Voucher/services/const";
import { useEffect } from "react";
import { generateSku } from "@utils/generate.util";
import { ROUTE_PATHS } from "@constants/route.const";

export type ReceivedProps = Record<string, any>;

const useAddVoucher = (props: ReceivedProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultAddVoucherForm,
    resolver: yupResolver(addVoucherSchema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    dispatch(
      VoucherActions.addVoucher({
        body: data,
        onSuccess: () => {
          reset();
          navigate(`/${ROUTE_PATHS.VOUCHER}`);
        },
      })
    );
  };

  const watchName = watch("name");
  useEffect(() => {
    setValue("code", generateSku(watchName || ""));
  }, [setValue, watchName]);

  return {
    ...props,
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    navigate,
    setValue,
  };
};

export type Props = ReturnType<typeof useAddVoucher>;

export default useAddVoucher;
