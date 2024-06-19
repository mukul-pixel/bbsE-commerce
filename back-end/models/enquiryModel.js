const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true, unique: true }, // Unique email constraint
  mobile: { type: Number, required: true },
  message: {
    type: String
  }
});

// Create Subscriber model based on schema
const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;