
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Member, Notification } from '../types/types';
import { useLanguage } from '../contexts/LanguageContext';
import apiClient from '../api/client';

interface HeaderProps {
  currentUser: Member | null;
  onLogout: () => Promise<void>;
}

const Logo: React.FC = () => (
    <svg viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg" className="h-12 w-auto" fill="white" aria-label="Logo RETECHCI">
        {/* Graphic part */}
        <g transform="translate(0, 15)">
            {/* Left shape */}
            <path d="M60 0 L40 0 L0 50 L40 100 L60 100 L20 50 Z" />
            {/* Top right shape */}
            <path d="M70 27 L180 0 L200 15 L90 42 Z" />
            {/* Bottom right shape */}
            <path d="M70 73 L90 58 L200 85 L180 100 Z" />
        </g>
        {/* Text part */}
        <text x="215" y="65" fontFamily="sans-serif" fontSize="45" fontWeight="bold">ReTechCi</text>
        <text x="215" y="93" fontFamily="sans-serif" fontSize="18" fillOpacity="0.9">Réseau des Techniciens</text>
        <text x="215" y="115" fontFamily="sans-serif" fontSize="18" fillOpacity="0.9">du Cinéma en Côte d'Ivoire</text>
    </svg>
);


const NavLinkItem: React.FC<{ to: string; children: React.ReactNode; badge?: string }> = ({ to, children, badge }) => (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive ? 'bg-brand-red text-white' : 'text-gray-300 hover:bg-brand-gray hover:text-white'
        }`
      }
    >
      {children}
      {badge && (
        <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
            {badge}
        </span>
      )}
    </NavLink>
);

const LanguageToggle: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    return (
        <button 
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="flex items-center space-x-1 text-gray-300 hover:text-white px-2"
        >
            <span className={`text-xs font-bold ${language === 'fr' ? 'text-brand-red' : ''}`}>FR</span>
            <span className="text-xs">|</span>
            <span className={`text-xs font-bold ${language === 'en' ? 'text-brand-red' : ''}`}>EN</span>
        </button>
    );
}

const NotificationBell: React.FC<{ currentUser: Member | null }> = ({ currentUser }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const fetchNotifs = async () => {
        if(!currentUser) return;
        try {
            const data = await apiClient.get('/api/notifications');
            setNotifications(data);
        } catch (e) { console.error(e); }
    };

    useEffect(() => {
        fetchNotifs();
        const interval = setInterval(fetchNotifs, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, [currentUser]);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkRead = async (id: number) => {
        try {
            await apiClient.put(`/api/notifications/${id}/read`, {});
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        } catch(e) {}
    };

    if (!currentUser) return null;

    return (
        <div className="relative" ref={wrapperRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-300 hover:text-white relative"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-brand-dark">
                        {unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-80 bg-brand-gray border border-gray-700 rounded-md shadow-xl z-50 overflow-hidden"
                    >
                        <div className="p-3 border-b border-gray-700 text-sm font-bold text-white">Notifications</div>
                        <div className="max-h-64 overflow-y-auto">
                            {notifications.length > 0 ? (
                                notifications.map(notif => (
                                    <div 
                                        key={notif.id} 
                                        className={`p-3 border-b border-gray-700 text-sm hover:bg-brand-dark transition-colors ${!notif.read ? 'bg-gray-800' : ''}`}
                                        onClick={() => handleMarkRead(notif.id)}
                                    >
                                        <p className={`${!notif.read ? 'text-white font-semibold' : 'text-gray-400'}`}>{notif.message}</p>
                                        <p className="text-xs text-gray-500 mt-1">{new Date(notif.date).toLocaleDateString()}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-500 text-sm">Aucune notification</div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const DropdownNavLink: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();

    return (
        <div 
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <NavLink 
              to="/conventions"
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                  isActive ? 'bg-brand-red text-white' : 'text-gray-300 hover:bg-brand-gray hover:text-white'
                }`
              }
            >
                {t('nav.conventions')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </NavLink>
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-brand-gray rounded-md shadow-lg py-1 z-50">
                    <NavLink to="/conventions/grille-salariale" className={({isActive}) => `block px-4 py-2 text-sm ${isActive ? 'text-brand-red' : 'text-gray-300'} hover:bg-brand-dark`}>Grille Salariale</NavLink>
                    <NavLink to="/conventions/contrats-types" className={({isActive}) => `block px-4 py-2 text-sm ${isActive ? 'text-brand-red' : 'text-gray-300'} hover:bg-brand-dark`}>Contrats Types</NavLink>
                    <NavLink to="/conventions/charte-image" className={({isActive}) => `block px-4 py-2 text-sm ${isActive ? 'text-brand-red' : 'text-gray-300'} hover:bg-brand-dark`}>Charte de l'Image</NavLink>
                </div>
            )}
        </div>
    );
};

const MobileNavLink: React.FC<{ to: string; children: React.ReactNode; icon: React.ReactNode; onClick: () => void; badge?: string }> = ({ to, children, icon, onClick, badge }) => (
    <NavLink 
      to={to} 
      onClick={onClick}
      className={({ isActive }) => 
        `flex items-center justify-between px-4 py-3 text-lg font-medium transition-colors ${
          isActive ? 'bg-brand-red text-white' : 'text-gray-300 hover:bg-brand-gray hover:text-white'
        }`
      }
    >
      <div className="flex items-center">
          {icon}
          {children}
      </div>
      {badge && (
        <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            {badge}
        </span>
      )}
    </NavLink>
);

const MobileDropdownNavLink: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();
    
    const handleMainClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const handleSubLinkClick = () => {
        setIsOpen(false);
        onClick();
    };

    return (
        <div>
             <NavLink 
                to="/conventions"
                onClick={handleMainClick}
                className={({ isActive }) => 
                    `flex items-center justify-between w-full px-4 py-3 text-lg font-medium transition-colors ${
                    isActive ? 'bg-brand-red text-white' : 'text-gray-300 hover:bg-brand-gray hover:text-white'
                    }`
                }
            >
                <div className="flex items-center">
                    <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    {t('nav.conventions')}
                </div>
                <svg className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </NavLink>
            <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                >
                    <div className="pl-8 bg-black bg-opacity-20">
                         <MobileNavLink to="/conventions/grille-salariale" icon={<svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} onClick={handleSubLinkClick}>Grille Salariale</MobileNavLink>
                         <MobileNavLink to="/conventions/contrats-types" icon={<svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} onClick={handleSubLinkClick}>Contrats Types</MobileNavLink>
                         <MobileNavLink to="/conventions/charte-image" icon={<svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>} onClick={handleSubLinkClick}>Charte de l'Image</MobileNavLink>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isAdmin = currentUser?.role && currentUser.role !== 'Membre';

  const handleLogoutClick = async () => {
    await onLogout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };
  
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={`shadow-lg sticky top-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-brand-gray/80 backdrop-blur-sm' : 'bg-brand-gray'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LEFT: LOGO */}
          <div className="flex-1 flex justify-start">
            <NavLink to="/" className="flex-shrink-0" onClick={closeMobileMenu}>
               <Logo />
            </NavLink>
          </div>
          
          {/* CENTER: NAVIGATION (Desktop only) */}
          <div className="hidden md:flex justify-center">
            <nav className="flex items-baseline space-x-4">
              <NavLinkItem to="/">{t('nav.home')}</NavLinkItem>
              <NavLinkItem to="/technicians">{t('nav.directory')}</NavLinkItem>
              <DropdownNavLink />
              <NavLinkItem to="/events" badge="New">{t('nav.events')}</NavLinkItem>
              <NavLinkItem to="/live">{t('nav.live')}</NavLinkItem>
              <NavLinkItem to="/forum" badge="New">{t('nav.forum')}</NavLinkItem>
            </nav>
          </div>

          {/* RIGHT: ACTIONS (Desktop) & HAMBURGER (Mobile) */}
          <div className="flex-1 flex justify-end items-center space-x-3">
            
            <LanguageToggle />
            
            <NotificationBell currentUser={currentUser} />

            {/* Desktop actions */}
            <div className="hidden md:flex items-center">
              {currentUser ? (
                <div className="flex items-center space-x-4">
                    {isAdmin && <NavLinkItem to="/admin">{t('nav.admin')}</NavLinkItem>}
                    <NavLinkItem to="/dashboard">{t('nav.dashboard')}</NavLinkItem>
                    <button
                      onClick={handleLogoutClick}
                      className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
              ) : (
                  <div className="flex items-center space-x-2">
                      <NavLink to="/join" className="border border-brand-red text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-red transition-colors">
                          {t('nav.join')}
                      </NavLink>
                      <NavLink to="/login" className="bg-brand-red text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-80 transition-colors">
                          {t('nav.login')}
                      </NavLink>
                  </div>
              )}
            </div>
            
            {/* Mobile hamburger button */}
            <div className="md:hidden">
              <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-brand-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <span className="sr-only">Ouvrir le menu principal</span>
                  {isMobileMenuOpen ? (
                      <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  ) : (
                      <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                  )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
             <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden absolute w-full bg-brand-gray shadow-lg z-40 overflow-hidden" 
                id="mobile-menu"
              >
                <div className="pt-2 pb-3 space-y-1">
                    <MobileNavLink to="/" icon={<svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>} onClick={closeMobileMenu}>{t('nav.home')}</MobileNavLink>
                    <MobileNavLink to="/technicians" icon={<svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.274-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.274.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} onClick={closeMobileMenu}>{t('nav.directory')}</MobileNavLink>
                    <MobileDropdownNavLink onClick={closeMobileMenu} />
                    <MobileNavLink to="/events" badge="New" icon={<svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} onClick={closeMobileMenu}>{t('nav.events')}</MobileNavLink>
                    <MobileNavLink to="/forum" badge="New" icon={<svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>} onClick={closeMobileMenu}>{t('nav.forum')}</MobileNavLink>
                    <MobileNavLink to="/live" icon={<svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>} onClick={closeMobileMenu}>{t('nav.live')}</MobileNavLink>
                    
                    <div className="border-t border-gray-700 pt-4 mt-4 mx-2">
                        {currentUser ? (
                            <>
                                {isAdmin && <MobileNavLink to="/admin" icon={<svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>} onClick={closeMobileMenu}>{t('nav.admin')}</MobileNavLink>}
                                <MobileNavLink to="/dashboard" icon={<svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} onClick={closeMobileMenu}>{t('nav.dashboard')}</MobileNavLink>
                                <button
                                  onClick={handleLogoutClick}
                                  className="w-full flex items-center px-4 py-3 text-lg font-medium text-gray-300 hover:bg-brand-gray hover:text-white"
                                >
                                  <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                  {t('nav.logout')}
                                </button>
                            </>
                        ) : (
                            <div className="px-2 pt-2 space-y-2">
                                <NavLink to="/join" onClick={closeMobileMenu} className="w-full text-center block border border-brand-red text-white px-4 py-3 rounded-md text-lg font-medium hover:bg-brand-red transition-colors">
                                    {t('nav.join')}
                                </NavLink>
                                <NavLink to="/login" onClick={closeMobileMenu} className="w-full text-center block bg-brand-red text-white px-4 py-3 rounded-md text-lg font-medium hover:bg-opacity-80 transition-colors">
                                    {t('nav.login')}
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
