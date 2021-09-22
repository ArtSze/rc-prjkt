import { Request, Response, NextFunction } from 'express';

export const sessionCookieCheck = (req: Request, res: Response, next: NextFunction): void => {
    const nonSecurePaths = ['/api/nuke', '/api/auth', '/api/auth/callback', '/api/productionCheck'];

    if (nonSecurePaths.includes(req.path)) return next();

    if (req.session.user) {
        return next();
    } else {
        return res
            .status(401)
            .send({
                error: 'unauthorized',
            })
            .end();
    }
};
