"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionCookieCheck = void 0;
const sessionCookieCheck = (req, res, next) => {
    const nonSecurePaths = ['/auth', '/auth/callback'];
    if (nonSecurePaths.includes(req.path))
        return next();
    if (req.session.user) {
        next();
    }
    else {
        console.log('failing in middleware');
        res.status(401)
            .send({
            error: 'unauthorized',
        })
            .end();
    }
};
exports.sessionCookieCheck = sessionCookieCheck;
