import AuthWrapper from "@features/Auth/components/AuthWrapper";
import { FC } from "react";
import useLogin, { Props, ReceivedProps } from "./hooks";
import AppInput from "@components/common/AppInput";
import { Button } from "@heroui/react";

const LoginLayout: FC<Props> = ({
  control,
  errors,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <AuthWrapper>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-2xl font-semibold mb-4">Đăng nhập</div>
          <div>
            <div className="mb-2">Tên đăng nhập</div>
            <AppInput control={control} name="username" type="text" size="lg" />
            <div className="text-danger text-xs mt-1">
              {errors.username?.message}
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2">Mật khẩu</div>
            <AppInput type="password" control={control} name="password" />
            <div className="text-danger text-xs mt-1">
              {errors.password?.message}
            </div>
          </div>
          <div className="mt-6">
            <Button className="btn w-full" type="submit" color="primary">
              Đăng nhập
            </Button>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

const Login: FC<ReceivedProps> = (props) => (
  <LoginLayout {...useLogin(props)} />
);

export default Login;
