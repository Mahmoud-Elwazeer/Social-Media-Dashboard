require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const morgan = require('morgan');
const dbConnection = require('./config/database')
const handleRoutes = require('./routes/index');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// Express App
const app = express();

// connect with database
dbConnection();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`)
}

// Mount Routes
handleRoutes(app);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

// Handle Rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`unhandledRejection Errors ${err.name}: ${err.message}`);
  server.close(() => {
    console.error('Shutting down.......')
    process.exit(1);
  })
})

module.exports = app;
