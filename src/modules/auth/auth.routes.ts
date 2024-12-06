
import express from 'express';
import { authticationControler } from './auth.controlder';
import { middelwareAuth } from './auth.validation';
import { refreshAccessToken } from './refeshToken';
import { userControllers } from '../user/user.controler';



const Router = express.Router();


Router.post(
    '/auth',
    middelwareAuth.authenticateUser(),            
    authticationControler.userAuthentication    
);

Router.post("/logOut",authticationControler.userLogOutController)

Router.get("/refresh-token", refreshAccessToken)

export const authRouter = Router;