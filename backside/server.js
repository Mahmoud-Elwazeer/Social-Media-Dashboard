require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const morgan = require('morgan');
const dbConnection = require('./config/database')
const handleRoutes = require('./routes/index');

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

module.exports = app;
