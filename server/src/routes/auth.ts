import Router from 'express';
import { AccessToken, AuthorizationCode, Token } from 'simple-oauth2';
import { authConfig } from '../utils/config';
import logger from '../utils/logger';
import axios from 'axios';

import userService from '../services/userService';
import { IProfilefromRCAPI, IUserFromRCAPI } from '../types';

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
		logger.info({ tokenObject });
		logger.info({ accessToken });

		// hit /me endpoint and return {username, id, etc.}
		// userService.getUser(id)
		//     if null create new user and save to session cookie
		//     else return found user and save to session cookie

		const userData = await getRCData(accessToken);
		const userFromDb = await userService.getUser(userData.id);
		if (!userFromDb) {
			const newlyCreatedUser = await userService.createUser(userData);
			req.session.user = newlyCreatedUser;
			res.status(200).json(newlyCreatedUser);
		} else {
			req.session.user = userFromDb;
			res.status(200).json(userFromDb);
		}
	} catch (e) {
		logger.error(e);
		res.status(401).send(e.message).end();
	}
});

async function getRCData(token: AccessToken): Promise<IUserFromRCAPI> {
	try {
		const rcMe = 'http://www.recurse.com/api/v1/profiles/me';
		const profile = (await axios.get(rcMe, {
			headers: { Authorization: `Bearer ${token}` },
		})) as IProfilefromRCAPI;
		const batch = profile.stints ? profile.stints[0]!.batch.short_name : '';
		return {
			id: profile['id'],
			first_name: profile['first_name'],
			last_name: profile['last_name'],
			zulip_id: profile['zulip_id'],
			image_path: profile['image_path'],
			batch: batch,
		};
	} catch (error) {
		return logger.error(error);
	}
}

// 60d39a042a1bc76a4ccff4ba
// 60d39a2fda85596a6b5ea632
// 60d39bd419cd906b764a7a36
