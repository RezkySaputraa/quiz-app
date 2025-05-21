import express from "express";
import userController from "../controller-handler/user-controller.js";
import quizController from "../controller-handler/quiz-controller.js";
import reviewController from "../controller-handler/reviews-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";
import cookieParser from "cookie-parser";

const userRouter = new express.Router();
userRouter.use(cookieParser());
userRouter.use(authMiddleware);

// USER API
userRouter.get("/api/quiz/profile", userController.dapat)
userRouter.patch("/api/quiz/profile", userController.perbarui)
userRouter.delete("/api/quiz/profile/logout", userController.keluar)


// QUIZ API
userRouter.get("/api/quiz/test/question/:id", quizController.getQuestion)
userRouter.post("/api/quiz/test", quizController.postAnswer)
userRouter.delete("/api/quiz/test", quizController.removeAnswer)
userRouter.get("/api/quiz/test/answer", quizController.getAnswer)

// REVIEW API
userRouter.post("/api/quiz/review", reviewController.postReview)
userRouter.get("/api/quiz/review", reviewController.getReview)

export {userRouter}
