import { convertGenderToVietnamese } from "@utils/gender.util";
import { ContractData } from "../types/contract";
import { formatVND } from "@utils/fomart.util";

interface ContractPreviewProps {
    data: ContractData;
}

export default function ContractPreview({ data }: ContractPreviewProps) {
    return (
        <div id="contract-preview" className="bg-white p-8 shadow-md max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <p className="text-sm mb-1">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                <p className="text-sm mb-4">Độc lập - Tự do - Hạnh phúc</p>
                <h1 className="text-xl font-bold uppercase mb-2">HỢP ĐỒNG THUÊ CHỖ Ở NỘI TRÚ</h1>
                <p className="text-sm italic">Năm học 2024 - 2025</p>
            </div>

            <div className="mb-6">
                <p className="text-sm mb-4">
                    Hôm nay, ngày {new Date().getDate()} tháng {new Date().getMonth() + 1} năm{" "}
                    {new Date().getFullYear()}, tại Ký túc xá Trường Đại học Kỹ thuật Công nghiệp
                    Thái Nguyên, chúng tôi gồm:
                </p>

                {/* Party A information */}
                <div className="mb-6">
                    <h2 className="font-bold mb-2">
                        BÊN A: {data.school.schoolName.toUpperCase()}
                    </h2>
                    <div className="pl-8">
                        <p className="text-sm mb-1">Đại diện: {data.school.representative}</p>
                        <p className="text-sm mb-1">Đơn vị công tác: {data.school.department}</p>
                        <p className="text-sm mb-1">Chức vụ: {data.school.position}</p>
                        <p className="text-sm mb-1">Số điện thoại: {data.school.phone}</p>
                    </div>
                </div>

                {/* Party B information */}
                <div className="mb-6">
                    <h2 className="font-bold mb-2">
                        BÊN B: {data.student.full_name.toUpperCase()}
                    </h2>
                    <div className="pl-8">
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-sm mb-1">
                                Giới tính: {convertGenderToVietnamese(data.student.gender)}
                            </p>
                            <p className="text-sm mb-1">Ngày sinh: {data.student.birth_date}</p>
                            <p className="text-sm mb-1">Mã SV: {data.student.student_id}</p>
                            <p className="text-sm mb-1">Lớp: {data.student.class_code}</p>
                            <p className="text-sm mb-1">Khoa: {data.student.faculty_name}</p>
                        </div>
                        <p className="text-sm mb-1">Số điện thoại: {data.student.phone}</p>
                        <p className="text-sm mb-1">Email: {data.student.email}</p>
                        <p className="text-sm mb-1">Hộ khẩu thường trú: {data.student.address}</p>
                    </div>
                </div>

                {/* Room information */}
                <div className="mb-6">
                    <h2 className="font-bold mb-2">THÔNG TIN PHÒNG:</h2>
                    <div className="pl-8">
                        <p className="text-sm mb-1">
                            Số phòng: {data.room.name}, Tầng: {data.room.floor}, Nhà:{" "}
                            {data.room.building}
                        </p>
                    </div>
                </div>

                {/* Rental terms */}
                <div className="mb-6">
                    <h2 className="font-bold mb-2">ĐIỀU KHOẢN THUÊ:</h2>
                    <div className="pl-8">
                        <p className="text-sm mb-1">
                            Đơn giá: {formatVND(data.room.base_price)} / tháng
                        </p>
                        <p className="text-sm mb-1">
                            Thời gian thuê: Từ {data.room.start_date} đến {data.room.end_date}
                        </p>
                    </div>
                </div>

                {/* Contract terms */}
                <div className="mb-6">
                    <h2 className="font-bold mb-2">ĐIỀU KHOẢN HỢP ĐỒNG:</h2>
                    <div className="text-sm pl-4">
                        <p className="mb-2">
                            1. Bên B có trách nhiệm chấp hành nội quy của KTX và các quy định khác
                            của Nhà trường.
                        </p>
                        <p className="mb-2">
                            2. Bên B có trách nhiệm nộp phí KTX đúng hạn theo quy định.
                        </p>
                        <p className="mb-2">
                            3. Bên B phải bảo quản tài sản, trang thiết bị trong phòng ở. Nếu làm hư
                            hỏng, mất mát phải bồi thường.
                        </p>
                        <p className="mb-2">
                            4. Hợp đồng có hiệu lực kể từ ngày ký. Hai bên cam kết thực hiện đúng
                            nội dung hợp đồng.
                        </p>
                    </div>
                </div>

                {/* Signatures */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="text-center">
                        <h3 className="font-bold mb-4">BÊN A</h3>
                        <p className="italic">(Ký, ghi rõ họ tên)</p>
                    </div>
                    <div className="text-center">
                        <h3 className="font-bold mb-4">BÊN B</h3>
                        <p className="italic">(Ký, ghi rõ họ tên)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
