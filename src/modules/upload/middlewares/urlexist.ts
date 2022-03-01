import { Request, Response, NextFunction } from "express";

export const urlExists = (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.headers;
  if (!url) {
    return res.status(500).json({ error: "Invalid file url." });
  }
  return next();
};
