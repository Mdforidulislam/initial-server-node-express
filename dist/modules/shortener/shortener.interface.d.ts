export interface IPaymentShortener {
    user_id: string;
    user_name: string;
    user_email: string;
    isPayment: boolean;
    typeOFSuscription: 'all_calling' | 'all_notice';
    paymentAmount: number;
    paymentType: string;
}
export interface IGenerateDomain {
    user_id: string;
    user_name: string;
    mainDomain: string;
    userDomain: string;
    generatedDomain: string;
}
//# sourceMappingURL=shortener.interface.d.ts.map