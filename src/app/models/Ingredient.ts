import { Schema } from 'mongoose';

export const Ingredient = new Schema({
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
