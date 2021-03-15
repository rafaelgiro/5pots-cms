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

const updatePost = (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params;
  const { post } = req.body;

  // Ordena as mudanças de campeões
  const sectionIndex = post.sections.findIndex(
    (section: Record<string, unknown>) => section.champions
  );

  if (sectionIndex !== -1)
    post.sections[
      sectionIndex
    ].champions.sort((a: Record<string, string>, b: Record<string, string>) =>
      a.name > b.name ? 1 : -1
    );

  let newChampArr = post.champions;

  if (post.champions && sectionIndex !== -1) {
    newChampArr = post.sections[sectionIndex].champions.map(
      (c: Record<string, string>) => c.name
    );
  }

  newChampArr.sort((a: string, b: string) => (a > b ? 1 : -1));

  Post.findOneAndUpdate(
    { slug },
    {
      $set: { ...post, champions: newChampArr },
    },
    { new: true, useFindAndModify: false }
  ).then((updatedPost) => {
    if (updatedPost) res.status(200).json(updatedPost);
    else next(new HttpException(404, "Post não encontrado"));
  });
};

export { getPosts, getPost, updatePost };
