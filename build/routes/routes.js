"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const controller_1 = require("../controllers/controller");
const routes = (app) => {
    app
        .route('/posts')
        .get(controller_1.getPosts)
        .post(controller_1.addNewPost)
        .delete(controller_1.deletePosts);
    app.route('/posts/:postId').get(controller_1.getPostById).delete(controller_1.deletePostById);
};
exports.routes = routes;
