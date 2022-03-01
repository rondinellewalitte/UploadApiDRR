import { Request } from "express";

import { IUploadedFile } from "../../model";
import { UploadFileUseCase } from "./UploadFileUseCase";

class UploadFileController {
  constructor(private uploadFileUseCase: UploadFileUseCase) { }
  handle(request: Request): IUploadedFile {
    const { file } = request.body;
    return this.uploadFileUseCase.execute(file);
  }
}

export { UploadFileController };
