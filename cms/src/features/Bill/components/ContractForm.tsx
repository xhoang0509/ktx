import AppInput from "@components/common/AppInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { ContractData, defaultContractData } from "../types/contract";
import { convertGenderToVietnamese } from "@utils/gender.util";

interface ContractFormProps {
    onDataChange: (data: ContractData) => void;
}

const contractSchema = yup.object().shape({
    school: yup.object().shape({
        schoolName: yup.string().required("Vui lòng nhập tên trường"),
        representative: yup.string().required("Vui lòng nhập đại diện"),
        department: yup.string().required("Vui lòng nhập đơn vị công tác"),
        position: yup.string().required("Vui lòng nhập chức vụ"),
        phone: yup.string().required("Vui lòng nhập số điện thoại"),
    }),
    student: yup.object().shape({
        full_name: yup.string().required("Vui lòng nhập họ tên sinh viên"),
        gender: yup.string().required("Vui lòng chọn giới tính"),
        student_id: yup.string().required("Vui lòng nhập mã sinh viên"),
        class_name: yup.string().required("Vui lòng nhập lớp"),
        faculty: yup.string().required("Vui lòng nhập khoa"),
        course: yup.string().required("Vui lòng nhập khóa"),
        phone: yup.string().required("Vui lòng nhập số điện thoại"),
        email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
        address: yup.string().required("Vui lòng nhập hộ khẩu thường trú"),
    }),
    room: yup.object().shape({
        name: yup.string().required("Vui lòng nhập số phòng"),
        building: yup.string().required("Vui lòng nhập nhà"),
        type: yup.string().required("Vui lòng nhập loại phòng"),
    }),
    rental: yup.object().shape({
        price: yup.string().required("Vui lòng nhập đơn giá"),
        startDate: yup.string().required("Vui lòng nhập ngày bắt đầu"),
        endDate: yup.string().required("Vui lòng nhập ngày kết thúc"),
    }),
});

export default function ContractForm({ onDataChange }: ContractFormProps) {
    const [data, setData] = useState<ContractData>(defaultContractData);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ContractData>({
        defaultValues: defaultContractData,
        resolver: yupResolver(contractSchema),
    });

    const updateData = (newData: ContractData) => {
        setData(newData);
        onDataChange(newData);
    };

    return (
        <form className="bg-white p-6 rounded-lg shadow-md">
            {/* School Information */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                    Thông tin BÊN A (Trường)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Tên trường</label>
                        <Controller
                            control={control}
                            name="school.schoolName"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            school: { ...data.school, schoolName: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.school?.schoolName && (
                            <p className="text-danger text-xs mt-1">
                                {errors.school.schoolName.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Đại diện</label>
                        <Controller
                            control={control}
                            name="school.representative"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            school: {
                                                ...data.school,
                                                representative: e.target.value,
                                            },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.school?.representative && (
                            <p className="text-danger text-xs mt-1">
                                {errors.school.representative.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Đơn vị công tác</label>
                        <Controller
                            control={control}
                            name="school.department"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            school: { ...data.school, department: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.school?.department && (
                            <p className="text-danger text-xs mt-1">
                                {errors.school.department.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Chức vụ</label>
                        <Controller
                            control={control}
                            name="school.position"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            school: { ...data.school, position: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.school?.position && (
                            <p className="text-danger text-xs mt-1">
                                {errors.school.position.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                        <Controller
                            control={control}
                            name="school.phone"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            school: { ...data.school, phone: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.school?.phone && (
                            <p className="text-danger text-xs mt-1">
                                {errors.school.phone.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Student Information */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                    Thông tin BÊN B (Sinh viên)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Họ tên sinh viên</label>
                        <Controller
                            control={control}
                            name="student.full_name"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            student: { ...data.student, full_name: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.student?.full_name && (
                            <p className="text-danger text-xs mt-1">
                                {errors.student.full_name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Giới tính</label>
                        <Controller
                            control={control}
                            name="student.gender"
                            render={({ field }) => (
                                <AppInput
                                    value={convertGenderToVietnamese(field.value)}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            student: { ...data.student, gender: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.student?.gender && (
                            <p className="text-danger text-xs mt-1">
                                {errors.student.gender.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Năm sinh</label>
                        <Controller
                            control={control}
                            name="student.birth_year"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            student: {
                                                ...data.student,
                                                birth_year: e.target.value,
                                            },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.student?.birth_year && (
                            <p className="text-danger text-xs mt-1">
                                {errors.student.birth_year.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Mã SV</label>
                        <Controller
                            control={control}
                            name="student.student_id"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            student: {
                                                ...data.student,
                                                student_id: e.target.value,
                                            },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.student?.student_id && (
                            <p className="text-danger text-xs mt-1">
                                {errors.student.student_id.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Lớp</label>
                        <Controller
                            control={control}
                            name="student.class_name"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            student: {
                                                ...data.student,
                                                class_name: e.target.value,
                                            },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.student?.class_name && (
                            <p className="text-danger text-xs mt-1">
                                {errors.student.class_name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Khoa</label>
                        <Controller
                            control={control}
                            name="student.faculty"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            student: { ...data.student, faculty: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.student?.faculty && (
                            <p className="text-danger text-xs mt-1">
                                {errors.student.faculty.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Khóa</label>
                        <Controller
                            control={control}
                            name="student.course"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            student: { ...data.student, course: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.student?.course && (
                            <p className="text-danger text-xs mt-1">
                                {errors.student.course.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                        <Controller
                            control={control}
                            name="student.phone"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            student: { ...data.student, phone: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.student?.phone && (
                            <p className="text-danger text-xs mt-1">
                                {errors.student.phone.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <Controller
                            control={control}
                            name="student.email"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            student: { ...data.student, email: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.student?.email && (
                            <p className="text-danger text-xs mt-1">
                                {errors.student.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Hộ khẩu thường trú</label>
                        <Controller
                            control={control}
                            name="student.address"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            student: { ...data.student, address: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.student?.address && (
                            <p className="text-danger text-xs mt-1">
                                {errors.student.address.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Room Information */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-2 mb-4">Thông tin phòng</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Số phòng</label>
                        <Controller
                            control={control}
                            name="room.name"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            room: { ...data.room, name: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.room?.name && (
                            <p className="text-danger text-xs mt-1">{errors.room.name.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Tầng</label>
                        <Controller
                            control={control}
                            name="room.floor"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            room: { ...data.room, floor: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.room?.floor && (
                            <p className="text-danger text-xs mt-1">{errors.room.floor.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Nhà</label>
                        <Controller
                            control={control}
                            name="room.building"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            room: { ...data.room, building: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.room?.building && (
                            <p className="text-danger text-xs mt-1">
                                {errors.room.building.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Loại phòng</label>
                        <Controller
                            control={control}
                            name="room.type"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            room: { ...data.room, type: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.room?.type && (
                            <p className="text-danger text-xs mt-1">{errors.room.type.message}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Rental Information */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-2 mb-4">Thông tin thuê</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Đơn giá (đ/tháng)</label>
                        <Controller
                            control={control}
                            name="rental.price"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            rental: { ...data.rental, price: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.rental?.price && (
                            <p className="text-danger text-xs mt-1">
                                {errors.rental.price.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Từ ngày (DD/MM/YYYY)
                        </label>
                        <Controller
                            control={control}
                            name="rental.startDate"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            rental: { ...data.rental, startDate: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.rental?.startDate && (
                            <p className="text-danger text-xs mt-1">
                                {errors.rental.startDate.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Đến ngày (DD/MM/YYYY)
                        </label>
                        <Controller
                            control={control}
                            name="rental.endDate"
                            render={({ field }) => (
                                <AppInput
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        updateData({
                                            ...data,
                                            rental: { ...data.rental, endDate: e.target.value },
                                        });
                                    }}
                                />
                            )}
                        />
                        {errors.rental?.endDate && (
                            <p className="text-danger text-xs mt-1">
                                {errors.rental.endDate.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
