const db = require('../models');
const Store = db.Store;
const Rating = db.Rating;
const User = db.User;

exports.getDashboard = async (req, res) => {
  if (req.user.role !== 'store_owner') {
    return res.status(403).json({ message: 'Access denied: Not a store owner' });
  }

  try {
    
    const store = await Store.findOne({ where: { email: req.user.email } });
    if (!store) {
      return res.status(404).json({ message: 'Store not found for this owner' });
    }

  
    const ratings = await Rating.findAll({
      where: { StoreId: store.id },
      include: [
        { model: User, attributes: ['name', 'email'] }
      ]
    });

    const average = ratings.length
      ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
      : 0;

    const users = ratings.map(r => ({
      userName: r.User.name,
      userEmail: r.User.email,
      rating: r.rating
    }));

    res.json({
      storeName: store.name,
      averageRating: average,
      totalRatings: ratings.length,
      ratingsByUsers: users
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};