import { Button } from "@heroui/button";
import React from "react";
import { useNavigate } from "react-router";

interface ArticleCardProps {
    id: string;
    title: string;
    image: string;
    summary: string;
    url: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ id, title, image, summary, url }) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-full overflow-hidden bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="overflow-hidden h-48">
                <img
                    src={image}
                    alt={title}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
            </div>
            <div className="flex flex-col flex-grow p-5">
                <h3 className="mb-3 text-xl font-semibold text-gray-800">{title}</h3>
                <p className="flex-grow mb-4 text-gray-600">{summary}</p>
                <Button
                    onClick={() => navigate(`/blog/${id}`)}
                    className="inline-flex items-center justify-center px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Xem chi tiết
                </Button>
            </div>
        </div>
    );
};

export default ArticleCard;
