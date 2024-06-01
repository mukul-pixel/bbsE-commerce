const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true
    },
    productId: {
        type: String,
        required: true
      },
    productName: {
        type: String,
        required: true
      },
    selectedStars: {
        type: Number,
        required: true
      },
    reviewHeading: {
        type: String,
        required: true
      },
    reviewMessage: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
    },
    });
    
const Review = mongoose.model('Review', reviewSchema);
    
module.exports = Review;