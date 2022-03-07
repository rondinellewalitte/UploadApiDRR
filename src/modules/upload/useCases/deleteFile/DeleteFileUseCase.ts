import { S3 } from "aws-sdk";
import { Request } from "express";

import { IUrl } from "../../model";

class DeleteFileUseCase {
  private client: S3;

  private readonly bucketName = process.env.AWS_S3_BUCKET;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  private async deleteFile(request: Request): Promise<IUrl> {
    const { domain, url } = request.headers;

    await this.client

      .deleteObject(
        {
          Bucket: process.env.AWS_S3_BUCKET,

          Key: `${url}`,
        },

        (err, data) => {
          if (err) console.log(err, err.stack);
          else console.log(data);
        }
      )

      .promise();

    return { message: "ok" };
  }

  async execute(request: Request): Promise<IUrl> {
    const dados = await this.deleteFile(request);

    return dados;
  }
}

export { DeleteFileUseCase };
