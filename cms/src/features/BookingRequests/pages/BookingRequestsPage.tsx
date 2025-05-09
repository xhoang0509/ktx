import AppHeader from "@components/AppHeader";
import { SearchForm } from "@components/SearchInput";
import { useAppDispatch } from "@services/store";
import { useEffect, useState, useCallback } from "react";
import BookingRequestList from "../components/BookingRequestList";
import { mockBookingRequests } from "../services/mock";
import { BookingRequestActions } from "../services/slice";
import { BookingRequest } from "../types";

const defaultPagination = {
  page: 1,
  limit: 10,
  totalPages: 1,
  totalItems: mockBookingRequests.length,
};

export default function BookingRequestsPage() {
  const dispatch = useAppDispatch();

  // In a real application, this would come from the Redux store
  // but for this mock example, we'll use local state
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>(mockBookingRequests);
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState(defaultPagination);
  
  // Initialize the mock data when the component mounts
  useEffect(() => {
    // In a real app, we would dispatch an action to fetch data from API
    dispatch(BookingRequestActions.setBookingRequests(mockBookingRequests));

    // Subscribe to state changes (for mock purposes)
    const handleStateChanges = () => {
      setBookingRequests([...mockBookingRequests]);
    };
    
    // Clean up function
    return () => {
      // Any cleanup if needed
    };
  }, [dispatch]);

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

    const filteredRequests = mockBookingRequests.filter((request) =>
      request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
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