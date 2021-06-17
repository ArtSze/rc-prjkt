import Router from 'express'
import { AuthorizationCode } from 'simple-oauth2';
import { id, secret } from '../utils/config';
import logger from '../utils/logger'

export const AuthRouter = Router()

type client = { id: string, secret: string }

const config = {
  client: { id, secret } as client,
  auth: {
    authorizePath: '/oauth/authorize/',
    authorizeHost: 'https://recurse.com/',
    tokenPath: '/oauth/token/',
    tokenHost: 'https://recurse.com/'
  }
};

// Grant Type
const client = new AuthorizationCode(config);

const authorizationUri = client.authorizeURL({
  redirect_uri: 'http://localhost:4000/callback',
});

AuthRouter.get('/auth', (_, res) => {
  res.redirect(authorizationUri);
})

AuthRouter.get('/callback', async (req, res) => {
  const tokenParams = {
    code: req.query['code'] as string,
    redirect_uri: 'http://localhost:4000/callback',
  };
  try {
    const accessToken = await client.getToken(tokenParams);
    logger.info({ accessToken })
    res.status(200).json(accessToken)
  } catch (error) {
    console.log('Access Token Error', error.message);
  }
})