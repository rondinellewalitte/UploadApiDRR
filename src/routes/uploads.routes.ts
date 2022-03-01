import { Router, Request, Response } from "express";
import multer from "multer";

import { fileHandler } from "../modules/upload/middlewares/filehandler";
import { urlExists } from "../modules/upload/middlewares/urlexist";
import { deleteFileController } from "../modules/upload/useCases/deleteFile";
import { uploadFileController } from "../modules/upload/useCases/uploadsFile";

const uploadsRoutes = Router();

const upload = multer();

uploadsRoutes.post(
  "/",
  upload.single("file"),
  fileHandler,
  async (req: Request, res: Response) => {
    const { name, path, error } = await uploadFileController.handle({
      body: req.body,
    });

    if (error) {
      return res.status(200).json({ Error: error.message });
    }
    return res.status(200).json({
      url: `https://upload-plataformas.s3.sa-east-1.amazonaws.com/${name}`,
    });
  }
);

uploadsRoutes.delete(
  "/",
  urlExists,
  async (request: Request, response: Response) => {
    const res = await deleteFileController.handle(request);
    return response.json(res);
  }
);

export { uploadsRoutes };
