import express, { Application, NextFunction, Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoutes } from "./modules/user/user.routes";
import { authRouter } from "./modules/auth/auth.routes";
import { emailRouter } from "./Email/SeverSend";
import { shortenerRouter } from "./modules/shortener/shortener.routes";
import { GenerateShortenerDomain } from "./modules/shortener/shortener.model";



const app: Application = express();
const server = http.createServer(app);  // Create HTTP server for WebSockets
const io = new Server(server);  // Initialize Socket.io with the HTTP server

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Redirect route for shortened URLs
app.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const domain = req.headers.host;
  console.log('request perfaclty 1!')

  console.log(domain,id,'check request perfactly !!')

  try {
    const originalUrlRecord = await GenerateShortenerDomain.findOne({
      $and: [
        { uniqueid: id },
        { mainDomain: domain }
      ]
    });

    if (originalUrlRecord) {
      // return res.redirect(originalUrlRecord.userDomain);
      res.redirect(originalUrlRecord.userDomain) // Redirect to the original URL
    } else {
      return res.status(404).send("URL not found");  // URL not found
    }
  } catch (error) {
    console.error(error);  // Log the error for debugging
    return res.status(500).send("Internal Server Error");  // Handle server errors
  }
});

// Define routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", authRouter);
app.use("/api/v1", shortenerRouter);
app.use("/api/v1", emailRouter);


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
