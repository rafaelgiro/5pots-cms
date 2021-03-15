import { NextFunction, Request, Response } from "express";
import { HttpException } from "../middlewares/error";
import { authenticateB2, getUploadURL, uploadFile } from "../services/b2";

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  const { dataSet } = req.params;
  const user: any = req.user;

  if (!user || !user.isAdmin)
    return next(new HttpException(401, "Não autorizado"));

  const files = req.files as Express.Multer.File[];
  const urls: string[] = [];

  const credentials = await authenticateB2();
  const uploadUrl = await getUploadURL(credentials);

  if (!req.files || !dataSet) {
    res.status(400).send("No file uploaded.");
    return next(new HttpException(400, "Nenhuma imagem enviada."));
  }

  files.forEach(async (file) => {
    const response = await uploadFile(file, uploadUrl, dataSet);

    urls.push(`https://assets.5pots.com/file/cincopots/${response.fileName}`);

    if (urls.length >= files.length) {
      res.json(urls);
    }
  });
};

export { uploadImage };
