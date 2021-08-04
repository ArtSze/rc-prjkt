"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsRouter = void 0;
const express_1 = __importDefault(require("express"));
const tagService_1 = __importDefault(require("../services/tagService"));
exports.TagsRouter = express_1.default();
exports.TagsRouter.get('/', async (_, res) => {
    try {
        const allTags = await tagService_1.default.fetchAllTags();
        res.status(200).json(allTags);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
