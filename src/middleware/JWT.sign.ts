import jwt from 'jsonwebtoken';
import config from '../config/config';
import { IUser } from '../storage/interfaces/user.interface';
import { LOG } from '../utils';

export interface TokenReturn {
    token: string;
    ttl: Date;
}

export const signJWT = (user: IUser, callback: (error: Error | null, token: TokenReturn | null) => void): void => {
    LOG.info(`Attempting to sign token for ${user.username}`);

    try {
        jwt.sign(
            {
                token: user
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: config.server.token.expireTime
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    const decodedToken = jwt.decode(token, {json: true})
                    const ttl = decodedToken?.exp || new Date().getTime() / 1000;
                    callback(null, {token, ttl: new Date(ttl * 1000)});
                }
            }
        );
    } catch (error: any) {
        LOG.error(error.message, error);
        callback(error, null);
    }
};
