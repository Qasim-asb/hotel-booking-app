import { model, Schema } from 'mongoose'

const tripSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  image: {
    public_id: String,
    url: String
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  description: String
}, { timestamps: true })

export const Trip = model('Trip', tripSchema)