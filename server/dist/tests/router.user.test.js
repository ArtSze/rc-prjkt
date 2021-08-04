"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const users_1 = require("../routes/users");
require("../models/project"); // import project model to initialize schema
const dbConfig_1 = __importDefault(require("./utils/dbConfig"));
const app = express_1.default();
const api = supertest_1.default(app);
app.use(express_1.default.json());
app.use(users_1.UsersRouter);
describe('User Router tests without using app', () => {
    beforeAll(async () => {
        await dbConfig_1.default.connect();
    });
    afterAll(async () => {
        await dbConfig_1.default.close();
    });
    describe('POST /user', () => {
        it('should return a 200 status code and valid response for creation of a valid user', async () => {
            const result = await api.post('/').send({
                rcId: 1234,
                first_name: 'test first name',
                last_name: 'test last name',
                zulip_id: 123456,
                image_path: 'image.com',
                batch: 'W2 2021',
            });
            expect(result.status).toEqual(200);
            expect.objectContaining({
                rcId: 1234,
                ownedPosts: [],
                collabPosts: [],
                first_name: 'test first name',
                last_name: 'test last name',
                zulip_id: 123456,
                image_path: 'image.com',
                batch: 'W2 2021',
            });
        });
        it('should return a 400 status code and error response for creation of an invalid user', async () => {
            const result = await api.post('/').send({ test: '' });
            expect(result.status).toEqual(400);
        });
    });
    describe('GET /user', () => {
        it('should return all users in the database', async () => {
            const result = await api.get('/');
            expect(result.status).toEqual(200);
            expect.objectContaining({
                rcId: 1234,
                ownedPosts: [],
                collabPosts: [],
                first_name: 'test first name',
                last_name: 'test last name',
                zulip_id: 123456,
                image_path: 'image.com',
                batch: 'W2 2021',
            });
        });
        it('should return a 200 status code and a response containing the user object for a valid user', async () => {
            const result = await api.get('/1234');
            expect(result.status).toEqual(200);
            expect.objectContaining({
                rcId: 1234,
                ownedPosts: [],
                collabPosts: [],
                first_name: 'test first name',
                last_name: 'test last name',
                zulip_id: 123456,
                image_path: 'image.com',
                batch: 'W2 2021',
            });
        });
        it('should return a 404 status code and for an invalid user', async () => {
            const result = await api.get('/9999999');
            expect(result.status).toEqual(404);
        });
    });
});
