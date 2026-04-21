import { model, Schema } from 'mongoose'
import slugify from 'slugify'

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  hotelLocation: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  facilities: {
    type: [String],
    required: true,
    validate: {
      validator: v => Array.isArray(v) && v.length > 0 && v.every(item => item.trim() !== ''),
      message: 'At least one facility is required'
    }
  },
  price: {
    type: Number,
    required: true,
    min: [100, 'Price must be at least $100 '],
    max: [1000, 'Price cannot exceed $1000']
  },
  nearArea: {
    type: [String],
    required: true,
    validate: {
      validator: v => Array.isArray(v) && v.length > 0 && v.every(item => item.trim() !== ''),
      message: 'At least one near area is required'
    }
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  images: {
    type: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    required: true,
    validate: [v => v.length === 3, 'Provide exactly 3 images']
  },
  guest: {
    type: Number,
    required: true,
    max: [6, 'Guest cannot exceed 6']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  slug: {
    type: String,
    unique: true
  },
}, { timestamps: true })

postSchema.pre('save', async function () {
  if (!this.isModified('title')) return
  let baseSlug = slugify(this.title, { lower: true })
  let slug = baseSlug
  let count = 1
  while (await this.constructor.findOne({ slug, _id: { $ne: this._id } })) {
    slug = `${baseSlug}-${count}`
    count++
  }
  this.slug = slug
})

export const Post = model('Post', postSchema)