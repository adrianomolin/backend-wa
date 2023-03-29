import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';

dotenv.config();

const storage = new Storage({
  credentials: {
    'type': 'service_account',
    'private_key': process.env.GCS_PRIVATE_KEY,
    'client_email': process.env.GCS_CLIENT_EMAIL,
    'client_id': process.env.GCS_CLIENT_ID,
  },
  projectId: process.env.GCS_PROJECT_ID
});

export default storage;
