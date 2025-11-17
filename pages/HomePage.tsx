import React from 'react';
import { Link } from 'react-router-dom';
import { TECHNICIANS_DATA, NEWS_DATA } from '../constants';
import { Technician, Availability, NewsArticle } from '../types';

const AvailabilityIndicator: React.FC<{ availability: Availability }> = ({ availability }) => {
  const baseClasses = "h-3 w-3 rounded-full inline-block mr-2";
  let colorClass = '';
  switch (availability) {
    case Availability.AVAILABLE:
      colorClass = 'bg-green-500';
      break;
    case Availability.SOON:
      colorClass = 'bg-yellow-500';
      break;
    case Availability.UNAVAILABLE:
      colorClass = 'bg-red-500';
      break;
  }
  return <span className={`${baseClasses} ${colorClass}`}></span>;
};

const TechnicianCard: React.FC<{ technician: Technician }> = ({ technician }) => (
    <div className="bg-brand-gray rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
        <img className="w-full h-56 object-cover" src={technician.avatarUrl} alt={technician.name} />
        <div className="p-4">
            <h3 className="text-xl font-bold text-white">{technician.name}</h3>
            <p className="text-brand-red">{technician.specialty}</p>
            <div className="text-sm text-gray-300 mt-2 flex items-center">
                <AvailabilityIndicator availability={technician.availability} />
                {technician.availability}
            </div>
        </div>
    </div>
);

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => (
    <div className="bg-brand-gray rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
        <img className="w-full h-56 object-cover" src={article.imageUrl} alt={article.title} />
        <div className="p-4">
            <p className="text-sm text-gray-400 mb-1">{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
            <p className="text-gray-300 text-sm line-clamp-3">{article.summary}</p>
        </div>
    </div>
);


const HomePage: React.FC = () => {
    const featuredTechnicians = TECHNICIANS_DATA.slice(0, 3);
    const latestNews = NEWS_DATA.slice(0, 2);
    const heroImage = "https://images.unsplash.com/photo-1574267432553-9b46280883ca?q=80&w=1932&auto=format&fit=crop";
    return (
        <div>
            {/* Hero Section */}
            <div 
              className="relative bg-black rounded-lg overflow-hidden shadow-2xl mb-16 h-96 text-white text-center flex flex-col justify-center items-center p-4"
              style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>
              <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">Bienvenue au RETECHCI</h1>
                <p className="text-lg md:text-xl max-w-2xl drop-shadow-lg">Le réseau des professionnels du cinéma et de l'audiovisuel en Côte d'Ivoire.</p>
                <Link to="/technicians" className="mt-8 bg-brand-red text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-opacity-80 transition-colors shadow-lg">
                  Trouver un Technicien
                </Link>
              </div>
            </div>

            {/* Featured Technicians */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">Nos Techniciens à la Une</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredTechnicians.map(tech => (
                        <Link to="/technicians" key={tech.id}><TechnicianCard technician={tech} /></Link>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link to="/technicians" className="text-brand-red font-semibold hover:underline">
                        Voir tout l'annuaire &rarr;
                    </Link>
                </div>
            </section>

            {/* Latest News */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-8">Dernières Actualités</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {latestNews.map(article => (
                        <Link to="/news" key={article.id}><NewsCard article={article} /></Link>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link to="/news" className="text-brand-red font-semibold hover:underline">
                        Toutes les actualités &rarr;
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;