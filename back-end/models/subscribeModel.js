const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true } // Unique email constraint
});

// Create Subscriber model based on schema
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;
