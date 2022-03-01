import { Request } from "express";

import { IUrl } from "../../model";
import { DeleteFileUseCase } from "./DeleteFileUseCase";

class DeleteFileController {
  constructor(private deleteFileUseCase: DeleteFileUseCase) { }
  async handle(request: Request): Promise<IUrl> {
    const res = await this.deleteFileUseCase.execute(request);
    return res;
  }
}

export { DeleteFileController };
