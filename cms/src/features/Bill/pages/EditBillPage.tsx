import AppHeader from "@components/AppHeader";
import AppInput from "@components/common/AppInput";
import AppNumberInput from "@components/common/AppNumberInput";
import AppSelect from "@components/common/AppSelect";
import { ROUTE_PATHS } from "@constants/route.const";
import { Button, SelectItem } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@services/store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { addBillSchema } from "../services/schema";
import { BillActions } from "../services/slice";

const defaultAddDeviceForm = {
    name: "",
    type: "",
    year_of_manufacture: 2024,
    status: "good",
};
export default function EditBillPage() {
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: defaultAddDeviceForm,
        resolver: yupResolver(addBillSchema),
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit = (data: any) => {
        dispatch(
            BillActions.editBill({
                id,
                body: data,
                onSuccess: () => {
                    reset();
                    navigate(`/${ROUTE_PATHS.BILL}`);
                },
            })
        );
    };

    useEffect(() => {
        if (id) {
            dispatch(
                BillActions.getBillDetail({
                    id,
                    onSuccess: (data: any) => reset(data),
                })
            );
        }
    }, [dispatch]);

    return (
        <div className="h-full flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
                <AppHeader
                    pageTitle="Sửa hóa đơn"
                    rightMenu={
                        <Button color="primary" type="submit">
                            Lưu
                        </Button>
                    }
                />
                <div className="p-4 flex-1">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-white rounded-2xl p-4 shadow-md grid grid-cols-12 gap-4 col-span-3">
                            <div className="col-span-6">
                                <div className="mb-2">Tên hóa đơn</div>
                                <AppInput control={control} name="name" />
                                <div className="text-danger text-xs mt-1">
                                    {errors.name?.message}
                                </div>
                            </div>
                            <div className="col-span-6">
                                <div className="mb-2">Loại hóa đơn</div>
                                <AppInput control={control} name="type" />
                                <div className="text-danger text-xs mt-1">
                                    {errors.type?.message}
                                </div>
                            </div>
                            <div className="col-span-6">
                                <div className="mb-2">Năm sản xuất</div>
                                <AppNumberInput
                                    control={control}
                                    name="year_of_manufacture"
                                    min={2000}
                                />
                                <div className="text-danger text-xs mt-1">
                                    {errors.year_of_manufacture?.message}
                                </div>
                            </div>
                            <div className="col-span-6">
                                <div className="mb-2">Trạng thái</div>
                                <AppSelect
                                    control={control}
                                    name="status"
                                    defaultSelectedKeys={["good"]}
                                >
                                    <SelectItem key="good">Tốt</SelectItem>
                                    <SelectItem key="broken">Hỏng</SelectItem>
                                    <SelectItem key="under_maintenance">Đang bảo trì</SelectItem>
                                </AppSelect>
                                <div className="text-danger text-xs mt-1">
                                    {errors.status?.message}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
