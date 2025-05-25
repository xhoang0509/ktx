import AppHeader from "@components/AppHeader";
import { SearchForm } from "@components/SearchInput";
import { ContractService } from "@services/contract.service";
import { useCallback, useEffect, useState } from "react";
import RequestTable from "../components/RequestTable";
import { BookingRequest } from "../types";

const defaultPagination = {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalItems: 0,
};

export default function BookingRequestsPage() {
    const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
    const [search, setSearch] = useState<string>("");
    const [pagination, setPagination] = useState(defaultPagination);
    const [refresh, setRefresh] = useState(false);
    const fetchBookingRequests = async (search: string = "") => {
        const res = await ContractService.getContracts({ search });
        if (res.status === 200) {
            setBookingRequests(res.data);
        }
    };

    useEffect(() => {
        fetchBookingRequests();
    }, [refresh]);

    const onSearch = useCallback(() => {
        fetchBookingRequests(search);
    }, [search]);

    const onChangePagination = useCallback((page: number) => {
        setPagination((prev) => ({ ...prev, page }));
    }, []);

    return (
        <div>
            <AppHeader pageTitle="Danh sách hợp đồng đặt phòng" />
            <button onClick={() => setRefresh((prev) => !prev)}>test</button>
            <SearchForm
                onSearch={onSearch}
                onChangeInput={setSearch}
                valueInput={search}
                placeholder="Tìm theo tên sinh viên"
            />
            <div className="bg-white rounded-2xl p-4 shadow-md m-4">
                <RequestTable
                    bookingRequests={bookingRequests}
                    pagination={pagination}
                    onChangePagination={onChangePagination}
                    setRefresh={setRefresh}
                />
            </div>
        </div>
    );
}
