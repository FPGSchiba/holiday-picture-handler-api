import { Request, Response } from "express";
import { signJWT, TokenReturn } from "../middleware/JWT.sign";
import MUser from '../storage/models/user.model';
import { userHasPermission } from "../storage/user.storage";

function login(req: Request, res: Response) {
    const { username, password } = req.body;
    if (!username || !password) { return res.status(400).json({message: 'Not all Paramenters were given.'})};

    MUser.findOne({username, password}).then((result) => {
        if (result && userHasPermission(result, 'doLogin')) {
            signJWT(result, (err: Error | null, token: TokenReturn | null) => {
                if (err) {
                    return res.status(500).json({message: 'Something went wrong while singing your SessionToken, please try again later.'});
                } else if (token) {
                    return res.cookie(
                        'sessionToken',
                        { accessToken: token.token },
                        {
                            httpOnly: true,
                            secure: true,
                            expires: token.ttl,
                        },
                    ).status(200).json({
                        message: 'Auth successful',
                        token: token.token,
                        expirationTime: token.ttl,
                        user: result
                    });
                } else {
                    return res.status(500).json({message: 'Something went wrong while singing your SessionToken, please try again later.'});
                }
            })
        } else {
            return res.status(401).json({message: 'Username invalid or Password is Wrong.'});
        }
    })
}

export default { login }