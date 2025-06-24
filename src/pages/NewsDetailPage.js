// src/pages/NewsDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sanity, urlFor } from '../utils/sanityClient';
import { PortableText } from '@portabletext/react';
import Footer from '../components/Section/Footer';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanity
      .fetch(
        `*[_type == "news" && slug.current == $slug][0]{
          title, image, content, publishedAt
        }`,
        { slug }
      )
      .then((data) => {
        setArticle(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center text-gray-500">Loading berita...</div>;
  }

  if (!article) {
    return <div className="min-h-screen flex justify-center items-center text-red-500">Berita tidak ditemukan.</div>;
  }

  return (
    <div>
    <div className="min-h-screen bg-white text-gray-800 px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        {article.publishedAt && (
          <p className="text-sm text-gray-500 mb-4">
            Dipublikasikan: {new Date(article.publishedAt).toLocaleDateString('id-ID')}
          </p>
        )}
        {article.image && (
          <img
            src={urlFor(article.image).width(800).url()}
            alt={article.title}
            className="w-full rounded mb-6"
          />
        )}
        <div className="prose max-w-none">
          <PortableText value={article.content} />
        </div>
        <br/>
        {/* Back Link */}
        <Link
          to="/news"
          onClick={() => window.scrollTo(0, 0)}
        >
        <button class="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition">
          ← Kembali ke Menu News
        </button>
        </Link>
      </div>
      
      
    </div>
    <Footer />
    </div>
  );
}
