import { UploadFileUseCase } from "./UploadFileUseCase";

class UploadFileController {
  constructor(private uploadFileUseCase: UploadFileUseCase) { }
  handle(request: Request, response: Response): Response {
    const { file } = request;
    this.uploadFileUseCase.execute(file);
    return response.send();
  }
}

export { UploadFileController };
