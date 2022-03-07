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

  upload.single("upload"),

  fileHandler,

  async (req: Request, res: Response) => {
    const { body } = req;

    const { path, error } = await uploadFileController.handle(body);

    if (error) {
      return res
        .status(404)
        .json({ uploaded: false, error: { message: error.message } });
    }

    return res.status(200).json({
      uploaded: true,
      url: `https://s3.sa-east-1.amazonaws.com/${path}`,
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
