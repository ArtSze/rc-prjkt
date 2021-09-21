"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = exports.SESSION_CONFIG = exports.SESSION_SECRET = exports.PORT = exports.SERVER_URL = exports.CLIENT_URL = exports.MONGO_URI = void 0;
const connect_mongo_1 = __importDefault(require("connect-mongo"));
/** Set environment variables based on node environment
 * Throw ReferenceError for any variables that are not configured
 */
function getEnvironmentVariable(variableName) {
    const variable = process.env[variableName];
    if (!variable)
        throw new ReferenceError(`Environment Variable ${variableName} is not set`);
    return variable;
}
exports.MONGO_URI = '';
exports.CLIENT_URL = '';
exports.SERVER_URL = '';
let id = '';
let secret = '';
switch (process.env['NODE_ENV']) {
    case 'test':
        exports.MONGO_URI = getEnvironmentVariable('TEST_MONGO_URI');
        exports.CLIENT_URL = getEnvironmentVariable('TEST_CLIENT_URL');
        exports.SERVER_URL = getEnvironmentVariable('DEVELOPMENT_SERVER_URL');
        id = getEnvironmentVariable('DEVELOPMENT_RC_AUTH_ID');
        secret = getEnvironmentVariable('DEVELOPMENT_RC_AUTH_SECRET');
        break;
    case 'development':
        exports.MONGO_URI = getEnvironmentVariable('DEVELOPMENT_MONGO_URI');
        exports.CLIENT_URL = getEnvironmentVariable('DEVELOPMENT_CLIENT_URL');
        exports.SERVER_URL = getEnvironmentVariable('DEVELOPMENT_SERVER_URL');
        id = getEnvironmentVariable('DEVELOPMENT_RC_AUTH_ID');
        secret = getEnvironmentVariable('DEVELOPMENT_RC_AUTH_SECRET');
        break;
    default:
        exports.MONGO_URI = getEnvironmentVariable('PRODUCTION_MONGO_URI');
        exports.CLIENT_URL = getEnvironmentVariable('PRODUCTION_CLIENT_URL');
        exports.SERVER_URL = getEnvironmentVariable('PRODUCTION_SERVER_URL');
        id = getEnvironmentVariable('RC_AUTH_ID');
        secret = getEnvironmentVariable('RC_AUTH_SECRET');
        break;
}
if (exports.MONGO_URI === '')
    throw new ReferenceError('MONGO_URI not set in environment variables');
if (exports.CLIENT_URL === '')
    throw new ReferenceError('CLIENT_URL not set in environment variables');
exports.PORT = getEnvironmentVariable('PORT');
/*** Express Session Config ***/
exports.SESSION_SECRET = getEnvironmentVariable('SESSION_SECRET');
exports.SESSION_CONFIG = {
    secret: exports.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 3600000 * 12 },
    store: connect_mongo_1.default.create({ mongoUrl: exports.MONGO_URI }),
};
/*** OAuth Config ***/
exports.authConfig = {
    client: { id, secret },
    auth: { tokenHost: 'https://recurse.com/' },
};
