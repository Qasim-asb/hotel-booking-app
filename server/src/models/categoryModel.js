import { model, Schema } from 'mongoose'
import slugify from 'slugify'

const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true
  }
}, { timestamps: true })

categorySchema.pre('save', function () {
  this.slug = slugify(this.category, { lower: true })
})

export const Category = model('Category', categorySchema)