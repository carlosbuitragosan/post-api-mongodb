import { Schema } from 'mongoose';

// define sctructure for mondoDB documents
export interface IPost {
  content: string;
  author: string;
}

//Mongoose Schema for 'posts' collection
export const postSchema = new Schema<IPost>({
  content: { type: String, required: true },
  author: { type: String, required: true },
});
