import ArticleCard from "@features/Home/components/ArticleCard";
import { featuredArticles } from "@features/Home/data";

export default function BlogIndex() {
    return (
        <div>
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
        </div>
    );
}