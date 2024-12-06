import expressAsyncHandler from "express-async-handler";
import { Request, response, Response } from "express";
import { shortenerService } from "./shortener.service"; 
import {  IGenerateDomain, IPaymentShortener } from "./shortener.interface";
import { GenerateShortenerDomain } from "./shortener.model";
import crypto from 'crypto';



// Check user payment status
const shortenerStatusCheck = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const {user_Name}  = req.query; 

        console.log('check user info ', user_Name)

        if (typeof user_Name !== 'string') {
            res.status(400).json({
                message: "Invalid user name provided",
                data: []
            });
            return;
        }

        const resultStatus = await shortenerService.getUserDomainAccessDB(user_Name); 
        res.status(200).json({
            message: "Successfully checked user status",
            data: resultStatus || [], 
        });

    } catch (error) {
        console.error("Error checking user payment status:", error);
        res.status(500).json({
            message: "An error occurred while checking user status",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});


// Payment Controller
const paymentShortener = expressAsyncHandler(async (req: Request, res: Response) => {
    try {

        const shortenerPayment: IPaymentShortener = req.body;

        console.log(shortenerPayment)

        const result = await shortenerService.paymentShortenerDB(shortenerPayment);
        
        res.status(201).json({
            message: "Successfully payment done",
            success: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while processing the payment",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});



// Utility function to generate a random, unique short code
const generateShortCode = (): string => crypto.randomBytes(3).toString('hex');
const generateShortenerDomain = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const shortenerInfo: IGenerateDomain = req.body;


        console.log(shortenerInfo)
        if (!shortenerInfo.user_Name || !shortenerInfo.mainDomain) {
            res.status(400).json({
                message: "Username and main domain are required.",
                data: null
            });
            return;
        }

        const existingDomains = await GenerateShortenerDomain.find({$and:[
            {user_Name: shortenerInfo.user_Name},
            {mainDomain: shortenerInfo.mainDomain}

        ] });

        if (existingDomains.length >= 5) {
            res.status(429).json({
                message: "Domain generation limit reached.",
                data: false
            });
            return;
        }

        // Generate unique short code and check for uniqueness across all users
        let shortCode = "";
        let isUnique = false;

        while (!isUnique) {
            shortCode = generateShortCode();
            const existingDomain = await GenerateShortenerDomain.findOne({ shortCode });

            // Check if the short code is unique
            if (!existingDomain) {
                isUnique = true;
            }
        }

        shortenerInfo.generatedDomain = `${shortenerInfo.mainDomain}/${shortCode}`;
        shortenerInfo.uniqueid = shortCode;

         await shortenerService.saveGeneratedShortCodeToDB(shortenerInfo);

        console.log(shortenerInfo)

        res.status(201).json({
            message: 'Domain successfully shortened.',
            data: shortenerInfo.generatedDomain,
        });


    } catch (error) {
        console.error('Error generating shortener domain:', error);
        res.status(500).json({ message: 'Internal server error.', data: null });
    }
});

// geting domain limitation list 

const exiteDomainListDomain = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const userInfo = req.query;
        
        console.log(userInfo,'check the userinfo list');

        // Validate user input
        if (!userInfo || !userInfo.user_Name || !userInfo.mainDomain) {
            res.status(400).json({
                message: "Invalid input: user_Name and mainDomain are required.",
            });
            return;
        }

        const response = await shortenerService.generateDomainListOfDB(userInfo);

        res.status(200).json({
            message: "Successfully retrieved domain list.",
            data: response,
        });
    } catch (error: any) {
        // General error handling
        res.status(500).json({
            message: "Internal server error.",
            error: error.message || "An unexpected error occurred.",
        });
    }
});

// deleted the domain if exite expire 5 domain

const isExpireLimitedDeleted = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {

      const { id } = req.query;
      if (!id || typeof id !== "string") {
          res.status(400).json({
          success: false,
          message: "Invalid or missing domain ID",
        });
      }
  
      const response = await shortenerService.expirelimitedDomain(id)
  
      console.log(response)
      // Return success response
        res.status(200).json(response);
    } catch (error: any) {

      console.error("Error in deleting expired domain:", error);
        res.status(500).json({
        success: false,
        message: error.message || "An unexpected error occurred",
      });
    }
  });

  

const verifyPaymentShortener = expressAsyncHandler(async (req: Request, res: Response) => {
    try {

        const userName = req.query.user_name as string;  // Typecast the query parameter

        if (!userName) {
            res.status(400).json({
                message: "Bad Request: 'user_name' query parameter is required",
            });
            return;
        }

        const result = await shortenerService.paymentVerifyShortner(userName); 

        if (!result) {
            res.status(404).json({
                message: "User verification failed. No matching records found.",
            });
            return;
        }

        res.status(200).json({
            message: "Successfully verified user payment.",
            data: result,
        });

    } catch (error) {
        console.error("Error occurred during user payment verification:", error);

        // Send a structured error response
        res.status(500).json({
            message: "An error occurred while verifying the user's payment. Please try again later.",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});

// payment Stus Verifying check 
const shortenerPaymentStatusUpdate = expressAsyncHandler(async (req: Request, res: Response) => {
    try {

        const { username, status } = req.query;

        if (!username || !status) {
            res.status(400).json({ message: "Username and status are required." });
            return;
        }

        const updatedPaymentStatus = await shortenerService.updatePaymentStatus(username as string, status as string);

        if (updatedPaymentStatus) {
            res.status(200).json({
                message: "Successfully updated payment status",
                data: updatedPaymentStatus,
            });
        } else {
            res.status(404).json({
                message: "User not found or update failed",
            });
        }
    } catch (error) {
        console.error("Error during payment status update:", error);
        res.status(500).json({
            message: "An error occurred while updating the payment status",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});


// Export the controller
export const shortenerController = {
    shortenerStatusCheck,
    paymentShortener,
    generateShortenerDomain,
    verifyPaymentShortener,
    shortenerPaymentStatusUpdate,
    exiteDomainListDomain,
    isExpireLimitedDeleted
};


// hanlde rediret user domain from comming on hosing 
// and define url on server then redirect 
// 