import express from 'express';
import taskController from '../controllers/task.controller';
import redistaskController from '../controllers/redis_task.controller';
import passport from 'passport'; 
import { validateCreatTaskSchema,  } from "../services/task.service";



export const taskRouter =  express.Router();


// MONGOOSE ROUTE
// taskRouter.post('/create-task', validateCreatTaskSchema, passport.authenticate('jwt', {session: false, failureRedirect: '/failure'}),  taskController.createTask);
// taskRouter.get('/list-task', passport.authenticate('jwt', {session: false, failureRedirect: '/failure'}),  taskController.getTasks);



// REDIS ROUTE
taskRouter.post('/create-task', validateCreatTaskSchema, passport.authenticate('jwt', {session: false, failureRedirect: '/failure'}),  redistaskController.createTask);
taskRouter.get('/list-task', passport.authenticate('jwt', {session: false, failureRedirect: '/failure'}),  redistaskController.getTasks);