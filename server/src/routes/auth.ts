import Router from 'express';
import { AccessToken, AuthorizationCode, Token } from 'simple-oauth2';
import { authConfig } from '../utils/config';
import logger from '../utils/logger';
import axios from 'axios';

import userService from '../services/userService';
import { IProfilefromRCAPI, IUserFromRCAPI } from '../utils/types';

export const AuthRouter = Router();

const redirect_uri = 'http://localhost:4000/auth/callback';
const client = new AuthorizationCode(authConfig);
const authorizationUri = client.authorizeURL({ redirect_uri });

AuthRouter.get('/', (_, res) => {
    res.redirect(authorizationUri);
});

AuthRouter.get('/callback', async (req, res) => {
    if (!req.query['code'])
        res.status(401)
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

        console.log('auth');
        if (!userFromDb) {
            const newlyCreatedUser = await userService.createUser(userData);
            req.session.user = newlyCreatedUser;
            res.redirect('http://localhost:3000/home');
            // res.status(200).json(newlyCreatedUser);
        } else {
            req.session.user = userFromDb;
            res.redirect('http://localhost:3000/home');
            // res.status(200).json(userFromDb);
        }
    } catch (e) {
        logger.error(e);
        res.status(401).send(e.message).end();
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
