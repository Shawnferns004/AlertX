import express from 'express';
import { login, register, verifyEmail } from '../controller/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get("/verify-email", verifyEmail);

export default router;
