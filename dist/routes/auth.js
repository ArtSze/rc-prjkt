"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const simple_oauth2_1 = require("simple-oauth2");
const config_1 = require("../utils/config");
const logger_1 = __importDefault(require("../utils/logger"));
const userService_1 = __importDefault(require("../services/userService"));
const rcAPI_1 = require("../utils/rcAPI");
exports.AuthRouter = express_1.default();
const redirect_uri = `${config_1.SERVER_URL}/api/auth/callback`;
const client = new simple_oauth2_1.AuthorizationCode(config_1.authConfig);
const authorizationUri = client.authorizeURL({ redirect_uri });
exports.AuthRouter.get('/', (_, res) => {
    return res.redirect(authorizationUri);
});
exports.AuthRouter.get('/callback', async (req, res) => {
    if (process.env['NODE_ENV'] === 'test' && req.body.user) {
        const requestUser = req.body.user;
        const user = await userService_1.default.getUser(requestUser.rcId);
        if (!user) {
            const newUser = await userService_1.default.createUser(requestUser);
            req.session.user = newUser;
        }
        else {
            req.session.user = user;
        }
        return res.redirect(config_1.CLIENT_URL);
    }
    if (!req.query['code'])
        return res
            .status(401)
            .send({
            error: 'need valid authorization code from RC API to exchange for access token',
        })
            .end();
    const code = req.query['code'];
    const tokenParams = { code, redirect_uri };
    try {
        const tokenObject = (await client.getToken(tokenParams));
        const accessToken = tokenObject['token'].access_token;
        const userData = await rcAPI_1.getRCData(accessToken);
        const user = await userService_1.default.getUser(userData.rcId);
        if (!user) {
            const newUser = await userService_1.default.createUser(userData);
            req.session.user = newUser;
        }
        else {
            req.session.user = user;
        }
        return res.redirect(config_1.CLIENT_URL);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(401).send(e.message).end();
    }
});
