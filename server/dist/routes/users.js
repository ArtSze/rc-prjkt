"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = void 0;
const express_1 = __importDefault(require("express"));
const userService_1 = __importDefault(require("../services/userService"));
exports.UsersRouter = express_1.default();
exports.UsersRouter.get('/', async (req, res) => {
    let omission;
    const omitSelf = req.query['omitSelf'] ? req.query['omitSelf'] : undefined;
    if (omitSelf === 'true') {
        omission = true;
    }
    if (omitSelf === 'false') {
        omission = false;
    }
    try {
        const foundUsers = await userService_1.default.getAllUsers();
        if (omission === true) {
            const finalUsers = foundUsers.filter((u) => u.rcId !== req.session.user.rcId);
            res.status(200).json(finalUsers);
        }
        else {
            res.status(200).json(foundUsers);
        }
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.UsersRouter.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const foundUser = await userService_1.default.getUser(id);
        // handle user not found from the database
        if (foundUser === null) {
            return res.status(404).json({ error: 'Invalid user' });
        }
        else {
            return res.status(200).json(foundUser);
        }
    }
    catch (e) {
        return res.status(400).send(e.message);
    }
});
exports.UsersRouter.post('/', async (req, res) => {
    try {
        const createdUser = await userService_1.default.createUser(req.body);
        res.status(200).json(createdUser);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
