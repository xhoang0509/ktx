import AppHeader from "@components/AppHeader";
import { SearchForm } from "@components/SearchInput";
import { defaultPagination } from "@features/Device/services/const";
import { DeviceActions, DeviceSelectors } from "@features/Device/services/slice";
import { Button } from "@heroui/button";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DeviceTable from "../component/DeviceTable";

export default function DevicePage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const devices = useAppSelector(DeviceSelectors.devices);
    const [pagination, setPagination] = useState(defaultPagination);
    const [search, setSearch] = useState("");

    const getDevices = (pagination: any, search: string) => {
        dispatch(
            DeviceActions.getDevices({
                pagination,
                search,
                onSuccess: (data: any) =>
                    setPagination((prev) => ({
                        ...prev,
                        page: Number(data.page),
                        limit: Number(data.limit),
                        totalItems: Number(data.totalItems),
                        totalPages: Number(data.totalPages),
                    })),
            })
        );
    };

    useEffect(() => {
        getDevices(pagination, search);
    }, [pagination.page]);

    const onChangePagination = (page: number) => {
        setPagination((prev) => ({ ...prev, page }));
    };

    const onSearch = useCallback(() => {
        getDevices(defaultPagination, search);
    }, [search, pagination.page]);
    
    const onDelete = (id: string) => {
        dispatch(DeviceActions.deleteDevice({ id }));
    };

    return (
        <div>
            <AppHeader
                pageTitle="Quản lý thiết bị"
                rightMenu={
                    <Button color="primary" onClick={() => navigate("/device/add")}>
                        Thêm thiết bị
                    </Button>
                }
            />
            <SearchForm
                onSearch={onSearch}
                onChangeInput={setSearch}
                valueInput={search}
                placeholder="Tìm kiếm theo tên thiết bị"
            />
            <div className="bg-white rounded-2xl p-4 shadow-md m-4">
                <DeviceTable
                    devices={devices}
                    pagination={pagination}
                    onChangePagination={onChangePagination}
                    onDelete={onDelete}
                />
            </div>
        </div>
    );
}
