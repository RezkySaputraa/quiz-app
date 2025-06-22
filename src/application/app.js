import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/users-api.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(publicRouter);
app.use(userRouter);

app.use((req, res, next) => {
  res.status(404).json({
    errors: "Page not found",
  });
});

app.use(errorMiddleware);

export default app;
