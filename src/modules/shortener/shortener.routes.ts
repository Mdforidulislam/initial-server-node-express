// app.ts

import express from 'express';
import { shortenerController } from './shortener.controler';
import { uservalidationAsync } from '../../middlewares/auth/authentication';


const Router = express.Router()


// Other middleware, routes, etc.
Router.use(express.json());

// // Define your routes
Router.get('/check-status'  , shortenerController.shortenerStatusCheck);
Router.post("/payment-shortener",  shortenerController.paymentShortener);
Router.post("/generate_shortener",shortenerController.generateShortenerDomain);
Router.get("/shortener-listof-domain", shortenerController.exiteDomainListDomain);
Router.delete("/deleted-list-domain",shortenerController.isExpireLimitedDeleted)
Router.get("/payment-verigy-check",shortenerController.verifyPaymentShortener);
Router.get("/payment-verify-update", shortenerController.shortenerPaymentStatusUpdate);

export const  shortenerRouter = Router;

