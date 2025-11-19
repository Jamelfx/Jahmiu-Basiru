
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Technician, Availability, NewsArticle, Video, Partner, AppEvent, ForumTopic } from '../types/types';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import ChatWidget from '../components/ChatWidget';
import PartnersMarquee from '../components/PartnersMarquee';
import apiClient from '../api/client';

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

const VideoCard: React.FC<{ video: Video; onClick: () => void }> = ({ video, onClick }) => (
    <div 
      className="bg-brand-gray rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
        <div className="relative">
            <img className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" src={video.thumbnailUrl} alt={video.title} />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <svg className="h-16 w-16 text-white text-opacity-80 group-hover:text-opacity-100 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
            </div>
            <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs font-semibold px-2 py-1 rounded">
                {video.duration}
            </span>
        </div>
        <div className="p-4">
            <h3 className="text-md font-bold text-white line-clamp-2">{video.title}</h3>
        </div>
    </div>
);

const VideoModal: React.FC<{ video: Video; onClose: () => void }> = ({ video, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
        onClick={onClose}
    >
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="relative bg-brand-dark rounded-lg shadow-xl w-full max-w-4xl overflow-hidden"
            onClick={e => e.stopPropagation()}
        >
            <div className="relative" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                <iframe
                    src={`${video.videoUrl}?autoplay=1&rel=0`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                ></iframe>
            </div>
            <div className="p-4">
                 <h3 className="text-xl font-bold text-white">{video.title}</h3>
            </div>
            <button onClick={onClose} className="absolute -top-3 -right-3 text-white bg-brand-red rounded-full h-8 w-8 flex items-center justify-center text-xl font-bold z-10 hover:bg-opacity-80 transition-opacity">&times;</button>
        </motion.div>
    </motion.div>
);

const AnimatedStat: React.FC<{ value: number; suffix?: string; }> = ({ value, suffix = '' }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView && ref.current) {
            const controls = animate(0, value, {
                duration: 2,
                ease: "easeOut",
                onUpdate(latest) {
                    if(ref.current) {
                       ref.current.textContent = Math.round(latest).toLocaleString('fr-FR') + suffix;
                    }
                }
            });
            return () => controls.stop();
        }
    }, [isInView, value, suffix]);

    return <span ref={ref}>0{suffix}</span>;
};


const StatCard: React.FC<{ value: number; label: string; suffix?: string; icon: React.ReactNode; }> = ({ value, label, suffix, icon }) => (
    <div className="bg-brand-gray p-8 rounded-lg text-center flex flex-col items-center">
        <div className="text-brand-red mb-4">{icon}</div>
        <div className="text-6xl lg:text-7xl font-extrabold text-white" style={{ lineHeight: '1' }}>
             <AnimatedStat value={value} suffix={suffix} />
        </div>
        <p className="text-gray-400 mt-2 text-lg">{label}</p>
    </div>
);


const StatsSection: React.FC<{ memberCount: number }> = ({ memberCount }) => (
    <section className="my-16 py-12 bg-brand-dark">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Le RETECHCI en Chiffres</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatCard 
                    value={memberCount} 
                    label="Membres Actifs"
                    icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.274-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.274.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                />
                <StatCard 
                    value={150} 
                    label="Projets Accompagnés" 
                    suffix="+"
                    icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
                />
                <StatCard 
                    value={800} 
                    label="Heures de Formation" 
                    suffix="+"
                    icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                />
                 <StatCard 
                    value={25} 
                    label="Partenaires Stratégiques"
                    icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                />
            </div>
        </div>
    </section>
);


const HomePage: React.FC = () => {
    const [technicians, setTechnicians] = useState<Technician[]>([]);
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [partners, setPartners] = useState<Partner[]>([]);
    const [events, setEvents] = useState<AppEvent[]>([]);
    const [forumTopics, setForumTopics] = useState<ForumTopic[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    // Image de techniciens sur un plateau de tournage
    const heroImage = "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?q=80&w=2070&auto=format&fit=crop";

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setIsLoading(true);
                const [techData, newsData, videosData, partnersData, eventsData, topicsData] = await Promise.all([
                    apiClient.get('/api/technicians'),
                    apiClient.get('/api/news'),
                    apiClient.get('/api/videos'),
                    apiClient.get('/api/partners'),
                    apiClient.get('/api/events'),
                    apiClient.get('/api/forum/topics'),
                ]);

                setTechnicians(techData);
                setNews(newsData);
                setVideos(videosData);
                setPartners(partnersData);
                setEvents(eventsData);
                setForumTopics(topicsData);

            } catch (error) {
                console.error("Erreur lors de la récupération des données pour la page d'accueil:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);
    
    const featuredTechnicians = technicians.slice(0, 3);
    const latestNews = news.slice(0, 2);
    const upcomingEvents = events.slice(0, 3);
    const recentTopics = forumTopics.slice(0, 3);
    
    return (
        <div>
            {/* Hero Section */}
            <div 
              className="relative bg-black rounded-lg overflow-hidden shadow-2xl mb-12 h-96 text-white text-center flex flex-col justify-center items-center p-4"
              style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              {/* Opacité augmentée à 75% pour réduire la visibilité de l'image derrière le texte */}
              <div className="absolute inset-0 bg-black bg-opacity-75"></div>
              <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">Bienvenue au RETECHCI</h1>
                <p className="text-lg md:text-xl max-w-2xl drop-shadow-lg">Le réseau des professionnels du cinéma et de l'audiovisuel en Côte d'Ivoire.</p>
                <Link to="/technicians" className="mt-12 inline-block bg-brand-red text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-opacity-80 transition-colors shadow-lg">
                  Trouver un Technicien
                </Link>
              </div>
            </div>

            {/* Agenda Section (NOUVEAU - PLACÉ EN HAUT) */}
            <section className="mb-12 bg-gradient-to-br from-brand-gray to-gray-900 rounded-lg p-8 shadow-xl border border-gray-700">
                 <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <span className="text-3xl mr-3">📅</span>
                        <h2 className="text-3xl font-bold text-white">Agenda du Réseau</h2>
                    </div>
                    <Link to="/events" className="text-brand-red font-semibold hover:underline text-sm bg-brand-dark px-4 py-2 rounded-full">Voir tout l'agenda &rarr;</Link>
                </div>
                 {isLoading ? <div className="text-center">Chargement...</div> :
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {upcomingEvents.map(event => (
                             <Link to="/events" key={event.id} className="bg-brand-dark p-4 rounded-md border-l-4 border-brand-red hover:bg-gray-800 transition-all hover:-translate-y-1 cursor-pointer">
                                <div className="text-brand-red font-bold text-lg mb-1">{new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</div>
                                <h3 className="font-bold text-white text-lg mb-2 line-clamp-1">{event.title}</h3>
                                <div className="flex items-center text-gray-400 text-sm">
                                     <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                     <span className="truncate">{event.location}</span>
                                </div>
                            </Link>
                        ))}
                        {upcomingEvents.length === 0 && <p className="text-gray-500 col-span-3 text-center">Aucun événement à venir.</p>}
                    </div>
                }
            </section>

             {/* Forum Preview (NOUVEAU - PLACÉ EN HAUT) */}
            <section className="mb-16">
                <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                     <div className="flex items-center">
                         <span className="text-3xl mr-3">💬</span>
                         <h2 className="text-3xl font-bold">Discussions Récentes</h2>
                     </div>
                     <Link to="/forum" className="text-brand-red font-semibold hover:underline text-sm">Accéder au Forum &rarr;</Link>
                </div>
                 {isLoading ? <div className="text-center">Chargement...</div> :
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {recentTopics.map(topic => (
                             <Link to="/forum" key={topic.id} className="block bg-brand-gray p-5 rounded-lg hover:bg-gray-800 transition-colors group border border-gray-800 hover:border-brand-red">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${topic.category === 'Annonces' ? 'bg-yellow-500 text-black' : 'bg-blue-900 text-blue-200'}`}>{topic.category}</span>
                                </div>
                                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-brand-red transition-colors line-clamp-2">{topic.title}</h3>
                                <div className="flex items-center mt-4 text-xs text-gray-500 border-t border-gray-700 pt-3">
                                    <div className="flex items-center flex-1">
                                         <img src={topic.authorAvatar || `https://ui-avatars.com/api/?name=${topic.authorName}&background=random`} alt={topic.authorName} className="w-5 h-5 rounded-full mr-2" />
                                         <span>{topic.authorName}</span>
                                    </div>
                                    <span className="flex items-center">
                                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                         {topic.repliesCount}
                                    </span>
                                </div>
                            </Link>
                        ))}
                         {recentTopics.length === 0 && <p className="text-gray-500 text-center col-span-3">Aucune discussion récente.</p>}
                    </div>
                }
            </section>

            {/* Featured Technicians */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">Nos Techniciens à la Une</h2>
                {isLoading ? <div className="text-center">Chargement...</div> :
                    <>
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
                    </>
                }
            </section>

            {/* Stats Section */}
            {!isLoading && <StatsSection memberCount={technicians.length} />}

            {/* Latest News */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">Dernières Actualités</h2>
                 {isLoading ? <div className="text-center">Chargement...</div> :
                    <>
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
                    </>
                }
            </section>
            
            {/* Videos Section */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">Nos Vidéos</h2>
                 {isLoading ? <div className="text-center">Chargement...</div> :
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {videos.slice(0, 6).map(video => (
                            <VideoCard key={video.id} video={video} onClick={() => setSelectedVideo(video)} />
                        ))}
                    </div>
                }
            </section>

            {/* Partners Section */}
            <section className="my-16">
                <h2 className="text-3xl font-bold text-center mb-4">Nos Partenaires</h2>
                <p className="text-center text-gray-400 mb-8">Ils nous font confiance et soutiennent le cinéma ivoirien.</p>
                 {isLoading ? <div className="text-center">Chargement...</div> : <PartnersMarquee partners={partners} />}
            </section>

            <AnimatePresence>
                {selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
            </AnimatePresence>

            <ChatWidget />
        </div>
    );
};

export default HomePage;
