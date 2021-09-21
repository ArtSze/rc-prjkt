"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionCookieCheck = void 0;
const sessionCookieCheck = (req, res, next) => {
    const nonSecurePaths = ['/api/nuke', '/api/auth', '/api/auth/callback', '/api/productionCheck'];
    if (nonSecurePaths.includes(req.path))
        return next();
    if (req.session.user) {
        return next();
    }
    else {
        // console.log('401 failing in sessionCookieCheck');
        return res
            .status(401)
            .send({
            error: 'unauthorized',
        })
            .end();
    }
};
exports.sessionCookieCheck = sessionCookieCheck;
