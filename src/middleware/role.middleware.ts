import { Request, Response, NextFunction } from 'express';

export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status(401);
            return next(new Error('User not found on request. Protection middleware missing?'));
        }

        if (!roles.includes(req.user.role)) {
            res.status(403);
            return next(
                new Error(`User role ${req.user.role} is not authorized to access this route`)
            );
        }

        next();
    };
};
