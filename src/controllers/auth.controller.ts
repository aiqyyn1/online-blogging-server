import { Request, Response } from 'express';
import { getManager, getRepository } from 'typeorm';
import { PostEntity } from '../entity/entityPost';
import { registerValidation } from '../validation/registration.validation';
import { User } from '../entity/entity.User';
import bcryptjs from 'bcryptjs'
import { loginValidation } from '../validation/login.validation';
import { sign } from 'jsonwebtoken';

export const createPost = async (req: Request, res: Response) => {
  try {
    const postRepository = getRepository(PostEntity);
    const { content, title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image.' });
    }

    const imgPath = req.file.path;
    const newPost = postRepository.create({
      content,
      title,
      img: imgPath,
    });

    await postRepository.save(newPost);

    res
      .status(201)
      .json({ message: 'Post created successfully', data: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while creating a post.' });
  }
};
export const Register =async (req:Request, res:Response) => {
     const body = req.body
      const {error} = registerValidation.validate(body)
      console.log(body.re_password)
      if (error){
        return res.status(400).send(error.details)
      }
      if (body.password !==body.re_password){
        return res.status(400).send({
          message:"Password doesn't match"
        })
      }
      const repository = getManager().getRepository(User)
      const {password, ...user} = await  repository.save({
        name:body.name,
        surname:body.surname,
        email:body.email,
        password:await bcryptjs.hash(body.password, 10)
      })
      res.send(user)
}
export const Login = async (req:Request, res:Response) => {
    const repository = getManager().getRepository(User)
    const user = await repository.findOneBy({
       email:req.body.email
    })
    const {error} = loginValidation.validate(req.body)
    if (error){
      return res.send(error.details);
    }
    if (!user){
      return res.status(400).send({
        message:'User not found'
      })
    }
    if (!await bcryptjs.compare(req.body.password, user.password)){
      return res.status(400).send({
        message: 'Invalid credentials'
      })
    }
    const accessToken = sign({id:user.id}, process.env.SECRET_KEY, {
      expiresIn:'1d'
    })
    const refreshToken = sign({id:user.id}, process.env.SECRET_KEY, {
      expiresIn:'4d'
    })

    const {password, ...data} = user
    res
    .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
    res
    .cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'strict' })
    .json({'refresToken':refreshToken, 'accessToken':accessToken});
} 
export const AuthenticatedUser = async (req: Request, res: Response) => {
  res.send(req['user']);
};