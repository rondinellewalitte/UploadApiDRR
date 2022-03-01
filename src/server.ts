import express from "express";
import "dotenv/config";

import { uploadsRoutes } from "./routes/uploads.routes";

const app = express();

app.use("/uploads", uploadsRoutes);

app.listen(3333, () => console.log("Server is running!"));
