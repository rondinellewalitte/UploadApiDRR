import { IUploadedFile, IFile } from "../../model";
import { UploadFileUseCase } from "./UploadFileUseCase";

class UploadFileController {
  // eslint-disable-next-line prettier/prettier

  constructor(private uploadFileUseCase: UploadFileUseCase) { }
  async handle(file: IFile): Promise<IUploadedFile> {
    return this.uploadFileUseCase.execute(file);
  }
}

export { UploadFileController };
