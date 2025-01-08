"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePosts = exports.deletePostById = exports.getPostById = exports.getPosts = exports.addNewPost = exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const model_1 = require("../models/model");
/* model for interacting the collection. models abstract much of the database interaction. e.g. in: Post.findById(postId) mongoose already knows the structre (postSchema) and the 'Post' models maps to the 'posts' collection, therefore avoiding raw database queries. and this code :

 db.collection('posts').find({ _id: new ObjectId(id) }).toArray()

 can be replaced with:

 Post.findById(postId) */
exports.Post = mongoose_1.default.model('Post', model_1.postSchema);
// add a post
const addNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, author } = req.body;
    try {
        const newPost = new exports.Post({ content, author });
        const post = yield newPost.save();
        if (!post) {
            return res.status(404).send();
        }
        return res.json(post);
    }
    catch (err) {
        return res.status(500).send({ error: 'unexpected error.' });
    }
});
exports.addNewPost = addNewPost;
// get all posts
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield exports.Post.find();
        if (!posts) {
            return res.status(404).send();
        }
        return res.json(posts);
    }
    catch (err) {
        return res.status(500).send({ error: 'unexpected error.' });
    }
});
exports.getPosts = getPosts;
// get a specific post
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const post = yield exports.Post.findById(postId);
        if (!post) {
            return res.status(404).send();
        }
        return res.json(post);
    }
    catch (err) {
        return res.status(500).send({ error: 'unexpected error.' });
    }
});
exports.getPostById = getPostById;
// delete a single post
const deletePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const result = yield exports.Post.deleteOne({ _id: postId });
        if (result.deletedCount === 1) {
            res.status(200).send('Post deleted');
        }
        else {
            res.status(404).send('Post not found');
        }
    }
    catch (err) {
        console.error('error deleting post: ', err);
    }
});
exports.deletePostById = deletePostById;
// delete all posts
const deletePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.Post.deleteMany();
        res.status(200).send('All posts deleted');
    }
    catch (err) {
        console.error('error deleting all posts: ', err);
    }
});
exports.deletePosts = deletePosts;
