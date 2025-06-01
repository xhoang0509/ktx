import { FormEvent, useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Đã gửi liên hệ!");

        // Reset form after submission
        setFormData({
            fullName: "",
            email: "",
            subject: "",
            message: "",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Gửi tin nhắn cho chúng tôi</h2>

            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                </div>

                <div>
                    <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Chủ đề
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                </div>

                <div>
                    <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Nội dung
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    ></textarea>
                </div>

                <div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                    >
                        Gửi liên hệ
                    </button>
                </div>
            </div>
        </form>
    );
}
