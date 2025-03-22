import express from 'express';
import { adminDelete, adminEmailGet, adminGet, adminLogin, adminRegister, adminUpdate } from '../controller/admin.js';

const adminRouter = express.Router();

adminRouter.post('/register', adminRegister);
adminRouter.post('/login', adminLogin);
adminRouter.get('/list', adminGet);
adminRouter.get('/:email', adminEmailGet);
adminRouter.delete('/:id', adminDelete);
adminRouter.put('/:id', adminUpdate);

export default adminRouter;
