import { Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../entity/entity.User';
import { getManager } from 'typeorm';

export const AuthMiddleWare = async (
  req: Request,
  res: Response,

  next: Function
) => {
  try {
    const accessToken = req.cookies['accessToken'];
    const refreshToken = req.cookies['refreshToken'];
    const accessTokenCheck: any = verify(
      String(accessToken),
      process.env.SECRET_KEY
    );
    const refreshTokenCheck: any = verify(
      String(refreshToken),
      process.env.SECRET_KEY
    );
    if (!accessTokenCheck && !refreshTokenCheck) {
      res.status(401).send({
        message: 'unauthenticated',
      });
    }
    const repository = getManager().getRepository(User);
    req['user'] = await repository.findOneBy({ id: accessTokenCheck.id });
    next();
  } catch (e) {
    return res.status(401).send({
      message: 'unauthenticated ',
    });
  }
};
