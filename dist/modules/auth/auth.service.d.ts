interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}
interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}
export declare const authtication: {
    authticationService: (usernameOrEmail: string, password: string) => Promise<TokenResponse | null>;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map