"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = exports.session_secret = exports.CLIENT_URL = exports.MONGO_URI = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env['PORT'];
// Mongo Config
exports.MONGO_URI = process.env['NODE_ENV'] === 'test' ? process.env['TEST_MONGO_URI'] : process.env['MONGO_URI'];
exports.CLIENT_URL = process.env['NODE_ENV'] === 'development' ? process.env['DEVELOPMENT_CLIENT_URL'] : '';
// Express Session Config
exports.session_secret = process.env['SESSION_SECRET'];
// OAuth Config
const id = process.env['RC_AUTH_ID'];
const secret = process.env['RC_AUTH_SECRET'];
exports.authConfig = {
    client: { id, secret },
    auth: { tokenHost: 'https://recurse.com/' },
};
