import express from 'express';
import passport from 'passport';
import authController from '../controllers/auth.controller';
import redisController from '../controllers/redis_auth.controller';
import { validateLoginSchema, validateSignupSchema, validateForgotPasswordSchema, validateResetPasswordSchema, validateMobileOtpSchema, validateOtpVerificatonSchema } from "../services/auth.service";

export const authRouter = express.Router();


// MONGOOSE ROUTE
// authRouter.post('/register', validateSignupSchema, authController.register);
// authRouter.post('/login', validateLoginSchema, authController.login);
// authRouter.get('/user', passport.authenticate('jwt', { session: false, failureRedirect: '/failure' }), authController.user);


// REDIS ROUTE
authRouter.post('/register', validateSignupSchema, redisController.register);
authRouter.post('/login', validateLoginSchema, redisController.login);
authRouter.get('/user', passport.authenticate('jwt', { session: false, failureRedirect: '/failure' }), redisController.user);