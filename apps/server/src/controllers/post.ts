import { NextFunction, Request, Response } from "express";
import { HttpException } from "../middlewares/error";
import Post from "../models/post";

const getPosts = (req: Request, res: Response, next: NextFunction) => {
  const currentPage = Number(req.query.page) || 1;
  const perPage = 10;
  let totalItems: number;

  Post.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Post.find({}, { sections: 0 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .sort({ postedAt: 1 });
    })
    .then((posts) => {
      if (posts.length === 0)
        next(new HttpException(404, "Nenhum post foi encontrado"));
      else if (posts) res.status(200).json({ posts, totalItems });
    })
    .catch(() => {
      next(new HttpException(404, "Nenhum post foi encontrado"));
    });
};

const getPost = (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params;

  Post.findOne({ slug }).then((post) => {
    if (post) res.status(200).json(post);
    else next(new HttpException(404, "Post não encontrado"));
  });
};

export { getPosts, getPost };
