import { lazy, Suspense } from "react";
import { RouteObject, BrowserRouter as Router, useRoutes } from "react-router";
import { ROUTE_PATHS } from "@constants/route.const";
import AuthLayout from "@layouts/AuthLayout";
import MainLayout from "@layouts/MainLayout";
import { useAuth } from "@hooks/useAuth";
import { RouteWrapper } from "./RouteWrapper";

const HomePage = lazy(() => import("@features/Home"));
const LoginPage = lazy(() => import("@features/Auth/pages/Login"));
const RegisterPage = lazy(() => import("@features/Auth/pages/Register"));
const UserInfoPage = lazy(() => import("@features/UserInfo"));
const NotFoundPage = lazy(() => import("@features/NotFound"));
const PermissionDeniedPage = lazy(() => import("@features/PermissionDenied"));
const DormRegistrationPage = lazy(
  () => import("@features/DormRegistration/pages/DormRegistration")
);

export interface RoutesRendererProps {
  routes: RouteObject[];
}

export function RoutesRenderer({ routes }: RoutesRendererProps) {
  const renderedRoutes = useRoutes(routes);
  return renderedRoutes;
}

function AppRouter() {
  // useAuth();

  const getRoutes = () => [
    {
      path: ROUTE_PATHS.DEFAULT,
      element: <RouteWrapper />,
      title: "",
      children: [
        {
          path: ROUTE_PATHS.DEFAULT,
          element: <AuthLayout />,
          title: "",
          children: [
            {
              path: ROUTE_PATHS.REGISTER,
              element: <RegisterPage />,
              title: "",
            },
            {
              path: ROUTE_PATHS.LOGIN,
              element: <LoginPage />,
              title: "",
            },
          ],
        },
        {
          path: ROUTE_PATHS.DEFAULT,
          element: <MainLayout />,
          title: "",
          children: [
            {
              path: ROUTE_PATHS.DEFAULT,
              index: true,
              element: <HomePage />,
              title: "Trang chủ",
            },
            {
              path: ROUTE_PATHS.USERINFO,
              element: <UserInfoPage />,
              title: "Thông tin người dùng",
            },
            {
              path: ROUTE_PATHS.DORM_REGISTRATION,
              element: <DormRegistrationPage />,
              title: "Đăng ký phòng",
            },
          ],
        },
      ],
    },

    { path: "*", title: "", element: <NotFoundPage /> },
    {
      path: ROUTE_PATHS.PERMISSION_DENIED,
      title: "Không có quyền truy cập",
      element: <PermissionDeniedPage />,
    },
  ];

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <RoutesRenderer routes={getRoutes()} />
      </Suspense>
    </Router>
  );
}

export default AppRouter;
