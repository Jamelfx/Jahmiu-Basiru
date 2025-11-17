import React, { useState, useMemo } from 'react';
import { TECHNICIANS_DATA } from '../constants';
import { Technician, Availability } from '../types';

const AvailabilityIndicator: React.FC<{ availability: Availability; showText?: boolean }> = ({ availability, showText = false }) => {
  const baseClasses = "h-4 w-4 rounded-full inline-block";
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
  return (
    <div className="flex items-center">
      <span className={`${baseClasses} ${colorClass}`} title={availability}></span>
      {showText && <span className="ml-2 text-gray-300">{availability}</span>}
    </div>
  );
};


const TechnicianCard: React.FC<{ technician: Technician; onClick: () => void; }> = ({ technician, onClick }) => (
  <div 
    className="bg-brand-gray rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col"
    onClick={onClick}
  >
    <img className="w-full h-64 object-cover" src={technician.avatarUrl} alt={technician.name} />
    <div className="p-4 flex-grow flex flex-col">
      <h3 className="text-xl font-bold text-white">{technician.name}</h3>
      <p className="text-brand-red flex-grow">{technician.specialty}</p>
      <div className="mt-4 flex justify-end">
        <AvailabilityIndicator availability={technician.availability} />
      </div>
    </div>
  </div>
);

const ProfileModal: React.FC<{ technician: Technician | null; onClose: () => void }> = ({ technician, onClose }) => {
    if (!technician) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-brand-gray rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start">
                        <h2 className="text-3xl font-bold text-brand-red">{technician.name}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                    </div>
                    <p className="text-lg text-gray-300 mb-4">{technician.specialty}</p>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-shrink-0">
                            <img src={technician.avatarUrl} alt={technician.name} className="w-40 h-40 rounded-full object-cover border-4 border-brand-red"/>
                             <div className="mt-4">
                                <AvailabilityIndicator availability={technician.availability} showText={true} />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-xl mb-2">Biographie</h4>
                            <p className="text-gray-400 mb-4">{technician.bio}</p>

                            <h4 className="font-bold text-xl mb-2">Compétences</h4>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {technician.skills && technician.skills.length > 0 ? (
                                    technician.skills.map((skill, index) => (
                                        <span key={index} className="bg-brand-dark text-brand-red text-sm font-medium px-3 py-1 rounded-full">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">Aucune compétence renseignée.</p>
                                )}
                            </div>

                             <h4 className="font-bold text-xl mb-2">Contact</h4>
                            <p className="text-gray-400">Email: <a href={`mailto:${technician.email}`} className="text-brand-red hover:underline">{technician.email}</a></p>
                            <p className="text-gray-400">Téléphone: {technician.phone}</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h4 className="font-bold text-xl mb-4">Filmographie</h4>
                        <ul className="space-y-2">
                            {technician.filmography.map((film, index) => (
                                <li key={index} className="bg-brand-dark p-3 rounded-md flex justify-between">
                                    <div>
                                        <span className="font-semibold">{film.title}</span>
                                        <span className="text-gray-400"> ({film.year})</span>
                                    </div>
                                    <span className="text-gray-500">{film.role}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};


const TechniciansPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);

  const specialties = useMemo(() => ['all', ...Array.from(new Set(TECHNICIANS_DATA.map(t => t.specialty)))], []);
  
  const filteredTechnicians = useMemo(() => {
    return TECHNICIANS_DATA.filter(tech => {
      const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'all' || tech.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [searchTerm, selectedSpecialty]);

  return (
    <div>
      <div className="bg-brand-gray p-6 rounded-lg mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Annuaire des Techniciens</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Rechercher par nom..."
            className="w-full md:w-1/2 p-3 bg-brand-dark border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full md:w-1/2 p-3 bg-brand-dark border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            {specialties.map(spec => (
                <option key={spec} value={spec}>{spec === 'all' ? 'Toutes les spécialités' : spec}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredTechnicians.map(tech => (
          <TechnicianCard key={tech.id} technician={tech} onClick={() => setSelectedTechnician(tech)} />
        ))}
      </div>

      {filteredTechnicians.length === 0 && (
        <div className="text-center py-16 text-gray-500">
            <p className="text-2xl">Aucun technicien trouvé.</p>
            <p>Essayez d'ajuster vos critères de recherche.</p>
        </div>
      )}

      <ProfileModal technician={selectedTechnician} onClose={() => setSelectedTechnician(null)} />
    </div>
  );
};

export default TechniciansPage;