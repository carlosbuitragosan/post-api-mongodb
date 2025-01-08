import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../src/index';
import { Post } from '../src/controllers/controller';
import { IPost } from '../src/models/model';
let server: MongoMemoryServer;

// Sets up an in-memory MongoDB instance and connects to it using Mongoose
beforeAll(async () => {
  //this will create an instance and starts it
  server = await MongoMemoryServer.create();

  // provides a uri to connect to it
  const uri = server.getUri();

  //connect to the server
  await mongoose.connect(uri);

  // Inserts a test post into the database, ensuring it's available for all tests.
  await Post.create({
    _id: new mongoose.Types.ObjectId('677e786af73a221ef512fb3b'),
    content: 'test content',
    author: 'carlos',
  });
});

// Cleans up by disconnecting from MongoDB and stopping the in-memory server.
afterAll(async () => {
  //disconnect to the server
  await mongoose.disconnect();

  //stop the server
  await server.stop();
});

describe('API Endpoints Tests', (): void => {
  describe('POST routes', (): void => {
    test('POST a single object', async (): Promise<void> => {
      const post: IPost = {
        content: 'hihi',
        author: 'me',
      };
      const res = await request(app).post(`/posts`).send(post);
      expect(res.status).toBe(200);
      expect(res.body.content).toEqual('hihi');
      expect(res.body).toHaveProperty('_id');
    });
  });

  describe('GET ROUTES', (): void => {
    test('GET route for all items', async (): Promise<void> => {
      const res = await request(app).get('/posts');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toHaveProperty('content');
      expect(res.body[0]).toHaveProperty('author');
    });
    test('GET route for a single post', async (): Promise<void> => {
      const res = await request(app).get(
        '/posts/677e786af73a221ef512fb3b',
      );

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('content');
      expect(res.body).toHaveProperty('author');
      expect(res.body.author).toBe('carlos');
    });
  });
});
