import {
  addNewPost,
  deletePostById,
  deletePosts,
  getPostById,
  getPosts,
} from '../controllers/controller';
import { Application } from 'express';

export const routes = (app: Application) => {
  app
    .route('/posts')
    .get(getPosts)
    .post(addNewPost)
    .delete(deletePosts);

  app.route('/posts/:postId').get(getPostById).delete(deletePostById);
};
