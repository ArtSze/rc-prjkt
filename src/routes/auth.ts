import Router from 'express';
import { AuthorizationCode, Token } from 'simple-oauth2';
import { authConfig, CLIENT_URL, SERVER_URL } from '../utils/config';
import logger from '../utils/logger';
import userService from '../services/userService';
import { getRCData } from '../utils/rcAPI';

export const AuthRouter = Router();

const redirect_uri = `${SERVER_URL}/api/auth/callback`;
const client = new AuthorizationCode(authConfig);
const authorizationUri = client.authorizeURL({ redirect_uri });

AuthRouter.get('/', (_, res) => {
    return res.redirect(authorizationUri);
});

AuthRouter.get('/callback', async (req, res) => {
    if (process.env['NODE_ENV'] === 'test' && req.body.user) {
        const requestUser = req.body.user;
        const user = await userService.getUser(requestUser.rcId);
        if (!user) {
            const newUser = await userService.createUser(requestUser);
            req.session.user = newUser;
        } else {
            req.session.user = user;
        }
        return res.redirect(CLIENT_URL);
    }

    if (!req.query['code'])
        return res
            .status(401)
            .send({
                error: 'need valid authorization code from RC API to exchange for access token',
            })
            .end();
    const code = req.query['code'] as string;
    const tokenParams = { code, redirect_uri };
    try {
        const tokenObject = (await client.getToken(tokenParams)) as Token;
        const accessToken = tokenObject['token'].access_token;
        const userData = await getRCData(accessToken);
        const user = await userService.getUser(userData.rcId);

        if (!user) {
            const newUser = await userService.createUser(userData);
            req.session.user = newUser;
        } else {
            req.session.user = user;
        }
        return res.redirect(CLIENT_URL);
    } catch (e) {
        logger.error(e);
        return res.status(401).send(e.message).end();
    }
});
