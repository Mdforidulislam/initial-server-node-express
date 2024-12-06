
// check user statusCheck on service 
import { AllProductService } from "../service/product.service.model";
import { IGenerateDomain, IPaymentShortener } from "./shortener.interface";
import { GenerateShortenerDomain, PaymentShortener } from "./shortener.model";


interface userInfo {
    user_Name: string;
    mainDomain: string;
}


// Fetch user domain access based on payment subscriptions
const getUserDomainAccessDB = async (username: string): Promise<string[] | null> => {
    try {
        const userPaymentRecords: IPaymentShortener[] = await PaymentShortener.find({ user_Name: username }) as IPaymentShortener[];

        console.log(userPaymentRecords,username)

        const subscriptionTypes: ("all_calling" | "all_notice")[] = userPaymentRecords.flatMap(
            (record) => record.typeOFSuscription
          );

        if (userPaymentRecords.length === 0) {
            console.log("User not found.");
            return null;
        }

        if (subscriptionTypes.length < 1) {
            console.log("User has not completed a payment.");
            return null;
        }

        // Retrieve available domain lists for all services
        const serviceDomains = await AllProductService.findOne({}).lean();
        if (!serviceDomains) {
            console.log("Domain services not found.");
            return null;
        }

        const { all_calling, all_notice } = serviceDomains.shortener_service;

        const result= [];

        if (subscriptionTypes.includes("all_calling")) {
            result.push(...all_calling)
        }

        if (subscriptionTypes.includes("all_notice")) {
            result.push(...all_notice)
        }

        return result;

    } catch (error) {
        console.error("Error fetching user domain access:", error instanceof Error ? error.message : error);
        return null;
    }
};


// Function to save payment information in the database
const paymentShortenerDB = async (paymentInfo: IPaymentShortener): Promise<boolean> => {
    try {
        if (!paymentInfo || typeof paymentInfo !== 'object') {
            throw new Error("Invalid payment information provided.");
        }

        // Find existing payment for the user
        const existingPayment = await PaymentShortener.findOne({ user_Name: paymentInfo.user_Name });

        if (existingPayment) {
            // Check if the new subscription type already exists
            const isExistingSubscription = paymentInfo.typeOFSuscription.some((newType) =>
                existingPayment.typeOFSuscription.includes(newType)
            );

            if (isExistingSubscription) {
                return false; // Subscription already exists
            }

            // Update existing record with new subscription types
            existingPayment.typeOFSuscription.push(...paymentInfo.typeOFSuscription);
            await existingPayment.save();
            return true;
        }

        // If no existing payment record, create a new one
        const newPayment = new PaymentShortener(paymentInfo);
        await newPayment.save();
        return true;
    } catch (error) {
        console.error(
            "Error processing payment information:",
            error instanceof Error ? error.message : "Unknown error"
        );
        throw new Error(`Database operation failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
};



// generate shortCode store on db  on db 

const saveGeneratedShortCodeToDB = async (data: IGenerateDomain) => {
    try {
        return await GenerateShortenerDomain.create(data);
    } catch (error) {
        console.error('Error saving short code to DB:', error);
        throw new Error('Failed to save short code to the database');
    }
};


// geting generateListOf domain 
const generateDomainListOfDB = async (userInfo: userInfo): Promise<any[]> => {
    try {
        const { user_Name, mainDomain } = userInfo;

        // Validate input
        if (!user_Name || !mainDomain) {
            throw new Error("Both user_Name and mainDomain are required.");
        }

        // Explicitly ensure both fields match
        const listOfDomain = await GenerateShortenerDomain.find({
            $and: [
                { user_Name: user_Name },
                { mainDomain: mainDomain },
            ],
        }).select("_id mainDomain");

        
        return listOfDomain || [];
    } catch (error: any) {
        console.error("Error fetching domain list:", error);
        throw new Error(error.message || "Failed to fetch domain list.");
    }
};

// deleted expire domain limitation 

const expirelimitedDomain = async(id: {id: string}) =>{
    try{
            if ( !id){
                return {mesaage: 'provide right info'}
            };

        const resonse  = await GenerateShortenerDomain.findByIdAndDelete(id);

        if (resonse) return {message: "succesfuylly delet", success: true}
        if(!resonse)  return {message: "wrong delete domain", success: false}

    }catch(error){
        return error
    }
}


// Verifies the user's payment information for shortener
const paymentVerifyShortner = async (userName: string): Promise<IPaymentShortener | null> => {
    try {
        const verifyInfo = await PaymentShortener.findOne({ user_name: userName }).lean();

        if (!verifyInfo) {
            console.log("User not found.");
            return null;
        }

        return verifyInfo;
    } catch (error) {
        console.error("Error during payment verification:", error instanceof Error ? error.message : error);
        throw new Error("An error occurred while verifying the user's payment.");
    }
};

const updatePaymentStatus = async (username: string, status: string): Promise<IPaymentShortener | null> => {
    try {
        if (!["paid", "unpaid"].includes(status)) {
            throw new Error("Invalid payment status provided.");
        }

        const updatedUser = await PaymentShortener.findOneAndUpdate(
            { user_name: username },
            { isPayment: status === "paid" },  
            { new: true } 
        ).lean(); 

        if (!updatedUser) {
            return null; 
        }

        return updatedUser; 
    } catch (error) {
        console.error("Error updating payment status:", error);
        throw new Error("Failed to update payment status.");
    }
};

// Export the service
export const shortenerService = {
    getUserDomainAccessDB,
    paymentShortenerDB,
    saveGeneratedShortCodeToDB,
    paymentVerifyShortner,
    updatePaymentStatus,
    generateDomainListOfDB,
    expirelimitedDomain
};
