import Router from 'express';
import { AccessToken, AuthorizationCode, Token } from 'simple-oauth2';
import { authConfig, CLIENT_URL } from '../utils/config';
import logger from '../utils/logger';
import axios from 'axios';

import userService from '../services/userService';
import { IProfilefromRCAPI, IUserFromRCAPI } from '../utils/types';

export const AuthRouter = Router();

const redirect_uri = 'https://rc-project-jjtv5.ondigitalocean.app/api/auth/callback';
const client = new AuthorizationCode(authConfig);
const authorizationUri = client.authorizeURL({ redirect_uri });

AuthRouter.get('/', (_, res) => {
    console.log({ res });
    return res.redirect(authorizationUri);
});

AuthRouter.get('/callback', async (req, res) => {
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
        const userFromDb = await userService.getUser(userData.rcId);

        if (!userFromDb) {
            const newlyCreatedUser = await userService.createUser(userData);
            req.session.user = newlyCreatedUser;
            console.log({ res });
            return res.redirect(CLIENT_URL);
        } else {
            req.session.user = userFromDb;
            return res.redirect(CLIENT_URL);
        }
    } catch (e) {
        console.log({ req, e });
        logger.error(e);
        return res.status(401).send(e.message).end();
    }
});

async function getRCData(token: AccessToken): Promise<IUserFromRCAPI> {
    try {
        const rcMe = 'http://www.recurse.com/api/v1/profiles/me';
        const profile = (
            await axios.get(rcMe, {
                headers: { Authorization: `Bearer ${token}` },
            })
        ).data as IProfilefromRCAPI;

        const batchEndDate = new Date(profile.stints[0]?.end_date || '2000-01-01');
        const batch = profile.stints[0]?.batch.short_name || '';

        return {
            rcId: profile['id'],
            first_name: profile['first_name'],
            last_name: profile['last_name'],
            zulip_id: profile['zulip_id'],
            image_path: profile['image_path'],
            batchEndDate,
            batch: batch,
        };
    } catch (error) {
        return logger.error(error);
    }
}
