const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
    },
    productPrice: {
        type: Number,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    // productSubCategory: {
    //     type:String,
    //     required: true
    // },
    productQuantity: {
        type: Number,
    },
    images: [{
        type: String,
        required: true
    }],
    productMaterial: {
        type: String,
        default: 'none'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;