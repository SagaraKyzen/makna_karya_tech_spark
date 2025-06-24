import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sanity, urlFor } from '../utils/sanityClient';
import Footer from '../components/Section/Footer';
import { PortableText } from '@portabletext/react';


export default function NewsPage() {
  const [featured, setFeatured] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    // Featured news (satu berita utama)
    sanity.fetch(`*[_type == "news" && featured == true][0]{
    title, slug, image, content
  }`).then(setFeatured);

    // Recent news (5 berita selain featured)
    sanity.fetch(`*[_type == "news" && featured != true && defined(publishedAt)] | order(publishedAt desc)[0...5]{
    title, slug, image
  }`).then(setRecent);
  }, []);


  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen flex flex-col">
      <div className="flex-grow py-10 text-gray-800 mr-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">

          {/* Featured News */}
          <div className="flex-1 md:pr-6" data-aos="fade-up">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 pt-10">Featured News</h1>
            {featured && (
              <>
                <img
                  src={urlFor(featured.image).width(800).url()}
                  alt={featured.title}
                  className="w-full rounded-lg shadow-md mb-6 object-cover"
                />
                <h2 className="text-lg md:text-2xl font-semibold mb-4">{featured.title}</h2>
                <hr className="border-gray-400 mb-6" />

                <div className="prose prose-sm md:prose-base max-w-none text-gray-800 mb-6">
                  <PortableText value={featured.content} />
                </div>
              </>
            )}

          </div>

          {/* Sidebar Recent News */}
          <div className="w-full md:w-[320px] lg:w-[360px] sticky top-24 self-start bg-white p-6 rounded-lg space-y-4 shadow" data-aos="fade-up">
            <h2 className="text-xl font-bold mb-4 pt-4">Recent News</h2>
            {recent.map((item, index) => (
              <div key={index} className="bg-white rounded-md shadow hover:shadow-lg overflow-hidden transition duration-300">
                <img
                  src={urlFor(item.image).width(400).height(120).crop('center').url()}
                  alt={item.title}
                  className="w-full h-28 object-cover"
                />
                <div className="p-3">
                  <Link
                    to={`/news/${item.slug.current}`}
                    className="text-blue-700 hover:underline text-sm font-medium block"
                  >
                    {item.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
