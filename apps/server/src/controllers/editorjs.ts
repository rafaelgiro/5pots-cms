import axios from "axios";
import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { HttpException } from "../middlewares/error";
import { authenticateB2, getUploadURL, uploadFile } from "../services/b2";

const uploadFromFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { image } = req.body;
  const user: any = req.user;

  if (!user || !user.isAdmin)
    return next(new HttpException(401, "Não autorizado"));

  const files = req.files as Express.Multer.File[];
  const urls: string[] = [];

  const credentials = await authenticateB2();
  const uploadUrl = await getUploadURL(credentials);
  const dataSet = "etc";

  if (!req.files || !dataSet) {
    res.status(400).send("No file uploaded.");
    return next(new HttpException(400, "Nenhuma imagem enviada."));
  }

  files.forEach(async (file) => {
    const fileName = file.originalname;

    let optimized;

    // Sempre otimiza pra .webp
    try {
      optimized = await sharp(file.buffer).webp().toBuffer();
    } catch (error) {
      return next(
        new HttpException(500, "Ocorreu um erro ao otimizar a imagem")
      );
    }

    const normalFile = {
      name: fileName,
      size: file.size,
      buffer: file.buffer,
    };

    const optimizedFile = {
      name: `${fileName.replace(/\.[^/.]+$/, "")}.webp`,
      size: optimized.byteLength,
      buffer: optimized,
    };

    // Faz o upload das 2 imagens e retorna o .webp na posição 0
    try {
      const response = await uploadFile(normalFile, uploadUrl, dataSet);
      const webpResponse = await uploadFile(optimizedFile, uploadUrl, dataSet);

      urls.push(
        `https://assets.5pots.com/file/cincopots/${webpResponse.fileName}`
      );
      urls.push(`https://assets.5pots.com/file/cincopots/${response.fileName}`);

      if (urls.length >= files.length) {
        res.json({ success: 1, file: { url: urls[1] } });
      }
    } catch (error) {
      return next(
        new HttpException(503, "Ocorreu um erro ao fazer upload da imagem")
      );
    }
  });
};

const uploadFromURL = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { image } = req.body;
  const user: any = req.user;

  if (!user || !user.isAdmin)
    return next(new HttpException(401, "Não autorizado"));

  const url = req.body.url;

  axios
    .get(url, {
      responseType: "arraybuffer",
    })
    .then(async (response) => {
      const imgBuffer = response.data;
      const fileName = response.request.path.substr(
        response.request.path.lastIndexOf("/") + 1
      );
      const dataSet = "etc";
      const urls: string[] = [];
      const credentials = await authenticateB2();
      const uploadUrl = await getUploadURL(credentials);

      if (!imgBuffer || !dataSet) {
        res.status(400).send("No file uploaded.");
        return next(new HttpException(400, "Nenhuma imagem enviada."));
      }

      let optimized;

      // Sempre otimiza pra .webp
      try {
        optimized = await sharp(imgBuffer).webp().toBuffer();
      } catch (error) {
        return next(
          new HttpException(500, "Ocorreu um erro ao otimizar a imagem")
        );
      }

      const normalFile = {
        name: fileName,
        size: imgBuffer.length,
        buffer: imgBuffer,
      };

      const optimizedFile = {
        name: `${fileName.replace(/\.[^/.]+$/, "")}.webp`,
        size: optimized.byteLength,
        buffer: optimized,
      };

      // Faz o upload das 2 imagens e retorna o .webp na posição 0
      try {
        const response = await uploadFile(normalFile, uploadUrl, dataSet);
        const webpResponse = await uploadFile(
          optimizedFile,
          uploadUrl,
          dataSet
        );

        urls.push(
          `https://assets.5pots.com/file/cincopots/${webpResponse.fileName}`
        );
        urls.push(
          `https://assets.5pots.com/file/cincopots/${response.fileName}`
        );

        res.json({ success: 1, file: { url: urls[1] } });
      } catch (error) {
        return next(
          new HttpException(503, "Ocorreu um erro ao fazer upload da imagem")
        );
      }
    })
    .catch(() => {
      res.json({ success: 0 });
    });
};

export { uploadFromFile, uploadFromURL };
