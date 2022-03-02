import { S3 } from "aws-sdk";

import { IFile, IUploadedFile } from "../../model";

const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];

class UploadFileUseCase {
  private client: S3;

  // private readonly bucketName = process.env.AWS_S3_BUCKET;
  private readonly bucketName = "drraluno.com.br";
  private readonly ACL = process.env.DEFAULT_FILES_ACL;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  private generateFileKey(file: IFile, timestamp: number): string {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    return `${month}/${file.name}-${timestamp}.${file.extension}`;
  }

  private async uploadFile(file: IFile): Promise<IUploadedFile> {
    if (!allowedMimes.includes(file.type)) {
      return { error: new Error("Invalid file type.") };
    }

    const timestamp = Date.now();

    const fileKey = this.generateFileKey(file, timestamp);
    await this.client
      .putObject({
        Bucket: this.bucketName,
        Key: fileKey,
        ContentType: file.type,
        Body: file.content,
        ACL: this.ACL,
      })
      .promise();
    return {
      path: `${this.bucketName}/${fileKey}`,
      name: fileKey,
    };
  }

  async execute(file: IFile): Promise<IUploadedFile | undefined> {
    const dados = await this.uploadFile(file);
    return dados;
  }
}
export { UploadFileUseCase };
