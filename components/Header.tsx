


import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Member } from '../types';

interface HeaderProps {
  currentUser: Member | null;
  onLogout: () => void;
}

const NavLinkItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive ? 'bg-brand-red text-white' : 'text-gray-300 hover:bg-brand-gray hover:text-white'
        }`
      }
    >
      {children}
    </NavLink>
);

const DropdownNavLink: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                Conventions
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


const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const logoUri = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTUwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTcyLjE2IDguODNMMTQyLjIyIDMyLjEyVjEyMy4xTDcyLjE2IDE0Ni4zOUwwIDEwMi4xNFY1My4wOEw3Mi4xNiA4LjgzWk02MS4xMyA1Ni4zM1Y5OC44OUwyMi4yMSA3Ny42MUw2MS4xMyA1Ni4zM1oiLz48cGF0aCBkPSJNMTEzLjM4IDM1LjM3TDIyNi43OSA3VjMyLjEyTDE1My4zOCA1OS42MVYzNS4zN1oiLz48cGF0aCBkPSJNMTEzLjM4IDExOS44NUwyMjYuNzkgMTQ4LjIyVjEyMy4xTDE1My4zOCA5NS42MVYxMTkuODVaIi8+PC9nPjx0ZXh0IHg9IjIzNSIgeT0iNzAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjUwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiPlJlVGVjaENpPC90ZXh0Pjx0ZXh0IHg9IjIzNSIgeT0iOTgiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSI+UsOpzGVhdSBkZXMgVGVjaG5pY2llbnM8L3RleHQ+PHRleHQgeD0iMjM1IiB5PSIxMjAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSI+ZHUgQ2luc2ltYSBlbiBDw7R0ZSBkJ0l2b2lyZTwvdGV4dD48L3N2Zz4=";


  return (
    <header className="bg-brand-gray shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0">
               <img className="h-12 w-auto" src={logoUri} alt="Logo RETECHCI" />
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLinkItem to="/">Accueil</NavLinkItem>
              <NavLinkItem to="/technicians">Annuaire</NavLinkItem>
              <DropdownNavLink />
              <NavLinkItem to="/about">À Propos</NavLinkItem>
              <NavLinkItem to="/news">Actualités</NavLinkItem>
              <NavLinkItem to="/contact">Contact</NavLinkItem>
            </div>
          </div>
          <div className="flex items-center">
             {currentUser ? (
               <div className="relative ml-3 flex items-center space-x-4">
                  <NavLinkItem to="/dashboard">Tableau de bord</NavLinkItem>
                  <button
                    onClick={handleLogoutClick}
                    className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Déconnexion
                  </button>
                </div>
             ) : (
                <NavLink to="/login" className="bg-brand-red text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-80 transition-colors">
                  Espace Membre
                </NavLink>
             )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;