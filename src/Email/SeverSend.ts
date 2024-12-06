import express, { Request, Response } from 'express';
import axios from 'axios';

const MAIL_TM_BASE_URL = 'https://api.mail.tm';
const router = express.Router();

// Interfaces for API responses
interface TempEmailResponse {
    address: string;
    password: string;
    id: string;
}

interface TokenResponse {
    token: string;
}

interface Message {
    id: string;
    subject: string;
    intro: string;
    text: string;
    html: string;
    [key: string]: any; // Allows additional properties
}

interface MessagesResponse {
    hydra: { totalItems: number };
    'hydra:member': Message[];
}

// Function to create a temporary email
async function createTempEmail(): Promise<TempEmailResponse> {
    const response = await axios.post<TempEmailResponse>(`${MAIL_TM_BASE_URL}/accounts`, {
        address: `random${Date.now()}@mail.tm`,
        password: 'securePassword123',
    });
    console.log(response,'check the response , createa main server')
    return response.data;
}

// Function to get token
async function getToken(email: string, password: string): Promise<string> {
    const response = await axios.post<TokenResponse>(`${MAIL_TM_BASE_URL}/token`, {
        address: email,
        password,
    });
    console.log('check the respnse token ', response)
    return response.data.token;
}

// Function to retrieve messages
async function getMessages(token: string): Promise<Message[]> {
    const response = await axios.get<MessagesResponse>(`${MAIL_TM_BASE_URL}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data['hydra:member'];
}

// Route to create a temporary email and retrieve messages
router.get('/create-email', async (req: Request, res: Response) => {
    try {
        console.log('request form the client ')
        const { address, password } = await createTempEmail();
        console.log(address,password,'check the address and password')
        const token = await getToken(address, password);
        console.log(token,'check server token ')
        const messages = await getMessages(token);
        console.log(messages, 'response form the email server ')
        res.json({ address, messages });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export const emailRouter = router;
