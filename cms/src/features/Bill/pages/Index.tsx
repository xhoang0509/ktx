import AppHeader from "@components/AppHeader";
import { SearchForm } from "@components/SearchInput";
import { defaultPagination } from "@features/Device/services/const";
import { DeviceActions } from "@features/Device/services/slice";
import { Button } from "@heroui/button";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BillActions, BillSelectors } from "../services/slice";
import BillTable from "./BillTable";

export default function BillPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const bills = useAppSelector(BillSelectors.bills);
    const [pagination, setPagination] = useState(defaultPagination);
    const [search, setSearch] = useState("");

    const getBills = (pagination: any, search: string) => {
        dispatch(
            BillActions.getBills({
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
        getBills(pagination, search);
    }, [pagination.page]);

    const onChangePagination = (page: number) => {
        setPagination((prev) => ({ ...prev, page }));
    };

    const onSearch = useCallback(() => {
        getBills(defaultPagination, search);
    }, [search, pagination.page]);

    const onDelete = (id: string) => {
        console.log("first");
        dispatch(DeviceActions.deleteDevice({ id }));
    };

    return (
        <div>
            <AppHeader
                pageTitle="Quản lý hóa đơn"
                rightMenu={
                    <Button color="primary" onClick={() => navigate("/bill/add")}>
                        Thêm hóa đơn
                    </Button>
                }
            />
            <SearchForm
                onSearch={onSearch}
                onChangeInput={setSearch}
                valueInput={search}
                placeholder="Tìm kiếm theo mã hóa đơn"
            />
            <div className="bg-white rounded-2xl p-4 shadow-md m-4">
                <BillTable
                    bills={bills}
                    pagination={pagination}
                    onChangePagination={onChangePagination}
                    onDelete={onDelete}
                />
            </div>
        </div>
    );
}
