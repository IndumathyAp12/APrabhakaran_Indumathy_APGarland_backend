const { Schema, model } = require('../config/db-connection');

const orderSchema = new Schema({
  userId: {
    type: String,  
    required: [true, 'User ID is required'],
  },
  products: [{
    productId: {
      type: Number,
      ref: 'Product',
      required: [true, 'Product ID is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
  }],
  total: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative'],
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
});



module.exports  = model('Order', orderSchema);