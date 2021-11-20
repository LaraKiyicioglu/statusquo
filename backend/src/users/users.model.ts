import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },

  firstname: { type: String, required: true },
  surname: { type: String, required: true },

  email: { type: String, required: true },
  role: { type: String, required: true },
});

export interface Users extends mongoose.Document {
  id: number;

  username: string;
  password: string;

  firstname: string;
  surname: string;

  email: string;
  role: string;
}
