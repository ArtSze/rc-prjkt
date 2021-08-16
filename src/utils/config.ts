import MongoStore from 'connect-mongo';

/** Set environment variables based on node environment
 * Throw ReferenceError for any variables that are not configured
 */

function getEnvironmentVariable(variableName: string) {
    const variable = process.env[variableName];
    if (!variable) throw new ReferenceError(`Environment Variable ${variableName} is not set`);
    return variable;
}

export let MONGO_URI = '';
export let CLIENT_URL = '';
export let SERVER_URL = '';

let id = '';
let secret = '';

switch (process.env['NODE_ENV']) {
    case 'test':
        MONGO_URI = getEnvironmentVariable('TEST_MONGO_URI');
        CLIENT_URL = getEnvironmentVariable('DEVELOPMENT_CLIENT_URL');
        SERVER_URL = getEnvironmentVariable('DEVELOPMENT_SERVER_URL');
        id = getEnvironmentVariable('DEVELOPMENT_RC_AUTH_ID');
        secret = getEnvironmentVariable('DEVELOPMENT_RC_AUTH_SECRET');
        break;
    case 'development':
        MONGO_URI = getEnvironmentVariable('DEVELOPMENT_MONGO_URI');
        CLIENT_URL = getEnvironmentVariable('DEVELOPMENT_CLIENT_URL');
        SERVER_URL = getEnvironmentVariable('DEVELOPMENT_SERVER_URL');
        id = getEnvironmentVariable('DEVELOPMENT_RC_AUTH_ID');
        secret = getEnvironmentVariable('DEVELOPMENT_RC_AUTH_SECRET');
        break;
    default:
        MONGO_URI = getEnvironmentVariable('PRODUCTION_MONGO_URI');
        CLIENT_URL = getEnvironmentVariable('PRODUCTION_CLIENT_URL');
        SERVER_URL = getEnvironmentVariable('PRODUCTION_SERVER_URL');
        id = getEnvironmentVariable('RC_AUTH_ID');
        secret = getEnvironmentVariable('RC_AUTH_SECRET');
        break;
}

if (MONGO_URI === '') throw new ReferenceError('MONGO_URI not set in environment variables');
if (CLIENT_URL === '') throw new ReferenceError('CLIENT_URL not set in environment variables');

export const PORT = getEnvironmentVariable('PORT');

/*** Express Session Config ***/
export const SESSION_SECRET = getEnvironmentVariable('SESSION_SECRET');

export const SESSION_CONFIG = {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 3600000 * 12 },
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
};

/*** OAuth Config ***/
export const authConfig = {
    client: { id, secret },
    auth: { tokenHost: 'https://recurse.com/' },
};
