import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  description: {type: String, required:true},
  status: { type: String, required: true },
  goalid: { type: String, required: true },

});


export interface Task extends mongoose.Document{
  id: string;
  description: string;
  status: string;
  goalid: string;


}

