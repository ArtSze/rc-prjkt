import { Request, Response, NextFunction } from 'express';

export const sessionCookieCheck = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const nonSecurePaths = ['/auth', '/auth/callback'];
	if (nonSecurePaths.includes(req.path)) return next();

	if (req.session.user) {
		// const user = req.session.user
		// console.log({ user })
		next();
	} else {
		res.status(401)
			.send({
				error: 'unauthorized',
			})
			.end();
	}
};
