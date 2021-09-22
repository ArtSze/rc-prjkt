import { Request, Response, NextFunction } from 'express';

export const sessionCookieCheck = (req: Request, res: Response, next: NextFunction): void => {
    const nonSecurePaths = ['/api/nuke', '/api/auth', '/api/auth/callback', '/api/productionCheck'];

    if (nonSecurePaths.includes(req.path)) return next();

    const demoUser = {
    first_name: 'Demo',
    last_name: 'User',
    rcId: 1234,
    zulip_id: 1234,
    ownedProjects: [],
    collabProjects: [],
    image_path: '',
    batch: "W2'21",
    batchEndDate: new Date(2020, 8, 7),
    };

    // TODO: update 'localhost' string to correct url
    if (req.hostname === 'localhost') {
        req.session.user = demoUser
    }

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
