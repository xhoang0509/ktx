import AppHeader from "@components/AppHeader";
import { SearchForm } from "@components/SearchInput";
import { Button } from "@heroui/react";
import { useAppDispatch } from "@services/store";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import RoomTable from "../components/RoomTable";
import { RoomActions, RoomSelectors } from "../services/slice";

const defaultPagination = {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalItems: 1,
};

export default function RoomPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const rooms = useSelector(RoomSelectors.rooms);
    const [search, setSearch] = useState<string>("");
    const [pagination, setPagination] = useState(defaultPagination);

    const getRooms = (pagination?: any, search?: string) => {
        dispatch(
            RoomActions.getRooms({
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
        getRooms(pagination, search);
    }, [pagination.page]);

    const onSearch = useCallback(() => {
        getRooms(pagination, search);
    }, [pagination, search, getRooms]);

    const onChangePagination = useCallback((page: number) => {
        setPagination((prev) => ({ ...prev, page }));
    }, []);

    return (
        <div>
            <AppHeader
                pageTitle="Danh sách phòng"
                rightMenu={
                    <Button
                        color="primary"
                        onClick={() => {
                            navigate("/room/add");
                        }}
                    >
                        Thêm phòng
                    </Button>
                }
            />
            <SearchForm
                onSearch={onSearch}
                onChangeInput={setSearch}
                valueInput={search}
                placeholder="Tìm kiếm theo tên phòng"
            />
            <div className="bg-white rounded-2xl p-4 shadow-md m-4">
                <RoomTable
                    rooms={rooms}
                    pagination={pagination}
                    onChangePagination={onChangePagination}
                />
            </div>
        </div>
    );
}
