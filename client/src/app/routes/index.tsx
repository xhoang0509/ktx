import GlobalLoading from "@components/common/GlobalLoading";
import { ROUTE_PATHS } from "@constants/route.const";
import { useAuth } from "@hooks/useAuth";
import AuthLayout from "@layouts/AuthLayout";
import MainLayout from "@layouts/MainLayout";
import { lazy, Suspense } from "react";
import { RouteObject, BrowserRouter as Router, useRoutes } from "react-router";
import { RouteWrapper } from "./RouteWrapper";

const HomePage = lazy(() => import("@features/Home"));
const LoginPage = lazy(() => import("@features/Auth/pages/Login"));
const RegisterPage = lazy(() => import("@features/Auth/pages/Register"));
const UserInfoPage = lazy(() => import("@features/UserInfo"));
const NotFoundPage = lazy(() => import("@features/NotFound"));
const PermissionDeniedPage = lazy(() => import("@features/PermissionDenied"));
const RoomRegistrationPage = lazy(
    () => import("@features/RoomRegistration/pages/RoomRegistration")
);
const RoomBookingPage = lazy(() => import("@features/RoomRegistration/pages/BookingPage"));
const ContractPage = lazy(() => import("@features/Contract/"));
const ContactPage = lazy(() => import("@features/Contact/pages"));
const BlogView = lazy(() => import("@features/Blog/View"));
const BlogIndex = lazy(() => import("@features/Blog/Index"));
const PaymentPage = lazy(() => import("@features/Payment/pages/Index"));
export interface RoutesRendererProps {
    routes: RouteObject[];
}

export function RoutesRenderer({ routes }: RoutesRendererProps) {
    const renderedRoutes = useRoutes(routes);
    return renderedRoutes;
}

function AppRouter() {
    useAuth();

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
                            path: ROUTE_PATHS.USER_INFO,
                            element: <UserInfoPage />,
                            title: "Thông tin người dùng",
                        },
                        {
                            path: ROUTE_PATHS.ROOM_REGISTRATION,
                            element: <RoomRegistrationPage />,
                            title: "Đăng ký phòng",
                        },
                        {
                            path: ROUTE_PATHS.ROOM_BOOKING,
                            element: <RoomBookingPage />,
                            title: "Đặt phòng",
                        },
                        {
                            path: ROUTE_PATHS.CONTRACT,
                            element: <ContractPage />,
                            title: "Hợp đồng",
                        },
                        {
                            path: ROUTE_PATHS.CONTACT,
                            element: <ContactPage />,
                            title: "Liên hệ",
                        },
                        {
                            path: ROUTE_PATHS.BLOG_DETAIL,
                            element: <BlogView />,
                            title: "Blog",
                        },
                        {
                            path: ROUTE_PATHS.BLOG,
                            element: <BlogIndex />,
                            title: "Blog",
                        },
                        // payment
                        {
                            path: ROUTE_PATHS.PAYMENT,
                            element: <PaymentPage />,
                            title: "Thanh toán",
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
            <Suspense fallback={<GlobalLoading />}>
                <RoutesRenderer routes={getRoutes()} />
            </Suspense>
        </Router>
    );
}

export default AppRouter;
