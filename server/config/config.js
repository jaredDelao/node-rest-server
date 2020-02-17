// PUERTO
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos
let urlDB;

if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://jaredhm07:F49eZzpnf1oVXhy5@cluster0-huz5h.mongodb.net/cafe'
}

process.env.URLDB = urlDB;

// Vencimiento token
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// seed
process.env.SEED = process.env.SEED || 'seed-secret-desarrollo';