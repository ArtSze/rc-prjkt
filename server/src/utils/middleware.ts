import { Request, Response, NextFunction } from 'express';

export const sessionCookieCheck = (req: Request, res: Response, next: NextFunction): void => {
    const nonSecurePaths = ['/api/auth', '/api/auth/callback'];

    console.log(req.path);

    if (nonSecurePaths.includes(req.path)) next();

    if (req.session.user) {
        next();
    } else {
        // console.log('failing in middleware');
        res.status(401)
            .send({
                error: 'unauthorized',
            })
            .end();
    }
};
