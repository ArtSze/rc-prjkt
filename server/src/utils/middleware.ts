import { Request, Response, NextFunction } from 'express';

export const sessionCookieCheck = (req: Request, res: Response, next: NextFunction): void => {
    const nonSecurePaths = [
        'https://rc-project-jjtv5.ondigitalocean.app/api/auth',
        'https://rc-project-jjtv5.ondigitalocean.app/api/auth/callback',
    ];

    console.log(req.path);

    if (nonSecurePaths.includes(req.path)) return next();

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
