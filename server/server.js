require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const documentRoutes = require('./routes/documentRoutes');
const queryRoutes = require('./routes/queryRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Database ────────────────────────────────────────────────
connectDB();
 const { seedDemoUsers } = require('./seed/seedDemoUsers');
   if (process.env.ENABLE_DEMO_LOGIN === 'true') seedDemoUsers().catch(console.error);

// ── Routes ──────────────────────────────────────────────────
app.use('/api/documents', documentRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'FactoryIQ API', timestamp: new Date() });
});

// ── Error handler (must be last) ───────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🧠 FactoryIQ server running on port ${PORT}`);
});
