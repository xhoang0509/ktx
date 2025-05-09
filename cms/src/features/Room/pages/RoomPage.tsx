import { useEffect, useState, useCallback } from "react";
import AppHeader from "@components/AppHeader";
import { SearchForm } from "@components/SearchInput";
import { Button } from "@heroui/react";
import RoomTable from "../components/RoomTable";
import { mockRooms } from "../services/mock";
import { useAppDispatch } from "@services/store";
import { RoomActions } from "../services/slice";
import { Room } from "../types";

const defaultPagination = {
  page: 1,
  limit: 10,
  totalPages: 1,
  totalItems: mockRooms.length,
};

export default function RoomPage() {
  const dispatch = useAppDispatch();

  // In a real application, this would come from the Redux store
  // but for this mock example, we'll use local state
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState(defaultPagination);

  // Initialize the mock data when the component mounts
  useEffect(() => {
    // In a real app, we would dispatch an action to fetch data from API
    dispatch(RoomActions.setRooms(mockRooms));
  }, [dispatch]);

  // Filter rooms based on search term
  const getRooms = useCallback((searchTerm: string = "") => {
    if (!searchTerm) {
      setRooms(mockRooms);
      setPagination({
        ...pagination,
        totalItems: mockRooms.length,
        totalPages: Math.ceil(mockRooms.length / pagination.limit),
      });
      return;
    }

    const filteredRooms = mockRooms.filter((room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setRooms(filteredRooms);
    setPagination({
      ...pagination,
      totalItems: filteredRooms.length,
      totalPages: Math.ceil(filteredRooms.length / pagination.limit),
    });
  }, [pagination.limit]);

  const onSearch = useCallback(() => {
    getRooms(search);
  }, [search, getRooms]);

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
            onClick={() => console.log("Add new room")}
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