import express from 'express';
import supertest from 'supertest';
import { UsersRouter } from '../routes/users';
import '../models/project'; // import project model to initialize schema
import db from './utils/dbConfig';

const app = express();
const api = supertest(app);
app.use(express.json());
app.use(UsersRouter);

describe('User Router tests without using app', () => {
    beforeAll(async () => {
        await db.connect();
    });
    afterAll(async () => {
        await db.close();
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
                first_name: 'test first first first!!!!',
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
