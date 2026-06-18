const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Yahan '*' ko hata kar '(.*)' kar dein
app.options('(.*)', cors()); 

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'XDevFlow CRM API is running...' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));

// Database connection ko middleware mein call karna behtar hai
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

module.exports = app;