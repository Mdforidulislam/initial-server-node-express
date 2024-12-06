import { NextFunction, Request, Response } from "express";
declare const authorizationUser: (requiredRoles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
export default authorizationUser;
//# sourceMappingURL=authorization.d.ts.map