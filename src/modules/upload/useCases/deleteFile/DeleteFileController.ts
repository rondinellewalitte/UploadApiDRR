import { Request } from "express";

import { IUrl } from "../../model";
import { DeleteFileUseCase } from "./DeleteFileUseCase";

class DeleteFileController {
  constructor(private deleteFileUseCase: DeleteFileUseCase) { }
  handle(request: Request): IUrl {
    const { file } = request.url;
    return this.deleteFileUseCase.execute(file);
  }
}

export { DeleteFileController };
