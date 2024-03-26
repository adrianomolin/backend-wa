import { Schema } from 'mongoose';

export const tenantSchema = new Schema({
  orgId: String,
  name: {
    type: String,
    unique: false,
    required: false
  },
});
