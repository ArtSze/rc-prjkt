"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = __importDefault(require("./utils/dbConfig"));
const user_1 = __importDefault(require("../models/user"));
describe('User database tests', () => {
    beforeAll(async () => { await dbConfig_1.default.connect(); });
    afterAll(async () => { await dbConfig_1.default.close(); });
    it('should a create new user', async () => {
        const user = new user_1.default({ rcId: 1234 });
        const response = await user.save();
        return expect(response).toEqual(expect.objectContaining({ 'rcId': 1234 }));
    });
    it('should fail to create new user with an rcId that is not a string', async () => {
        async function createUser() {
            const user = new user_1.default({ 'rcId': true });
            const response = await user.save();
            return response;
        }
        return expect(createUser).rejects.toThrow('User validation failed');
    });
    it('should fail to create new user with an rcId that is undefined', async () => {
        async function newUser() {
            const user = new user_1.default({ rcId: undefined });
            const response = await user.save();
            return response;
        }
        return expect(newUser).rejects.toThrow('User validation failed');
    });
    it('should fail to create new user with an rcId that is null', async () => {
        async function newUser() {
            const user = new user_1.default({ rcId: null });
            const response = await user.save();
            return response;
        }
        return expect(newUser).rejects.toThrow('User validation failed');
    });
});
