import { DeleteFileController } from "./DeleteFileController";
import { DeleteFileUseCase } from "./DeleteFileUseCase";

const deleteFileUseCase = new DeleteFileUseCase();

const deleteFileController = new DeleteFileController(deleteFileUseCase);

export { deleteFileController };
