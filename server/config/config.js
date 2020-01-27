// PUERTO
process.env.PORT = process.env.PORT || 3000;

// Vencimiento token
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// seed
process.env.SEED = process.env.SEED || 'seed-secret-desarrollo';