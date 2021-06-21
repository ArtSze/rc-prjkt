import Router from 'express';
import { AuthorizationCode } from 'simple-oauth2';
import { authConfig } from '../utils/config';
import logger from '../utils/logger';

export const AuthRouter = Router();

const redirect_uri = 'http://localhost:4000/auth/callback';
const client = new AuthorizationCode(authConfig);
const authorizationUri = client.authorizeURL({ redirect_uri });

AuthRouter.get('/', (_, res) => {
	res.redirect(authorizationUri);
});

AuthRouter.get('/callback', async (req, res) => {
	const code = req.query['code'] as string;
	const tokenParams = { code, redirect_uri };
	try {
		const accessToken = await client.getToken(tokenParams);
		logger.info({ accessToken });
		res.status(200).json(accessToken);
	} catch (error) {
		logger.error(error);
	}
});
