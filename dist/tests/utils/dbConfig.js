"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
let db;
async function connect() {
    db = await mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = await db.getUri();
    await mongoose_1.default.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
}
async function close() {
    await mongoose_1.default.connection.dropDatabase();
    await mongoose_1.default.connection.close();
    await db.stop();
}
exports.default = { connect, close };
