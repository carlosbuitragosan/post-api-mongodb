import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { postSchema } from '../models/model';
import { IPost } from '../models/model';

/* model for interacting the collection. models abstract much of the database interaction. e.g. in: Post.findById(postId) mongoose already knows the structre (postSchema) and the 'Post' models maps to the 'posts' collection, therefore avoiding raw database queries. and this code : 

 db.collection('posts').find({ _id: new ObjectId(id) }).toArray()

 can be replaced with: 

 Post.findById(postId) */
export const Post = mongoose.model<IPost>('Post', postSchema);

type ResponseData<T> = T | { error: string };

// add a post
export const addNewPost = async (
  req: Request,
  res: Response<ResponseData<IPost>>,
): Promise<Response> => {
  const { content, author }: IPost = req.body;
  try {
    const newPost = new Post({ content, author });
    const post = await newPost.save();
    if (!post) {
      return res.status(404).send();
    }
    return res.json(post);
  } catch (err) {
    return res.status(500).send({ error: 'unexpected error.' });
  }
};

// get all posts
export const getPosts = async (
  req: Request,
  res: Response<ResponseData<IPost[]>>,
): Promise<Response> => {
  try {
    const posts: IPost[] = await Post.find();
    if (!posts) {
      return res.status(404).send();
    }
    return res.json(posts);
  } catch (err) {
    return res.status(500).send({ error: 'unexpected error.' });
  }
};

// get a specific post
export const getPostById = async (
  req: Request,
  res: Response<ResponseData<IPost>>,
): Promise<Response> => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send();
    }
    return res.json(post);
  } catch (err) {
    return res.status(500).send({ error: 'unexpected error.' });
  }
};

// delete a single post
export const deletePostById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { postId } = req.params;
    const result = await Post.deleteOne({ _id: postId });
    if (result.deletedCount === 1) {
      res.status(200).send('Post deleted');
    } else {
      res.status(404).send('Post not found');
    }
  } catch (err) {
    console.error('error deleting post: ', err);
  }
};

// delete all posts
export const deletePosts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await Post.deleteMany();
    res.status(200).send('All posts deleted');
  } catch (err) {
    console.error('error deleting all posts: ', err);
  }
};
