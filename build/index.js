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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes/routes");
const database_1 = require("./utils/database");
// load environment variables
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const PORT = 3000;
// bodyparser setup to handle req and res
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json());
//enable cors globally
exports.app.use((0, cors_1.default)());
(0, routes_1.routes)(exports.app);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // connect in non-test environments. NODE_ENV is defined in package.json
        if (process.env.NODE_ENV !== 'test') {
            (0, database_1.connectToDatabase)(process.env.MONGO_URI);
        }
        exports.app.listen(PORT, () => console.log(`server running on port ${PORT}...`));
    }
    catch (err) {
        console.error('Failed to start server: ', err);
    }
});
startServer();
