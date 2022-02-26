import { Router } from "express";
import multer from "multer";

import { uploadFileController } from "../modules/upload/useCases/uploadsFile";

const uploadsRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

uploadsRoutes.post("/", upload.single("file"), (request, response) => {
  return uploadFileController.handle(request, response);
});

export { uploadsRoutes };
