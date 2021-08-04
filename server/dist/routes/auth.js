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
const axios_1 = __importDefault(require("axios"));
const userService_1 = __importDefault(require("../services/userService"));
exports.AuthRouter = express_1.default();
const redirect_uri = 'http://localhost:4000/auth/callback';
const client = new simple_oauth2_1.AuthorizationCode(config_1.authConfig);
const authorizationUri = client.authorizeURL({ redirect_uri });
exports.AuthRouter.get('/', (_, res) => {
    res.redirect(authorizationUri);
});
exports.AuthRouter.get('/callback', async (req, res) => {
    if (!req.query['code'])
        res.status(401)
            .send({
            error: 'need valid authorization code from RC API to exchange for access token',
        })
            .end();
    const code = req.query['code'];
    const tokenParams = { code, redirect_uri };
    try {
        const tokenObject = (await client.getToken(tokenParams));
        const accessToken = tokenObject['token'].access_token;
        const userData = await getRCData(accessToken);
        const userFromDb = await userService_1.default.getUser(userData.rcId);
        console.log('auth');
        if (!userFromDb) {
            const newlyCreatedUser = await userService_1.default.createUser(userData);
            req.session.user = newlyCreatedUser;
            res.redirect(config_1.CLIENT_URL + '/');
        }
        else {
            req.session.user = userFromDb;
            res.redirect(config_1.CLIENT_URL + '/');
        }
    }
    catch (e) {
        logger_1.default.error(e);
        res.status(401).send(e.message).end();
    }
});
async function getRCData(token) {
    var _a, _b;
    try {
        const rcMe = 'http://www.recurse.com/api/v1/profiles/me';
        const profile = (await axios_1.default.get(rcMe, {
            headers: { Authorization: `Bearer ${token}` },
        })).data;
        const batchEndDate = new Date(((_a = profile.stints[0]) === null || _a === void 0 ? void 0 : _a.end_date) || '2000-01-01');
        const batch = ((_b = profile.stints[0]) === null || _b === void 0 ? void 0 : _b.batch.short_name) || '';
        return {
            rcId: profile['id'],
            first_name: profile['first_name'],
            last_name: profile['last_name'],
            zulip_id: profile['zulip_id'],
            image_path: profile['image_path'],
            batchEndDate,
            batch: batch,
        };
    }
    catch (error) {
        return logger_1.default.error(error);
    }
}
