import * as mongoose from 'mongoose';

export class Task {}

export const tasksSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    done: { type: Boolean, default: false },
    edited: { type: Boolean, default: false}
  
    });
  
    export interface ITaches extends mongoose.Document {
      titre: string;
      done: boolean;
      edited:boolean;
      }