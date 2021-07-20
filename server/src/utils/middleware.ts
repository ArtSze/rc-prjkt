import { Request, Response, NextFunction } from 'express';

export const sessionCookieCheck = (req: Request, res: Response, next: NextFunction): void => {
    const nonSecurePaths = ['/auth', '/auth/callback'];
    if (nonSecurePaths.includes(req.path)) return next();

    if (req.session.user) {
        next();
    } else {
        console.log('failing in middleware');
        res.status(401)
            .send({
                error: 'unauthorized',
            })
            .end();
    }
};
