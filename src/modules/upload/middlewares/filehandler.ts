import { Request, Response, NextFunction } from "express";
import multer from "multer";

import { IFile } from "../model";

export const fileHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { file } = req;

  const MAX_SIZE_TWO_MEGABYTES =
    parseInt(process.env.MAX_SIZE_TWO_MEGABYTES, 10) * 1024 * 1024;

  if (file.size > MAX_SIZE_TWO_MEGABYTES) {
    return res.status(404).json({ error: "File larger than allowed" });
  }

  const bucket = process.env.AWS_S3_BUCKET.split(",");

  const bucketName = bucket.find(
    (bucketname) => bucketname === req.headers.host
  );

  if (!bucketName) {
    return res.status(404).json({ error: "Invalid host" });
  }

  const mappedFiles: IFile = {
    name: file.originalname,
    type: file.mimetype,
    content: file.buffer,
    size: file.size,
    extension: `${file.originalname.split(".").pop()}`,
    bucketName,
  };

  Object.assign(req.body, mappedFiles);
  return next();
};
