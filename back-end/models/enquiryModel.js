const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    mail: { type: String, required: true},
    mobile: { type: Number, required: true },
    message: {
    type: String
    },
  status: {
    type: String,
    enum: ["new", "resolved", "in-process"],
    default: "new"
  }
});

// Create Enquiry model based on schema
const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
