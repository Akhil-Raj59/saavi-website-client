// src/pages/ArticleDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { articlesAPI } from "../services/api";
import { useAuth } from "../context/authContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function ArticleDetail() {
  const { slug } = useParams();
  console.log("ArticleDetail slug:", slug);
  const [article, setArticle] = useState(null);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await articlesAPI.getBySlug(slug);
        setArticle(res.data.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [slug]);

  const handleDelete = async () => {
    if (!confirm("Delete this article?")) return;
    try {
      await articlesAPI.delete(article._id || article.id);
      navigate("/articles");
    } catch (err) {
      console.error(err);
      alert("Failed to delete article");
    }
  };

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center text-gray-500">
          Loading article...
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gray-50">
      {/* --- Admin Controls --- */}
      {isAdmin() && (
        <div className="container mx-auto px-4 py-4 flex justify-end">
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/admin/articles/${slug}/edit`)}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* --- Hero Image Section --- */}
      <div className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[32rem] bg-gray-900 overflow-hidden">
        {article.featuredImage && (
          <>
            <img
              src={article.featuredImage}
              alt={article.imageAlt || article.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
          </>
        )}

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 md:pb-12">
            <div className="max-w-4xl mx-auto">
              <div className="mb-3 sm:mb-4">
                <span className="inline-block px-3 py-1 text-xs sm:text-sm font-semibold text-white bg-indigo-600 rounded-full">
                  {article.category}
                </span>
                {article.featured && (
                  <span className="inline-block ml-2 px-3 py-1 text-xs sm:text-sm font-semibold text-white bg-yellow-500 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3 sm:mb-4">
                {article.title}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 sm:mb-6 max-w-3xl">
                {article.excerpt}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Article Content --- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 md:-mt-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
            <div
              className="prose max-w-none prose-headings:font-bold prose-p:text-gray-700"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
