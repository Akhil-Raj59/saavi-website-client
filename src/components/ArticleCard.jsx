// src/components/ArticleCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function ArticleCard({ article }) {
  const slug = article.slug || article._id;
  
  return (
    <article className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1">
      {/* Featured Image */}
      {article.featuredImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.featuredImage}
            alt={article.imageAlt || article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Category Badge */}
          {article.category && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-cyan-500/90 backdrop-blur-sm text-black text-xs font-semibold rounded-full">
              {article.category}
            </span>
          )}
          
          {/* Featured Badge */}
          {article.featured && (
            <span className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/90 backdrop-blur-sm text-black text-xs font-semibold rounded-full">
              ⭐ Featured
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          {/* Author */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-black font-bold text-xs">
              {(article.author?.name || "SaaviGen").charAt(0)}
            </div>
            <span>{article.author?.name || "SaaviGen"}</span>
          </div>
          
          {/* Divider */}
          <span className="text-gray-600">•</span>
          
          {/* Date */}
          {article.publishedAt && (
            <time dateTime={article.publishedAt}>
              {dayjs(article.publishedAt).fromNow()}
            </time>
          )}
          
          {/* Reading Time */}
          {article.readTime && (
            <>
              <span className="text-gray-600">•</span>
              <span>{article.readTime} min read</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
          <Link to={`/articles/${slug}`} className="hover:underline">
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {article.excerpt}
          </p>
        )}

        {/* Read More Link */}
        <Link
          to={`/articles/${slug}`}
          className="inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:gap-3 transition-all"
        >
          Read Article
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-10 transition-opacity -z-10" />
    </article>
  );
}