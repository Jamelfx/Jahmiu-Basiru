import React from 'react';
import { NEWS_DATA } from '../constants';
import { NewsArticle } from '../types';

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => (
    <div className="bg-brand-gray rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row mb-8 transform hover:-translate-y-1 transition-transform duration-300">
        <img className="w-full md:w-1/3 h-64 md:h-auto object-cover" src={article.imageUrl} alt={article.title} />
        <div className="p-6 flex flex-col justify-between">
            <div>
                <p className="text-sm text-gray-400 mb-2">{new Date(article.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <h3 className="text-2xl font-bold text-brand-red mb-3">{article.title}</h3>
                <p className="text-gray-300 leading-relaxed">{article.summary}</p>
            </div>
            <div className="mt-4">
                 <a href="#" onClick={(e) => e.preventDefault()} className="text-brand-red font-semibold hover:underline">
                    Lire la suite &rarr;
                </a>
            </div>
        </div>
    </div>
);

const NewsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10">
            Actualités de l'Association
        </h1>
        
        <div className="space-y-12">
            {NEWS_DATA.map(article => (
                <NewsCard key={article.id} article={article} />
            ))}
        </div>
    </div>
  );
};

export default NewsPage;
