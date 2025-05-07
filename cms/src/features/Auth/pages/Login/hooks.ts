export type ReceivedProps = Record<string, any>;
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@features/Auth/schemas/loginSchema";
import { loginFormDefaultValues } from "@features/Auth/const";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@services/store";
import { AppActions } from "@app/slice";

const useLogin = (props: ReceivedProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: loginFormDefaultValues,
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    dispatch(AppActions.login({ body: data }));
  };

  return {
    ...props,
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    navigate,
  };
};

export type Props = ReturnType<typeof useLogin>;

export default useLogin;
