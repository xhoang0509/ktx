import AppHeader from "@components/AppHeader";
import { SearchForm } from "@components/SearchInput";
import { useAppDispatch } from "@services/store";
import { useEffect, useState, useCallback } from "react";
import BookingRequestList from "../components/BookingRequestList";
import { mockBookingRequests } from "../services/mock";
import { BookingRequestActions } from "../services/slice";
import { BookingRequest } from "../types";
import { ContractService } from "@services/contract.service";

const defaultPagination = {
  page: 1,
  limit: 10,
  totalPages: 1,
  totalItems: mockBookingRequests.length,
};

export default function BookingRequestsPage() {
  const dispatch = useAppDispatch();

  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>(mockBookingRequests);
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState(defaultPagination);

  const fetchBookingRequests = async (searchTerm: string = "") => {
    const res = await ContractService.getContracts();
    if(res.status === 200){
      setBookingRequests(res.data);
    }
  }
  
  useEffect(() => {
    fetchBookingRequests();
  }, []);

  // Filter booking requests based on search term
  const getBookingRequests = useCallback((searchTerm: string = "") => {
    if (!searchTerm) {
      setBookingRequests(mockBookingRequests);
      setPagination({
        ...pagination,
        totalItems: mockBookingRequests.length,
        totalPages: Math.ceil(mockBookingRequests.length / pagination.limit),
      });
      return;
    }

    const filteredRequests = bookingRequests.filter((request) =>
      request.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setBookingRequests(filteredRequests);
    setPagination({
      ...pagination,
      totalItems: filteredRequests.length,
      totalPages: Math.ceil(filteredRequests.length / pagination.limit),
    });
  }, [pagination.limit]);

  const onSearch = useCallback(() => {
    getBookingRequests(search);
  }, [search, getBookingRequests]);

  const onChangePagination = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  return (
    <div>
      <AppHeader pageTitle="Danh sách yêu cầu đặt phòng" />
      <SearchForm
        onSearch={onSearch}
        onChangeInput={setSearch}
        valueInput={search}
        placeholder="Tìm theo tên sinh viên hoặc số phòng"
      />
      <div className="bg-white rounded-2xl p-4 shadow-md m-4">
        <BookingRequestList
          bookingRequests={bookingRequests}
          pagination={pagination}
          onChangePagination={onChangePagination}
        />
      </div>
    </div>
  );
} 