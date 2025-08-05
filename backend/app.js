const express = require('express');
const authRoutes = require('./routes/auth.routes');
const authenticateToken = require('./middlewares/auth.middleware');
const storeRoutes = require('./routes/store.routes');
const ownerRoutes = require('./routes/owner.routes');
const adminRoutes = require('./routes/admin.routes');
const cors = require('cors');
const db = require('./models');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}, your role is ${req.user.role}` });
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
