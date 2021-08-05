import { Request, Response, NextFunction } from 'express';

export const sessionCookieCheck = (req: Request, res: Response, next: NextFunction): void => {
    const nonSecurePaths = ['/api/auth', '/api/auth/callback'];

    console.log(req.path);

    if (nonSecurePaths.includes(req.path)) return next();

    if (req.session.user) {
        return next();
    } else {
        // console.log('failing in middleware');
        return res
            .status(401)
            .send({
                error: 'unauthorized',
            })
            .end();
    }
};
