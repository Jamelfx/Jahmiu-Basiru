
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
    onLogin: (email: string) => boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Password is for UI demo purposes only
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (onLogin(email)) {
             navigate('/dashboard');
        } else {
            setError('Email ou mot de passe incorrect. Veuillez utiliser un email de membre existant.');
        }
    };
  
    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-brand-gray p-8 rounded-lg shadow-xl">
                <h1 className="text-2xl font-bold text-center mb-6">Espace Membre - Connexion</h1>
                
                {error && (
                    <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-sm">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="aya.kone@retechci.ci"
                            className="mt-1 block w-full bg-brand-dark border-gray-600 rounded-md shadow-sm p-3 focus:ring-brand-red focus:border-brand-red" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Mot de passe</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full bg-brand-dark border-gray-600 rounded-md shadow-sm p-3 focus:ring-brand-red focus:border-brand-red" />
                    </div>
                    <div>
                        <button type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-brand-red hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red transition-colors">
                            Se connecter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;