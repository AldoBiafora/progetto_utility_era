require('dotenv').config();
const { execSync } = require('child_process');

// Esegui il comando di build con le variabili d'ambiente
execSync('ng build', { stdio: 'inherit' }); 