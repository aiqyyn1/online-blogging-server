import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { PostEntity } from '../entity/entityPost';


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
