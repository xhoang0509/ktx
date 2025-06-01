import GlobalLoading from "@components/GlobalLoading";
import { ROUTE_PATHS } from "@constants/route.const";
import { BookingRequestDetailPage } from "@features/BookingRequests";
import EditRoomPage from "@features/Room/pages/EditRoomPage";
import { useAuth } from "@hooks/useAuth";
import AuthLayout from "@layouts/AuthLayout";
import MainLayout from "@layouts/MainLayout";
import { lazy, Suspense } from "react";
import { RouteObject, BrowserRouter as Router, useRoutes } from "react-router";
import { RouteWrapper } from "./RouteWrapper";

const DashboardPage = lazy(() => import("@features/Dashboard/pages/Dashboard"));
const LoginPage = lazy(() => import("@features/Auth/pages/Login"));
const NotFoundPage = lazy(() => import("@features/NotFound"));
const PermissionDeniedPage = lazy(() => import("@features/PermissionDenied"));
const UserPage = lazy(() => import("@features/User/pages/User"));
const AddUserPage = lazy(() => import("@features/User/pages/AddUser"));
const EditUserPage = lazy(() => import("@features/User/pages/EditUser"));
const ViewUserPage = lazy(() => import("@features/User/pages/ViewUser"));

const Devicepage = lazy(() => import("@features/Device/pages/Device"));
const AddDevicePage = lazy(() => import("@features/Device/pages/AddDevice"));
const RoomPage = lazy(() => import("@features/Room/pages/RoomPage"));
const AddRoomPage = lazy(() => import("@features/Room/pages/AddRoom"));
const EditDevicePage = lazy(() => import("@features/Device/pages/EditDevice"));
const LogoutPage = lazy(() => import("@features/Logout"));
const RequestPage = lazy(() => import("@features/BookingRequests/pages/Index"));
const BillPage = lazy(() => import("@features/Bill/pages/Index"));
const AddBillPage = lazy(() => import("@features/Bill/pages/AddBillPage"));
const EditBillPage = lazy(() => import("@features/Bill/pages/EditBillPage"));
const ContractPage = lazy(() => import("@features/Bill/pages/ContractPage"));
const EditRequest = lazy(() => import("@features/BookingRequests/pages/Edit"));
const PrintContract = lazy(() => import("@features/BookingRequests/components/PrintContract"));

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
                        // Dashboard
                        {
                            path: ROUTE_PATHS.DEFAULT,
                            index: true,
                            element: <DashboardPage />,
                            title: "Trang chủ",
                        },

                        // User
                        {
                            path: ROUTE_PATHS.USER,
                            element: <UserPage />,
                            title: "Sinh viên",
                        },
                        {
                            path: ROUTE_PATHS.ADD_USER,
                            element: <AddUserPage />,
                            title: "Thêm sinh viên",
                        },
                        {
                            path: ROUTE_PATHS.EDIT_USER,
                            element: <EditUserPage />,
                            title: "Sửa sinh viên",
                        },
                        {
                            path: ROUTE_PATHS.VIEW_USER,
                            element: <ViewUserPage />,
                            title: "Xem sinh vien",
                        },
                        // Device
                        {
                            path: ROUTE_PATHS.DEVICE,
                            element: <Devicepage />,
                            title: "Thiết bị",
                        },
                        {
                            path: ROUTE_PATHS.EDIT_DEVICE,
                            element: <EditDevicePage />,
                            title: "Sửa thiết bị",
                        },
                        {
                            path: ROUTE_PATHS.ADD_DEVICE,
                            element: <AddDevicePage />,
                            title: "Thêm thiết bị",
                        },

                        // Room
                        {
                            path: ROUTE_PATHS.ROOM,
                            element: <RoomPage />,
                            title: "Phòng",
                        },
                        {
                            path: ROUTE_PATHS.ADD_ROOM,
                            element: <AddRoomPage />,
                            title: "Thêm phòng",
                        },
                        {
                            path: ROUTE_PATHS.EDIT_ROOM,
                            element: <EditRoomPage />,
                            title: "Sửa phòng",
                        },
                        // Booking Request - Contract
                        {
                            path: ROUTE_PATHS.REQUEST,
                            element: <RequestPage />,
                            title: "Yêu cầu",
                        },
                        {
                            path: ROUTE_PATHS.REQUEST_DETAIL,
                            element: <BookingRequestDetailPage />,
                            title: "Chi tiết yêu cầu",
                        },
                        {
                            path: ROUTE_PATHS.EDIT_REQUEST,
                            element: <EditRequest />,
                            title: "Chi tiết yêu cầu",
                        },
                        {
                            path: ROUTE_PATHS.REQUEST_PRINT,
                            element: <PrintContract />,
                            title: "In hợp đồng",
                        },
                        {
                            path: ROUTE_PATHS.LOGOUT,
                            element: <LogoutPage />,
                            title: "Đăng xuất",
                        },
                        // Bill: Hóa đơn điện nước
                        {
                            path: ROUTE_PATHS.BILL,
                            element: <BillPage />,
                            title: "Hóa đơn điện nước",
                        },
                        {
                            path: ROUTE_PATHS.ADD_BILL,
                            element: <AddBillPage />,
                            title: "Thêm hóa đơn",
                        },
                        {
                            path: ROUTE_PATHS.EDIT_BILL,
                            element: <EditBillPage />,
                            title: "Sửa hóa đơn",
                        },
                        {
                            path: ROUTE_PATHS.BILL_CONTRACT,
                            element: <ContractPage />,
                            title: "",
                        },
                    ],
                },
            ],
        },

        { path: "*", title: "", element: <NotFoundPage /> },
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
