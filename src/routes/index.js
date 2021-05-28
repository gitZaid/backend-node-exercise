import express from 'express';

import { authRouter } from './auth.route';
import { taskRouter } from './task.route';
export const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/task', taskRouter);

