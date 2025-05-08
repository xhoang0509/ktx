import AppHeader from "@components/AppHeader";
import { SearchForm } from "@components/SearchInput";
import UserTable from "@features/User/component/UserTable";
import { UserActions, UserSelectors } from "@features/User/services/slice";
import { Button } from "@heroui/react";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


const defaultPagination = {
  page: 1,
  limit: 10,
  totalPages: 1,
  totalItems: 1,
};

export default function UserPage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(UserSelectors.users);

  const [pagination, setPagination] = useState(defaultPagination);
  const getUsers = (pagination?: any, search?: string) => {
    dispatch(
      UserActions.getUsers({
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
  }

  useEffect(() => {
    getUsers(pagination, search);
  }, [pagination.page]);


  const navigate = useNavigate()
  const onSearch = () => {
    getUsers(defaultPagination, search);
  }
  const [search, setSearch] = useState<string>("")
  const onChangePagination = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };
  return (
    <div>
      <AppHeader
        pageTitle="Danh sách sinh viên"
        rightMenu={<Button color="primary" onClick={() => {
          navigate("/user/add")
        }}>Thêm sinh viên</Button>}
      />
      <SearchForm
        onSearch={onSearch}
        onChangeInput={setSearch}
        valueInput={search}
      />
      <div className="bg-white rounded-2xl p-4 shadow-md m-4">
        <UserTable users={users || []} pagination={pagination}
          onChangePagination={onChangePagination} />
      </div>


    </div>
  );
}