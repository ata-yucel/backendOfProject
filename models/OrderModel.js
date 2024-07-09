const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    nameOfProduct: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
