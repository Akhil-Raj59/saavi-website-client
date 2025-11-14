// src/pages/Articles.jsx
import React, { useEffect, useState } from "react";
import { articlesAPI } from "../services/api";
import ArticleCard from "../components/ArticleCard";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await articlesAPI.list({ page: 1, limit: 20, published: true });
        setArticles(res.data.data.articles || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Articles</h1>
      {loading ? <div>Loading...</div> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.length ? articles.map((a) => <ArticleCard key={a._id || a.slug} article={a} />) : <div>No articles found.</div>}
        </div>
      )}
    </div>
  );
}
