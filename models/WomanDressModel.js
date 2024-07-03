const { Schema, model } = require("mongoose")
const readOnlyFields = require("../middleware/readOnlyField")

const womanProductchema = new Schema({
    nameOfProduct:
  {
    type: String,
    required: [true, 'Name of the product is required']
  },
  price: {
    type: Number, 
    required: [true, 'Price is required!'],
    min: [0, 'Price must be greater than 0!'],
    max: [1000000, 'Price must be less than 1000000!'

    ]
  },
  quantity:
  {
    type: Number,
    required: [true, 'Quantity is required!'],
    min: [0, 'Quantity must be greater than 0!'],
    max: [1000000, 'Quantity must be less than 1000000!']
  },
  image:
  {
    type: String,
    required: [true, 'Image area is required!']
  },
  cartQuantity: 
  { 
    type: Number, default: 1 
  },
  gender: 
  {
    type: String, default: 'Woman'
  },
    discountAmount: {
    type: Number,
    default: 0
  },
})
readOnlyFields(womanProductchema, ['gender']);

const WomanProduct = model('WomanProduct', womanProductchema)
module.exports = WomanProduct

