"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NukeRouter = void 0;
const express_1 = __importDefault(require("express"));
const project_1 = __importDefault(require("../models/project"));
const tag_1 = __importDefault(require("../models/tag"));
const user_1 = __importDefault(require("../models/user"));
exports.NukeRouter = express_1.default();
exports.NukeRouter.get('/', async (_, res) => {
    try {
        await project_1.default.deleteMany({});
        await tag_1.default.deleteMany({});
        await user_1.default.deleteMany({});
        return res.status(204).end();
    }
    catch (e) {
        res.status(400);
    }
});
