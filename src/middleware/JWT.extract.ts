import jwt from 'jsonwebtoken';
import config from '../config/config';
import { LOG } from '../utils';
import { Request, Response, NextFunction } from 'express';

export const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    LOG.info('Validating token');

    const { sessionToken } = req.body;

    if (sessionToken) {
        jwt.verify(sessionToken, config.server.token.secret, (error: any, decoded: any) => {
            if (error) {
                return res.status(404).json({
                    message: error,
                    error
                });
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

