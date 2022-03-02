import { Request } from "express";

export interface IFile {
  name: string;
  size: number;
  type: string;
  extension: string;
  content: ArrayBuffer;
  bucketName: string;
}
