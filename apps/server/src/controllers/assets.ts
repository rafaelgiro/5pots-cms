import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { HttpException } from "../middlewares/error";
import { authenticateB2, getUploadURL, uploadFile } from "../services/b2";

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  const { dataSet } = req.params;
  const { name: fileName } = req.body;
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
    const originalName = file.originalname;
    const extension = originalName.split(".").pop();

    let optimized;

    try {
      optimized = await sharp(file.buffer).webp().toBuffer();
    } catch (error) {
      return next(
        new HttpException(500, "Ocorreu um erro ao otimizar a imagem")
      );
    }

    const optimizedFile = {
      name: fileName
        ? `${fileName}.webp`
        : `${originalName.replace(/\.[^/.]+$/, "")}.webp`,
      size: optimized.byteLength,
      buffer: optimized,
    };

    const normalFile = {
      name: fileName ? `${fileName}.${extension}` : originalName,
      size: file.size,
      buffer: file.buffer,
    };

    try {
      const response = await uploadFile(normalFile, uploadUrl, dataSet);
      const webpResponse = await uploadFile(optimizedFile, uploadUrl, dataSet);

      urls.push(
        `https://assets.5pots.com/file/cincopots/${webpResponse.fileName}`
      );
      urls.push(`https://assets.5pots.com/file/cincopots/${response.fileName}`);

      if (urls.length >= files.length) {
        res.json(urls);
      }
    } catch (error) {
      return next(
        new HttpException(503, "Ocorreu um erro ao fazer upload da imagem")
      );
    }
  });
};

export { uploadImage };
