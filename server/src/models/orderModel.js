import { model, Schema } from 'mongoose'

const orderItemSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  title: String,
  price: Number,
  nights: Number,
  checkInDate: Date
})

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  subtotal: Number,
  tax: Number,
  total: Number,
  status: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true })

export const Order = model('Order', orderSchema)