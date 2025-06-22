import jwt from "jsonwebtoken";
import { prismaClient } from "../application/database.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res
      .status(401)
      .json({
        error: "Unauthorized",
      })
      .end();
  } else {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await prismaClient.user.findFirst({
      where: {
        username: decoded.username,
      },
      select: {
        username: true,
      },
    });

    if (!user) {
      res.status(401).json({
        error: "Unauthorized",
      });
    } else {
      req.user = user;
      next();
    }
  }
};

export { authMiddleware };
