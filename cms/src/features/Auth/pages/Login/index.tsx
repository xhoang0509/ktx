import AuthWrapper from "@features/Auth/components/AuthWrapper";
import { FC } from "react";
import useLogin, { Props, ReceivedProps } from "./hooks";
import AppInput from "@components/common/AppInput";
import { Button, Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";

const LoginLayout: FC<Props> = ({
  control,
  errors,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardBody className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <LockClosedIcon className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng nhập</h1>
              <p className="text-gray-600">Hệ thống quản lý ký túc xá</p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên đăng nhập
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <AppInput 
                    control={control} 
                    name="username" 
                    type="text" 
                    size="lg"
                    className="pl-10"
                    placeholder="Nhập tên đăng nhập"
                  />
                </div>
                {errors.username && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-danger text-sm mt-2 flex items-center gap-1"
                  >
                    <span>⚠️</span>
                    {errors.username?.message}
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <AppInput 
                    type="password" 
                    control={control} 
                    name="password" 
                    size="lg"
                    className="pl-10"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
                {errors.password && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-danger text-sm mt-2 flex items-center gap-1"
                  >
                    <span>⚠️</span>
                    {errors.password?.message}
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <Button 
                  className="w-full h-12 text-white font-semibold text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105" 
                  type="submit"
                  size="lg"
                >
                  Đăng nhập
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-gray-500">
                © 2024 Room Track - Hệ thống quản lý ký túc xá
              </p>
            </motion.div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

const Login: FC<ReceivedProps> = (props) => (
  <LoginLayout {...useLogin(props)} />
);

export default Login;
