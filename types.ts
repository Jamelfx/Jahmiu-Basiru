export interface Film {
  title: string;
  year: number;
  role: string;
}

export enum Availability {
  AVAILABLE = 'Disponible',
  UNAVAILABLE = 'Indisponible',
  SOON = 'Bientôt disponible',
}

export interface Technician {
  id: number;
  name: string;
  specialty: string;
  avatarUrl: string;
  availability: Availability;
  bio: string;
  filmography: Film[];
  email: string;
  phone: string;
  skills: string[];
}

export type NotificationPreference = 'email' | 'sms' | 'none';

export interface Member extends Technician {
  membershipPaid: boolean;
  nextMeeting: string;
  notificationPreference: NotificationPreference;
}

export interface NewsArticle {
  id: number;
  title: string;
  date: string; // ISO String
  summary: string;
  imageUrl: string;
}

export interface SalaryCategory {
  category: 'A' | 'B' | 'C';
  description: string;
  weeklyRate: number;
}

export interface JobSalary {
  id: number;
  jobTitle: string;
  categories: SalaryCategory[];
}
