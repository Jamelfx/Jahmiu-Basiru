// src/config.ts
// En production, l'API est sur le même domaine, donc on laisse vide ou '/'.
// En développement local, vite proxy souvent les requêtes, mais ici nous utilisons une config unifiée.

const isProduction = (import.meta as any).env.PROD;

export const API_URL: string = isProduction ? '' : 'http://localhost:3001';