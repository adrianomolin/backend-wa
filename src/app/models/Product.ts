import { Schema } from 'mongoose';

export const Product = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: {
    required: true,
    type: [{
      ingredient: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Ingredient',
      }
    }],
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
});
