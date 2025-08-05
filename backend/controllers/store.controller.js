const db = require('../models');
const Store = db.Store;
const Rating = db.Rating;
const User = db.User;

// Get all stores with average rating and user's rating (if logged in)
exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [
        {
          model: Rating,
          attributes: ['rating', 'UserId'],
        }
      ]
    });

    const result = stores.map(store => {
      const ratings = store.Ratings;
      const total = ratings.reduce((sum, r) => sum + r.rating, 0);
      const avgRating = ratings.length ? total / ratings.length : 0;
      const userRating = ratings.find(r => r.UserId === req.user.id)?.rating || null;

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        averageRating: avgRating.toFixed(1),
        yourRating: userRating
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Submit or update rating for a store
exports.submitRating = async (req, res) => {
  const userId = req.user.id;
  const storeId = req.params.id;
  const { rating } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    // Check if rating already exists
    const existing = await Rating.findOne({ where: { UserId: userId, StoreId: storeId } });

    if (existing) {
      existing.rating = rating;
      await existing.save();
      return res.json({ message: 'Rating updated successfully' });
    } else {
      await Rating.create({ UserId: userId, StoreId: storeId, rating });
      return res.status(201).json({ message: 'Rating submitted successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
