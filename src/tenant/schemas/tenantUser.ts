import { Schema } from 'mongoose';

export const tenantUserSchema = new Schema({
  orgId: {
    type: String,
    ref: 'organizations.orgId'
  },
  email: String,
});
