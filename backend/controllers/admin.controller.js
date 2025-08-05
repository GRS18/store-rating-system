const db = require('../models');
const bcrypt = require('bcryptjs');
const User = db.User;
const Store = db.Store;
const Rating = db.Rating;

// Middleware check
function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
}

exports.isAdmin = isAdmin;

// Dashboard counts
exports.getDashboardStats = async (req, res) => {
  const [users, stores, ratings] = await Promise.all([
    User.count(),
    Store.count(),
    Rating.count()
  ]);
  res.json({ totalUsers: users, totalStores: stores, totalRatings: ratings });
};

exports.getUsers = async (req, res) => {
  const { name, email, role, address } = req.query;
  const where = {};

  if (name) where.name = name;
  if (email) where.email = email;
  if (role) where.role = role;
  if (address) where.address = address;

  const users = await User.findAll({ where });
  res.json(users);
};

// List stores with rating info
exports.getStores = async (req, res) => {
  const stores = await Store.findAll({
    include: [{ model: Rating }]
  });

  const result = stores.map(store => {
    const ratings = store.Ratings;
    const avg = ratings.length
      ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
      : 0;

    return {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      rating: avg
    };
  });

  res.json(result);
};

// Add a user (admin/normal)
exports.addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, address, role });
  res.status(201).json({ message: 'User added successfully', user });
};

// Add a store
exports.addStore = async (req, res) => {
  const { name, email, address } = req.body;
  if (!name || !email || !address) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const store = await Store.create({ name, email, address });
  res.status(201).json({ message: 'Store added successfully', store });
};
