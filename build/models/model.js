"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
//Mongoose Schema for 'posts' collection
exports.postSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    author: { type: String, required: true },
});
