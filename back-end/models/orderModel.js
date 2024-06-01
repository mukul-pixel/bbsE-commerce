const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Address subdocument schema
const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true }
});

// Define the Item subdocument schema
const itemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 }
});

// Define the Order schema
const orderSchema = new Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  customerName: { type: String, required: true },
  address: { type: [addressSchema], required: true },
  items: { type: [itemSchema], required: true },
  customerContact: { type: String, required: true },
  customerEmail: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, default: 'done' }, // Added paymentStatus with default value 'done'
  orderType: { type: String, default: 'online' },
  createdBy: { type: String, default: 'computer' },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
