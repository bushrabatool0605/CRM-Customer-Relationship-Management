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

// OPTIONS route hata dein, Express 5 ye handle kar leta hai
// app.options('(.*)', cors()); <--- YEH LINE PURI HATA DEIN

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'XDevFlow CRM API is running...' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

module.exports = app;