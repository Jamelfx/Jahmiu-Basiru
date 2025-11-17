import { Member, Availability, NewsArticle, JobSalary } from './types';

export const TECHNICIANS_DATA: Member[] = [
  {
    id: 1,
    name: 'Aya Koné',
    specialty: 'Directrice de la photographie',
    avatarUrl: 'https://picsum.photos/seed/aya/400/400',
    availability: Availability.AVAILABLE,
    bio: 'Avec plus de 10 ans d\'expérience, Aya a travaillé sur des films primés et des publicités internationales. Sa maîtrise de la lumière et du cadre apporte une dimension unique à chaque projet.',
    filmography: [
      { title: 'Lumière d\'Abidjan', year: 2022, role: 'Chef opératrice' },
      { title: 'Le Pacte', year: 2020, role: 'Cadreuse' },
      { title: 'Ivoire Commercial', year: 2019, role: 'Directrice de la photographie' },
    ],
    email: 'aya.kone@retechci.ci',
    phone: '+225 01 02 03 04 05',
    skills: ['Étalonnage', 'Caméra RED', 'Lumière naturelle', 'Drone'],
    membershipPaid: true,
    nextMeeting: '2024-08-15T18:00:00Z',
    notificationPreference: 'email',
  },
  {
    id: 2,
    name: 'Moussa Traoré',
    specialty: 'Ingénieur du son',
    avatarUrl: 'https://picsum.photos/seed/moussa/400/400',
    availability: Availability.UNAVAILABLE,
    bio: 'Spécialiste de la prise de son en extérieur et en studio, Moussa est reconnu pour sa capacité à capturer des ambiances sonores riches et immersives.',
    filmography: [
      { title: 'Échos de la lagune', year: 2023, role: 'Chef preneur de son' },
      { title: 'Sous le soleil de Jacqueville', year: 2021, role: 'Perchman' },
    ],
    email: 'moussa.traore@retechci.ci',
    phone: '+225 02 03 04 05 06',
    skills: ['Mixage 5.1', 'Prise de son documentaire', 'Pro Tools', 'Sound design'],
    membershipPaid: false,
    nextMeeting: '2024-08-15T18:00:00Z',
    notificationPreference: 'sms',
  },
  {
    id: 3,
    name: 'Fatou Diop',
    specialty: 'Monteuse',
    avatarUrl: 'https://picsum.photos/seed/fatou/400/400',
    availability: Availability.SOON,
    bio: 'Fatou sculpte les récits avec précision et créativité. Son sens du rythme et de la narration transforme les rushes bruts en œuvres cinématographiques captivantes.',
    filmography: [
      { title: 'Le Collier de la Reine', year: 2022, role: 'Cheffe monteuse' },
      { title: 'L\'Héritage', year: 2020, role: 'Assistante monteuse' },
    ],
    email: 'fatou.diop@retechci.ci',
    phone: '+225 03 04 05 06 07',
    skills: ['Montage narratif', 'Adobe Premiere Pro', 'Final Cut Pro', 'After Effects'],
    membershipPaid: true,
    nextMeeting: '2024-08-15T18:00:00Z',
    notificationPreference: 'none',
  },
  {
    id: 4,
    name: 'Jean-Paul Kouamé',
    specialty: 'Électricien de plateau',
    avatarUrl: 'https://picsum.photos/seed/jp/400/400',
    availability: Availability.AVAILABLE,
    bio: 'Expert en éclairage, Jean-Paul sait créer des atmosphères, des plus intimes aux plus spectaculaires. Sécurité et efficacité sont ses maîtres mots.',
    filmography: [
      { title: 'Nuit Abidjanaise', year: 2023, role: 'Chef électricien' },
      { title: 'La Course', year: 2021, role: 'Électricien' },
    ],
    email: 'jp.kouame@retechci.ci',
    phone: '+225 04 05 06 07 08',
    skills: ['Groupe électrogène', 'Habilitation électrique', 'Console lumière', 'Sécurité plateau'],
    membershipPaid: true,
    nextMeeting: '2024-08-15T18:00:00Z',
    notificationPreference: 'email',
  },
    {
    id: 5,
    name: 'Bintou Cissé',
    specialty: 'Scripte',
    avatarUrl: 'https://picsum.photos/seed/bintou/400/400',
    availability: Availability.UNAVAILABLE,
    bio: "Gardienne de la continuité et de la cohérence du film, Bintou est l'œil de lynx du plateau. Son travail méticuleux est essentiel au bon déroulement du tournage et à la fluidité du montage.",
    filmography: [
      { title: 'Le Secret du Vaudou', year: 2023, role: 'Scripte' },
      { title: 'Retour à Grand-Bassam', year: 2021, role: 'Scripte' },
    ],
    email: 'bintou.cisse@retechci.ci',
    phone: '+225 05 06 07 08 09',
    skills: ['Rapports de production', 'Continuité dialoguée', 'Découpage technique', 'Movie Data'],
    membershipPaid: false,
    nextMeeting: '2024-08-15T18:00:00Z',
    notificationPreference: 'email',
  },
  {
    id: 6,
    name: 'Adama Sanogo',
    specialty: 'Machiniste',
    avatarUrl: 'https://picsum.photos/seed/adama/400/400',
    availability: Availability.AVAILABLE,
    bio: "Responsable de l'installation des caméras et des mouvements complexes (travellings, grues), Adama allie force physique et précision technique pour donner vie à la vision du réalisateur.",
    filmography: [
      { title: 'Lumière d\'Abidjan', year: 2022, role: 'Chef machiniste' },
      { title: 'Le Pacte', year: 2020, role: 'Machiniste' },
    ],
    email: 'adama.sanogo@retechci.ci',
    phone: '+225 06 07 08 09 10',
    skills: ['Grue', 'Travelling', 'Steadicam', 'Machinerie lourde'],
    membershipPaid: true,
    nextMeeting: '2024-08-15T18:00:00Z',
    notificationPreference: 'sms',
  }
];


export const NEWS_DATA: NewsArticle[] = [
  {
    id: 1,
    title: "Masterclass Exceptionnelle avec le réalisateur Philippe Lacôte",
    date: "2024-07-20T10:00:00Z",
    summary: "Le RETECHCI a eu l'honneur d'organiser une masterclass exclusive avec le célèbre réalisateur ivoirien Philippe Lacôte. Les membres ont pu échanger sur sa vision du cinéma et ses techniques de narration.",
    imageUrl: "https://picsum.photos/seed/news1/800/600",
  },
  {
    id: 2,
    title: "Partenariat Stratégique avec le Festival 'Clap Ivoire'",
    date: "2024-07-15T15:30:00Z",
    summary: "Un accord historique a été signé entre le RETECHCI et le festival Clap Ivoire. Nos membres bénéficieront d'accréditations exclusives et de la mise en avant de leur travail lors du prochain événement.",
    imageUrl: "https://picsum.photos/seed/news2/800/600",
  },
  {
    id: 3,
    title: "Lancement de l'Atelier 'Sécurité sur les Plateaux'",
    date: "2024-07-05T09:00:00Z",
    summary: "Face à une demande croissante, le RETECHCI lance un nouvel atelier de formation dédié aux bonnes pratiques de sécurité sur les lieux de tournage. Inscriptions ouvertes jusqu'au 25 juillet.",
    imageUrl: "https://picsum.photos/seed/news3/800/600",
  },
    {
    id: 4,
    title: "Compte-rendu de l'Assemblée Générale Annuelle",
    date: "2024-06-28T18:00:00Z",
    summary: "L'Assemblée Générale du RETECHCI s'est tenue le 28 juin. Au programme : bilan de l'année, élection du nouveau bureau et discussion des orientations futures. Le procès-verbal est disponible dans l'espace membre.",
    imageUrl: "https://picsum.photos/seed/news4/800/600",
  }
];

export const SALARY_DATA: JobSalary[] = [
    // Production & Réalisation
    { id: 1, jobTitle: 'Directeur de production', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 400000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 600000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 850000 } ] },
    { id: 2, jobTitle: '1er assistant réalisateur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 275000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 375000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 500000 } ] },
    { id: 3, jobTitle: '2ème assistant réalisateur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 175000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 250000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 325000 } ] },
    { id: 4, jobTitle: 'Scripte', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 225000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 300000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 400000 } ] },
    { id: 5, jobTitle: 'Assistant(e) scripte', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 150000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 200000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 275000 } ] },
    
    // Image
    { id: 6, jobTitle: 'Directeur photo / Chef OPV', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 350000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 500000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 750000 } ] },
    { id: 7, jobTitle: 'Cadreur / OPV', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 250000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 350000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 450000 } ] },
    { id: 8, jobTitle: '1er assistant OPV / pointeur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 200000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 275000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 350000 } ] },
    { id: 9, jobTitle: '2ème assistant OPV', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 150000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 200000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 250000 } ] },
    { id: 10, jobTitle: 'Photographe de plateau', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 175000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 250000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 350000 } ] },

    // Son
    { id: 11, jobTitle: 'Chef OPS / Ingénieur du son', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 300000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 450000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 600000 } ] },
    { id: 12, jobTitle: 'Perchman / Assistant son', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 150000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 225000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 300000 } ] },
    
    // Montage & Post-production
    { id: 13, jobTitle: 'Directeur de post-production', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 325000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 475000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 650000 } ] },
    { id: 14, jobTitle: 'Chef monteur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 300000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 450000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 650000 } ] },
    { id: 15, jobTitle: 'Assistant monteur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 175000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 250000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 325000 } ] },
    { id: 16, jobTitle: 'Étalonneur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 250000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 375000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 550000 } ] },
    { id: 17, jobTitle: 'Mixeur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 275000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 400000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 575000 } ] },
    { id: 18, jobTitle: 'Bruiteur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 180000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 260000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 350000 } ] },
    { id: 19, jobTitle: 'Infographiste / Truquiste', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 200000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 300000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 450000 } ] },

    // Décoration
    { id: 20, jobTitle: 'Directeur artistique', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 325000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 475000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 700000 } ] },
    { id: 21, jobTitle: 'Chef décorateur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 300000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 450000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 650000 } ] },
    { id: 22, jobTitle: 'Ensemblier - décorateur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 200000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 280000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 380000 } ] },
    { id: 23, jobTitle: '1er assistant décorateur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 175000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 240000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 310000 } ] },
    { id: 24, jobTitle: 'Accessoiriste', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 150000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 210000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 280000 } ] },
    { id: 25, jobTitle: 'Chef constructeur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 225000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 300000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 400000 } ] },
    { id: 26, jobTitle: 'Constructeur de décor', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 140000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 190000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 250000 } ] },

    // HMC (Habillage, Maquillage, Coiffure)
    { id: 27, jobTitle: 'Créateur de costume', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 250000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 350000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 500000 } ] },
    { id: 28, jobTitle: 'Chef costumier', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 200000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 280000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 380000 } ] },
    { id: 29, jobTitle: 'Habilleur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 125000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 175000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 225000 } ] },
    { id: 30, jobTitle: 'Chef maquilleur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 200000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 280000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 380000 } ] },
    { id: 31, jobTitle: 'Maquilleur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 140000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 200000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 270000 } ] },
    { id: 32, jobTitle: 'Coiffeur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 140000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 200000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 270000 } ] },

    // Régie
    { id: 33, jobTitle: 'Régisseur général', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 280000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 380000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 500000 } ] },
    { id: 34, jobTitle: 'Régisseur adjoint', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 160000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 220000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 290000 } ] },
    { id: 35, jobTitle: 'Chauffeur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 100000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 130000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 160000 } ] },
    
    // Machinerie & Électricité
    { id: 36, jobTitle: 'Chef électricien', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 250000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 350000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 450000 } ] },
    { id: 37, jobTitle: 'Électricien / Éclairagiste', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 160000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 220000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 280000 } ] },
    { id: 38, jobTitle: 'Chef machiniste', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 250000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 350000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 450000 } ] },
    { id: 39, jobTitle: 'Machiniste', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 160000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 220000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 280000 } ] },
    { id: 40, jobTitle: 'Aide de plateau / Rippeur', categories: [ { category: 'A', description: 'Moins de 3 ans', weeklyRate: 90000 }, { category: 'B', description: '3 à 7 ans', weeklyRate: 120000 }, { category: 'C', description: 'Plus de 7 ans', weeklyRate: 150000 } ] },
];