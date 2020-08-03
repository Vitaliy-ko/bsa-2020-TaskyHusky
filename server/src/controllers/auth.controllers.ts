import { Request, Response } from 'express';
import { MockUser } from '../../config/passport.config';
import { generateToken } from '../helpers/jwt.helper';

class AuthController {
    sendUser = (req: Request, res: Response) => {
        const { password, ...user } = req.user as MockUser; // write fields you want to exclude before '...user'
        const jwtToken = generateToken(user.id);
        res.send({ jwtToken, user });
    }
}

export default AuthController;