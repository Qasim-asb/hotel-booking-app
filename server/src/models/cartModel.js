import { model, Schema } from 'mongoose'

const cartItemSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  nights: {
    type: Number,
    required: true,
    min: 1
  },
  checkInDate: {
    type: Date,
    required: true
  }
})

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema]
}, { timestamps: true })

export const Cart = model('Cart', cartSchema)