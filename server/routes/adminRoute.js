import express from 'express';
import { adminDelete, adminGet, adminLogin, adminRegister, adminUpdate } from '../controller/admin.js';

const adminRouter = express.Router();

adminRouter.post('/register', adminRegister);
adminRouter.post('/login', adminLogin);
adminRouter.get('/list', adminGet);
adminRouter.delete('/:id', adminDelete);
adminRouter.put('/:id', adminUpdate);

export default adminRouter;
