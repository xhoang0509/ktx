import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeftIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { blogPosts } from "./data";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const blogPost = blogPosts.find(post => post.id === id);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  if (!blogPost) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bài viết không tồn tại</h2>
        <button
          onClick={() => navigate("/")}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Quay lại trang chủ
        </button>
      </div>
    );
  }
  
  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const formattedDate = format(new Date(blogPost.createdAt), "dd/MM/yyyy", { locale: vi });
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center mb-8 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Quay lại trang chủ
      </button>
      
      {/* Blog header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{blogPost.title}</h1>
        <div className="flex items-center text-gray-600">
          <CalendarIcon className="w-5 h-5 mr-2" />
          <span>Ngày đăng: {formattedDate}</span>
        </div>
      </div>
      
      {/* Blog image */}
      <div className="w-full h-[300px] md:h-[400px] mb-8 overflow-hidden rounded-lg">
        <img
          src={blogPost.image}
          alt={blogPost.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Blog content */}
      <div className="prose max-w-none">
        {blogPost.content.map((paragraph, index) => (
          <p key={index} className="text-gray-700 mb-6 text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      
      {/* Related posts suggestion */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Bài viết liên quan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts
            .filter(post => post.id !== id)
            .slice(0, 2)
            .map(post => (
              <div 
                key={post.id} 
                className="flex cursor-pointer hover:shadow-md transition-shadow rounded-lg overflow-hidden"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <div className="w-1/3 h-32">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="w-2/3 p-4">
                  <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">{post.title}</h4>
                  <p className="text-gray-600 text-sm line-clamp-2">{post.content[0]}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 