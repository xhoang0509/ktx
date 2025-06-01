import { SITE_NAME } from "@config/site";
import React from "react";
import ArticleCard from "./components/ArticleCard";
import ReasonCard from "./components/ReasonCard";
import { dormitoryReasons, featuredArticles } from "./data";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col">
            {/* Header Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="container mx-auto max-w-6xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Ký túc xá sinh viên</h1>
                    <p className="text-xl md:text-2xl max-w-2xl">
                        Môi trường sống và học tập lành mạnh, an toàn và tiện nghi cho sinh viên.
                    </p>
                </div>
            </section>

            {/* Reasons Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                        Tại sao nên chọn ký túc xá?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {dormitoryReasons.map((reason) => (
                            <ReasonCard
                                key={reason.id}
                                icon={reason.icon}
                                title={reason.title}
                                description={reason.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Articles Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
                        Bài viết nổi bật
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {featuredArticles.map((article) => (
                            <ArticleCard
                                id={article.id}
                                key={article.id}
                                title={article.title}
                                image={article.image}
                                summary={article.summary}
                                url={article.url}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Welcome Message Section */}
            <section className="py-8 px-4 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="my-3 text-lg font-semibold text-center">
                        {SITE_NAME} xin chào, chúc bạn một ngày tốt lành!
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
