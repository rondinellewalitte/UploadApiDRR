import { Request, Response, NextFunction } from "express";

import { IFile } from "../model";

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

export const fileHandler = (req: Request, _: Response, next: NextFunction) => {
  const { file } = req;
  const mappedFiles: IFile = {
    name: file.originalname,
    type: file.mimetype,
    content: file.buffer,
    size: file.size,
    extension: `${file.originalname.split(".").pop()}`,
  };

  Object.assign(req.body, { file: mappedFiles });
  return next();
};
