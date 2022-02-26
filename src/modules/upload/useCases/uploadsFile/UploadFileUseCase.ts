import { S3 } from "aws-sdk";

import { IFile, InterfaceFile } from "../../model";

const AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE";
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
const AWS_DEFAULT_REGION = "us-west-2";
const AWS_S3_BUCKET = "uploads-plataformas";

class UploadFileUseCase {
  private client: S3;

  private readonly bucketName = AWS_S3_BUCKET;

  constructor() {
    this.client = new S3({
      region: AWS_DEFAULT_REGION,
    });
  }

  private generateFileKey(file: IFile, timestamp: number): string {
    return `${file.name}-${timestamp}.${file.extension}`;
  }

  private async uploadFile(file: IFile): Promise<string> {
    const timestamp = Date.now();
    const fileKey = this.generateFileKey(file, timestamp);
    await this.client
      .putObject({
        Bucket: this.bucketName,
        Key: fileKey,
        ContentType: file.type,
        Body: file.content,
      })
      .promise();

    return `${this.bucketName}/${fileKey}`;
  }

  execute(file: Express.Multer.File): void {
    console.log(file);
  }
}

export { UploadFileUseCase };
