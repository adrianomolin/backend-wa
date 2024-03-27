import { Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export const User = new Schema({
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
  password: {
    type: String,
    required: [true, 'Please enter an password'],
  },
  role: {
    type: String,
    required: true,
    default: 'USER'
  },
  orgId: {
    type: String,
    required: true,
  },
});
