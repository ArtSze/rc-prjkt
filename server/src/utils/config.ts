import 'dotenv/config';

export const PORT = process.env['PORT'];

// Mongo Config
export const MONGO_URI = process.env['NODE_ENV'] === 'test' ? process.env['TEST_MONGO_URI'] : process.env['MONGO_URI'];

export const CLIENT_URL = process.env['NODE_ENV'] === 'development' ? process.env['DEVELOPMENT_CLIENT_URL'] : '';

// Express Session Config
export const session_secret = process.env['SESSION_SECRET'] as string;

// OAuth Config
const id = process.env['RC_AUTH_ID'] as string;
const secret = process.env['RC_AUTH_SECRET'] as string;

export const authConfig = {
    client: { id, secret },
    auth: { tokenHost: 'https://recurse.com/' },
};
