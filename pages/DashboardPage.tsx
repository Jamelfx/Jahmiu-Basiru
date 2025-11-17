import React, { useState } from 'react';
import { Member, NotificationPreference } from '../types';
import PaymentModal from '../components/PaymentModal';

interface DashboardPageProps {
  member: Member;
  onMemberUpdate: (member: Member) => void;
}

const DashboardCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-brand-gray p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-brand-red border-b-2 border-brand-red pb-2 mb-4">{title}</h2>
        {children}
    </div>
);

const PerformanceChart: React.FC<{ data: { year: string; projects: number }[] }> = ({ data }) => {
    const chartHeight = 200;
    const barWidth = 50;
    const barMargin = 25;
    const chartWidth = data.length * (barWidth + barMargin);
    const maxProjects = Math.max(...data.map(d => d.projects), 0) + 2;

    return (
        <div className="w-full overflow-x-auto p-2">
            <svg viewBox={`0 -20 ${chartWidth} ${chartHeight + 60}`} className="min-w-[400px]">
                {/* Y-axis lines */}
                {[...Array(5)].map((_, i) => {
                    const value = Math.round((maxProjects / 4) * i);
                    if (value === 0) return null;
                    const y = chartHeight - (value / maxProjects) * chartHeight;
                    return (
                        <g key={`y-axis-${i}`} className="text-gray-600">
                            <line x1="0" y1={y} x2={chartWidth} y2={y} stroke="currentColor" strokeDasharray="2" />
                            <text x="-10" y={y + 4} textAnchor="end" fill="currentColor" className="text-xs">{value}</text>
                        </g>
                    );
                })}

                {/* Bars and Labels */}
                {data.map((item, index) => {
                    const barHeight = item.projects > 0 ? (item.projects / maxProjects) * chartHeight : 0;
                    const x = index * (barWidth + barMargin);
                    const y = chartHeight - barHeight;

                    return (
                        <g key={item.year} className="group">
                            <rect
                                x={x}
                                y={y}
                                width={barWidth}
                                height={barHeight}
                                rx="4"
                                className="fill-brand-red transition-all duration-300 group-hover:fill-opacity-80"
                            />
                            <text
                                x={x + barWidth / 2}
                                y={y - 8}
                                textAnchor="middle"
                                className="fill-white font-bold text-sm transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                            >
                                {item.projects}
                            </text>
                             <text
                                x={x + barWidth / 2}
                                y={chartHeight + 20}
                                textAnchor="middle"
                                className="fill-gray-400 text-sm font-semibold"
                            >
                                {item.year}
                            </text>
                        </g>
                    );
                })}
                
                <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} className="stroke-gray-700" />
            </svg>
        </div>
    );
};


const DashboardPage: React.FC<DashboardPageProps> = ({ member, onMemberUpdate }) => {
    const [newSkill, setNewSkill] = useState('');
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    
    const handlePaymentSuccess = () => {
        onMemberUpdate({ ...member, membershipPaid: true });
        setPaymentModalOpen(false);
        if (member.notificationPreference !== 'none') {
            const channel = member.notificationPreference === 'email' ? 'par Email' : 'par SMS';
            alert(`Paiement réussi ! Une confirmation a été envoyée ${channel}.`);
        } else {
             alert(`Paiement réussi !`);
        }
    };
    
    const handleNotificationChange = (pref: NotificationPreference) => {
        onMemberUpdate({ ...member, notificationPreference: pref });
    };

    const handleAddSkill = () => {
        if (newSkill.trim() && !member.skills.includes(newSkill.trim())) {
            const updatedSkills = [...member.skills, newSkill.trim()];
            onMemberUpdate({ ...member, skills: updatedSkills });
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        const updatedSkills = member.skills.filter(skill => skill !== skillToRemove);
        onMemberUpdate({ ...member, skills: updatedSkills });
    };
    
    // Generate mock performance data
    const currentYear = new Date().getFullYear();
    const performanceData = Array.from({ length: 5 }, (_, i) => {
        const year = currentYear - (4 - i);
        // Simple mock data generation based on member ID and year
        const projects = (member.id % 4) + Math.floor(Math.sin(year + member.id) * 3 + 4);
        return { year: year.toString(), projects: Math.max(1, projects) };
    });

    return (
        <>
            <div className="space-y-8">
                <h1 className="text-4xl font-bold">Tableau de bord de <span className="text-brand-red">{member.name}</span></h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Column 1 */}
                    <div className="lg:col-span-1 space-y-8">
                        <DashboardCard title="Mon Profil">
                            <div className="flex flex-col items-center text-center">
                                <img src={member.avatarUrl} alt={member.name} className="w-32 h-32 rounded-full object-cover border-4 border-brand-red mb-4"/>
                                <p className="text-lg font-semibold">{member.specialty}</p>
                                <p className="text-gray-400 mt-2">{member.email}</p>
                                <p className="text-gray-400">{member.phone}</p>
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Mes Compétences">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {member.skills.map((skill, index) => (
                                    <div key={index} className="bg-brand-dark text-brand-red text-sm font-medium pl-3 pr-2 py-1 rounded-full flex items-center gap-2">
                                        <span>{skill}</span>
                                        <button onClick={() => handleRemoveSkill(skill)} className="text-red-500 hover:text-red-400 font-bold leading-none text-lg">&times;</button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input 
                                    type="text"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                                    placeholder="Ajouter une compétence"
                                    className="flex-grow bg-brand-dark border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand-red"
                                />
                                <button
                                    onClick={handleAddSkill}
                                    className="bg-brand-red text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </DashboardCard>
                    </div>


                    {/* Column 2 */}
                    <div className="space-y-8 lg:col-span-2">
                        <DashboardCard title="Cotisation Annuelle">
                            {member.membershipPaid ? (
                                <div className="flex items-center space-x-3">
                                    <span className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white">&#10003;</span>
                                    <div>
                                        <p className="font-semibold text-lg text-green-400">Payée</p>
                                        <p className="text-gray-400">Votre cotisation pour cette année est à jour. Merci !</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                    <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                                        <span className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold">!</span>
                                        <div>
                                            <p className="font-semibold text-lg text-red-400">Impayée</p>
                                            <p className="text-gray-400">Veuillez régler votre cotisation pour rester membre actif.</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setPaymentModalOpen(true)}
                                        className="bg-brand-red text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors w-full sm:w-auto">
                                        Payer maintenant
                                    </button>
                                </div>
                            )}
                        </DashboardCard>

                        <DashboardCard title="Préférences de Notification">
                             <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                                <p className="text-gray-300">Confirmer les paiements par :</p>
                                <div className="flex space-x-4">
                                    <label className="flex items-center cursor-pointer">
                                        <input type="radio" name="notification" value="email" checked={member.notificationPreference === 'email'} onChange={() => handleNotificationChange('email')} className="hidden" />
                                        <span className={`px-4 py-2 rounded-md text-sm font-medium border-2 ${member.notificationPreference === 'email' ? 'bg-brand-red border-brand-red' : 'border-gray-600 hover:bg-brand-gray'}`}>Email</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input type="radio" name="notification" value="sms" checked={member.notificationPreference === 'sms'} onChange={() => handleNotificationChange('sms')} className="hidden" />
                                        <span className={`px-4 py-2 rounded-md text-sm font-medium border-2 ${member.notificationPreference === 'sms' ? 'bg-brand-red border-brand-red' : 'border-gray-600 hover:bg-brand-gray'}`}>SMS</span>
                                    </label>
                                     <label className="flex items-center cursor-pointer">
                                        <input type="radio" name="notification" value="none" checked={member.notificationPreference === 'none'} onChange={() => handleNotificationChange('none')} className="hidden" />
                                        <span className={`px-4 py-2 rounded-md text-sm font-medium border-2 ${member.notificationPreference === 'none' ? 'bg-brand-red border-brand-red' : 'border-gray-600 hover:bg-brand-gray'}`}>Aucune</span>
                                    </label>
                                </div>
                            </div>
                        </DashboardCard>
                        
                        <DashboardCard title="Prochaines Réunions">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                    <div className="mb-4 sm:mb-0">
                                        <p className="font-semibold text-lg">Réunion générale mensuelle</p>
                                        <p className="text-gray-400">Date : {new Date(member.nextMeeting).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} à {new Date(member.nextMeeting).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                    <a 
                                        href="#" 
                                        onClick={(e) => { e.preventDefault(); alert("Le lien de la réunion sera disponible 15 minutes avant le début."); }}
                                        className="bg-brand-red text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors text-center w-full sm:w-auto">
                                        Rejoindre la réunion
                                    </a>
                                </div>
                        </DashboardCard>
                    </div>
                </div>

                <DashboardCard title="Statistiques de Projets (par an)">
                    <PerformanceChart data={performanceData} />
                </DashboardCard>
                
                <DashboardCard title="Annonces de l'Association">
                    <ul className="space-y-3 list-disc list-inside text-gray-300">
                        <li>Nouvel atelier sur l'étalonnage avec DaVinci Resolve prévu le mois prochain. Inscriptions bientôt ouvertes !</li>
                        <li>Appel à projets pour le festival du court-métrage de Bouaké. Soumettez vos films avant le 30 septembre.</li>
                        <li>N'oubliez pas de mettre à jour votre filmographie dans votre profil pour une meilleure visibilité.</li>
                    </ul>
                </DashboardCard>
            </div>
            {isPaymentModalOpen && <PaymentModal onClose={() => setPaymentModalOpen(false)} onConfirm={handlePaymentSuccess} />}
        </>
    );
};

export default DashboardPage;
