// @ts-nocheck
import express from 'express';
import apiRoutes from './routes';

// Création de l'application Express
const app = express();
const PORT = process.env.PORT || 3001; // Le port sur lequel notre serveur écoutera

// =================================================
// MIDDLEWARES
// Ce sont des fonctions qui s'exécutent sur chaque requête avant qu'elle n'atteigne nos routes.
// =================================================

// 1. CORS (Cross-Origin Resource Sharing)
// Essentiel pour permettre à notre site web (qui tourne sur un port différent) de communiquer avec notre API.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permet à n'importe quel site de faire des requêtes
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow all methods
  next();
});

// 2. JSON Parser
// Permet à notre serveur de comprendre les données envoyées au format JSON dans le corps des requêtes (pour les POST, PUT, etc.)
app.use(express.json());

// =================================================
// MONTAGE DES ROUTES DE L'API
// =================================================
// On dit à notre application d'utiliser les routes définies dans `routes.ts`
// pour toute requête qui commence par "/api".
// Ex: une requête vers http://localhost:3001/api/technicians sera gérée par notre routeur.
app.use('/api', apiRoutes);


// =================================================
// DÉMARRAGE DU SERVEUR
// =================================================
app.listen(PORT, () => {
  console.log(`🚀 Serveur RETECHCI démarré sur http://localhost:${PORT}`);
  console.log(`✅ L'API est accessible sur http://localhost:${PORT}/api`);
});