import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function ContactInfo() {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Thông tin liên hệ</h2>

            <div className="space-y-4">
                <div className="flex items-start">
                    <MapPinIcon className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">Địa chỉ: Mỹ Hào, Hưng Yên</span>
                </div>

                <div className="flex items-start">
                    <PhoneIcon className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">Số điện thoại: 0123 456 789</span>
                </div>

                <div className="flex items-start">
                    <EnvelopeIcon className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">
                        Email:{" "}
                        <a
                            href="mailto:ktx@sinhvien.edu.vn"
                            className="text-blue-600 hover:underline"
                        >
                            ktx@sinhvien.edu.vn
                        </a>
                    </span>
                </div>

                <div className="flex items-start">
                    <ClockIcon className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">
                        Giờ làm việc: Thứ 2 - Thứ 6, 08:00 - 17:00
                    </span>
                </div>
            </div>
        </div>
    );
}
