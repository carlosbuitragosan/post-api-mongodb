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
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
// load environment variables
dotenv_1.default.config();
// create an instance of MongoClient
const postSeed = [
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
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    // Create client here to prevent unintended global execution
    const client = new mongodb_1.MongoClient(process.env.MONGO_URI);
    try {
        // connect to MongoDB
        yield client.connect();
        console.log('connected to mongoDB with seed.');
        // get the db and collection
        const db = client.db('express-ts-db');
        const postsCollection = db.collection('posts');
        // check if data already exists
        const existingPosts = yield postsCollection.countDocuments({});
        if (existingPosts > 0) {
            console.log('Posts seed have already been created.');
            return;
        }
        // insert posts
        const result = yield postsCollection.insertMany(postSeed);
        console.log(`${result.insertedCount} posts inserted.`);
    }
    catch (err) {
        console.error('Error inserting posts: ', err);
        return { error: err };
    }
    finally {
        yield client.close();
    }
});
seed();
