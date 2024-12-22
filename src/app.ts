import express, { Application, NextFunction, Request, Response } from "express";
import { userRoutes } from "./modules/user/user.routes";
import { authRouter } from "./modules/auth/auth.routes";

const app = express();
app.use(express.json());




app.use("/api/v1",userRoutes)

// authentication route 
app.use("/api/v1",authRouter)

// Catch-all for undefined routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Resource not found",
    error: {
      method: req.method,
      url: req.originalUrl,
    },
  });
});


export default app;
