const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'XDevFlow CRM API is running...' });
});

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

module.exports = app;