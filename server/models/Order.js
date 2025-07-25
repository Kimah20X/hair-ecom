const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    products: [ { 
      product: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Product', 
          required: true
        },
      quantity: { 
          type: Number, 
          required: true
        },},],
    totalPrice: { 
      type: Number, 
      required: true 
    },
    shippingAddress: { 
      type: String, 
      required: true
    },
    paymentStatus: { 
      type: String, 
      enum: ['pending', 'paid', 'failed'], default: 'pending' 
    },
      paymentReference: { 
      type: String 
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);