import { useNavigate } from "react-router";
import { useAppDispatch } from "@services/store";

export type ReceivedProps = {
    users: any[];
};

const useUserTable = (props: ReceivedProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const columns = [
        {name: "Số thứ tự", uid: "indexNumber", align: "center", with: "80px"},
        { name: "ID", uid: "_id" },
        { name: "Email", uid: "email" },
        { name: "Ngày tạo", uid: "createdAt" },
        { name: "Ngày cập nhật", uid: "updatedAt" },
        { name: "Trạng thái", uid: "isActive", align: "center" },
    ];

    return {navigate, columns, ...props};
};

export type Props = ReturnType<typeof useUserTable>;

export default useUserTable;