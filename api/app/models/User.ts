import { model, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';


export const User = model('User', new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please enter an email'],
    validate: [isEmail, 'Please enter a valid email']
  },
  permissions: {
    type: Array,
    required: true,
    default: ['']
  },
  role: {
    type: String,
    required: true,
    uppercase: true,
    default: 'USER  '
  },
  password: {
    type: String,
    required: [true, 'Please enter an password'],
  }
}));
