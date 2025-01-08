import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { IPost } from './model';

// load environment variables
dotenv.config();

// create an instance of MongoClient

const postSeed: IPost[] = [
  {
    content: "You're doing great!",
    author: 'author1',
  },
  {
    content: 'Keep going!',
    author: 'author2',
  },
  {
    content: 'Almost there!',
    author: 'author3',
  },
];

const seed = async () => {
  // Create client here to prevent unintended global execution
  const client = new MongoClient(process.env.MONGO_URI!);

  try {
    // connect to MongoDB
    await client.connect();
    console.log('connected to mongoDB with seed.');

    // get the db and collection
    const db = client.db('express-ts-db');
    const postsCollection = db.collection<IPost>('posts');

    // check if data already exists
    const existingPosts = await postsCollection.countDocuments({});
    if (existingPosts > 0) {
      console.log('Posts seed have already been created.')
      return;
    }
    // insert posts
    const result = await postsCollection.insertMany(postSeed);
    console.log(`${result.insertedCount} posts inserted.`);
  } catch (err) {
    console.error('Error inserting posts: ', err);
    return { error: err };
  } finally {
    await client.close();
  }
};

seed();
