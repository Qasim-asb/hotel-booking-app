import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [20, 'Name cannot exceed 20 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 5,
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
}, { timestamps: true })

export const User = model('User', userSchema)