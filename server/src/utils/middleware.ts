import { Request, Response, NextFunction } from 'express';

export const sessionCookieCheck = (req: Request, res: Response, next: NextFunction): void => {
    const nonSecurePaths = ['/api/auth', '/api/auth/callback'];

    console.log({ sessionCookieCheck: req });

    if (nonSecurePaths.includes(req.path)) return next();

    if (req.session.cookie) {
        return next();
    } else {
        console.log('401 failing in sessionCookieCheck');
        return res
            .status(401)
            .send({
                error: 'unauthorized',
            })
            .end();
    }
};
