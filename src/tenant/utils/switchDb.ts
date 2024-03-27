import mongoose, { Schema } from 'mongoose';
import { connectDB } from './connectDB';

export async function switchDB(dbName: string, dbSchema: {
  modelName: string;
  schema: Schema;
}[]) {
  const mongoose = await connectDB();
  if (mongoose.connection.readyState === 1) {
    const db = mongoose.connection.useDb(dbName, { useCache: true });
    if (!Object.keys(db.models).length || Object.values(db.models) !== Object.values(dbSchema)) {
      dbSchema.forEach(({schema, modelName}) => {
        db.model(modelName, schema);
      });
    }

    return db;
  }

  throw new Error('Could not connect to the database');
}


export const getDBModel = async (db: mongoose.Connection, modelName: string) => {
  return db.model(modelName);
};
