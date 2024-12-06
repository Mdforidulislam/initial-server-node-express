// models/userStatusShortenerPayment.interface.ts

export interface IPaymentShortener {       
    user_Name: string;   
    isPayment: boolean;
    typeOFSuscription: ('all_calling' | 'all_notice')[];        
    paymentAmount: number;   
}

export interface IGenerateDomain {     
    user_Name: string;     
    mainDomain: string;     
    userDomain: string;  
    uniqueid: string; 
    generatedDomain: string;  
}


