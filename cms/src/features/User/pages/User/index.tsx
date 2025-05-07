import { FC } from "react";
import useUser, { Props, ReceivedProps } from "./hook";
import AppHeader from "@components/AppHeader";
import { Button } from "@heroui/react";
import UserTable from "@features/User/component/UserTable";

const UserLayout: FC<Props> = ({ users, ...props }) => {
  return (
    <div>
      <AppHeader
        pageTitle="Danh sách học sinh"
        // rightMenu={<Button color="primary">Thêm học sinh</Button>}
      />
      <div className="bg-white rounded-2xl p-4 shadow-md m-4">
        <UserTable users={users?.data || []} />
      </div>
    </div>
  );
};

const User: FC<ReceivedProps> = (props) => <UserLayout {...useUser(props)} />;

export default User;
